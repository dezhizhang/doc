# 探索 Three.js 中的射线（Raycasting）


> 大家好！我是 [数擎AI]，一位热爱探索新技术的前端开发者，在这里分享前端和Web3D、AI技术的干货与实战经验。如果你对技术有热情，欢迎关注我的文章，我们一起成长、进步！
> **开发领域**：前端开发 | AI 应用 | Web3D | 元宇宙  
> **技术栈**：JavaScript、React、ThreeJs、WebGL、Go  
> **经验经验**：6 年+ 前端开发经验，专注于图形渲染和 AI 技术  
> **开源项目**：[AI智简未来](https://aint.top)、[晓智元宇宙](https://xiaozhi.shop/)、[数字孪生引擎](https://www.shuqin.cc/)  



射线（Raycasting）是 Three.js 中一个非常强大且常用的功能。它可以用来检测鼠标与场景中的对象交互、实现碰撞检测等功能。在这篇文章中，我们将详细介绍射线的概念、如何使用它，以及一些实际应用场景。


## 1. 什么是射线？

在计算机图形学中，射线（Ray）可以看作是一条从某个起点沿着特定方向无限延伸的直线。在 Three.js 中，射线用于检测这条直线是否与场景中的对象相交，以及相交的具体位置。


## 2. Raycaster 类

Three.js 提供了 `THREE.Raycaster` 类来实现射线功能。`Raycaster` 的主要功能是检测射线和场景中的物体是否相交，并返回相交的结果。

### **Raycaster 的主要属性和方法**：

- **属性**：

  - `ray`: 表示射线的起点和方向。
  - `near`: 检测的最近距离，默认值为 0。
  - `far`: 检测的最远距离，默认值为无限大。

- **方法**：
  - `set(origin, direction)`: 设置射线的起点和方向。
  - `intersectObject(object, recursive)`: 检测射线与单个对象的相交情况。
  - `intersectObjects(objects, recursive)`: 检测射线与多个对象的相交情况。


## 3. 基本用法

以下是一个使用 `Raycaster` 实现鼠标与物体交互的完整示例：

### 示例代码

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
camera.position.set(0, 0, 5);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 创建一个立方体
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// 创建射线
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

// 监听鼠标事件
window.addEventListener('mousemove', (event) => {
  // 将鼠标位置转换为标准化设备坐标（-1 到 1）
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  // 更新射线
  raycaster.setFromCamera(mouse, camera);

  // 检测射线与物体的交互
  const intersects = raycaster.intersectObject(cube);

  // 如果射线与物体相交，改变物体颜色
  if (intersects.length > 0) {
    cube.material.color.set(0xff0000); // 红色
  } else {
    cube.material.color.set(0x00ff00); // 绿色
  }
});

// 渲染循环
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();
```

## 3 4. 重要概念解析

### 1. 标准化设备坐标 (NDC)

鼠标的位置需要从屏幕坐标转换为 -1 到 1 之间的标准化设备坐标 (Normalized Device Coordinates)，这样才能与射线结合使用。

```javascript
mouse.x = (event.clientX / window.innerWidth) _ 2 - 1;
mouse.y = -(event.clientY / window.innerHeight) _ 2 + 1;
```

### 2. setFromCamera 方法

raycaster.setFromCamera(mouse, camera) 是将鼠标在标准化设备坐标中的位置与摄像机结合，生成一条从摄像机发出的射线。

### 3. 相交检测

raycaster.intersectObject 和 raycaster.intersectObjects 是检测射线是否与物体相交的核心方法，返回相交结果的数组：

每个结果包含：
distance: 射线起点到交点的距离。
point: 交点的世界坐标。
object: 被射线击中的对象。

## 5. 应用场景

鼠标拾取（Mouse Picking） 射线可以检测鼠标与场景中的物体是否相交，用于实现点击或悬停交互。

碰撞检测 使用射线检测物体之间是否相交，用于实现物体的碰撞处理。

路径规划 在导航算法中，用射线检测路径上的障碍物。

激光效果 模拟激光或子弹的轨迹，利用射线检测命中目标。

## 6. 注意事项

性能优化

尽量减少需要检测的对象数量。
使用分层检测（例如将场景中的物体分组，只检测目标组）。
递归选项 当检测对象有子对象时，可以将 recursive 参数设置为 true，以确保检测包括子对象。

相机方向 射线的方向与摄像机视角相关，因此需确保摄像机位置和方向正确设置。

### 7. 总结

射线（Raycasting）是 Three.js 中一个强大的工具，广泛应用于交互、碰撞检测和路径规划等场景。通过灵活使用 Raycaster，可以轻松实现与场景中物体的精确交互。掌握它可以大幅提升你的 Three.js 项目能力！

## 关注作者
<div align="center">数擎AI公众号</div>
<div align="center"> <img src="https://cdn.shuqin.cc/aint/assets/weixin.svg" width = 300 height = 300 /> </div>
