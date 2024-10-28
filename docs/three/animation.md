# ThreeJs 中如何实现动画效果


> **开发领域**：前端开发 | AI 应用 | Web3D | 元宇宙  
> **技术栈**：JavaScript、React、ThreeJs、WebGL、Go  
> **经验经验**：6年+ 前端开发经验，专注于图形渲染和AI技术  
> **开源项目**：[github](https://github.com/dezhizhang) [晓智元宇宙](https://www.xiaozhi.shop/)、[数字孪生引擎](https://www.shuqin.cc/)、[前端面试题](https://fe.shuqin.cc/)   
> 大家好！我是 [晓智]，一位热爱探索新技术的前端开发者，在这里分享前端和Web3D、AI技术的干货与实战经验。如果你对技术有热情，欢迎关注我的文章，我们一起成长、进步！


在 ThreeJs 中，动画是创建动态 3D 场景的重要组成部分。本文将介绍如何使用 ThreeJs 实现基础的动画效果，包括物体的旋转、位置变化和简单的过渡动画。

## 一、创建基础场景

在开始动画之前，首先需要创建一个基础的 ThreeJs 场景。以下是一个简单的场景设置：

```javascript
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
```

## 二、添加几何体

接下来，我们将添加一个立方体，并使用基本的材质为其着色：

```js
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// 设置相机位置
camera.position.z = 5;
```

## 三、实现基础动画

### 1. 旋转动画

使用 requestAnimationFrame 创建一个渲染循环，在循环中更新立方体的旋转角度：

```js
function animate() {
  requestAnimationFrame(animate);

  // 更新立方体的旋转
  cube.rotation.x += 0.01; // 绕 x 轴旋转
  cube.rotation.y += 0.01; // 绕 y 轴旋转

  renderer.render(scene, camera);
}

animate();
```

### 2. 位置动画

除了旋转，你还可以通过改变物体的位置来实现动画效果。以下是一个示例，展示如何让立方体在上下移动：

```js
let direction = 1;

function animate() {
  requestAnimationFrame(animate);
  // 更新立方体的位置
  cube.position.y += 0.02 * direction; // 上下移动

  // 碰到边界反向移动
  if (cube.position.y > 2 || cube.position.y < -2) {
    direction *= -1; // 反向移动
  }
  renderer.render(scene, camera);
}

animate();
```

### 3. 过渡动画

如果想实现更复杂的过渡效果，可以使用简单的数学函数（如正弦函数）来平滑移动：

```js
let clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);

  const elapsedTime = clock.getElapsedTime(); // 获取经过的时间
  cube.position.y = Math.sin(elapsedTime) * 2; // 使用正弦函数实现上下波动

  renderer.render(scene, camera);
}

animate();
```

## 总结

在 ThreeJs 中实现基础的动画效果非常简单。通过使用 requestAnimationFrame 创建渲染循环，你可以轻松实现物体的旋转、位置变化和其他动画效果。掌握这些基础知识后，你可以进一步探索更复杂的动画技术，例如利用 Tween.js 进行平滑过渡，或结合物理引擎实现逼真的物理动画。
