Three.js 实现云状特效
https://www.shadertoy.com/view/XljBW3

在本文中，我们将从一个基于 GLSL 的云状特效 shader 出发，讲解 shader 的实现过程和所涉及的数学原理。

## 一、Shader 实现细节解析

### 1. 宏定义与时间控制

我们在 shader 开始部分定义了两个常用的数学常量：

```glsl
#define PI2 6.28318530718
#define PI 3.1416
```

- 同时，iTime 作为 uniform 变量传入，使得图案能随时间动态变化，从而实现动画效果。

### 2. 坐标变换与周期函数

在 vorocloud 函数中，首先通过下面这行代码对输入坐标 p 进行周期性处理：

```glsl
vec2 pp = cos(vec2(p.x * 14.0, (16.0 * p.y + cos(floor(p.x * 30.0)) + iTime * PI2)));
```

- 周期性函数：利用 cos 函数生成周期性变化，调整水平方向和垂直方向上的频率。
- 离散扰动：通过 floor 与 cos 的组合，引入了不规则性，使得最终效果更接近自然云彩的随机分布。
- 时间因子：引入 iTime，使图案随时间平滑过渡，产生动画效果。

### 3. 非线性空间扭曲

接下来对坐标 p 进行非线性扭曲：

```glsl
p = cos(p * 12.1 + pp * 10.0 + 0.5 * cos(pp.x * 10.0));
```

这种多重余弦变换使得原始坐标发生复杂扰动，从而获得更为自然和丰富的纹理变化。

### 4. 计算距离并确定最小值

我们预设了 4 个参考点：

```glsl
vec2 pts[4];
pts[0] = vec2(0.5, 0.6);
pts[1] = vec2(-0.4, 0.4);
pts[2] = vec2(0.2, -0.7);
pts[3] = vec2(-0.3, -0.4);
```

通过遍历这些点，并根据当前计算得到的 pp 坐标计算欧几里得距离：

```glsl

float d = 5.0;
for(int i = 0; i < 4; i++){
pts[i].x += 0.03 _ cos(float(i)) + p.x;
pts[i].y += 0.03 _ sin(float(i)) + p.y;
d = min(d, distance(pts[i], pp));
}
```

数学上，我们使用的欧几里得距离公式为：

- 这里，d 表示当前点与各参考点中最接近的距离。

### 5. 指数衰减与量化

在获得最小距离后，通过以下公式计算最终的亮度因子：

```glsl
f = 2.0 * pow(1.0 - 0.3 * d, 13.0);
f = min(f, 1.0);
```

数学公式推导如下：

- 线性衰减：首先计算 1.0 - 0.3 \* d，使得距离越大，值越小。

- 非线性提升：对上述值取 13 次幂，公式为：

这种处理使得靠近目标区域的值迅速趋向于 1，而远离区域迅速衰减到 0。

放缩与截断：最终乘以 2.0 并用 min 限制最大值为 1.0，确保亮度值始终在 [0, 1] 区间内。

### 6. 最终图像构建

在 scene 函数中，我们通过两次调用 vorocloud 函数，在不同尺度上生成图案，并根据返回值对颜色通道进行混合：

```glsl
vec4 col = vec4(0.0);
col.g += 0.02;

float v = vorocloud(p);
v = 0.2 _ floor(v _ 5.0);

col.r += 0.1 _ v;
col.g += 0.6 _ v;
col.b += 0.5 \* pow(v, 5.0);

v = vorocloud(p _ 2.0);
v = 0.2 _ floor(v \* 5.0);

col.r += 0.1 _ v;
col.g += 0.2 _ v;
col.b += 0.01 \* pow(v, 5.0);
```

- 量化效果：利用 floor 函数将连续值离散化，产生分级的视觉效果。
- 多层混合：在不同尺度下叠加效果，增强了图像的层次感和细节。

## 二、数学原理总结

### 1. 周期函数与坐标扭曲：

利用 cos 与 sin 函数，使得图案在各个方向上呈现出周期性和非线性变形效果。数学上，这是通过将线性坐标映射到周期函数上实现的，从而引入无限延展的波动性。

### 2. 欧几里得距离计算

使用基本的欧几里得距离公式确定当前像素与各参考点的最小距离，从而在空间中划分不同的影响区域。

### 3. 指数衰减与非线性变换

采用指数函数 𝑓=2×(1−0.3𝑑)13f=2×(1−0.3d)13 使得靠近参考点的区域迅速达到高亮，而远离区域则快速衰减到 0，为图像添加了锐利的边缘效果。

### 3 量化处理

通过对连续亮度值进行离散化处理，模拟出一种复古或艺术化的调色板效果，使得整体视觉更具层次和风格。

## 三、完整代码

```js
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// 创建场景
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);
camera.position.z = 1.5;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const uniforms = {
  iTime: { value: 0.0 },
  iResolution: {
    value: new THREE.Vector2(window.innerWidth, window.innerHeight),
  },
};

const material = new THREE.ShaderMaterial({
  uniforms,
  vertexShader: `
        varying vec2 vUv;
        void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `,
  fragmentShader: `
        #define PI2 6.28318530718
        #define PI 3.1416
        
        uniform float iTime;
        uniform vec2 iResolution;
        
        varying vec2 vUv;
        
        float vorocloud(vec2 p){
            float f = 0.0;
            vec2 pp = cos(vec2(p.x * 14.0, (16.0 * p.y + cos(floor(p.x * 30.0)) + iTime * PI2)));
            p = cos(p * 12.1 + pp * 10.0 + 0.5 * cos(pp.x * 10.0));
            
            vec2 pts[4];
            pts[0] = vec2(0.5, 0.6);
            pts[1] = vec2(-0.4, 0.4);
            pts[2] = vec2(0.2, -0.7);
            pts[3] = vec2(-0.3, -0.4);
            
            float d = 5.0;
            
            for(int i = 0; i < 4; i++){
                pts[i].x += 0.03 * cos(float(i)) + p.x;
                pts[i].y += 0.03 * sin(float(i)) + p.y;
                d = min(d, distance(pts[i], pp));
            }
            
            f = 2.0 * pow(1.0 - 0.3 * d, 13.0);
            f = min(f, 1.0);
            
            return f;
        }
        
        void main() {
            vec2 UV = vUv;
            vec2 p = UV - vec2(0.5);
            
            vec4 col = vec4(0.0);
            col.g += 0.02;
            
            float v = vorocloud(p);
            v = 0.2 * floor(v * 5.0);
            
            col.r += 0.1 * v;
            col.g += 0.6 * v;
            col.b += 0.5 * pow(v, 5.0);
            
            v = vorocloud(p * 2.0);
            v = 0.2 * floor(v * 5.0);
            
            col.r += 0.1 * v;
            col.g += 0.2 * v;
            col.b += 0.01 * pow(v, 5.0);
            
            col.a = 1.0;
            
            gl_FragColor = col;
        }
    `,
});

const plane = new THREE.PlaneGeometry(2, 2);
const quad = new THREE.Mesh(plane, material);
scene.add(quad);

const controls = new OrbitControls(camera, renderer.domElement);

function animate() {
  requestAnimationFrame(animate);
  uniforms.iTime.value += 0.01;
  renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  uniforms.iResolution.value.set(window.innerWidth, window.innerHeight);
});
```

## 总结

本文详细解析了如何利用数学工具（如周期函数、欧几里得距离、指数函数）构造出具有丰富层次和动态效果的云状特效。通过将 shader 实现我们可以轻松地将复杂的图形效果应用于 WebGL 项目中，同时也加深了对基于数学函数生成复杂图形原理的理解。
