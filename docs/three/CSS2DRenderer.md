# 深入了解 Three.js 中的 CSS2DRenderer

> **开发领域**：前端开发 | AI 应用 | Web3D | 元宇宙  
> **技术栈**：JavaScript、React、ThreeJs、WebGL、Go  
> **经验经验**：6年+ 前端开发经验，专注于图形渲染和AI技术  
> **开源项目**：[AI智简未来](https://aint.top)、[晓智元宇宙](https://xiaozhi.shop/)、[数字孪生引擎](https://www.shuqin.cc/)   
> 大家好！我是 [晓智]，一位热爱探索新技术的前端开发者，在这里分享前端和Web3D、AI技术的干货与实战经验。如果你对技术有热情，欢迎关注我的文章，我们一起成长、进步！


在 Three.js 中，渲染器（Renderer）是负责将场景（Scene）中的物体（Objects）绘制到屏幕上的核心组件。除了常见的 WebGLRenderer，Three.js 还提供了 CSS2DRenderer 作为一种独特的渲染器，它允许我们在 3D 场景中渲染 HTML 元素，常常用于创建与场景中的物体相关的 2D 标签、注释、UI 等。

本文将介绍 CSS2DRenderer 的基本概念、如何使用它以及它的优缺点。

## 什么是 CSS2DRenderer？

CSS2DRenderer 是 Three.js 中的一种渲染器，它允许我们在 Three.js 的 3D 场景中渲染 HTML 元素。这些 HTML 元素通常是常见的 DOM 元素，如 `div`、`span`、`p` 等，可以被定位并应用 CSS 样式，而不像 WebGLRenderer 那样直接渲染 3D 图形。

## CSS2DRenderer 的应用场景

CSS2DRenderer 通常用于以下场景：

- **场景中的标签和注释**：你可以在 3D 模型周围渲染 HTML 标签，作为模型的标注或注释。例如，你可以在每个模型的上方显示文本或图标，表示物体的名称、状态或其他信息。
- **UI 元素的渲染**：在 Three.js 渲染的 3D 场景中放置 HTML 表单、按钮、菜单等 UI 元素。
- **与 3D 物体交互**：你可以将 2D UI 元素与 3D 物体关联起来，使得 UI 随着 3D 场景中的物体一起移动和旋转。

## 如何使用 CSS2DRenderer

### 安装 Three.js

首先，我们需要在项目中安装 Three.js。如果你还没有安装它，可以通过以下方式进行安装：

```bash
npm install three
```

## 初始化 CSS2DRenderer

CSS2DRenderer 是 Three.js 的一个渲染器，创建和使用它的方式与 WebGLRenderer 类似。以下是一个简单的示例，展示如何在 Three.js 场景中使用 CSS2DRenderer 渲染 HTML 元素。

```js
import * as THREE from 'three';

// 创建场景
const scene = new THREE.Scene();

// 创建相机
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);

// 创建 WebGLRenderer 渲染器
const renderer = new THREE.WebGLRenderer();
document.body.appendChild(renderer.domElement);

// 创建 CSS2DRenderer 渲染器
const cssRenderer = new THREE.CSS2DRenderer();
cssRenderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(cssRenderer.domElement);

// 创建一个简单的 3D 物体
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// 创建一个 HTML 元素（标签）
const div = document.createElement('div');
div.className = 'label';
div.textContent = 'Hello, World!';
div.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
div.style.padding = '5px';
div.style.color = 'white';
div.style.fontSize = '16px';
div.style.borderRadius = '3px';

// 创建一个 2D 物体来渲染 HTML 元素
const label = new THREE.CSS2DObject(div);
label.position.set(0, 1, 0); // 将标签放在立方体上方
cube.add(label);

// 调整相机位置
camera.position.z = 5;

// 渲染函数
function animate() {
  requestAnimationFrame(animate);

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  renderer.render(scene, camera); // 渲染 WebGL 场景
  cssRenderer.render(scene, camera); // 渲染 CSS2D 元素
}

animate();
```

## 解释代码

WebGLRenderer 与 CSS2DRenderer： 我们创建了两个渲染器：WebGLRenderer 用于渲染 3D 场景，CSS2DRenderer 用于渲染 2D HTML 元素。CSS2DRenderer 会在 HTML 页面上覆盖 div 元素，而不是直接绘制到画布上。

CSS2DObject： CSS2DObject 是一个特殊的对象，它允许你将 HTML 元素（例如 div）与 Three.js 物体进行关联。在上面的示例中，我们创建了一个 div 元素并将其放置在立方体的上方，作为标签。

渲染： 在 animate 函数中，我们分别调用了 WebGLRenderer 和 CSS2DRenderer 的 render 方法，确保既渲染 3D 场景，又渲染 2D 标签。

## CSS2DRenderer 的优缺点

### 优点

与 HTML 元素结合：CSS2DRenderer 使得将 HTML 元素嵌入到 3D 场景中变得非常简单，可以利用 CSS 来控制它们的样式和布局。
灵活的样式控制：由于渲染的元素是 HTML 元素，可以通过传统的 CSS 样式进行高度定制（例如文字、背景色、字体等）。
无需额外的渲染技术：它不依赖于 WebGL，因此可以减少一些图形渲染的复杂性，并且直接利用浏览器的渲染机制。

### 缺点

性能问题：每个 CSS 元素都依赖于 DOM 和浏览器的布局引擎，渲染大量的 HTML 元素可能会导致性能下降，尤其是在复杂场景中。
无法实现 3D 渲染效果：由于它依赖于 2D DOM 元素，因此无法像 WebGL 渲染器那样实现 3D 渲染效果。无法对 HTML 元素应用深度、光照、阴影等 3D 特效。

## 结论

CSS2DRenderer 是 Three.js 提供的一个有用工具，适用于将 HTML 元素（如标签、按钮、UI 元素等）集成到 3D 场景中。它的使用简单且灵活，非常适合需要在 3D 场景中动态显示注释、标签或其他 2D 元素的应用场景。然而，由于它依赖于浏览器的 DOM 引擎，性能可能会成为一个限制因素，特别是在渲染大量 2D 元素时。

如果你需要在 Three.js 中同时处理 3D 和 2D 元素，CSS2DRenderer 提供了一个非常方便的解决方案。


## 关注作者

<div align="center">数擎AI公众号</div>
<div align="center"> <img src="https://cdn.shuqin.cc/aint/assets/weixin.svg" width = 300 height = 300 /> </div>
