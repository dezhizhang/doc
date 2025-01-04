# 深入了解 Three.js 几何体的基础与应用

> **开发领域**：前端开发 | AI 应用 | Web3D | 元宇宙  
> **技术栈**：JavaScript、React、ThreeJs、WebGL、Go  
> **经验经验**：6年+ 前端开发经验，专注于图形渲染和AI技术  
> **开源项目**：[智简未来](https://aint.top)、[晓智元宇宙](https://xiaozhi.shop/)、[数字孪生引擎](https://www.shuqin.cc/)   
> 大家好！我是 [晓智]，一位热爱探索新技术的前端开发者，在这里分享前端和Web3D、AI技术的干货与实战经验。如果你对技术有热情，欢迎关注我的文章，我们一起成长、进步！


**Three.js** 是一个基于 WebGL 的 JavaScript 庋，它使得开发者能够在网页上轻松创建和显示 3D 图形。Three.js 提供了丰富的几何体支持，帮助开发者快速构建 3D 场景。本文将深入探讨 Three.js 中的几何体基础，介绍常用的几何体类型，并探讨它们在实际项目中的应用。

## 什么是几何体？

在 3D 图形中，几何体（Geometry）是构成场景中物体形状的基本元素。它通常由顶点（Vertex）、边（Edge）和面（Face）组成。Three.js 提供了许多内置的几何体类，可以帮助开发者快速构建各种形状的物体，而无需手动定义每个顶点的位置。

## 常见的几何体

### 1. 立方体（BoxGeometry）

立方体是最简单的三维形状之一，通常用来表示房间、建筑物、家具等物体。在 Three.js 中，`BoxGeometry` 用于创建一个长、宽、高都可以调整的立方体或矩形框架。

```javascript
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);
```

这个代码创建了一个边长为 1 的立方体，使用了绿色的基础材质。通过调整 BoxGeometry 的参数，开发者可以改变立方体的长、宽、高。

2. 球体（SphereGeometry）
球体是另外一个常用的几何体，在 Three.js 中用来创建圆形或球形物体。SphereGeometry 可以通过调整半径、经纬线数和环带数来控制球体的细节。

```javascript
const geometry = new THREE.SphereGeometry(1, 32, 32);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);
```
这里的 32 表示球体的经纬线数量，增加细节会使球体更加光滑，但也会增加计算量。

### 3. 平面（PlaneGeometry）
PlaneGeometry 用于创建一个平面，广泛应用于地面、背景等场景。它是由两个维度的顶点组成，适用于场景中的简单表面。

```javascript
const geometry = new THREE.PlaneGeometry(5, 5);
const material = new THREE.MeshBasicMaterial({ color: 0x0000ff, side: THREE.DoubleSide });
const plane = new THREE.Mesh(geometry, material);
scene.add(plane);
```
通过调整平面的尺寸（宽度和高度），可以创建不同大小的平面。

### 4. 圆环（RingGeometry）
圆环用于表示一个有内半径和外半径的环形区域。它适用于创建类似于环形跑道、钟表的表盘等物体。

```javascript
const geometry = new THREE.RingGeometry(1, 3, 32);
const material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
const ring = new THREE.Mesh(geometry, material);
scene.add(ring);
```
这里的 1 和 3 分别是内半径和外半径，32 是环的段数，越大则环的曲线越平滑。

### 5. 圆柱体（CylinderGeometry）
圆柱体是另一个常见的几何体，常用于表示柱子、瓶子、管道等。CylinderGeometry 允许开发者指定底面和顶面的半径以及高度。

```javascript
const geometry = new THREE.CylinderGeometry(1, 1, 5, 32);
const material = new THREE.MeshBasicMaterial({ color: 0x00ffff });
const cylinder = new THREE.Mesh(geometry, material);
scene.add(cylinder);
```
1 是圆柱体底面和顶面的半径，5 是高度，32 是圆周的分段数。

自定义几何体
除了这些常用的几何体，Three.js 还允许开发者创建自定义的几何体。通过 BufferGeometry 和 Float32Array，开发者可以手动指定每个顶点的位置，从而构建任意复杂的几何形状。

```javascript

const geometry = new THREE.BufferGeometry();
const vertices = new Float32Array([
   0, 1, 0,
  -1, -1, 0,
   1, -1, 0
]);
geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
const material = new THREE.MeshBasicMaterial({ color: 0xff00ff });
const customShape = new THREE.Mesh(geometry, material);
scene.add(customShape);
```
上述代码创建了一个简单的三角形。BufferGeometry 允许更高效的顶点数据存储，尤其适用于复杂的几何体。

## 几何体的应用场景
Three.js 提供的几何体可以广泛应用于各种 3D 应用中：

建筑和室内设计：通过使用 BoxGeometry、CylinderGeometry 等几何体，开发者可以快速构建建筑物、家具等 3D 模型。
游戏开发：在游戏开发中，常常用这些几何体来构建地形、角色模型和环境物体。
数据可视化：几何体可以用于表示不同的统计数据，例如通过 SphereGeometry 展示数据点、通过 PlaneGeometry 展示地图等。
虚拟现实（VR）和增强现实（AR）：在 VR 和 AR 应用中，常常使用这些基础几何体作为场景中的物理元素，如按钮、工具等交互对象。
## 总结
Three.js 的几何体是 3D 场景的基础构建模块，通过合理组合和变换这些几何体，我们可以创建出丰富多样的三维世界。无论是通过内置的几何体快速构建简单模型，还是通过自定义几何体实现更复杂的形状，Three.js 都为开发者提供了极大的灵活性。在未来的 3D 网页设计和应用开发中，掌握这些几何体的使用，将帮助你更高效地实现各种创意和功能。

## 关注作者

<div align="center">数擎AI公众号</div>
<div align="center"> <img src="https://cdn.shuqin.cc/aint/assets/weixin.svg" width = 300 height = 300 /> </div>