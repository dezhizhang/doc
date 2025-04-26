# Threejs绘制小兩伞快拿去送给你的女神

> 大家好！我是 [数擎 AI]，一位热爱探索新技术的前端开发者，在这里分享前端和 Web3D、AI 技术的干货与实战经验。如果你对技术有热情，欢迎关注我的文章，我们一起成长、进步！
> **开发领域**：前端开发 | AI 应用 | Web3D | 元宇宙  
> **技术栈**：JavaScript、React、ThreeJs、WebGL、Go  
> **经验经验**：6 年+ 前端开发经验，专注于图形渲染和 AI 技术  
> **经验经验**：[演示地址](https://shader.shuqin.cc/lscczl) > **开源项目**：[AI 简历](https://aint.top)、[元宇宙](https://xiaozhi.shop/)、[数字孪生](https://www.shuqin.cc/)


### 1. SDF 函数（Signed Distance Functions）

<!-- https://www.shadertoy.com/view/4t2SRh -->


SDF 是一种通过数学公式定义形状的方式，常用于计算距离场。我们使用了几个 SDF 函数来构建图形：

- sdfCircle: 用于绘制圆形。
- sdfEllipse: 用于绘制椭圆形。
- sdfLine: 用于绘制线段。

每个 SDF 函数返回一个值，表示当前像素到形状的距离。如果这个距离小于某个阈值，则表示像素在形状内部。

```glsl
float sdfCircle(vec2 center, float radius, vec2 coord) {
  vec2 offset = coord - center;
  return sqrt((offset.x * offset.x) + (offset.y * offset.y)) - radius;
}
```

### 2. 布尔操作函数

SDF 可以通过布尔运算进行组合，例如求并集、差集和交集。我们在代码中使用了以下几种操作：

- sdfUnion: 返回两个形状的并集。

- sdfDifference: 返回两个形状的差集。

- sdfIntersection: 返回两个形状的交集。

```glsl
float sdfUnion(float a, float b) { return min(a, b); }
float sdfDifference(float a, float b) { return max(a, -b); }
float sdfIntersection(float a, float b) { return max(a, b); }
```

这些运算让我们能够通过数学方式灵活地合成复杂的图形。

### 3. 渲染函数

render 函数负责将计算出的形状绘制到屏幕上。它通过 smoothstep 函数实现抗锯齿效果，并根据距离来调整颜色的透明度。

```glsl
vec4 render(float d, vec3 color, float stroke) {
float anti = fwidth(d) \* 1.0;
vec4 strokeLayer = vec4(vec3(0.05), 1.0 - smoothstep(-anti, anti, d - stroke));
vec4 colorLayer = vec4(color, 1.0 - smoothstep(-anti, anti, d));
return stroke < 0.000001 ? colorLayer : vec4(mix(strokeLayer.rgb, colorLayer.rgb, colorLayer.a), strokeLayer.a);
}
```

这个函数通过逐层混合不同颜色和透明度来呈现复杂的视觉效果。

### 4.动态条纹

我们还使用了正弦函数 sin() 来生成动态条纹效果。sin(uv.x \* 40.0) 使得图案随时间变化，创造出条纹的动感效果。

```glsl
vec2 sinuv = vec2(uv.x, (sin(uv.x _ 40.0) _ 0.02 + 1.0) \* uv.y);
```

通过改变 time 参数，这些条纹会在场景中随着时间不断变化，增强动画效果的表现力。

### 5. 背景与图层混合

为了让图形与背景更好地融合，我们使用了图层混合和背景颜色的处理。每个图层根据其透明度逐渐与背景颜色混合，最终得出渲染结果。

```glsl
vec3 bcol = vec3(1.0, 0.8, 0.7 - 0.07 _ p.y) _ (1.0 - 0.25 \* length(p));
fragColor.rgb = mix(fragColor.rgb, layer0.rgb, layer0.a);
fragColor.rgb = mix(fragColor.rgb, layer1.rgb, layer1.a);
fragColor.rgb = mix(fragColor.rgb, layer2.rgb, layer2.a);
```

### 6. Gamma 校正

为了调整最终的颜色输出并确保其符合人眼的感知，采用了 Gamma 校正。通过将颜色值提升到 1.0 / 2.2 的幂次方，我们可以得到更为自然的视觉效果。

```glsl
fragColor.rgb = pow(fragColor.rgb, vec3(1.0 / 2.2));
```

### 7. 完整代码

```js
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// 1. 初始化Three.js基础场景
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

// 顶点着色器
const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelMatrix * viewMatrix * vec4(position, 1.0);
}
`;

// 片元着色器
const fragmentShader = `
uniform vec2 resolution;
uniform float time;
varying vec2 vUv;

float sdfCircle(vec2 center, float radius, vec2 coord) {
  vec2 offset = coord - center;
  return sqrt((offset.x * offset.x) + (offset.y * offset.y)) - radius;
}

float sdfEllipse(vec2 center, float a, float b, vec2 coord) {
  float a2 = a * a;
  float b2 = b * b;
  return (b2 * (coord.x - center.x) * (coord.x - center.x) +
         a2 * (coord.y - center.y) * (coord.y - center.y) - a2 * b2)/(a2 * b2);
}

float sdfLine(vec2 p0, vec2 p1, float width, vec2 coord) {
  vec2 dir0 = p1 - p0;
  vec2 dir1 = coord - p0;
  float h = clamp(dot(dir0, dir1)/dot(dir0, dir0), 0.0, 1.0);
  return (length(dir1 - dir0 * h) - width * 0.5);
}

float sdfUnion(float a, float b) { return min(a, b); }
float sdfDifference(float a, float b) { return max(a, -b); }
float sdfIntersection(float a, float b) { return max(a, b); }

vec4 render(float d, vec3 color, float stroke) {
  float anti = fwidth(d) * 1.0;
  vec4 strokeLayer = vec4(vec3(0.05), 1.0-smoothstep(-anti, anti, d - stroke));
  vec4 colorLayer = vec4(color, 1.0-smoothstep(-anti, anti, d));
  return stroke < 0.000001 ? colorLayer : 
    vec4(mix(strokeLayer.rgb, colorLayer.rgb, colorLayer.a), strokeLayer.a);
}

void main() {
  float size = min(resolution.x, resolution.y);
  float pixSize = 1.0 / size;
  vec2 uv = vUv;
  float stroke = pixSize * 1.5;
  
  // 适配宽高比
  float aspect = resolution.y / resolution.x;
  vec2 center = vec2(0.5, 0.5 * aspect);

  // 主要形状
  float a = sdfEllipse(vec2(0.5, center.y*2.0-0.34), 0.25, 0.25, uv);
  float b = sdfEllipse(vec2(0.5, center.y*2.0+0.03), 0.8, 0.35, uv);
  b = sdfIntersection(a, b);
  vec4 layer1 = render(b, vec3(0.32, 0.56, 0.53), fwidth(b) * 2.0);

  // 动态条纹
  vec4 layer2 = layer1;
  vec2 sinuv = vec2(uv.x, (sin(uv.x*40.0)*0.02 + 1.0)*uv.y);
  for (float i = 0.0; i < 10.0; i++) {
    float t = mod(time + 0.3 * i, 3.0) * 0.2;
    float r0 = (t - 0.15)/0.2 * 0.9 + 0.1;
    float r1 = (t - 0.15)/0.2 * 0.1 + 0.9;
    float r2 = (t - 0.15)/0.2 * 0.15 + 0.85;
    
    float e = sdfEllipse(vec2(0.5, center.y*2.0+0.37-t*r2), 0.7*r0, 0.35*r1, sinuv);
    float f = sdfEllipse(vec2(0.5, center.y*2.0+0.41-t), 0.7*r0, 0.35*r1, sinuv);
    f = sdfDifference(e, f);
    f = sdfIntersection(f, b);
    vec4 layer = render(f, vec3(1.0, 0.81, 0.27), 0.0);
    layer2 = mix(layer2, layer, layer.a);
  }

  // 手柄绘制
  float bottom = 0.08;
  float handleWidth = 0.01;
  float handleRadius = 0.04;
  float d = sdfCircle(vec2(0.5-handleRadius+0.5*handleWidth, bottom), handleRadius, uv);
  float c = sdfCircle(vec2(0.5-handleRadius+0.5*handleWidth, bottom), handleRadius-handleWidth, uv);
  d = sdfDifference(d, c);
  c = uv.y - bottom;
  d = sdfIntersection(d, c);
  c = sdfLine(vec2(0.5, center.y*2.0-0.05), vec2(0.5, bottom), handleWidth, uv);
  d = sdfUnion(d, c);
  c = sdfCircle(vec2(0.5, center.y*2.0-0.05), 0.01, uv);
  d = sdfUnion(c, d);
  c = sdfCircle(vec2(0.5-handleRadius*2.0+handleWidth, bottom), handleWidth*0.5, uv);
  d = sdfUnion(c, d);
  vec4 layer0 = render(d, vec3(0.404, 0.298, 0.278), stroke);

  // 背景混合
  vec2 p = (2.0*gl_FragCoord.xy-resolution.xy)/min(resolution.y, resolution.x);
  vec3 bcol = vec3(1.0,0.8,0.7-0.07*p.y)*(1.0-0.25*length(p));
  vec4 fragColor = vec4(bcol, 1.0);
  
  // 图层混合
  fragColor.rgb = mix(fragColor.rgb, layer0.rgb, layer0.a);
  fragColor.rgb = mix(fragColor.rgb, layer1.rgb, layer1.a);
  fragColor.rgb = mix(fragColor.rgb, layer2.rgb, layer2.a);
  
  // Gamma 校正
  fragColor.rgb = pow(fragColor.rgb, vec3(1.0/2.2));
  gl_FragColor = fragColor;
}
`;

// Three.js 材质创建
const material = new THREE.ShaderMaterial({
  vertexShader,
  fragmentShader,
  uniforms: {
    resolution: {
      value: new THREE.Vector2(window.innerWidth, window.innerHeight),
    },
    time: { value: 0 },
  },
});

// 3. 创建全屏平面并应用材质
const geometry = new THREE.PlaneGeometry(10, 10);
const plane = new THREE.Mesh(geometry, material);
scene.add(plane);

// 4. 相机位置和控制器
camera.position.z = 10;
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableZoom = false;

// 5. 响应窗口大小变化
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  shaderMaterial.uniforms.iResolution.value.set(
    renderer.domElement.width,
    renderer.domElement.height,
  );
});

// 6. 动画循环
function animate() {
  requestAnimationFrame(animate);
  material.uniforms.time.value = performance.now() / 1000;
  renderer.render(scene, camera);
}
animate();
```

### 总结

利用了 SDF 技术绘制了多个形状，并通过布尔运算组合它们，进一步通过动态条纹和动画效果增加了复杂度。通过理解这些 Shader 代码，你将能更好地掌控图形渲染的细节，并应用到更复杂的 Three.js 场景中希望通过这篇博客，你能够更深入地理解 Shader 编程，并将其应用于自己的项目中！
