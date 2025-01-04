# Three.js 后期处理（Post-Processing）详解

> **开发领域**：前端开发 | AI 应用 | Web3D | 元宇宙  
> **技术栈**：JavaScript、React、ThreeJs、WebGL、Go  
> **经验经验**：6年+ 前端开发经验，专注于图形渲染和AI技术  
> **开源项目**：[AI智简未来](https://aint.top)、[晓智元宇宙](https://xiaozhi.shop/)、[数字孪生引擎](https://www.shuqin.cc/)   
> 大家好！我是 [晓智]，一位热爱探索新技术的前端开发者，在这里分享前端和Web3D、AI技术的干货与实战经验。如果你对技术有热情，欢迎关注我的文章，我们一起成长、进步！


在使用 Three.js 创建 3D 场景时，后期处理（Post-Processing）是一个不可忽视的环节。它通过对渲染结果进行额外的处理，可以极大地提升场景的视觉效果，使画面更具吸引力和表现力。

本文将详细介绍 Three.js 后期处理的工作原理、实现方法以及常见的后期处理效果，帮助你快速上手并掌握这一强大的工具。


## 一、什么是后期处理？

后期处理（Post-Processing）是指在场景渲染完成后，对渲染的图像进行进一步的处理和调整。这些处理通常包括：

- 添加视觉效果（如模糊、辉光、色彩调整等）
- 模拟真实世界中的物理现象（如景深、运动模糊等）
- 实现特殊的视觉风格（如漫画效果、老电影风格等）

在 Three.js 中，后期处理是通过将渲染结果存储到帧缓冲区（Framebuffer），然后对其应用一系列着色器效果实现的。


## 二、Three.js 后期处理的工作流程

Three.js 提供了一个 `EffectComposer` 类，用于管理后期处理的整个流程。以下是后期处理的基本步骤：

### 2.1 创建 EffectComposer

`EffectComposer` 是后期处理的核心。它会接管场景的渲染，将渲染结果存储到帧缓冲区中。

### 2.2 添加渲染通道（Render Pass）

后期处理由一系列渲染通道（Pass）组成，每个通道都对帧缓冲区中的图像进行特定的处理。

- **RenderPass**：渲染场景到帧缓冲区，作为后续处理的输入。
- **ShaderPass**：应用特定的着色器效果。
- **EffectPass**：封装多个复杂效果。

### 2.3 应用最终渲染

在所有的渲染通道完成处理后，`EffectComposer` 会将最终的图像渲染到屏幕上。


## 三、后期处理实现示例

以下是一个简单的后期处理示例，展示如何在 Three.js 中应用 `EffectComposer` 和一些常见的后期效果。

### 3.1 基础代码

```javascript
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { FilmPass } from 'three/examples/jsm/postprocessing/FilmPass.js';

// 初始化场景、摄像机和渲染器
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 添加一个简单的几何体
const geometry = new THREE.TorusKnotGeometry(1, 0.4, 100, 16);
const material = new THREE.MeshStandardMaterial({ color: 0xff6347 });
const torusKnot = new THREE.Mesh(geometry, material);
scene.add(torusKnot);

const light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(10, 10, 10);
scene.add(light);

// 初始化 EffectComposer
const composer = new EffectComposer(renderer);

// 添加 RenderPass（渲染场景的基础通道）
const renderPass = new RenderPass(scene, camera);
composer.addPass(renderPass);

// 添加 UnrealBloomPass（辉光效果）
const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85);
composer.addPass(bloomPass);

// 添加 FilmPass（电影胶片效果）
const filmPass = new FilmPass(0.35, 0.025, 648, false);
composer.addPass(filmPass);

// 动画循环
function animate() {
  requestAnimationFrame(animate);
  torusKnot.rotation.x += 0.01;
  torusKnot.rotation.y += 0.01;

  // 使用 composer 进行后期处理渲染
  composer.render();
}

animate();
```

## 四、常见的后期处理效果
### 4.1 辉光效果（UnrealBloomPass）
效果描述：模拟物体发光的视觉效果，常用于表现光源、能量场等场景。

关键参数：

strength：辉光强度。
radius：辉光半径。
threshold：亮度阈值，低于该值的像素不会发光。
### 4.2 景深（BokehPass / Depth of Field）
效果描述：模拟相机镜头的景深效果，让焦点外的区域出现模糊。

应用场景：聚焦于特定的物体，提升画面层次感。

### 4.3 运动模糊（MotionBlurPass）
效果描述：模拟高速运动时的拖影效果，增加动感。

### 4.4 边缘检测（OutlinePass / SobelPass）
效果描述：检测并高亮场景中的边缘，用于创建卡通或轮廓风格的效果。

### 4.5 色彩调整（ColorCorrectionPass / LUTPass）
效果描述：调整场景的整体色调和对比度，增强画面表现力。

## 五、后期处理的注意事项
性能开销：

后期处理需要对帧缓冲区进行额外的处理，会增加显存和计算的消耗。
避免同时启用过多的后期效果。
渲染顺序：

渲染通道的顺序会影响最终的效果，需根据需求调整顺序。
抗锯齿问题：

某些后期处理会导致抗锯齿失效，可以使用 FXAA 或 SMAA Pass 修复。
多通道组合：

可以组合多个通道，实现更复杂的效果。
## 六、总结
Three.js 的后期处理功能为我们提供了丰富的视觉效果，实现了从简单的几何体到高质量画面的跨越。通过本文的学习，你应该掌握了后期处理的基本原理和实现方法。

后期处理是提升项目质量的重要手段，但需要根据实际需求权衡性能与效果。希望你能在自己的项目中灵活运用，创造令人惊艳的 3D 场景！


<div align="center">数擎AI公众号</div>
<div align="center"> <img src="https://cdn.shuqin.cc/aint/assets/weixin.svg" width = 300 height = 300 /> </div>
