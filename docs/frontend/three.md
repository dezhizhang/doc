# Three.js 快速入门：构建你的第一个 3D 应用

> **开发领域**：前端开发 | AI 应用 | Web3D | 元宇宙  
> **技术栈**：JavaScript、React、Three.js、WebGL、Go  
> **经验经验**：6年+ 前端开发经验，专注于图形渲染和AI技术  
> **开源项目**：[github](https://github.com/dezhizhang) [晓智元宇宙](https://www.xiaozhi.shop/)、[数字孪生引擎](https://www.shuqin.cc/)、[前端面试题](https://fe.shuqin.cc/)   
> 大家好！我是 [晓智]，一位热爱探索新技术的前端开发者，在这里分享前端和Web3D、AI技术的干货与实战经验。如果你对技术有热情，欢迎关注我的文章，我们一起成长、进步！



随着网页和应用对视觉效果要求的提高，3D 图形在前端开发中的应用越来越普遍。Three.js 是一种用于在浏览器中构建 3D 图形的 JavaScript 库，它封装了 WebGL，简化了 3D 图形的创建流程。本文将带你快速入门 Three.js，从基本概念到实现一个简单的 3D 场景。

---

### 什么是 Three.js？

Three.js 是一个用于在浏览器中创建和渲染 3D 图形的 JavaScript 库。它建立在 WebGL 之上，提供了更易于理解和操作的 API，大大降低了创建复杂 3D 应用的难度。

#### Three.js 的主要功能：

- **3D 模型**：创建、导入和操作复杂的 3D 模型。
- **灯光和阴影**：支持多种灯光类型和复杂的阴影效果。
- **材质和纹理**：允许应用多种材质和纹理，为场景增加真实感。
- **相机控制**：轻松设置和操控 3D 场景中的相机视角。
- **动画**：支持对象动画，创建流畅的 3D 过渡效果。

---

### 构建你的第一个 Three.js 3D 场景

接下来，我们将使用 Three.js 创建一个简单的 3D 场景，包括一个旋转的立方体、一个光源和一个相机。

#### 步骤 1：引入 Three.js

可以通过 CDN 直接引入 Three.js，也可以使用 npm 安装。

通过 CDN 引入：

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
```

通过 npm 安装：

```bash
npm install three

```

#### 步骤 2：创建基本的 Three.js 场景

在 HTML 文件中创建一个 <canvas>，用于显示 3D 内容。然后在 JavaScript 文件中初始化场景。

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Three.js 入门</title>
  </head>
  <body>
    <canvas id="webgl-canvas"></canvas>
    <script src="app.js"></script>
  </body>
</html>
```

#### 步骤 3：初始化场景、相机和渲染器

在 app.js 文件中编写代码，创建基本的场景、相机和渲染器。

```js
import * as THREE from 'three';

const canvas = document.getElementById('webgl-canvas');
const scene = new THREE.Scene();

// 创建相机
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);
camera.position.z = 5;

// 创建渲染器
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
```

#### 步骤 4：添加立方体

接下来，我们将创建一个立方体，并为其添加基础材质和颜色。

```js
// 创建几何体
const geometry = new THREE.BoxGeometry();
// 创建材质
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
// 创建立方体网格
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);
```

### 步骤 5：添加灯光

我们添加一个点光源，提升场景的光照效果。

```js
const light = new THREE.PointLight(0xffffff, 1);
light.position.set(10, 10, 10);
scene.add(light);
```

### 步骤 6：渲染循环

最后，创建一个渲染循环，让立方体在场景中旋转起来。

```js
function animate() {
  requestAnimationFrame(animate);

  // 让立方体旋转
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  renderer.render(scene, camera);
}
animate();
```
## 完整代码
将以上代码整合，形成一个完整的 3D 场景应用。
```js
import * as THREE from 'three';

// 初始化场景
const canvas = document.getElementById("webgl-canvas");
const scene = new THREE.Scene();

// 相机设置
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// 渲染器设置
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);

// 创建几何体和材质
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// 添加灯光
const light = new THREE.PointLight(0xffffff, 1);
light.position.set(10, 10, 10);
scene.add(light);

// 动画循环
function animate() {
    requestAnimationFrame(animate);

    // 旋转立方体
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render(scene, camera);
}
animate();

```
## 展学习内容
使用 Three.js 创建的 3D 场景可以非常灵活，以下是一些可探索的进阶功能：

- 材质和纹理：学习如何使用纹理贴图、透明度和环境光等效果，为对象添加更真实的材质。
- 动画和物理效果：通过 Tween.js 等库实现平滑动画和物理模拟。
- 交互控制：添加鼠标交互或使用 OrbitControls 控制相机视角，增强用户体验。
- 导入 3D 模型：Three.js 支持加载 .obj、.glb 等 3D 模型，可以导入自定义模型为场景增色。

# 总结
Three.js 是一个强大、灵活的 3D 渲染库，能在浏览器中轻松创建互动 3D 场景。通过本文的内容，你应该能够了解并创建一个简单的 3D 场景。希望这篇文章帮助你快速入门 Three.js，享受 3D 开发的乐趣！