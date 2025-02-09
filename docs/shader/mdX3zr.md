# 使用 Three.js  实现火焰效果


> 大家好！我是 [数擎 AI]，一位热爱探索新技术的前端开发者，在这里分享前端和 Web3D、AI 技术的干货与实战经验。如果你对技术有热情，欢迎关注我的文章，我们一起成长、进步！
> **开发领域**：前端开发 | AI 应用 | Web3D | 元宇宙  
> **技术栈**：JavaScript、React、ThreeJs、WebGL、Go  
> **经验经验**：6 年+ 前端开发经验，专注于图形渲染和 AI 技术  
> **经验经验**：[演示地址](https://shader.shuqin.cc/lscczl)
> **开源项目**：[智简未来](https://aint.top)、[晓智元宇宙](https://xiaozhi.shop/)、[数字孪生引擎](https://www.shuqin.cc/) 、[源码地址](https://github.com/dezhizhang/shadertoy)


## 引言

在现代 Web 开发中，使用 WebGL 渲染图形已经变得越来越流行。Three.js 作为一个高效的 3D 图形库，简化了 WebGL 的操作，使得创建复杂的 3D 图形变得更加容易。着色器（Shader）是实现视觉效果的核心之一，它允许我们直接控制像素的颜色、位置和其他属性。

在本文中，我们将探讨如何通过自定义的 GLSL (OpenGL Shading Language) 着色器来创建火焰效果，使用 Raymarching 技术来模拟火焰的形态和光辉。

## 环境设置

首先，我们需要引入 Three.js 并创建一个基础的 WebGL 渲染环境。你可以通过以下代码来实现：

```javascript
import * as THREE from 'three';

// 创建摄像机
const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
// 创建场景
const scene = new THREE.Scene();
// 创建一个平面几何体作为着色器的应用表面
const geometry = new THREE.PlaneGeometry(2, 2);
// 使用自定义的着色器创建材质
const material = new THREE.ShaderMaterial({
  ...flameShader,  // 引用我们接下来的火焰着色器
  depthWrite: false,
  transparent: true
});
// 创建网格对象并将其添加到场景中
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// 创建 WebGL 渲染器
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
```
这段代码创建了一个 2D 平面，通过自定义材质和着色器将火焰效果渲染在这个平面上。接下来，我们来详细讲解如何实现火焰效果。
## 火焰着色器解析
火焰效果的核心在于两个部分：噪声函数和Raymarching。

### 1. 噪声函数
噪声是模拟自然界中随机现象的一个重要工具。我们使用一个简单的三维噪声函数来生成火焰效果中的随机波动：

```glsl
float noise(vec3 p) {
  vec3 i = floor(p);
  vec4 a = dot(i, vec3(1., 57., 21.)) + vec4(0., 57., 21., 78.);
  vec3 f = cos((p-i)*acos(-1.))*(-.5)+.5;
  a = mix(sin(cos(a)*a), sin(cos(1.+a)*(1.+a)), f.x);
  a.xy = mix(a.xz, a.yw, f.y);
  return mix(a.x, a.y, f.z);
}
```
这个函数使用的是 Perlin 噪声的变种，通过对每个像素点进行采样，创建出自然、随机的波动效果。在火焰的表现上，这种噪声将带来动态的变化，模拟出火焰的流动感。

### 2. 火焰的形态
火焰本身是由许多细小的颗粒组成的，它们随着时间变化而不断变形。我们通过球形方程来定义火焰的形态，并结合噪声来创建动态的效果：

```glsl
float flame(vec3 p) {
  float d = sphere(p*vec3(1.,.5,1.), vec4(.0,-1.,.0,1.));
  return d + (noise(p+vec3(.0,iTime*2.,.0)) + noise(p*3.)*.5)*.25*(p.y);
}
```
这里，sphere 函数用于创建一个球体的距离场，而火焰的形态则通过 flame 函数在此基础上加入噪声，并且随着时间 (iTime) 变化，使火焰的外观不断变化。

### 3. Raymarching 技术
Raymarching 是一种基于逐步逼近的方法，用于在复杂的距离场中寻找表面交点。通过在场景中发射光线并不断前进，直到光线与物体表面相交，可以得到物体的轮廓。

```glsl
vec4 raymarch(vec3 org, vec3 dir) {
  float d = 0.0, glow = 0.0, eps = 0.02;
  vec3 p = org;
  bool glowed = false;
  
  for(int i=0; i<64; i++) {
    d = scene(p) + eps;
    p += d * dir;
    if(d > eps) {
      if(flame(p) < 0.0) glowed = true;
      if(glowed) glow = float(i)/64.;
    }
  }
  return vec4(p, glow);
}
```
在这个 Raymarching 循环中，我们通过不断推进光线，并检测其是否与火焰相交，来模拟火焰的光辉效果。glow 变量则控制了火焰的亮度和衰减。

### 4. 渲染火焰
最后，在着色器的主函数中，我们使用上述的 Raymarching 函数来渲染火焰，并根据计算出的亮度值调整颜色：

```glsl
void main() {
  vec2 uv = -1.0 + 2.0 * vUv;
  uv.x *= iResolution.x/iResolution.y;
  
  vec3 org = vec3(0., -2., 4.);
  vec3 dir = normalize(vec3(uv.x*1.6, -uv.y, -1.5));
  
  vec4 p = raymarch(org, dir);
  float glow = p.w;
  
  vec4 col = mix(vec4(1.,.5,.1,1.), vec4(0.1,.5,1.,1.), p.y*.02+.4);
  
  gl_FragColor = mix(vec4(0.), col, pow(glow*2.,4.));
}
```
我们根据计算出的火焰的亮度来混合颜色，使得火焰看起来既明亮又充满动感。

## 动画与实时更新
为了使火焰效果随时间动态变化，我们需要不断更新着色器中的 iTime 和 iResolution 参数。我们可以通过如下代码来实现动画效果：

```javascript
function animate() {
  requestAnimationFrame(animate);
  
  material.uniforms.iTime.value += 0.01;
  material.uniforms.iResolution.value.set(
    renderer.domElement.width,
    renderer.domElement.height
  );
  
  renderer.render(scene, camera);
}
animate();
```
每一帧我们都会增加 iTime 的值，从而让火焰在屏幕上不断变化。

## 处理窗口大小变化
为了确保火焰效果在窗口尺寸变化时正确显示，我们需要监听窗口的 resize 事件，并更新渲染器的大小以及着色器的分辨率：

```javascript
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  material.uniforms.iResolution.value.set(
    renderer.domElement.width,
    renderer.domElement.height
  );
});
```
## 总结
在这篇博客中，我们通过使用 Three.js 和 GLSL 编写自定义着色器，成功实现了一个动态的火焰效果。通过噪声函数、Raymarching 技术以及实时更新参数，我们能够模拟出真实的火焰效果，并将其渲染到 Web 页面上。希望本教程能为你提供一些灵感，帮助你在自己的项目中实现类似的效果！