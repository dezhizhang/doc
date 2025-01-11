# Three.js打造星空动画效果

> 大家好！我是 [数擎AI]，一位热爱探索新技术的前端开发者，在这里分享前端和Web3D、AI技术的干货与实战经验。如果你对技术有热情，欢迎关注我的文章，我们一起成长、进步！
> **开发领域**：前端开发 | AI 应用 | Web3D | 元宇宙  
> **技术栈**：JavaScript、React、ThreeJs、WebGL、Go  
> **经验经验**：6 年+ 前端开发经验，专注于图形渲染和 AI 技术  
> **经验经验**：[演示地址](https://shader.shuqin.cc/cine-shader) 
> **开源项目**：[AI智简未来](https://aint.top)、[晓智元宇宙](https://xiaozhi.shop/)、[数字孪生引擎](https://www.shuqin.cc/)  [源码地址](https://github.com/dezhizhang/shadertoy)

使用 Three.js 创建视觉震撼的着色器效果，尤其是将原生 GLSL 代码转换为 Three.js 格式时，可能显得有些复杂。在本文中，我们将以一个星空动画为例，探索如何将复杂的 GLSL 着色器转换为基于 Three.js 的动画效果。让我们开始吧！

## 1. 理解 GLSL 着色器代码
原始 GLSL 着色器用于生成动态的星空效果。以下是其主要功能的简要说明：

- Star 函数：计算单个星星的亮度和形状。
- Hash 函数：生成伪随机数，用于确定星星的位置。
- Star Layer：叠加多个星星，并通过颜色、大小和亮度变化来创建深度效果。
- Main Image：结合各种组件，包括变换和分层效果，渲染出最终的星空场景。
- 该着色器通过数学变换和多层次效果实现了一个生动的动态星空。

## Three.js 代码
为了在 Three.js 中实现这个效果，我们需要将 GLSL 代码嵌入到 ShaderMaterial 中，并利用 Three.js 的渲染管线。以下是完整的 Three.js 实现代码：
```js
import * as THREE from 'three';

// 创建场景和相机
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// 创建渲染器
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// GLSL 着色器代码
const vertexShader = `
varying vec2 vUv;

void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
#define NUM_LAYERS 10.0
uniform float iTime;
uniform vec2 iResolution;
uniform vec2 iMouse;

varying vec2 vUv;

// 旋转矩阵
mat2 Rot(float a) {
    float c = cos(a), s = sin(a);
    return mat2(c, -s, s, c);
}

// 星星函数
float Star(vec2 uv, float flare) {
    float col = 0.0;
    float d = length(uv);
    float m = 0.02 / d;

    float rays = max(0.0, 1.0 - abs(uv.x * uv.y * 1000.0));
    m += rays * flare;
    uv *= Rot(3.1415 / 4.0);
    rays = max(0.0, 1.0 - abs(uv.x * uv.y * 1000.0));
    m += rays * 0.3 * flare;

    m *= smoothstep(1.0, 0.2, d);

    return m;
}

// 随机数生成函数
float Hash21(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
}

// 星层函数
vec3 StarLayer(vec2 uv) {
    vec3 col = vec3(0.0);

    vec2 gv = fract(uv) - 0.5;
    vec2 id = floor(uv);

    for (int y = -1; y <= 1; y++) {
        for (int x = -1; x <= 1; x++) {
            vec2 offs = vec2(x, y);
            float n = Hash21(id + offs);
            float size = fract(n * 345.32);

            vec2 p = vec2(n, fract(n * 34.0));

            float star = Star(gv - offs - p + 0.5, smoothstep(0.8, 1.0, size) * 0.6);
            vec3 color = vec3(1.0, 0.25, 1.0 + size);
            col += star * size * color;
        }
    }

    return col;
}

// 主片段着色器
void main() {
    vec2 uv = (vUv * 2.0 - 1.0) * vec2(iResolution.x / iResolution.y, 1.0);
    uv *= 2.0;

    vec3 col = vec3(0.0);
    float t = iTime * 0.01;

    for (float i = 0.0; i < 1.0; i += 1.0 / NUM_LAYERS) {
        float depth = fract(i + t);
        float scale = mix(20.0, 0.5, depth);
        col += StarLayer(uv * scale + i * 453.2);
    }

    gl_FragColor = vec4(col, 1.0);
}
`;

// 创建材质
const material = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
        iTime: { value: 0 },
        iResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
        iMouse: { value: new THREE.Vector2(0, 0) }
    }
});

// 创建平面网格
const geometry = new THREE.PlaneGeometry(2, 2);
const plane = new THREE.Mesh(geometry, material);
scene.add(plane);

// 渲染循环
function animate() {
    material.uniforms.iTime.value += 0.05;
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

animate();

```

## 3. 实现效果和优化
运行上述代码，你将看到一个动态星空动画。以下是一些优化建议：

动态交互：通过监听鼠标事件，将 iMouse 的值传递给着色器，实现星空视角的动态调整。
性能优化：根据需求调整 NUM_LAYERS 和星星的密度，平衡视觉效果与性能。
颜色调整：修改 StarLayer 中的颜色计算逻辑，自定义星空的色彩方案。

## 4. 结语
通过将 GLSL 着色器嵌入到 Three.js 中，我们可以实现极具视觉吸引力的动画效果。这种方式不仅适合星空动画，还可以扩展到其他复杂的着色器场景。如果你对 GLSL 和 Three.js 的结合有更多想法，欢迎交流与讨论！

<div align="center">数擎AI公众号</div>
<div align="center"> <img src="https://cdn.shuqin.cc/aint/assets/weixin.svg" width = 300 height = 300 /> </div>

