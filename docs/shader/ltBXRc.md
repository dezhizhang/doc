# 使用 Three.js  创建动态光效

> 大家好！我是 [数擎AI]，一位热爱探索新技术的前端开发者，在这里分享前端和Web3D、AI技术的干货与实战经验。如果你对技术有热情，欢迎关注我的文章，我们一起成长、进步！
> **开发领域**：前端开发 | AI 应用 | Web3D | 元宇宙  
> **技术栈**：JavaScript、React、ThreeJs、WebGL、Go  
> **经验经验**：6 年+ 前端开发经验，专注于图形渲染和 AI 技术  
> **经验经验**：[演示地址](https://shader.shuqin.cc/cine-shader) 
> **开源项目**：[AI智简未来](https://aint.top)、[晓智元宇宙](https://xiaozhi.shop/)、[数字孪生引擎](https://www.shuqin.cc/)  [源码地址](https://github.com/dezhizhang/shadertoy)

<!-- https://www.shadertoy.com/view/ltBXRc -->

在这篇文章中，我们将使用 `Three.js` 的 `ShaderMaterial` 创建一个带有动态变化效果的自定义 Shader。这个 Shader 主要实现了一个动态变形的圆形，同时结合了旋转变换与颜色渐变，创造出一种流动的光影效果。

## 1 顶点着色器

在 vertexShader 部分，我们只做了基础的 UV 传递：

```glsl
varying vec2 vUv;
void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
```

- vUv 变量用于传递纹理坐标。
- gl_Position 计算模型的顶点位置。

## 2. 片元着色器

片元着色器实现了几个关键功能：

### 2.1 2D 旋转

```glsl
mat2 rotate2d(float angle) {
    return mat2(cos(angle), -sin(angle),
                sin(angle), cos(angle));
}
```

通过 2D 旋转矩阵，可以实现纹理坐标的旋转变换。

### 2.2 动态扰动

```glsl
float variation(vec2 v1, vec2 v2, float strength, float speed) {
    return sin(dot(normalize(v1), normalize(v2)) * strength + iTime * speed) / 100.0;
}
```

variation 函数用于制造基于 iTime 变化的动态形变，利用 dot 计算两个归一化向量的点积，产生随时间变化的波动效果。

### 2.3 绘制光晕

```glsl
vec3 paintCircle(vec2 uv, vec2 center, float rad, float width) {
    vec2 diff = center - uv;
    float len = length(diff);
    len += variation(diff, vec2(0.0, 1.0), 5.0, 2.0);
    len -= variation(diff, vec2(1.0, 0.0), 5.0, 2.0);
    float circle = smoothstep(rad-width, rad, len) - smoothstep(rad, rad+width, len);
    return vec3(circle);
}
```

- smoothstep 用于平滑边缘，使得圆形边界渐变。
- variation 影响 len，从而形成动态形变效果。

### 2.4 最终颜色计算

```
void main() {
    vec2 uv = vUv;
    uv.x *= 1.5;
    uv.x -= 0.25;

    vec3 color;
    float radius = 0.35;
    vec2 center = vec2(0.5);

    color = paintCircle(uv, center, radius, 0.1);

    vec2 v = rotate2d(iTime) * uv;
    color *= vec3(v.x, v.y, 0.7 - v.y * v.x);

    color += paintCircle(uv, center, radius, 0.01);

    gl_FragColor = vec4(color, 1.0);
}
```

- uv.x 进行了拉伸和偏移，确保视觉效果更加协调。
- paintCircle 生成一个基本的圆形效果。
- 旋转后的 uv 影响颜色，使得画面更加生动。
- 最后增加一层微弱的光圈，使得边缘更加柔和。

## 完整代码
```js
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
camera.position.z = 1.5;

const shaderMaterial = new THREE.ShaderMaterial({
  uniforms: {
    iTime: { value: 0 },
    iResolution: { value: new THREE.Vector2() },
  },
  vertexShader: `
        varying vec2 vUv;
        void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `,
  fragmentShader: `
        uniform vec2 iResolution;
        uniform float iTime;
        varying vec2 vUv;

        mat2 rotate2d(float angle) {
            return mat2(cos(angle), -sin(angle),
                        sin(angle), cos(angle));
        }

        float variation(vec2 v1, vec2 v2, float strength, float speed) {
            return sin(dot(normalize(v1), normalize(v2)) * strength + iTime * speed) / 100.0;
        }

        vec3 paintCircle(vec2 uv, vec2 center, float rad, float width) {
            vec2 diff = center - uv;
            float len = length(diff);
            len += variation(diff, vec2(0.0, 1.0), 5.0, 2.0);
            len -= variation(diff, vec2(1.0, 0.0), 5.0, 2.0);
            float circle = smoothstep(rad-width, rad, len) - smoothstep(rad, rad+width, len);
            return vec3(circle);
        }

        void main() {
            vec2 uv = vUv;
            uv.x *= 1.5;
            uv.x -= 0.25;
            
            vec3 color;
            float radius = 0.35;
            vec2 center = vec2(0.5);
            
            color = paintCircle(uv, center, radius, 0.1);
            vec2 v = rotate2d(iTime) * uv;
            color *= vec3(v.x, v.y, 0.7 - v.y * v.x);
            color += paintCircle(uv, center, radius, 0.01);
            
            gl_FragColor = vec4(color, 1.0);
        }
    `,
});

const geometry = new THREE.PlaneGeometry(2, 2);
const mesh = new THREE.Mesh(geometry, shaderMaterial);
scene.add(mesh);

function updateResolution() {
  shaderMaterial.uniforms.iResolution.value.set(
    window.innerWidth,
    window.innerHeight
  );
}
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  updateResolution();
});
updateResolution();

function animate() {
  requestAnimationFrame(animate);
  shaderMaterial.uniforms.iTime.value = performance.now() / 1000;
  controls.update();
  renderer.render(scene, camera);
}
animate();

```