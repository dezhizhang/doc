# 使用 Tween.js 在 Three.js 中实现动画效果


> **开发领域**：前端开发 | AI 应用 | Web3D | 元宇宙  
> **技术栈**：JavaScript、React、ThreeJs、WebGL、Go  
> **经验经验**：6 年+ 前端开发经验，专注于图形渲染和 AI 技术  
> **开源项目**：[AI智简未来](https://aint.top)、[晓智元宇宙](https://xiaozhi.shop/)、[数字孪生引擎](https://www.shuqin.cc/)  


在使用 Three.js 创建 3D 场景时，动画效果是非常重要的一部分。虽然 Three.js 本身提供了一些基础的动画支持，但与 [Tween.js](https://github.com/tweenjs/tween.js) 结合使用可以更灵活地控制动画过渡效果。本文将介绍如何在 Three.js 项目中集成 Tween.js 并实现一些基本的动画效果。

---

## 1. 什么是 Tween.js？
Tween.js 是一个轻量级的 JavaScript 库，专注于处理缓动动画。它通过插值算法，使数值从一个状态平滑过渡到另一个状态，非常适合应用于 Three.js 的对象属性动画。

---

## 2. 集成 Tween.js 到 Three.js 项目
首先，你需要安装 Tween.js。可以通过 npm 或直接引入脚本。

**通过 npm 安装：**
```bash
npm install @tweenjs/tween.js
```

CDN 引入：

```js
<script src="https://cdnjs.cloudflare.com/ajax/libs/tween.js/18.6.4/tween.umd.js"></script>
```
在项目中引入后，确保正确调用 TWEEN.update() 来更新动画状态。

## 3. 使用示例：移动一个立方体
以下代码演示了如何使用 Tween.js 实现立方体从一个位置平滑移动到另一个位置。

```javascript
import * as THREE from 'three';
import { TWEEN } from '@tweenjs/tween.js';

// 初始化场景、相机和渲染器
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 创建一个立方体
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// 设置相机位置
camera.position.z = 5;

// 创建 Tween 动画
const start = { x: 0, y: 0, z: 0 };
const end = { x: 2, y: 2, z: 2 };

const tween = new TWEEN.Tween(start)
  .to(end, 2000) // 动画持续 2 秒
  .easing(TWEEN.Easing.Quadratic.Out) // 使用缓动函数
  .onUpdate(() => {
    cube.position.set(start.x, start.y, start.z);
  })
  .start();

// 渲染循环
function animate() {
  requestAnimationFrame(animate);
  TWEEN.update(); // 更新 Tween.js 动画
  renderer.render(scene, camera);
}

animate();
```
## 4. 关键代码解析
创建 Tween 实例：

```javascript
const tween = new TWEEN.Tween(start)
  .to(end, 2000)
  .easing(TWEEN.Easing.Quadratic.Out)
  .onUpdate(() => {
    cube.position.set(start.x, start.y, start.z);
  })
  .start();
```
start 和 end 是动画的初始值和目标值。
easing 设置缓动函数，定义动画的速度曲线。
onUpdate 回调中更新立方体的位置。
调用 TWEEN.update()： 必须在渲染循环中调用 TWEEN.update()，以确保动画按帧更新。

## 5. 扩展：旋转和缩放动画
除了移动，Tween.js 还可以轻松实现旋转和缩放动画。以下是一个简单的示例：

```javascript
const scaleStart = { scale: 1 };
const scaleEnd = { scale: 2 };

const scaleTween = new TWEEN.Tween(scaleStart)
  .to(scaleEnd, 1500)
  .easing(TWEEN.Easing.Elastic.Out)
  .onUpdate(() => {
    cube.scale.set(scaleStart.scale, scaleStart.scale, scaleStart.scale);
  })
  .start();
```
## 6. 总结
通过结合 Three.js 和 Tween.js，可以快速实现各种平滑动画效果，并且 Tween.js 提供了丰富的缓动函数和事件回调，使得动画的定制性极强。你可以尝试将动画应用到场景中的相机、光源或其他对象上，创造更加生动的 3D 体验！

## 关注作者
<div align="center">数擎AI公众号</div>
<div align="center"> <img src="https://cdn.shuqin.cc/aint/assets/weixin.svg" width = 300 height = 300 /> </div>


