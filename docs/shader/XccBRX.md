# 在 Three.js 中实现自定义 Shader 效果

> 大家好！我是 [数擎 AI]，一位热爱探索新技术的前端开发者，在这里分享前端和 Web3D、AI 技术的干货与实战经验。如果你对技术有热情，欢迎关注我的文章，我们一起成长、进步！
> **开发领域**：前端开发 | AI 应用 | Web3D | 元宇宙  
> **技术栈**：JavaScript、React、ThreeJs、WebGL、Go  
> **经验经验**：6 年+ 前端开发经验，专注于图形渲染和 AI 技术  
> **经验经验**：[演示地址](https://shader.shuqin.cc/xccbrx)
> **开源项目**：[AI 智简未来](https://aint.top)、[晓智元宇宙](https://xiaozhi.shop/)、[数字孪生引擎](https://www.shuqin.cc/) [源码地址](https://github.com/dezhizhang/shadertoy)

## 引言

Three.js 是一个功能强大的 WebGL 库，它让开发者能够轻松地创建复杂的 3D 场景、动画和交互效果。然而，有时候内置的材质和效果无法满足项目的特定需求。在这种情况下，我们可以通过使用自定义着色器来实现独特的视觉效果。

本文将带你深入了解如何使用 Three.js 中的自定义着色器，重点演示两个效果的实现：一种是动态的波纹效果，另一种是炫目的辐射效果。我们还将详细解析 GLSL（OpenGL Shading Language）代码的功能及其在 Three.js 中的应用。


## Three.js 与自定义着色器的基础知识

在 Three.js 中，自定义着色器是通过 `ShaderMaterial` 实现的。`ShaderMaterial` 允许你完全控制顶点着色器和片段着色器的行为。以下是自定义着色器的一些关键组件：

1. **顶点着色器（Vertex Shader）**：负责处理每个顶点的位置。
2. **片段着色器（Fragment Shader）**：负责为每个像素计算颜色。
3. **Uniforms**：在 JavaScript 和着色器之间传递的全局变量，用于动态更新效果。



## 效果展示代码概览

我们先来看一个完整的代码示例，后续会逐步拆解每个部分。

```javascript
import * as THREE from 'three';

// 顶点着色器
const vertexShader = `
varying vec2 vUv;
void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

// 片段着色器
const fragmentShader = `
uniform vec2 iResolution;
uniform float iTime;

varying vec2 vUv;

// SDF 圆形函数
float sdCircle(vec2 p, float r) {
    return length(p) - r;
}

// 效果一：波纹效果
vec4 effect_1(vec2 uv) {
    float c = length(uv);
    c = abs(sin(c * 6.0 - iTime) / 6.0);
    c = smoothstep(0.0, 0.125, c);

    return vec4(vec3(1.0 - c), 1.0);
}

// 效果二：辐射效果
vec4 effect_2(vec2 uv) {
    vec3 color = vec3(1.0, 2.0, 4.0);

    float c = length(uv);
    c = abs(sin(c * 2.0 - iTime) / 4.0);
    c = 0.0125 / c;

    color *= c;

    return vec4(color, 1.0);
}

void main() {
    vec2 uv = vUv;
    float ratio = iResolution.x / iResolution.y;

    vec2 center = vec2(0.5, 0.5); // 中心位置

    uv -= center; // 居中 UV 坐标
    uv *= 2.0;    // 归一化
    uv.x *= ratio;

    // 选择效果（effect_1 或 effect_2）
    gl_FragColor = effect_2(uv);
}
`;

// Uniforms 设置
const uniforms = {
    iResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
    iTime: { value: 0 },
};

// Shader 材质
const material = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms,
});

// 创建一个平面来应用 Shader
const geometry = new THREE.PlaneGeometry(2, 2);
const mesh = new THREE.Mesh(geometry, material);

// 场景与相机设置
const scene = new THREE.Scene();
scene.add(mesh);
const camera = new THREE.Camera();

// 渲染器设置
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 动画循环
function animate() {
    uniforms.iTime.value += 0.05; // 更新时间
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

animate();
```
## 顶点着色器的作用
顶点着色器定义了如何将三维点映射到二维屏幕上。在我们的代码中，顶点着色器非常简单，只是将 UV 坐标传递到片段着色器中：

```js
varying vec2 vUv;
void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
```
vUv 是 UV 坐标，它描述了纹理如何映射到几何体表面。gl_Position 则是顶点的最终位置。

片段着色器解析
片段着色器是实现视觉效果的核心。在这个示例中，我们定义了两个效果函数：

效果一：波纹效果
波纹效果利用了 SDF（有符号距离函数）的特性，通过 sin 函数和 smoothstep 产生渐变波纹。

```glsl
vec4 effect_1(vec2 uv) {
    float c = length(uv);
    c = abs(sin(c * 6.0 - iTime) / 6.0);
    c = smoothstep(0.0, 0.125, c);

    return vec4(vec3(1.0 - c), 1.0);
}
```
效果二：辐射效果
辐射效果通过缩放颜色强度实现，创造出一种动态发光的视觉效果。

```glsl
vec4 effect_2(vec2 uv) {
    vec3 color = vec3(1.0, 2.0, 4.0);

    float c = length(uv);
    c = abs(sin(c * 2.0 - iTime) / 4.0);
    c = 0.0125 / c;

    color *= c;

    return vec4(color, 1.0);
}
```
## Uniforms 的作用
uniform 是一种全局变量，可以从 JavaScript 中传递给 GLSL。这里的 iResolution 和 iTime 是两个关键变量：

iResolution：屏幕分辨率，用于调整 UV 坐标比例。
iTime：时间变量，用于为动画效果提供动态输入。
将着色器应用到平面
为了将着色器可视化，我们将其应用到一个 2D 平面上。PlaneGeometry 用于创建一个平面，而 ShaderMaterial 则绑定了我们的着色器。

## 动画实现
通过在每一帧更新 iTime，我们可以为效果注入时间维度，从而实现动态动画：

```javascript
function animate() {
    uniforms.iTime.value += 0.05; // 更新时间
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}
```
## 总结与扩展
本文演示了如何在 Three.js 中使用自定义着色器实现波纹和辐射效果。通过灵活运用 GLSL 和 Three.js 的 ShaderMaterial，我们可以创造出各种独特的视觉效果。
<div align="center">数擎AI公众号</div>
<div align="center"> <img src="https://cdn.shuqin.cc/aint/assets/weixin.svg" width = 300 height = 300 /> </div>

