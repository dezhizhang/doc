# Three.js 中的 Raycaster


> **开发领域**：前端开发 | AI 应用 | Web3D | 元宇宙  
> **技术栈**：JavaScript、React、ThreeJs、WebGL、Go  
> **经验经验**：6年+ 前端开发经验，专注于图形渲染和AI技术  
> **开源项目**：[智简未来](https://aint.top)、[晓智元宇宙](https://xiaozhi.shop/)、[数字孪生引擎](https://www.shuqin.cc/)   
> 大家好！我是 [晓智]，一位热爱探索新技术的前端开发者，在这里分享前端和Web3D、AI技术的干货与实战经验。如果你对技术有热情，欢迎关注我的文章，我们一起成长、进步！


在 Three.js 中，`Raycaster` 是一个非常重要的类，用于执行射线检测（Raycasting）。射线检测通常用于判断物体是否被点击、拖拽，或者与某个区域发生交互。它广泛应用于游戏开发、交互式应用、虚拟现实（VR）和增强现实（AR）等领域。

## 1. 什么是 Raycasting？

Raycasting 是一种通过沿着一条射线进行检测来找到与之相交的对象的技术。简单来说，射线是从一个点出发，沿某个方向无限延伸的线。Raycaster 的作用就是发射这样的一条射线，并检测它与场景中的物体的交点。Raycasting 的应用非常广泛，比如点击事件检测、物体间碰撞检测、鼠标悬停效果等。

## 2. Raycaster 的基本原理

`Raycaster` 基于射线和几何体之间的相交检测。在 Three.js 中，射线是通过 `Ray` 类来表示的，而 `Raycaster` 类负责发射射线并检查与场景中物体的交集。`Raycaster` 可以与任何可交互的物体（如网格、平面、球体等）进行相交检测，并返回射线与物体的交点。

## 3. 创建 Raycaster

在 Three.js 中使用 `Raycaster` 非常简单，只需创建一个新的 `Raycaster` 实例并指定射线的原点和方向。示例如下：

```javascript
// 创建一个新的 Raycaster 实例
const raycaster = new THREE.Raycaster();

// 设置射线的原点和方向
const origin = new THREE.Vector3(0, 0, 0); // 射线起点
const direction = new THREE.Vector3(0, 0, -1); // 射线方向

// 通过原点和方向设置 Ray
raycaster.ray.origin.copy(origin);
raycaster.ray.direction.copy(direction);
```

在上述代码中，我们首先创建了一个 Raycaster 对象。然后，设置了射线的原点和方向。

## 4. 使用 Raycaster 进行交互检测

常见的使用场景是，检测用户的鼠标是否点击了某个物体。在 Three.js 中，可以通过 Raycaster 来检测鼠标点击的物体。以下是一个常见的鼠标点击检测示例：

步骤：
获取鼠标在屏幕上的坐标。
将屏幕坐标转换为三维空间中的射线。
使用 Raycaster 检查射线是否与物体相交。

```javascript
// 创建一个 Raycaster 和一个空数组来存储交点
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2(); // 用于存储鼠标位置
const intersects = [];

// 监听鼠标点击事件
window.addEventListener('click', (event) => {
  // 获取鼠标位置
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  // 更新射线的方向
  raycaster.updateMatrixWorld(); // 更新世界矩阵
  raycaster.setFromCamera(mouse, camera); // 从相机和鼠标位置创建射线

  // 获取与场景中物体的交点
  const intersects = raycaster.intersectObjects(scene.children);

  // 如果有交点，执行相关操作
  if (intersects.length > 0) {
    console.log('点击了物体: ', intersects[0].object);
  }
});
```

在上述代码中，我们首先通过 event.clientX 和 event.clientY 获取鼠标点击的位置，并将其转换为标准化的屏幕坐标系。接着，我们调用 raycaster.setFromCamera() 方法生成射线，并使用 raycaster.intersectObjects() 来检测与场景中物体的交点。

## 5. 常用 Raycaster 方法

Raycaster 类提供了几个常用的方法来执行射线检测：

setFromCamera(mouse, camera)：根据鼠标位置和相机创建射线。
intersectObject(object)：检测射线与单个物体的交点。
intersectObjects(objects, recursive)：检测射线与多个物体的交点。

## 6. 性能优化

射线检测可以比较消耗性能，尤其是在场景中有很多物体时。以下是一些常见的优化方法：

层级管理：只对用户可能交互的物体进行检测，避免对整个场景中的所有物体进行检测。
射线范围：限制射线的有效范围，减少计算量。
缓存：缓存一些常用的检测对象，避免每次都重新计算。

## 7. 结论

Raycaster 是 Three.js 中实现交互的关键工具，通过射线检测，我们可以实现点击、拖拽、物体选中等功能。掌握 Raycaster 的使用，能够让你的 3D 应用更加互动和富有趣味。

## 关注作者

<div align="center">数擎AI公众号</div>
<div align="center"> <img src="https://cdn.shuqin.cc/aint/assets/weixin.svg" width = 300 height = 300 /> </div>