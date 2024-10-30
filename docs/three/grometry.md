# Three.js 物理引擎教程：实现真实物理效果

> **开发领域**：前端开发 | AI 应用 | Web3D | 元宇宙  
> **技术栈**：JavaScript、React、ThreeJs、WebGL、Go  
> **经验经验**：6年+ 前端开发经验，专注于图形渲染和AI技术  
> **开源项目**：[github](https://github.com/dezhizhang) [晓智元宇宙](https://www.xiaozhi.shop/)、[数字孪生引擎](https://www.shuqin.cc/)、[前端面试题](https://fe.shuqin.cc/)   
> 大家好！我是 [晓智]，一位热爱探索新技术的前端开发者，在这里分享前端和Web3D、AI技术的干货与实战经验。如果你对技术有热情，欢迎关注我的文章，我们一起成长、进步！


Three.js 是一个功能强大的 3D 图形库，但它并不自带物理引擎。为了实现更真实的物理效果，我们通常将 Three.js 和一个外部物理引擎（例如 Cannon.js、Ammo.js 等）结合使用。在本教程中，我们将学习如何使用 Cannon.js 与 Three.js 一起构建一个带有重力、碰撞和力学的 3D 物理世界。

## 1. 物理引擎简介

物理引擎用于模拟现实中的物理现象，例如重力、碰撞和摩擦等。Three.js 本身不具备物理计算能力，因此需要与 Cannon.js、Ammo.js 或 Oimo.js 等物理引擎配合。Cannon.js 是一个轻量且易于集成的 JavaScript 物理引擎，适合在 Three.js 项目中实现基础的物理模拟效果。

## 2. 初始化 Three.js 场景

在开始之前，确保你的项目已经包含 Three.js 的基本配置。

```javascript
import * as THREE from 'three';

// 创建场景
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);
camera.position.z = 10;

// 创建渲染器
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 渲染循环
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();
```

3. Cannon.js 物理引擎入门
   首先，通过 npm 安装 Cannon.js：

```bash

npm install cannon-es
```

cannon-es 是 Cannon.js 的一个社区维护版本，支持模块化和 ES6 语法。

创建物理世界
Cannon.js 中的物理世界类似于 Three.js 的场景，所有的物理对象都会添加到物理世界中进行计算。

```javascript
import * as CANNON from 'cannon-es';

// 创建物理世界
const world = new CANNON.World();
world.gravity.set(0, -9.82, 0); // 设置重力
world.broadphase = new CANNON.NaiveBroadphase(); // 碰撞检测算法
```

## 4. Three.js 与 Cannon.js 的结合

为了同步物理引擎和 Three.js 的渲染，我们需要在场景中添加与物理世界匹配的物体。

同步物理与可视对象
每个 Cannon.js 的物理对象都需要对应一个 Three.js 的 Mesh 对象，以便在每一帧同步位置和旋转。

## 5. 添加物理对象和物理效果

### 5.1 创建平面（地面）

```javascript
// Three.js 平面
const groundGeometry = new THREE.PlaneGeometry(20, 20);
const groundMaterial = new THREE.MeshStandardMaterial({ color: 0x555555 });
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = -Math.PI / 2; // 旋转到水平位置
scene.add(ground);

// Cannon.js 平面
const groundBody = new CANNON.Body({
  mass: 0, // 质量为 0，表示静止不动
  shape: new CANNON.Plane(),
});
groundBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0); // 旋转至水平
world.addBody(groundBody);
```

### 5.2 创建带物理效果的球体

```javascript
// Three.js 球体
const ballGeometry = new THREE.SphereGeometry(1, 32, 32);
const ballMaterial = new THREE.MeshStandardMaterial({ color: 0x0077ff });
const ballMesh = new THREE.Mesh(ballGeometry, ballMaterial);
scene.add(ballMesh);

// Cannon.js 球体
const ballBody = new CANNON.Body({
  mass: 1, // 设置质量
  shape: new CANNON.Sphere(1),
  position: new CANNON.Vec3(0, 10, 0), // 设置初始位置
});
world.addBody(ballBody);
```

### 5.3 渲染循环中更新物理世界

物理引擎和 Three.js 的渲染器在同一循环中更新，并保持位置同步：

```

function animate() {
  requestAnimationFrame(animate);

  // 更新物理世界
  world.step(1 / 60); // 固定时间步长，控制物理世界的更新频率

  // 同步 Three.js 对象的位置和旋转
  ballMesh.position.copy(ballBody.position);
  ballMesh.quaternion.copy(ballBody.quaternion);

  renderer.render(scene, camera);
}
animate();
```

## 6. 物理效果的常用应用

### 6.1 重力和抛物线运动

在物理世界中添加的任何对象都会受到重力影响，通过设置物体的质量和初始速度可以模拟抛物线运动。

### 6.2 碰撞检测

Cannon.js 自动处理物体间的碰撞，并提供 collide 事件来检测碰撞。可以为球体添加事件监听，检测碰撞后更改颜色或触发其他效果。

```javascript
ballBody.addEventListener('collide', (event) => {
  console.log('球体碰撞！');
});
```

### 6.3 弹性和摩擦力

Cannon.js 允许通过 material 设置弹性和摩擦力，模拟不同的物理材质效果。

```javascript
const groundMaterial = new CANNON.Material('groundMaterial');
const ballMaterial = new CANNON.Material('ballMaterial');

// 创建接触材质，设置摩擦力和弹性
const contactMaterial = new CANNON.ContactMaterial(
  groundMaterial,
  ballMaterial,
  {
    friction: 0.1,
    restitution: 0.7, // 弹性系数
  },
);
world.addContactMaterial(contactMaterial);
```

## 7. 性能优化

- 物理引擎的计算开销较大，因此优化至关重要。以下是一些常见的优化技巧：
- 使用简单的物理形状：避免复杂的网格形状，使用 Box、Sphere 等简单形状来减少计算。
- 降低物理更新频率：在 step 函数中设置较长的时间步长，例如 1/30，或仅在关键帧更新物理世界。
- 减少物体数量：确保场景中只有必要的物理对象。

## 8. 总结

通过将 Three.js 与 Cannon.js 结合，我们可以轻松构建带有真实物理效果的 3D 场景，从而极大地丰富 Web 端的互动性和视觉表现力。尽管物理引擎带来了额外的复杂性和计算成本，但其效果对增强用户体验非常有帮助。
