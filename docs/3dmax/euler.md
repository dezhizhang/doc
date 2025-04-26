# 基于 Three.js 实现 3D 数学欧拉角


> 大家好！我是 [数擎AI]，一位热爱探索新技术的前端开发者，在这里分享前端和Web3D、AI技术的干货与实战经验。如果你对技术有热情，欢迎关注我的文章，我们一起成长、进步！  
> **开发领域**：前端开发 | AI 应用 | Web3D | 元宇宙  
> **技术栈**：JavaScript、React、ThreeJs、WebGL、Go  
> **经验经验**：6 年+ 前端开发经验，专注于图形渲染和 AI 技术  
> **开源项目**：[AI简历](https://aint.top)、[晓智科技](https://xiaozhi.shop/)、[数擎科技](https://www.shuqin.cc/) 

## 1. 什么是欧拉角？

欧拉角是描述三维空间中物体旋转的三种角度表示方法。它由三个旋转角度组成，通常称为：

- **绕 X 轴的旋转角（Roll）**
- **绕 Y 轴的旋转角（Pitch）**
- **绕 Z 轴的旋转角（Yaw）**

在 Three.js 中，欧拉角通过 `THREE.Euler` 对象来实现。通过设置欧拉角的三个值，你可以控制物体在三维空间中的旋转。

## 2. 环境准备

首先，我们需要准备一个基本的 Three.js 环境。创建一个 HTML 文件，引用 Three.js 库，并设置一个简单的场景：

```bash
npm install three

```

## 3. 创建基本的 3D 场景

在 JavaScript 中，首先创建一个基本的 Three.js 场景、相机和渲染器：

```js
import * as THREE from 'three';

// 创建场景、相机和渲染器
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 创建一个立方体
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// 设置相机的位置
camera.position.z = 5;
```

## 4. 使用欧拉角旋转物体

为了旋转物体，我们可以使用 THREE.Euler 来设置物体的欧拉角。以下代码展示了如何通过欧拉角旋转立方体：

```js
// 创建一个欧拉角实例
const euler = new THREE.Euler(0, 0, 0, 'XYZ'); // 默认欧拉角：Roll, Pitch, Yaw

function animate() {
  requestAnimationFrame(animate);

  // 更新欧拉角（绕Y轴旋转）
  euler.y += 0.01; // 每次旋转一点

  // 应用欧拉角到立方体
  cube.rotation.setFromEuler(euler);

  // 渲染场景
  renderer.render(scene, camera);
}

animate();
```

解释：

- THREE.Euler(x, y, z, order) 用于创建一个新的欧拉角实例。x, y, z 是绕各轴旋转的角度（以弧度为单位）。order 是旋转顺序，可以是 'XYZ', 'YXZ', 'ZXY', 'ZYX', 'YXZ', 'ZXY' 等。

- cube.rotation.setFromEuler(euler) 将 euler 旋转应用到 cube 上。

- 在 animate 函数中，我们每次通过 euler.y += 0.01 旋转立方体一点，然后渲染新的帧。

## 5. 完整代码

```js
import * as THREE from 'three';

// 创建场景、相机和渲染器
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);
// 设置相机的位置
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 创建一个立方体
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// 创建一个有效的 THREE.Euler 实例
const euler = new THREE.Euler(0, 0, 0, 'XYZ'); // 'XYZ' 为旋转顺序

function animate() {
  requestAnimationFrame(animate);

  // 更新 euler 角度
  euler.y += 0.01; // 每次旋转一点（绕 Y 轴）

  //使用 setRotationFromEuler 方法正确地设置物体的旋转
  cube.setRotationFromEuler(euler);

  // 渲染场景
  renderer.render(scene, camera);
}

animate();
```

## 6. 总结

通过 THREE.Euler，你可以很方便地控制物体在三维空间中的旋转。利用欧拉角的三种旋转顺序，你可以实现复杂的旋转效果。通过修改 THREE.Euler 的参数，你可以调整物体的旋转角度，甚至可以根据需求进行动态旋转。
