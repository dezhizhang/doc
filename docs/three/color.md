# 深入理解 Three.js 顶点颜色数据

> **开发领域**：前端开发 | AI 应用 | Web3D | 元宇宙  
> **技术栈**：JavaScript、React、ThreeJs、WebGL、Go  
> **经验经验**：6 年+ 前端开发经验，专注于图形渲染和 AI 技术  
> **开源项目**：[智简未来](https://aint.top)、[晓智元宇宙](https://xiaozhi.shop/)、[数字孪生引擎](https://www.shuqin.cc/)  
> 大家好！我是 [晓智]，一位热爱探索新技术的前端开发者，在这里分享前端和 Web3D、AI 技术的干货与实战经验。如果你对技术有热情，欢迎关注我的文章，我们一起成长、进步！

**Three.js** 是一个强大的 JavaScript 库，允许开发者在网页上渲染 3D 图形。在 Three.js 中，顶点颜色数据是非常重要的概念，它能够帮助我们为 3D 对象的每个顶点分配独立的颜色，从而创建更加丰富的视觉效果和动态的着色效果。在本文中，我们将深入探讨如何使用 Three.js 来处理顶点颜色数据，包括其基本概念、实现方法以及应用场景。

## 什么是顶点颜色？

在计算机图形学中，顶点颜色是一种在 3D 模型的每个顶点上存储颜色信息的方法。这些颜色信息可以在渲染时被用来为模型的表面着色，通常与材质和光照相结合，提供更细腻的视觉效果。

顶点颜色的优势在于它使得开发者能够控制模型的每个顶点的颜色，而不是统一的面片颜色。通过这种方式，顶点之间的颜色过渡可以更加平滑，尤其适用于渐变效果、颜色动画以及需要细节控制的场景。

## 如何在 Three.js 中使用顶点颜色

### 1. 创建一个带有顶点颜色的几何体

要在 Three.js 中使用顶点颜色，我们通常需要通过 `BufferGeometry` 来创建几何体，并通过 `BufferAttribute` 来传递顶点颜色数据。下面是一个简单的示例，展示如何为一个三角形设置顶点颜色。

```javascript
// 创建一个 BufferGeometry 实例
const geometry = new THREE.BufferGeometry();

// 定义三角形的顶点坐标
const vertices = new Float32Array([
  0,1,0, // 顶点 1
  -1,-1,0, // 顶点 2
  1,-1,0, // 顶点 3
]);

// 为几何体设置位置属性
geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));

// 定义顶点颜色（每个顶点的颜色）
const colors = new Float32Array([
  1,0,0, // 顶点 1 的颜色: 红色
  0,1,0, // 顶点 2 的颜色: 绿色
  0,0,1, // 顶点 3 的颜色: 蓝色
]);

// 为几何体设置颜色属性
geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

// 创建一个基础材质并启用顶点颜色
const material = new THREE.MeshBasicMaterial({
  vertexColors: THREE.VertexColors, // 启用顶点颜色
});

// 创建一个 Mesh 实例，并将几何体和材质应用到其中
const mesh = new THREE.Mesh(geometry, material);

// 将网格添加到场景中
scene.add(mesh);
```

在这个例子中，我们定义了一个三角形并为其每个顶点指定了不同的颜色。我们通过 BufferAttribute 来设置顶点位置和颜色，最后通过 MeshBasicMaterial 材质启用顶点颜色（vertexColors: THREE.VertexColors）。

### 2. 渲染顶点颜色

在 Three.js 中，渲染顶点颜色时，我们通常会使用材质的 vertexColors 属性来告诉 Three.js 使用每个顶点的颜色信息来渲染模型。在上述示例中，MeshBasicMaterial 的 vertexColors 设置为 THREE.VertexColors，这告诉 Three.js 在渲染时使用顶点的颜色而不是统一的面片颜色。

### 3. 动态修改顶点颜色

顶点颜色不仅可以在初始化时设置，也可以在后期进行动态修改。通过修改几何体的颜色数据，我们可以在动画中动态改变模型的颜色。这对于实现一些动态效果（如渐变、光照影响等）非常有用。

```javascript
// 修改顶点颜色数据
const updatedColors = new Float32Array([
  1,1,0, // 顶点 1 的颜色: 黄色
  0,1,1, // 顶点 2 的颜色: 青色
  1,0,1, // 顶点 3 的颜色: 品红色
]);

// 更新颜色属性
geometry.attributes.color.array = updatedColors;
geometry.attributes.color.needsUpdate = true; // 通知 Three.js 颜色数据已更新
```

通过这种方式，我们可以在动画中动态更改顶点颜色，实现例如颜色渐变、材质效果等。

顶点颜色的应用场景

#### 渐变效果

顶点颜色常用于创建平滑的渐变效果。例如，在物体表面上，顶点的颜色可以随着光照变化、摄像机位置变化而变化。使用顶点颜色可以避免大面积的材质贴图，使得效果更加自然流畅。

例如，想要给一个球体表面应用渐变色，可以通过设置球体每个顶点的颜色来实现不同的颜色过渡。

#### 动态效果

动态修改顶点颜色数据可以用来实现许多交互性强的效果。例如，在一个 3D 游戏中，随着角色的移动或者物体的旋转，可以动态改变物体表面颜色来增加视觉吸引力。

这种效果可以广泛应用于视觉化表现、实时渲染等领域，如数据可视化中的实时变化、3D Web 动画等。

#### 物体高亮和选择状态

通过使用顶点颜色，我们可以轻松地改变物体的颜色来表示状态。例如，在 3D 网页应用中，当用户鼠标悬停在某个物体上时，可以通过更改顶点颜色来高亮显示该物体。

#### 网格细节和着色控制

对于需要精确控制每个顶点的颜色的场景，顶点颜色提供了一种灵活的解决方案。在低多边形模型中，开发者可以为每个顶点指定独特的颜色，从而增加更多的细节而不需要复杂的贴图。

## 总结

Three.js 的顶点颜色功能为开发者提供了更高效、更灵活的方式来渲染和着色 3D 模型。通过控制每个顶点的颜色，开发者能够实现丰富的渐变效果、动态视觉效果和交互式场景。无论是在静态渲染、动画效果还是数据可视化中，顶点颜色都能发挥重要作用。掌握顶点颜色的使用技巧将极大提升你的 3D 开发能力，让你的项目更加生动和引人注目。

## 关注作者

<div align="center">数擎AI公众号</div>
<div align="center"> <img src="https://cdn.shuqin.cc/aint/assets/weixin.svg" width = 300 height = 300 /> </div>
