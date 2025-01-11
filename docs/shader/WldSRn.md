# Three.js 实现光线行 Shader

> 大家好！我是 [数擎AI]，一位热爱探索新技术的前端开发者，在这里分享前端和Web3D、AI技术的干货与实战经验。如果你对技术有热情，欢迎关注我的文章，我们一起成长、进步！
> **开发领域**：前端开发 | AI 应用 | Web3D | 元宇宙  
> **技术栈**：JavaScript、React、ThreeJs、WebGL、Go  
> **经验经验**：6 年+ 前端开发经验，专注于图形渲染和 AI 技术  
<!-- > **经验经验**：[演示地址](https://shader.shuqin.cc/cine-shader)  -->
> **开源项目**：[AI智简未来](https://aint.top)、[晓智元宇宙](https://xiaozhi.shop/)、[数字孪生引擎](https://www.shuqin.cc/)  [源码地址](https://github.com/dezhizhang/shadertoy)


光线行进（Raymarching）是一种在 3D 图形渲染中使用的技术，特别适用于体积渲染和一些高度复杂的几何形状的渲染。它通过沿着光线推进来计算表面与光线的交点，在很多现代计算机图形学应用中都得到了广泛使用。

## 1. 光线行进基础

光线行进是通过沿着光线的路径推进，逐步检测光线与物体的交点。与传统的光线追踪不同，光线行进不直接计算物体的几何形状，而是通过反复采样空间来判断物体的位置。这使得光线行进非常适合处理一些复杂的几何体，例如，精细的表面、细节或者体积渲染。

## 2. 使用 threejs 实现

### 2.1 创建 Three.js 场景

首先，创建一个 Three.js 场景，并设置背景颜色。

```js
import * as THREE from 'three';

// 创建场景
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0a0a0a); // 设置背景颜色

// 创建相机
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);
camera.position.z = 5;

// 创建 WebGL 渲染器
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
```
### 2.2 编写顶点和片段着色器
接下来，我们编写顶点着色器和片段着色器，片段着色器实现了光线行进算法。
顶点着色器
顶点着色器主要用于传递纹理坐标：
```js
const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

```
片段着色器
片段着色器是光线行进的核心，它使用了多个有符号距离函数（Signed Distance Functions, SDF）来定义几何形状，并通过光线行进算法来渲染场景。
```js
const fragmentShader = `
  #define MAX_STEPS 80
  varying vec2 vUv;

  uniform float iTime;
  uniform vec2 iResolution;

  // 有符号距离函数
  float sdSphere(vec3 pos, float size) {
    return length(pos) - size;
  }

  float sdBox(vec3 pos, vec3 size) {
    pos = abs(pos) - size;
    return max(max(pos.x, pos.y), pos.z);
  }

  float sdOctahedron(vec3 p, float s) {
    p = abs(p);
    float m = p.x + p.y + p.z - s;
    vec3 q;
    if (3.0 * p.x < m) q = p.xyz;
    else if (3.0 * p.y < m) q = p.yzx;
    else if (3.0 * p.z < m) q = p.zxy;
    else return m * 0.57735027;
    float k = clamp(0.5 * (q.z - q.y + s), 0.0, s);
    return length(vec3(q.x, q.y - s + k, q.z - k));
  }

  float sdPlane(vec3 pos) {
    return pos.y;
  }

  mat2 rotate(float a) {
    float s = sin(a);
    float c = cos(a);
    return mat2(c, s, -s, c);
  }

  vec3 repeat(vec3 pos, vec3 span) {
    return abs(mod(pos, span)) - span * 0.5;
  }

  float getDistance(vec3 pos, vec2 uv) {
    vec3 originalPos = pos;

    for (int i = 0; i < 3; i++) {
      pos = abs(pos) - 4.5;
      pos.xz *= rotate(1.0);
      pos.yz *= rotate(1.0);
    }

    pos = repeat(pos, vec3(4.0));

    float d0 = abs(originalPos.x) - 0.1;
    float d1 = sdBox(pos, vec3(0.8));

    pos.xy *= rotate(mix(1.0, 2.0, abs(sin(iTime))));
    float size = mix(1.1, 1.3, (abs(uv.y) * abs(uv.x)));
    float d2 = sdSphere(pos, size);
    float dd2 = sdOctahedron(pos, 1.8);
    float ddd2 = mix(d2, dd2, abs(sin(iTime)));

    return max(max(d1, -ddd2), -d0);
  }

  void main() {
    vec2 p = (gl_FragCoord.xy * 2.0 - iResolution.xy) / min(iResolution.x, iResolution.y);

    // 相机设置
    vec3 cameraOrigin = vec3(0.0, 0.0, -10.0 + iTime * 4.0);
    vec3 cameraTarget = vec3(cos(iTime) + sin(iTime / 2.0) * 10.0, exp(sin(iTime)) * 2.0, 3.0 + iTime * 4.0);
    vec3 upDirection = vec3(0.0, 1.0, 0.0);
    vec3 cameraDir = normalize(cameraTarget - cameraOrigin);
    vec3 cameraRight = normalize(cross(upDirection, cameraOrigin));
    vec3 cameraUp = cross(cameraDir, cameraRight);
    vec3 rayDirection = normalize(cameraRight * p.x + cameraUp * p.y + cameraDir);

    float depth = 0.0;
    float ac = 0.0;
    vec3 rayPos = vec3(0.0);
    float d = 0.0;

    // 光线行进循环
    for (int i = 0; i < MAX_STEPS; i++) {
      rayPos = cameraOrigin + rayDirection * depth;
      d = getDistance(rayPos, p);

      if (abs(d) < 0.0001) {
        break;
      }

      ac += exp(-d * mix(5.0, 10.0, abs(sin(iTime))));
      depth += d;
    }

    vec3 col = vec3(0.2, 0.5, 0.9);  // 更亮的颜色
    ac *= 2.0 * (iResolution.x / iResolution.y - abs(p.x));  // 增加系数
    vec3 finalCol = col * ac * 0.2;  // 更亮的最终颜色

    gl_FragColor = vec4(finalCol, 1.0);
    gl_FragColor.w = 1.0 - depth * 0.05;  // 减少深度的影响
  }
`;

```
### 2.3 创建并渲染物体
```js
// 创建平面几何体
const geometry = new THREE.PlaneGeometry(window.innerWidth, window.innerHeight);

// 创建 ShaderMaterial
const material = new THREE.ShaderMaterial({
  uniforms: {
    iTime: { value: 0 },
    iResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) }
  },
  vertexShader: vertexShader,
  fragmentShader: fragmentShader,
  transparent: true,  // 确保透明度正确处理
  depthWrite: false,  // 禁用深度写入，避免 Z-fighting
  depthTest: true     // 启用深度测试
});

// 创建网格并添加到场景
const plane = new THREE.Mesh(geometry, material);
scene.add(plane);

```
## 2.4 动画与渲染
```js
// 创建动画循环
function animate() {
  requestAnimationFrame(animate);

  // 更新时间
  material.uniforms.iTime.value += 0.01;

  // 渲染场景
  renderer.render(scene, camera);
}

// 调整渲染器大小
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  material.uniforms.iResolution.value.x = window.innerWidth;
  material.uniforms.iResolution.value.y = window.innerHeight;
});

// 启动动画循环
animate();

```
## 3.  完整代码
```js
import * as THREE from 'three';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0a0a0a); // Set background color of the scene

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Create the WebGLRenderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  #define MAX_STEPS 80
  varying vec2 vUv;

  uniform float iTime;
  uniform vec2 iResolution;

  // Functions copied from the GLSL shader code
  float sdSphere(vec3 pos, float size) {
    return length(pos) - size;
  }

  float sdBox(vec3 pos, vec3 size) {
    pos = abs(pos) - size;
    return max(max(pos.x, pos.y), pos.z);
  }

  float sdOctahedron(vec3 p, float s) {
    p = abs(p);
    float m = p.x + p.y + p.z - s;
    vec3 q;
    if (3.0 * p.x < m) q = p.xyz;
    else if (3.0 * p.y < m) q = p.yzx;
    else if (3.0 * p.z < m) q = p.zxy;
    else return m * 0.57735027;
    float k = clamp(0.5 * (q.z - q.y + s), 0.0, s);
    return length(vec3(q.x, q.y - s + k, q.z - k));
  }

  float sdPlane(vec3 pos) {
    return pos.y;
  }

  mat2 rotate(float a) {
    float s = sin(a);
    float c = cos(a);
    return mat2(c, s, -s, c);
  }

  vec3 repeat(vec3 pos, vec3 span) {
    return abs(mod(pos, span)) - span * 0.5;
  }

  float getDistance(vec3 pos, vec2 uv) {
    vec3 originalPos = pos;

    for (int i = 0; i < 3; i++) {
      pos = abs(pos) - 4.5;
      pos.xz *= rotate(1.0);
      pos.yz *= rotate(1.0);
    }

    pos = repeat(pos, vec3(4.0));

    float d0 = abs(originalPos.x) - 0.1;
    float d1 = sdBox(pos, vec3(0.8));

    pos.xy *= rotate(mix(1.0, 2.0, abs(sin(iTime))));
    float size = mix(1.1, 1.3, (abs(uv.y) * abs(uv.x)));
    float d2 = sdSphere(pos, size);
    float dd2 = sdOctahedron(pos, 1.8);
    float ddd2 = mix(d2, dd2, abs(sin(iTime)));

    return max(max(d1, -ddd2), -d0);
  }

  void main() {
    vec2 p = (gl_FragCoord.xy * 2.0 - iResolution.xy) / min(iResolution.x, iResolution.y);

    // Camera setup
    vec3 cameraOrigin = vec3(0.0, 0.0, -10.0 + iTime * 4.0);
    vec3 cameraTarget = vec3(cos(iTime) + sin(iTime / 2.0) * 10.0, exp(sin(iTime)) * 2.0, 3.0 + iTime * 4.0);
    vec3 upDirection = vec3(0.0, 1.0, 0.0);
    vec3 cameraDir = normalize(cameraTarget - cameraOrigin);
    vec3 cameraRight = normalize(cross(upDirection, cameraOrigin));
    vec3 cameraUp = cross(cameraDir, cameraRight);
    vec3 rayDirection = normalize(cameraRight * p.x + cameraUp * p.y + cameraDir);

    float depth = 0.0;
    float ac = 0.0;
    vec3 rayPos = vec3(0.0);
    float d = 0.0;

    // Ray marching loop
    for (int i = 0; i < MAX_STEPS; i++) {
      rayPos = cameraOrigin + rayDirection * depth;
      d = getDistance(rayPos, p);

      if (abs(d) < 0.0001) {
        break;
      }

      ac += exp(-d * mix(5.0, 10.0, abs(sin(iTime))));
      depth += d;
    }

    vec3 col = vec3(0.2, 0.5, 0.9);  // Brighter color
    ac *= 2.0 * (iResolution.x / iResolution.y - abs(p.x));  // Increased multiplier
    vec3 finalCol = col * ac * 0.2;  // Brighter final color

    gl_FragColor = vec4(finalCol, 1.0);
    gl_FragColor.w = 1.0 - depth * 0.05;  // Less depth influence
  }
`;

const geometry = new THREE.PlaneGeometry(window.innerWidth, window.innerHeight);

const material = new THREE.ShaderMaterial({
  uniforms: {
    iTime: { value: 0 },
    iResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) }
  },
  vertexShader: vertexShader,
  fragmentShader: fragmentShader,
  transparent: true, 
  depthWrite: false,  
  depthTest: true    
});

// Create a mesh with the geometry and the shader material
const plane = new THREE.Mesh(geometry, material);
scene.add(plane);

// Create the animation loop
function animate() {
  requestAnimationFrame(animate);

  // Update the time uniform
  material.uniforms.iTime.value += 0.01;

  // Render the scene
  renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  material.uniforms.iResolution.value.x = window.innerWidth;
  material.uniforms.iResolution.value.y = window.innerHeight;
});

animate();

```
## 4. 总结
本篇文章展示了如何使用 Three.js 和 GLSL 实现一个基本的光线行进渲染效果。通过自定义顶点和片段着色器，我们能够创建一个动态且具有视觉冲击力的效果。光线行进技术为渲染复杂的几何体提供了一种非常高效的手段，适用于各种图形应用，包括游戏、动画和虚拟现实等。



<div align="center">数擎AI公众号</div>
<div align="center"> <img src="https://cdn.shuqin.cc/aint/assets/weixin.svg" width = 300 height = 300 /> </div>


<!-- https://www.shadertoy.com/view/WldSRn -->
