# Three.js 中的包围盒（Bounding Box）

> **开发领域**：前端开发 | AI 应用 | Web3D | 元宇宙  
> **技术栈**：JavaScript、React、ThreeJs、WebGL、Go  
> **经验经验**：6年+ 前端开发经验，专注于图形渲染和AI技术  
> **开源项目**：[智简未来](https://aint.top)、[晓智元宇宙](https://xiaozhi.shop/)、[数字孪生引擎](https://www.shuqin.cc/)   
> 大家好！我是 [晓智]，一位热爱探索新技术的前端开发者，在这里分享前端和Web3D、AI技术的干货与实战经验。如果你对技术有热情，欢迎关注我的文章，我们一起成长、进步！



在 Three.js 中，包围盒（Bounding Box）是一个非常重要的概念，广泛用于碰撞检测、物体可见性测试、物体选择和物体在场景中的定位等操作。包围盒是一个简单的几何形状，通常用来包裹复杂的物体模型。它帮助我们快速计算物体的位置、大小，甚至判断物体是否与其他物体发生交互。

## 1. 什么是包围盒？

包围盒通常是一个简单的矩形或立方体，它最小化了包含物体所需的空间。包围盒的核心目的是提供一个快速计算物体空间占用的方式，不需要处理复杂的几何形状。包围盒可以分为以下两种类型：

- **轴对齐包围盒（AABB，Axis-Aligned Bounding Box）**：包围盒的边与坐标轴平行。
- **最小包围盒（OBB，Oriented Bounding Box）**：包围盒的边不一定与坐标轴平行，它能够更紧密地包围物体。

在 Three.js 中，我们常用的是 **轴对齐包围盒（AABB）**。

## 2. 包围盒的作用

包围盒在 Three.js 中的主要用途包括：

- **碰撞检测**：通过检查物体的包围盒是否相交来判断物体是否发生碰撞。
- **物体选择**：通过检测鼠标点击是否落在包围盒内来判断物体是否被选中。
- **物体可见性判断**：检测物体的包围盒是否在视锥体内，进而判断物体是否需要渲染。
- **物体定位**：帮助确定物体的位置和大小，进行位置调整或变换。

## 3. 如何在 Three.js 中创建和使用包围盒

### 3.1 创建包围盒

在 Three.js 中，`Box3` 类用于表示一个包围盒，它是一个三维空间中的轴对齐包围盒。包围盒通常由两个点定义：最小点和最大点。这两个点分别表示包围盒的对角线上的两个角。

```javascript
// 创建一个空的 Box3（包围盒）
const box = new THREE.Box3();

// 计算物体的包围盒
box.setFromObject(object);
```

在上述代码中，我们首先创建了一个空的 Box3 实例。然后，通过 setFromObject() 方法计算出物体的包围盒。这会自动根据物体的几何体和变换来计算包围盒。

### 3.2 获取包围盒的属性

Box3 类提供了许多方法，可以帮助我们操作和查询包围盒的属性：

getSize()：获取包围盒的大小（即宽度、高度和深度）。
getCenter()：获取包围盒的中心位置。
containsPoint()：判断一个点是否在包围盒内。
intersectsBox()：判断两个包围盒是否相交。
isEmpty()：检查包围盒是否为空。

```javascript
// 获取包围盒的中心和大小
const size = box.getSize(new THREE.Vector3());
const center = box.getCenter(new THREE.Vector3());

// 判断一个点是否在包围盒内
const point = new THREE.Vector3(1, 2, 3);
const isInside = box.containsPoint(point);

// 判断两个包围盒是否相交
const anotherBox = new THREE.Box3(
  new THREE.Vector3(-1, -1, -1),
  new THREE.Vector3(1, 1, 1),
);
const isIntersecting = box.intersectsBox(anotherBox);
```

### 3.3 更新包围盒

包围盒是随着物体的变换（如旋转、平移和缩放）而变化的。如果物体的几何体发生了变化（例如形状改变或位置改变），我们需要重新计算包围盒。可以通过以下方式更新包围盒：

```javascript
// 更新包围盒
box.setFromObject(object);
```

每次物体的变换后，我们调用 setFromObject() 来重新计算物体的包围盒。

### 3.4 包围盒与鼠标交互

在一些交互式应用中，包围盒用于检测物体是否被选中。例如，点击物体时，我们可以通过包围盒来判断鼠标是否位于物体的范围内。

```js
// 监听鼠标点击事件
window.addEventListener('click', (event) => {
  // 获取鼠标位置
  const mouse = new THREE.Vector2();
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  // 更新射线
  raycaster.setFromCamera(mouse, camera);

  // 获取与物体的交点
  const intersects = raycaster.intersectObject(object);

  if (intersects.length > 0) {
    console.log('点击了物体！');
  }
});
```

在这个示例中，我们使用了射线检测来判断鼠标是否点击了物体。当点击事件发生时，我们获取鼠标的位置，并通过射线检测来判断射线是否与物体的包围盒相交，从而确定是否选中物体。

## 4. 性能优化

包围盒在物体多、场景复杂时，可以显著提高性能，特别是在碰撞检测和物体选择时。包围盒相对较简单，计算起来非常高效。为了进一步优化性能，我们可以：

分层管理包围盒：对于复杂场景，可以将物体分成不同的层级，只对可能交互的层级进行包围盒检测。
定期更新包围盒：如果物体的变换（如位置、旋转等）频繁更新，可以定期重新计算包围盒，而不是每次变换后都立即计算。

## 5. 结论

包围盒是 Three.js 中用于进行高效空间计算和交互的关键工具。它广泛应用于碰撞检测、物体选择、视锥体剔除等领域，能够显著提高性能并优化计算。在 Three.js 开发中掌握包围盒的使用，将有助于构建更加高效、互动性强的 3D 应用。

## 关注作者

<div align="center">数擎AI公众号</div>
<div align="center"> <img src="https://cdn.shuqin.cc/aint/assets/weixin.svg" width = 300 height = 300 /> </div>
