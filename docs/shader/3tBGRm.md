# 使用 Three.js 实现动态噪声圆环效果

> 大家好！我是 [数擎 AI]，一位热爱探索新技术的前端开发者，在这里分享前端和 Web3D、AI 技术的干货与实战经验。如果你对技术有热情，欢迎关注我的文章，我们一起成长、进步！
> **开发领域**：前端开发 | AI 应用 | Web3D | 元宇宙  
> **技术栈**：JavaScript、React、ThreeJs、WebGL、Go  
> **经验经验**：6 年+ 前端开发经验，专注于图形渲染和 AI 技术  
> **经验经验**：[演示地址](https://shader.shuqin.cc/cine-shader)
> **开源项目**：[AI 智简未来](https://aint.top)、[晓智元宇宙](https://xiaozhi.shop/)、[数字孪生引擎](https://www.shuqin.cc/) [源码地址](https://github.com/dezhizhang/shadertoy)

演示地址: https://shader.shuqin.cc/3tBGRm
源码地址: https://github.com/dezhizhang/shadertoy

我们将使用 Three.js 和自定义 GLSL 着色器 代码来创建一个炫酷的动态噪声圆环效果。通过结合 GLSL 着色器语言和 Three.js 的强大功能，我们能够实现一个逼真且富有动态感的视觉效果。接下来，我们将详细介绍如何一步步实现这个效果。

## 1. 创建基本的 Three.js 场景

Three.js 是一个用于渲染 3D 图形的 JavaScript 库。我们从创建一个基本的 Three.js 环境开始：

```js
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// 场景、相机和渲染器的创建
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

camera.position.z = 2;
```

在上述代码中，我们创建了一个基础的 场景、相机 和 WebGL 渲染器。相机位置设为 z = 2，确保我们能够看到物体。

## 2. 创建 ShaderMaterial 并编写 GLSL 着色器

在 Three.js 中，ShaderMaterial 用来定义自定义着色器的材质。我们需要编写 顶点着色器 和 片段着色器 来实现噪声效果和动画效果。

首先，顶点着色器（vertexShader）的作用是将 UV 坐标从 [-1, 1] 区域映射到屏幕空间：

```js
const shaderMaterial = new THREE.ShaderMaterial({
  uniforms: {
    iTime: { value: 0 },
    iResolution: { value: new THREE.Vector3(window.innerWidth, window.innerHeight, 1) },
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv * 2.0 - 1.0; // Convert UV to screen space
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,

```

接下来是片段着色器（fragmentShader），它将实现我们动态噪声圆环的主要效果：

```js
  fragmentShader: `
    precision highp float;
    uniform float iTime;
    uniform vec3 iResolution;
    varying vec2 vUv;

    // 噪声函数
    vec3 hash33(vec3 p3) {
      p3 = fract(p3 * vec3(.1031,.11369,.13787));
      p3 += dot(p3, p3.yxz+19.19);
      return -1.0 + 2.0 * fract(vec3(p3.x+p3.y, p3.x+p3.z, p3.y+p3.z) * p3.zyx);
    }

    float snoise3(vec3 p) {
      const float K1 = 0.333333333;
      const float K2 = 0.166666667;
      vec3 i = floor(p + (p.x + p.y + p.z) * K1);
      vec3 d0 = p - (i - (i.x + i.y + i.z) * K2);
      vec3 e = step(vec3(0.0), d0 - d0.yzx);
      vec3 i1 = e * (1.0 - e.zxy);
      vec3 i2 = 1.0 - e.zxy * (1.0 - e);
      vec3 d1 = d0 - (i1 - K2);
      vec3 d2 = d0 - (i2 - K1);
      vec3 d3 = d0 - 0.5;
      vec4 h = max(0.6 - vec4(dot(d0, d0), dot(d1, d1), dot(d2, d2), dot(d3, d3)), 0.0);
      vec4 n = h * h * h * h * vec4(dot(d0, hash33(i)), dot(d1, hash33(i + i1)), dot(d2, hash33(i + i2)), dot(d3, hash33(i + 1.0)));
      return dot(vec4(31.316), n);
    }

    // 核心绘制函数
    void draw(out vec4 _FragColor, in vec2 uv) {
      const vec3 color1 = vec3(0.611765, 0.262745, 0.996078);
      const vec3 color2 = vec3(0.298039, 0.760784, 0.913725);
      const vec3 color3 = vec3(0.062745, 0.078431, 0.600000);
      const float innerRadius = 0.6;
      const float noiseScale = 0.65;

      float ang = atan(uv.y, uv.x);
      float len = length(uv);
      float n0 = snoise3(vec3(uv * noiseScale, iTime * 0.5)) * 0.5 + 0.5;
      float r0 = mix(mix(innerRadius, 1.0, 0.4), mix(innerRadius, 1.0, 0.6), n0);
      float d0 = distance(uv, r0 / len * uv);
      float v0 = 1.0 / (1.0 + d0 * 10.0);
      v0 *= smoothstep(r0 * 1.05, r0, len);
      float cl = cos(ang + iTime * 2.0) * 0.5 + 0.5;

      vec3 col = mix(color3, mix(color1, color2, cl), v0);
      col = clamp(col, 0.0, 1.0);

      _FragColor = extractAlpha(col);
    }

    void main() {
      vec2 uv = (gl_FragCoord.xy * 2.0 - iResolution.xy) / iResolution.y;
      vec4 col;
      draw(col, uv);
      vec3 bg = vec3(0.0);
      gl_FragColor.rgb = mix(bg, col.rgb, col.a);
      gl_FragColor.a = 1.0;
    }
  `,
});

```

## 3. 创建几何体与材质的结合

我们使用 PlaneGeometry 来作为展示的几何体。该平面将作为渲染噪声效果的基础：

```js
const planeGeometry = new THREE.PlaneGeometry(100, 100);
const plane = new THREE.Mesh(planeGeometry, shaderMaterial);
scene.add(plane);
```

## 4. 添加相机控制

为了使用户能够交互查看效果，我们添加 OrbitControls 来支持鼠标拖拽控制相机视角：

```javascript
const controls = new OrbitControls(camera, renderer.domElement);
```

## 5. 动画循环

为了让噪声和效果能够动态展示，我们需要通过动画循环来持续更新 iTime 的值，给着色器传递最新的时间信息：

```javascript
function animate() {
  requestAnimationFrame(animate);
  shaderMaterial.uniforms.iTime.value = performance.now() / 1000;
  renderer.render(scene, camera);
}
animate();
```

## 6. 处理窗口大小变化

为了确保页面在不同分辨率下能够适配，我们需要添加一个监听窗口大小变化的事件：

```javascript
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  shaderMaterial.uniforms.iResolution.value.set(
    window.innerWidth,
    window.innerHeight,
    1,
  );
});
```

## 完成代码

```js
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Scene, Camera, Renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

camera.position.z = 2;

// Shader Material
const shaderMaterial = new THREE.ShaderMaterial({
  uniforms: {
    iTime: { value: 0 },
    iResolution: {
      value: new THREE.Vector3(window.innerWidth, window.innerHeight, 1),
    },
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv * 2.0 - 1.0; // Convert UV to screen space
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    precision highp float;

    uniform float iTime;
    uniform vec3 iResolution;

    varying vec2 vUv;

    vec3 hash33(vec3 p3) {
      p3 = fract(p3 * vec3(.1031,.11369,.13787));
      p3 += dot(p3, p3.yxz+19.19);
      return -1.0 + 2.0 * fract(vec3(p3.x+p3.y, p3.x+p3.z, p3.y+p3.z) * p3.zyx);
    }

    float snoise3(vec3 p) {
      const float K1 = 0.333333333;
      const float K2 = 0.166666667;
      
      vec3 i = floor(p + (p.x + p.y + p.z) * K1);
      vec3 d0 = p - (i - (i.x + i.y + i.z) * K2);
      
      vec3 e = step(vec3(0.0), d0 - d0.yzx);
      vec3 i1 = e * (1.0 - e.zxy);
      vec3 i2 = 1.0 - e.zxy * (1.0 - e);
      
      vec3 d1 = d0 - (i1 - K2);
      vec3 d2 = d0 - (i2 - K1);
      vec3 d3 = d0 - 0.5;
      
      vec4 h = max(0.6 - vec4(dot(d0, d0), dot(d1, d1), dot(d2, d2), dot(d3, d3)), 0.0);
      vec4 n = h * h * h * h * vec4(dot(d0, hash33(i)), dot(d1, hash33(i + i1)), dot(d2, hash33(i + i2)), dot(d3, hash33(i + 1.0)));
      
      return dot(vec4(31.316), n);
    }

    vec4 extractAlpha(vec3 colorIn) {
      vec4 colorOut;
      float maxValue = min(max(max(colorIn.r, colorIn.g), colorIn.b), 1.0);
      if (maxValue > 1e-5) {
          colorOut.rgb = colorIn.rgb * (1.0 / maxValue);
          colorOut.a = maxValue;
      } else {
          colorOut = vec4(0.0);
      }
      return colorOut;
    }

    void draw(out vec4 _FragColor, in vec2 uv) {
      const vec3 color1 = vec3(0.611765, 0.262745, 0.996078);
      const vec3 color2 = vec3(0.298039, 0.760784, 0.913725);
      const vec3 color3 = vec3(0.062745, 0.078431, 0.600000);
      const float innerRadius = 0.6;
      const float noiseScale = 0.65;

      float ang = atan(uv.y, uv.x);
      float len = length(uv);
      float n0 = snoise3(vec3(uv * noiseScale, iTime * 0.5)) * 0.5 + 0.5;
      float r0 = mix(mix(innerRadius, 1.0, 0.4), mix(innerRadius, 1.0, 0.6), n0);
      float d0 = distance(uv, r0 / len * uv);
      float v0 = 1.0 / (1.0 + d0 * 10.0);
      v0 *= smoothstep(r0 * 1.05, r0, len);
      float cl = cos(ang + iTime * 2.0) * 0.5 + 0.5;

      vec3 col = mix(color3, mix(color1, color2, cl), v0);
      col = clamp(col, 0.0, 1.0);

      _FragColor = extractAlpha(col);
    }

    void main() {
      vec2 uv = (gl_FragCoord.xy * 2.0 - iResolution.xy) / iResolution.y;

      vec4 col;
      draw(col, uv);

      vec3 bg = vec3(0.0);
      gl_FragColor.rgb = mix(bg, col.rgb, col.a);
      gl_FragColor.a = 1.0;
    }
  `,
});

// Mesh
const planeGeometry = new THREE.PlaneGeometry(100, 100);
const plane = new THREE.Mesh(planeGeometry, shaderMaterial);
scene.add(plane);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);

// Animation Loop
function animate() {
  requestAnimationFrame(animate);

  // Update uniforms
  shaderMaterial.uniforms.iTime.value = performance.now() / 1000;

  renderer.render(scene, camera);
}
animate();

// Resize Handler
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  shaderMaterial.uniforms.iResolution.value.set(
    window.innerWidth,
    window.innerHeight,
    1,
  );
});
```

## 总结

通过上面的步骤，我们成功实现了一个动态噪声圆环效果，利用了 Three.js 和 GLSL 着色器，在网页中创建了一个互动式的噪声动画。这个效果不仅展示了噪声算法的应用，还通过着色器语言为我们提供了丰富的视觉变化。

<div align="center">数擎AI公众号</div>
<div align="center"> <img src="https://cdn.shuqin.cc/aint/assets/weixin.svg" width = 300 height = 300 /> </div>
