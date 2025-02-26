# 使用 Three.js 转换 GLSL 粒子效果着色器

在这篇博客中，我们将探讨如何将一个经典的 GLSL 粒子效果着色器转换成 Three.js 可用的自定义着色器，并通过交互控制其行为。这将是一个逐步教程，帮助你理解如何在 Three.js 中应用自定义 GLSL 代码并通过鼠标交互调整效果。

## 目标

我们将使用 Three.js 渲染一个基于粒子的视觉效果，类似于一个动态生成的渐变色圆环，随着时间的推移，颜色和形状会发生变化。用户还可以通过鼠标移动来控制缩放和动画持续时间。

## 步骤一：准备工作

首先，你需要确保你的项目中包含了 Three.js。如果你还没有安装 Three.js，可以通过 npm 安装：

```bash
npm install three
```

如果你使用的是纯 HTML 文件，也可以直接在 HTML 中引入 Three.js：

```js
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
```

## 步骤二：GLSL 粒子效果着色器代码解析

原始的 GLSL 代码创建了一个基于时间变化的粒子系统，颜色从绿色到蓝色渐变，并且粒子的大小和分布随时间变化。核心的功能包括：

- 粒子数量（n）：控制生成的粒子数量。
- 起始和结束颜色（startColor 和 endColor）：粒子颜色的渐变。
- 粒子半径变化：随着粒子距离中心的变化，粒子的半径逐渐增大。
- 交互性：鼠标控制缩放和动画的持续时间。


## 步骤三：在 Three.js 中实现 GLSL 着色器

接下来，我们将创建一个简单的 Three.js 场景，并将这个 GLSL 着色器嵌入其中。

## 完整代码实现

```javascript

import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Shader code
const vertexShader = `
    void main() {
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`;

const fragmentShader = `
    uniform float iTime;
    uniform vec3 iResolution;
    uniform vec3 iMouse;

    void mainImage( out vec4 fragColor, in vec2 fragCoord ) {
        float t = iTime+5.0;
        float z = 6.0;
        const int n = 100; // particle count

        vec3 startColor = vec3(0.0, 0.64, 0.2);
        vec3 endColor = vec3(0.06, 0.35, 0.85);

        float startRadius = 0.84;
        float endRadius = 1.6;

        float power = 0.51;
        float duration = 4.0;

        vec2 s = iResolution.xy;
        vec2 v = z * (2.0 * fragCoord.xy - s) / s.y;

        // Mouse axis y => zoom
        if(iMouse.z > 0.0) v *= iMouse.y / s.y * 20.0;

        // Mouse axis x => duration
        if(iMouse.z > 0.0) duration = iMouse.x / s.x * 10.0;

        vec3 col = vec3(0.0);
        vec2 pm = v.yx * 2.8;
        float dMax = duration;

        float evo = (sin(iTime * 0.01 + 400.0) * 0.5 + 0.5) * 99.0 + 1.0;

        float mb = 0.0;
        float mbRadius = 0.0;
        float sum = 0.0;
        for(int i = 0; i < n; i++) {
            float d = fract(t * power + 48934.4238 * sin(float(i / int(evo)) * 692.7398));
            float tt = 0.0;
            float a = 6.28 * float(i) / float(n);

            float x = d * cos(a) * duration;
            float y = d * sin(a) * duration;

            float distRatio = d / dMax;
            mbRadius = mix(startRadius, endRadius, distRatio);

            vec2 p = v - vec2(x, y);
            mb = mbRadius / dot(p, p);
            sum += mb;

            col = mix(col, mix(startColor, endColor, distRatio), mb / sum);
        }

        sum /= float(n);
        col = normalize(col) * sum;

        sum = clamp(sum, 0.0, 0.4);

        vec3 tex = vec3(1.0);
        col *= smoothstep(tex, vec3(0.0), vec3(sum));

        fragColor.rgb = col;
    }

    void main() {
        vec2 fragCoord = gl_FragCoord.xy;
        mainImage(gl_FragColor, fragCoord);
    }
`;

const uniforms = {
    iTime: { value: 0.0 },
    iResolution: { value: new THREE.Vector3(window.innerWidth, window.innerHeight, 1) },
    iMouse: { value: new THREE.Vector3(0, 0, 0) }
};

const material = new THREE.ShaderMaterial({
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    uniforms: uniforms
});

const geometry = new THREE.PlaneGeometry(2, 2);
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Set camera position
camera.position.z = 5;

function animate() {
    requestAnimationFrame(animate);
    
    uniforms.iTime.value += 0.05; 

    window.addEventListener('mousemove', (event) => {
        uniforms.iMouse.value.x = event.clientX;
        uniforms.iMouse.value.y = window.innerHeight - event.clientY; 
        uniforms.iMouse.value.z = 1; 
    });

    renderer.render(scene, camera);
}

animate();
```

步骤四：代码解析

- ShaderMaterial 创建：我们通过 THREE.ShaderMaterial 来定义自定义的着色器，并将 GLSL 代码传入其中。通过 uniforms 对象传递外部变量（如时间、分辨率、鼠标位置）到着色器中。
- 顶点着色器：这是一个简单的顶点着色器，它将每个顶点的坐标从模型空间转换到裁剪空间。
- 片段着色器：在片段着色器中，我们实现了粒子效果的核心逻辑，包括动态计算粒子颜色、大小以及它们的分布。我们使用 sin 函数和一些数学操作来实现粒子效果的变化。
- 鼠标交互：通过 mousemove 事件监听器，我们捕捉到鼠标的 X 和 Y 位置，并传递给着色器。鼠标的 Y 轴控制图形的缩放，而 X 轴控制动画的持续时间。
- 动画循环：使用 requestAnimationFrame 来实现平滑的动画效果，定期更新时间和鼠标状态，并重新渲染场景。

## 步骤五：优化与扩展

在实际开发中，你可以根据需要对该代码进行优化和扩展。以下是一些常见的改进方式：

- 性能优化：增加粒子数量时可能会导致性能下降，可以通过减少 n 或优化粒子计算逻辑来改善性能。
- 扩展交互性：除了鼠标交互，你还可以加入键盘控制、触摸事件等方式，使用户体验更加丰富。
- 增加更多粒子效果：可以通过修改着色器中的数学公式，增加更多动态的粒子效果，如旋转、形状变化等。

## 总结

通过本教程，你学会了如何将一个 GLSL 粒子效果着色器转化为 Three.js 中的自定义着色器，并通过鼠标交互来控制图形的缩放和动画时间。这种方法让你可以在 Web 上实现复杂的视觉效果，具有高度的自定义性和灵活性。希望你
