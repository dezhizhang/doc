# 使用 Three.js 实现热力渐变效果

> 大家好！我是 [数擎 AI]，一位热爱探索新技术的前端开发者，在这里分享前端和 Web3D、AI 技术的干货与实战经验。如果你对技术有热情，欢迎关注我的文章，我们一起成长、进步！
> **开发领域**：前端开发 | AI 应用 | Web3D | 元宇宙  
> **技术栈**：JavaScript、React、ThreeJs、WebGL、Go  
> **经验经验**：6 年+ 前端开发经验，专注于图形渲染和 AI 技术  
> **经验经验**：[演示地址](https://shader.shuqin.cc/lscczl)
> **开源项目**：[智简未来](https://aint.top)、[晓智元宇宙](https://xiaozhi.shop/)、[数字孪生引擎](https://www.shuqin.cc/) 、[源码地址](https://github.com/dezhizhang/shadertoy)


在这篇文章中，我们将通过 Three.js 实现一个简单而炫酷的热力渐变效果。我们将使用着色器（Shader）来模拟热力图，创造出动态的渐变效果。这种效果常用于可视化数据，或者只是为了增加网页的视觉冲击力。

## 项目概述

我们使用 Three.js 来创建一个全屏的 WebGL 场景，通过自定义的着色器（Shader）渲染一个动态的热力渐变效果。这个效果展示了从冷到热的渐变色，并通过动态的点位置变化模拟热力分布的变化。

## 环境搭建

首先，需要在 HTML 中引入 Three.js 库，我们使用了 CDN 来引入：

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
```
这将为我们提供 Three.js 的核心功能，如创建场景、相机、渲染器以及应用自定义着色器等。

## 创建基本场景
在 JavaScript 中，我们首先创建了一个基础的 3D 场景，其中包括相机、渲染器以及全屏的平面几何体来显示效果。
```js
let scene, camera, renderer, material;

function init() {
    scene = new THREE.Scene();
    camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
}

```
- 相机：我们使用了正交相机（THREE.OrthographicCamera）来渲染二维平面，这种相机没有透视效果，适合渲染平面效果。
- 渲染器：通过 THREE.WebGLRenderer 实现高效的 3D 渲染。
- 全屏平面：为了将热力渐变效果显示为全屏，我们使用了一个 2x2 的平面几何体 (THREE.PlaneGeometry)，并将其拉伸到全屏。
```js
const plane = new THREE.PlaneGeometry(2, 2);
const mesh = new THREE.Mesh(plane, material);
scene.add(mesh);

```
## 自定义着色器
着色器（Shader）是实现热力渐变效果的核心部分。我们通过自定义的顶点着色器和片段着色器来控制每个像素的颜色变化。

### 顶点着色器
顶点着色器的作用是计算每个顶点的坐标和纹理坐标，在这里我们只是将纹理坐标传递给片段着色器：
```glsl
vertexShader: `
    varying vec2 vUv;
    void main() {
        vUv = uv;
        gl_Position = vec4(position, 1.0);
    }
`

```
### 片段着色器
片段着色器的主要任务是根据热力分布计算每个像素的颜色。我们使用了一个简单的色彩渐变算法，将不同的权重值映射到不同的颜色，并生成最终的热力图效果。
```glsl
fragmentShader: `
    precision highp float;
    uniform float iTime;
    uniform vec2 iResolution;
    varying vec2 vUv;

    // 渐变颜色定义
    const vec3 colors[5] = vec3[](
        vec3(0.,0.,0.6),
        vec3(0.,1.,1.),
        vec3(0.0,1.0,0.),
        vec3(1.0,1.0,0.),
        vec3(1.0,0.0,0.)
    );

    const float points[5] = float[](
        0.0, 0.15, 0.5, 0.65, 1.0
    );

    vec3 gradian(vec3 c1, vec3 c2, float a) {
        return mix(c1, c2, a);
    }

    vec3 heat4(float weight) {
        if(weight <= points[0]) return colors[0];
        if(weight >= points[4]) return colors[4];

        for(int i = 1; i < 5; i++) {
            if(weight < points[i]) {
                float a = (weight - points[i-1]) / (points[i] - points[i-1]);
                return gradian(colors[i-1], colors[i], a);
            }
        }
        return vec3(0.0);
    }

    float d(vec2 a, vec2 b) {
        return pow(max(0.0, 1.0 - distance(a, b) / 0.6), 2.0);
    }

    void main() {
        vec2 uv = vUv * 4.0 - vec2(2.0);
        uv.x *= iResolution.x / iResolution.y;

        float totalWeight = 0.0;

        // 优化循环次数为常量表达式
        for (float i = 0.0; i < 112.0; i += 1.0) {
            totalWeight += 0.5 * d(uv, vec2(
                sin(iTime * 0.3 + i) * 2.0 + 2.0 * sin(i * i),
                cos(iTime * 0.4 + i * 1.5) * 2.0
            ));
        }

        gl_FragColor = vec4(heat4(totalWeight), 1.0);
    }
`

```
- 渐变颜色：我们定义了五个颜色，从深蓝到红色，代表从冷到热的渐变。
- 权重计算：我们使用了一个简单的函数 d() 来计算每个像素的权重，根据距离和时间动态生成热力分布。

## 动画效果
我们使用 requestAnimationFrame 来创建一个平滑的动画效果。每一帧，时间和分辨率都会被更新，从而动态改变热力渐变效果的颜色。
```js
function animate() {
    requestAnimationFrame(animate);
    material.uniforms.iTime.value = performance.now() / 1000;
    renderer.render(scene, camera);
}

animate();

```
## 响应式设计
为了确保热力渐变效果在不同屏幕尺寸下都能正常显示，我们通过监听窗口尺寸变化事件来动态调整渲染器的尺寸和分辨率：
```js
function onWindowResize() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    renderer.setSize(width, height);
    material.uniforms.iResolution.value.set(width, height);
}

window.addEventListener('resize', onWindowResize);

```
## 完整代码
```js
import * as THREE from 'three';

let scene, camera, renderer, material;
        
function init() {
    // 初始化场景
    scene = new THREE.Scene();
    camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // 着色器材质配置
    const uniforms = {
        iTime: { value: 0 },
        iResolution: { value: new THREE.Vector2() }
    };

    material = new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader: `
            varying vec2 vUv;
            void main() {
                vUv = uv;
                gl_Position = vec4(position, 1.0);
            }
        `,
        fragmentShader: `
            precision highp float;
            uniform float iTime;
            uniform vec2 iResolution;
            varying vec2 vUv;

            // 渐变颜色定义
            const vec3 colors[5] = vec3[](
                vec3(0.,0.,0.6),
                vec3(0.,1.,1.),
                vec3(0.0,1.0,0.),
                vec3(1.0,1.0,0.),
                vec3(1.0,0.0,0.)
            );
            
            const float points[5] = float[](
                0.0, 0.15, 0.5, 0.65, 1.0
            );

            vec3 gradian(vec3 c1, vec3 c2, float a) {
                return mix(c1, c2, a);
            }

            vec3 heat4(float weight) {
                if(weight <= points[0]) return colors[0];
                if(weight >= points[4]) return colors[4];
                
                for(int i = 1; i < 5; i++) {
                    if(weight < points[i]) {
                        float a = (weight - points[i-1]) / (points[i] - points[i-1]);
                        return gradian(colors[i-1], colors[i], a);
                    }
                }
                return vec3(0.0);
            }

            float d(vec2 a, vec2 b) {
                return pow(max(0.0, 1.0 - distance(a, b) / 0.6), 2.0);
            }

            void main() {
                vec2 uv = vUv * 4.0 - vec2(2.0);
                uv.x *= iResolution.x / iResolution.y;
                
                float totalWeight = 0.0;
                
                // 优化循环次数为常量表达式
                for (float i = 0.0; i < 112.0; i += 1.0) {
                    totalWeight += 0.5 * d(uv, vec2(
                        sin(iTime * 0.3 + i) * 2.0 + 2.0 * sin(i * i),
                        cos(iTime * 0.4 + i * 1.5) * 2.0
                    ));
                }
                
                gl_FragColor = vec4(heat4(totalWeight), 1.0);
            }
        `
    });

    // 创建全屏平面
    const plane = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(plane, material);
    scene.add(mesh);

    // 初始化分辨率
    onWindowResize();
    window.addEventListener('resize', onWindowResize);
}

function onWindowResize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    renderer.setSize(width, height);
    material.uniforms.iResolution.value.set(width, height);
}

function animate() {
    requestAnimationFrame(animate);
    material.uniforms.iTime.value = performance.now() / 1000;
    renderer.render(scene, camera);
}

init();
animate();
```