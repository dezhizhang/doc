# Three.js Shader 与自定义材质——深入理解与应用

> **开发领域**：前端开发 | AI 应用 | Web3D | 元宇宙  
> **技术栈**：JavaScript、React、ThreeJs、WebGL、Go  
> **经验经验**：6 年+ 前端开发经验，专注于图形渲染和 AI 技术  
> **开源项目**：[github](https://github.com/dezhizhang) [晓智元宇宙](https://www.xiaozhi.shop/)、[数字孪生引擎](https://www.shuqin.cc/)、[前端面试题](https://fe.shuqin.cc/)  
> 大家好！我是 [晓智]，一位热爱探索新技术的前端开发者，在这里分享前端和 Web3D、AI 技术的干货与实战经验。如果你对技术有热情，欢迎关注我的文章，我们一起成长、进步！

在 Three.js 中，材质（Material）和着色器（Shader）是实现 3D 场景视觉效果的关键。基础材质如 `MeshBasicMaterial` 和 `MeshStandardMaterial` 提供了快捷的视觉效果，但它们的渲染选项有限，无法满足所有定制化需求。通过使用自定义 Shader，我们可以精确控制光照、纹理、颜色和其他视觉效果，从而实现更独特、细腻的视觉表现。

本篇文章将从 Shader 基础开始，深入探讨如何在 Three.js 中使用 ShaderMaterial 和自定义材质，探索 GLSL 语言及其在 Three.js 中的应用场景，帮助你构建灵活的 3D 特效和材质效果。

---

## 一、Shader 与 GLSL 基础

### 1.1 什么是 Shader

Shader（着色器）是一种在图形处理单元（GPU）上运行的小程序，用于控制图形渲染的视觉效果。Three.js 中的 Shader 使用 GLSL（OpenGL Shading Language）编写。着色器可以分为两个主要类型：

- **顶点着色器（Vertex Shader）**：处理每个顶点的位置、颜色等属性。
- **片段着色器（Fragment Shader）**：决定每个像素的最终颜色，通常用于处理纹理、光照等效果。

### 1.2 GLSL 基础语法

GLSL 是一种 C 语言风格的语言，常用于定义向量、矩阵以及各种图形处理函数。以下是 GLSL 的基本语法示例：

```glsl
// 顶点着色器 - vertex shader
precision mediump float;

attribute vec3 position; // 顶点位置
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;

void main() {
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}

// 片段着色器 - fragment shader
precision mediump float;

void main() {
  gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0); // 纯红色
}
```

### 1.3 Three.js 中的着色器材质

Three.js 提供了 ShaderMaterial 类，让我们可以使用自定义的 GLSL 代码定义材质效果。通过 vertexShader 和 fragmentShader 属性，我们可以直接编写 GLSL 代码来控制渲染效果。

## 二、Three.js 中的 ShaderMaterial

ShaderMaterial 是 Three.js 中用于加载自定义 Shader 的类，它让我们能够自定义顶点着色器和片段着色器，控制顶点、纹理、颜色及其他材质特性。

### 2.1 创建 ShaderMaterial

我们将创建一个简单的 ShaderMaterial，使用 GLSL 代码来渲染一个纯红色的网格。

```javascript
const vertexShader = `
  varying vec3 vPosition;
  
  void main() {
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  precision mediump float;
  varying vec3 vPosition;

  void main() {
    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0); // 纯红色
  }
`;

const material = new THREE.ShaderMaterial({
  vertexShader: vertexShader,
  fragmentShader: fragmentShader,
});

const geometry = new THREE.BoxGeometry();
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);
```

### 2.2 使用 Uniform 传递数据

Uniform 是 GLSL 中的一种全局变量，用于在着色器中接收来自 JavaScript 的数据。接下来我们将使用 uniform 定义颜色，并从 Three.js 传递颜色值到片段着色器。

```javascript
const vertexShader = `
  varying vec3 vPosition;
  void main() {
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  precision mediump float;
  uniform vec3 uColor;
  void main() {
    gl_FragColor = vec4(uColor, 1.0);
  }
`;

const material = new THREE.ShaderMaterial({
  vertexShader: vertexShader,
  fragmentShader: fragmentShader,
  uniforms: {
    uColor: { value: new THREE.Color(0x00ff00) },
  },
});
```

在 ShaderMaterial 的 uniforms 属性中定义 uColor，并设置初始值为绿色（0x00ff00），然后在 GLSL 中使用该值来控制片段的颜色。

## 三、案例：实现渐变材质

通过 Shader 自定义材质可以实现各种效果，其中一个常见的应用是渐变效果。下面是一个简单的渐变效果示例，通过 vPosition 的 Y 值来实现上下的颜色渐变。

```javascript
const vertexShader = `
  varying float vYPosition;
  void main() {
    vYPosition = position.y;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  precision mediump float;
  varying float vYPosition;
  
  void main() {
    float intensity = smoothstep(-1.0, 1.0, vYPosition);
    vec3 color = mix(vec3(0.0, 0.0, 1.0), vec3(1.0, 0.0, 0.0), intensity);
    gl_FragColor = vec4(color, 1.0);
  }
`;

const material = new THREE.ShaderMaterial({
  vertexShader: vertexShader,
  fragmentShader: fragmentShader,
});

const geometry = new THREE.CylinderGeometry(1, 1, 2, 32);
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);
```

分析
- 顶点着色器中定义 vYPosition 变量来存储 Y 坐标。
- 片段着色器中，根据 vYPosition 的值使用 mix 函数进行线性插值，生成渐变颜色。

## 四、案例：动态波浪效果

通过控制顶点的位移，可以实现动态波浪效果。我们将在顶点着色器中使用正弦函数控制顶点位置，使其上下移动。

```javascript
const vertexShader = `
  uniform float uTime;
  void main() {
    vec3 transformed = position;
    transformed.z += sin(transformed.x * 10.0 + uTime) * 0.1;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed, 1.0);
  }
`;

const fragmentShader = `
  precision mediump float;
  void main() {
    gl_FragColor = vec4(0.0, 0.5, 1.0, 1.0);
  }
`;

const material = new THREE.ShaderMaterial({
  vertexShader: vertexShader,
  fragmentShader: fragmentShader,
  uniforms: {
    uTime: { value: 0 },
  },
});

const geometry = new THREE.PlaneGeometry(5, 5, 32, 32);
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

function animate(time) {
  material.uniforms.uTime.value = time / 1000;
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
animate();
```

分析

- uTime 为传入的时间变量，在 animate 函数中实时更新，控制正弦波随时间变化。
- 通过 sin 函数生成 Z 轴上的波浪效果。

## 五、高级 Shader 技术：光照和纹理

### 5.1 实现自定义光照

在自定义 Shader 中实现光照效果，需计算光线和法线的角度，用于控制光源对模型的影响。

```javascript
const vertexShader = `
  varying vec3 vNormal;
  varying vec3 vPosition;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  precision mediump float;
  varying vec3 vNormal;
  varying vec3 vPosition;
  
  uniform vec3 uLightPosition;
  uniform vec3 uLightColor;

  void main() {
    vec3 lightDir = normalize(uLightPosition - vPosition);
    float diff = max(dot(vNormal, lightDir), 0.0);
    vec3 color = diff * uLightColor;
    gl_FragColor = vec4(color, 1.0);
  }
`;

const material = new THREE.ShaderMaterial({
  vertexShader: vertexShader,
  fragmentShader: fragmentShader,
  uniforms: {
    uLightPosition: { value: new THREE.Vector3(5, 5, 5) },
    uLightColor: { value: new THREE.Color(0xffffff) },
  },
});
```

## 总结

通过本章内容，我们了解了 Shader 与自定义材质的核心概念和实现方法。掌握 Shader 技术是创建个性化 3D 视觉效果的关键，能使你的作品更具表现力。希望通过本文，你能在项目中更灵活地应用 Shader 技术。
