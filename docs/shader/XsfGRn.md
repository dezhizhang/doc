# 使用 Three.js 实现动态 GLSL 着色器效果

> 大家好！我是 [数擎 AI]，一位热爱探索新技术的前端开发者，在这里分享前端和 Web3D、AI 技术的干货与实战经验。如果你对技术有热情，欢迎关注我的文章，我们一起成长、进步！
> **开发领域**：前端开发 | AI 应用 | Web3D | 元宇宙  
> **技术栈**：JavaScript、React、ThreeJs、WebGL、Go  
> **经验经验**：6 年+ 前端开发经验，专注于图形渲染和 AI 技术  
> **经验经验**：[演示地址](https://shader.shuqin.cc/xccbrx)
> **开源项目**：[AI 智简未来](https://aint.top)、[晓智元宇宙](https://xiaozhi.shop/)、[数字孪生引擎](https://www.shuqin.cc/) [源码地址](https://github.com/dezhizhang/shadertoy)

在本文中，我们将深入解析如何将 GLSL 片段着色器代码嵌入到 Three.js 项目中，从而创建动态渲染效果。



## 代码分解与实现过程

以下是片段着色器的实现过程分步解析：

### 1. 定义 Uniforms
```glsl
uniform vec3 iResolution;
uniform float iTime;
```
- iResolution：提供屏幕分辨率，用于将像素坐标标准化。
- iTime：表示动画运行的时间（秒），用于驱动动态效果。

### 2. 屏幕坐标标准化
```glsl
vec2 p = (2.0 * fragCoord - iResolution.xy) / min(iResolution.y, iResolution.x);
```
- 将当前像素位置标准化为以屏幕中心为原点的坐标 p，范围通常为 [-1, 1]。

### 3. 背景颜色计算
```glsl
vec3 bcol = vec3(1.0, 0.8, 0.7 - 0.07 * p.y) * (1.0 - 0.25 * length(p));

```
使用线性渐变和距离计算生成动态背景颜色，靠近中心颜色较亮，远离中心逐渐变暗。

### 4. 动画参数计算
```glsl
float tt = mod(iTime, 1.5) / 1.5;
float ss = pow(tt, 0.2) * 0.5 + 0.5;
ss = 1.0 + ss * 0.5 * sin(tt * 6.2831 * 3.0 + p.y * 0.5) * exp(-tt * 4.0);
p *= vec2(0.5, 1.5) + ss * vec2(0.5, -0.5);

```

- tt：归一化时间，用于生成循环动画。
- ss：通过指数和平滑函数生成动画效果。
- 坐标系 p 随时间动态缩放和偏移，呈现周期性变化。

6.  动态形状定义
```glsl
p.y -= 0.25;
float a = atan(p.x, p.y) / 3.141593;
float r = length(p);
float h = abs(a);
float d = (13.0 * h - 22.0 * h * h + 10.0 * h * h * h) / (6.0 - 5.0 * h);

```

通过极坐标定义复杂曲线形状：
- a：点的角度，归一化到 [−1, 1]。
- r：点到原点的距离。
- d：形状边界的数学描述，使用多项式函数控制曲线。

6. 前景颜色与混合
```glsl
float s = 0.75 + 0.75 * p.x;
s *= 1.0 - 0.4 * r;
s = 0.3 + 0.7 * s;
s *= 0.5 + 0.5 * pow(1.0 - clamp(r / d, 0.0, 1.0), 0.1);
vec3 hcol = vec3(1.0, 0.4 * r, 0.3) * s;

vec3 col = mix(bcol, hcol, smoothstep(-0.01, 0.01, d - r));

```
## 整合与实现
```js
import * as THREE from 'three';
// Create the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 2;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Define the shader material
const shaderMaterial = new THREE.ShaderMaterial({
  uniforms: {
    iResolution: { value: new THREE.Vector3(window.innerWidth, window.innerHeight, 1) },
    iTime: { value: 0.0 }
  },
  fragmentShader: `
    uniform vec3 iResolution;
    uniform float iTime;

    void mainImage(out vec4 fragColor, in vec2 fragCoord) {
        vec2 p = (2.0 * fragCoord - iResolution.xy) / min(iResolution.y, iResolution.x);

        // background color
        vec3 bcol = vec3(1.0, 0.8, 0.7 - 0.07 * p.y) * (1.0 - 0.25 * length(p));

        // animate
        float tt = mod(iTime, 1.5) / 1.5;
        float ss = pow(tt, 0.2) * 0.5 + 0.5;
        ss = 1.0 + ss * 0.5 * sin(tt * 6.2831 * 3.0 + p.y * 0.5) * exp(-tt * 4.0);
        p *= vec2(0.5, 1.5) + ss * vec2(0.5, -0.5);

        // shape
        p.y -= 0.25;
        float a = atan(p.x, p.y) / 3.141593;
        float r = length(p);
        float h = abs(a);
        float d = (13.0 * h - 22.0 * h * h + 10.0 * h * h * h) / (6.0 - 5.0 * h);

        // color
        float s = 0.75 + 0.75 * p.x;
        s *= 1.0 - 0.4 * r;
        s = 0.3 + 0.7 * s;
        s *= 0.5 + 0.5 * pow(1.0 - clamp(r / d, 0.0, 1.0), 0.1);
        vec3 hcol = vec3(1.0, 0.4 * r, 0.3) * s;

        vec3 col = mix(bcol, hcol, smoothstep(-0.01, 0.01, d - r));

        fragColor = vec4(col, 1.0);
    }

    void main() {
        vec4 color;
        mainImage(color, gl_FragCoord.xy);
        gl_FragColor = color;
    }
  `,
});

// Create a plane geometry and add it to the scene
const geometry = new THREE.PlaneGeometry(window.innerWidth, window.innerHeight);
const plane = new THREE.Mesh(geometry, shaderMaterial);
scene.add(plane);

// Resize handler
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  shaderMaterial.uniforms.iResolution.value.set(window.innerWidth, window.innerHeight, 1);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

// Animation loop
const clock = new THREE.Clock();
function animate() {
  requestAnimationFrame(animate);

  // Update the time uniform
  shaderMaterial.uniforms.iTime.value = clock.getElapsedTime();

  renderer.render(scene, camera);
}

animate();


```

## 总结
这篇文章展示了如何将复杂的 GLSL 代码转化为 Three.js 的动态渲染效果。通过这种方式，你可以将艺术创意与数学结合，为项目增添独特的视觉效果。