# Cannon.js 入门教程

> **开发领域**：前端开发 | AI 应用 | Web3D | 元宇宙  
> **技术栈**：JavaScript、React、ThreeJs、WebGL、Go  
> **经验经验**：6 年+ 前端开发经验，专注于图形渲染和 AI 技术  
> **开源项目**：[智简未来](https://aint.top/)、[数字孪生引擎](https://www.shuqin.cc/)  [github](https://github.com/dezhizhang) 
> 大家好！我是 [晓智]，一位热爱探索新技术的前端开发者，在这里分享前端和 Web3D、AI 技术的干货与实战经验。如果你对技术有热情，欢迎关注我的文章，我们一起成长、进步！

`Cannon.js` 是一个用于 Web 和 JavaScript 的 3D 物理引擎，广泛应用于游戏和仿真领域，能够处理物理碰撞、刚体、力、速度等效果。本文将通过简单的示例，帮助你理解如何将 `Cannon.js` 与 `Three.js` 集成，并在 3D 场景中实现物理模拟。

## 1. 安装和引入 Cannon.js

### 通过 CDN 引入

你可以通过 CDN 直接引入 `Cannon.js`：

```html
<script src="https://cdn.jsdelivr.net/npm/cannon-es@0.23.0/dist/cannon-es.js"></script>
```

### 通过 npm 安装

如果你使用模块化开发（例如 webpack 或 Vite），可以使用 npm 安装 cannon-es：

```bash
npm install cannon-es
```

### 2. 创建基本的 Three.js 场景

首先，我们需要创建一个简单的 Three.js 场景，并添加一个立方体和一个平面，以便我们能够看到物理引擎的效果。

代码示例：基本的 Three.js 场景

```javascript
import * as THREE from 'three';

let scene, camera, renderer;
let cube, plane;

function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000,
  );
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // 创建立方体
  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  cube = new THREE.Mesh(geometry, material);
  cube.position.y = 5; // 放置在空中
  scene.add(cube);

  // 创建地面
  const planeGeometry = new THREE.PlaneGeometry(2000, 2000);
  const planeMaterial = new THREE.ShadowMaterial({ opacity: 0.5 });
  plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.rotation.x = -Math.PI / 2;
  plane.position.y = -5;
  scene.add(plane);

  camera.position.z = 10;

  animate();
}

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

init();
```

### 3. 添加物理世界

接下来，我们需要添加 Cannon.js 物理引擎。我们将创建一个 Cannon.js 的世界并为立方体和地面添加物理属性。

代码示例：添加物理世界

```javascript
import * as THREE from 'three';
import * as CANNON from 'cannon-es';

let scene, camera, renderer;
let cube, plane;
let world, cubeBody, planeBody;

function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000,
  );
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // 创建物理世界
  world = new CANNON.World();
  world.gravity.set(0, -9.82, 0); // 设置重力

  // 创建立方体（物理）
  const cubeShape = new CANNON.Box(new CANNON.Vec3(1, 1, 1)); // 立方体形状
  cubeBody = new CANNON.Body({
    mass: 1, // 质量
    position: new CANNON.Vec3(0, 5, 0), // 初始位置
  });
  cubeBody.addShape(cubeShape);
  world.addBody(cubeBody);

  // 创建立方体（Three.js 视觉部分）
  const geometry = new THREE.BoxGeometry(2, 2, 2);
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  // 创建地面（物理）
  const planeShape = new CANNON.Plane(); // 地面形状
  planeBody = new CANNON.Body({
    mass: 0, // 地面不动
    position: new CANNON.Vec3(0, -5, 0),
  });
  planeBody.addShape(planeShape);
  world.addBody(planeBody);

  // 创建地面（Three.js 视觉部分）
  const planeGeometry = new THREE.PlaneGeometry(2000, 2000);
  const planeMaterial = new THREE.ShadowMaterial({ opacity: 0.5 });
  plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.rotation.x = -Math.PI / 2;
  plane.position.y = -5;
  scene.add(plane);

  camera.position.z = 10;

  animate();
}

function animate() {
  requestAnimationFrame(animate);

  // 更新物理世界
  world.step(1 / 60); // 每帧更新物理世界

  // 将物理世界中的立方体位置更新到 Three.js 中
  cube.position.copy(cubeBody.position);
  cube.rotation.copy(cubeBody.rotation);

  renderer.render(scene, camera);
}

init();
```

创建物理世界 (CANNON.World)：物理世界模拟了所有的物理对象和事件，我们为其设置了重力。
为物体添加物理属性：通过 CANNON.Box 创建了立方体的物理形状并将其添加到物理世界中。地面使用 CANNON.Plane 创建。
同步物理与可视化：每一帧更新物理世界，并将物理引擎中的物体位置同步到 Three.js 中。

### 4. 添加力与碰撞

你可以为物体添加力，或者监听物体之间的碰撞事件。

代码示例：为物体添加力

```javascript
function addForce() {
  // 向立方体添加一个向上的力
  cubeBody.applyForce(new CANNON.Vec3(0, 10, 0), cubeBody.position);
}

setInterval(addForce, 1000); // 每秒钟给立方体添加一次力
```

代码示例：监听碰撞事件

```javascript
world.addEventListener('postStep', () => {
  if (cubeBody.position.y < 0) {
    console.log('The cube has hit the ground!');
  }
});
```

### 5. 总结

通过本教程，你已经学会了如何使用 Cannon.js 在 Three.js 场景中实现简单的物理模拟。你可以扩展这个示例，加入更多的物体，处理碰撞检测，或加入更复杂的物理效果。
