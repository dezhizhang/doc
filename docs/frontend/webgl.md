### WebGL 快速入门：构建你的第一个 3D 应用


> **开发领域**：前端开发 | AI 应用 | Web3D | 元宇宙  
> **技术栈**：JavaScript、React、Three.js、WebGL、Go  
> **经验经验**：6年+ 前端开发经验，专注于图形渲染和AI技术  
> **开源项目**：[github](https://github.com/dezhizhang) [晓智元宇宙](https://www.xiaozhi.shop/)、[数字孪生引擎](https://www.shuqin.cc/)、[前端面试题](https://fe.shuqin.cc/)   
> 大家好！我是 [晓智]，一位热爱探索新技术的前端开发者，在这里分享前端和Web3D、AI技术的干货与实战经验。如果你对技术有热情，欢迎关注我的文章，我们一起成长、进步！


WebGL 是一种在浏览器中渲染 3D 图形的技术，使开发者可以通过 JavaScript 创建互动的 3D 场景。作为前端开发者，了解 WebGL 不仅能够拓宽开发能力，还能提升网页的互动性和视觉效果。本文将带你快速入门 WebGL，帮助你了解其基础原理并创建一个简单的 3D 应用。

---

### 1. 什么是 WebGL？

WebGL（Web Graphics Library）是基于 OpenGL ES 2.0 的一个 JavaScript API，支持在浏览器中绘制 2D 和 3D 图形。它与 HTML5 完全兼容，适用于 Chrome、Firefox、Safari 等主流浏览器，无需插件即可渲染高质量图形。通过 WebGL，开发者可以实现：

- **3D 渲染**：创建复杂的 3D 场景和模型。
- **硬件加速**：通过 GPU 渲染，提供高性能图形处理。
- **跨平台**：支持跨平台的网页和 Web 应用图形渲染。

---

### 2. WebGL 工作原理

WebGL 的核心原理是使用 GPU 进行渲染，它通过 OpenGL 的着色器编程来实现图形绘制。WebGL 的渲染过程主要包括以下几个步骤：

1. **创建上下文**：使用 JavaScript 创建 WebGL 渲染上下文（`WebGLRenderingContext`）。
2. **加载着色器**：定义顶点着色器和片段着色器，控制图形的形状和颜色。
3. **缓冲区管理**：定义和加载顶点数据到缓冲区。
4. **绘制图形**：调用 WebGL API 绘制出图形并将其显示在画布上。
---

### 3. 创建一个简单的 WebGL 程序

我们将使用 WebGL 创建一个简单的彩色三角形，以帮助你理解 WebGL 的基础用法。

#### 步骤 1：设置 HTML 画布

在 HTML 文件中添加一个用于渲染的 `<canvas>` 元素：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>WebGL 入门</title>
  </head>
  <body>
    <canvas id="glcanvas" width="640" height="480"></canvas>
    <script src="webgl.js"></script>
  </body>
</html>
```
---

#### 步骤 2：初始化 WebGL 上下文

创建 webgl.js 文件，用于初始化 WebGL 上下文并配置画布：

```js
const canvas = document.getElementById('glcanvas');
const gl = canvas.getContext('webgl');

if (!gl) {
  console.error('WebGL 初始化失败，浏览器可能不支持 WebGL。');
}
```
---

#### 步骤 3：定义着色器

编写顶点着色器和片段着色器代码，并将其加载到 WebGL 程序中。顶点着色器负责定义三角形的三个顶点位置，而片段着色器定义顶点的颜色：

```js
// 顶点着色器源码
const vertexShaderSource = `
    attribute vec2 a_position;
    void main() {
        gl_Position = vec4(a_position, 0, 1);
    }
`;

// 片段着色器源码
const fragmentShaderSource = `
    precision mediump float;
    uniform vec4 u_color;
    void main() {
        gl_FragColor = u_color;
    }
`;
```
---

#### 步骤 4：编译和连接着色器

将着色器代码编译为 WebGL 程序，以便在 GPU 中运行：

```js
function createShader(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error('着色器编译失败：', gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
const fragmentShader = createShader(
  gl,
  gl.FRAGMENT_SHADER,
  fragmentShaderSource,
);

const program = gl.createProgram();
gl.attachShader(program, vertexShader);
gl.attachShader(program, fragmentShader);
gl.linkProgram(program);

if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
  console.error('程序链接失败：', gl.getProgramInfoLog(program));
}
gl.useProgram(program);
```

### 步骤 5：创建三角形顶点数据
---

将三角形的顶点位置传入 WebGL 的缓冲区：

```js
const positionBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
const positions = [0, 1, -1, -1, 1, -1];
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
```

### 步骤 6：将数据绑定到着色器属性并绘制图形

最后，绑定顶点数据，并通过 WebGL 绘制出三角形：

```js
const positionAttributeLocation = gl.getAttribLocation(program, 'a_position');
gl.enableVertexAttribArray(positionAttributeLocation);
gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);

const colorUniformLocation = gl.getUniformLocation(program, 'u_color');
gl.uniform4f(colorUniformLocation, 0, 0.5, 0.5, 1); // 设置颜色

gl.clearColor(0, 0, 0, 0);
gl.clear(gl.COLOR_BUFFER_BIT);
gl.drawArrays(gl.TRIANGLES, 0, 3);
```
---
### 4. 扩展你的 WebGL 知识

以上我们完成了一个简单的三角形绘制，这只是 WebGL 的基础。进一步学习中，可以深入了解以下内容：

- 矩阵变换：学习如何使用矩阵实现旋转、缩放、平移等变换。
- 纹理贴图：为 3D 对象添加纹理，实现更逼真的图形效果。
- 光照效果：通过光照模拟提升 3D 场景的真实感。
- 三维对象：利用 WebGL 绘制复杂的 3D 模型（例如立方体、球体等）。

---
### 5. 常用的 WebGL 开发工具和库
对于初学者来说，直接使用 WebGL 编程可能较为复杂，因此可以使用一些 WebGL 的辅助库：

- Three.js：提供高级封装的 WebGL API，简化 3D 场景的创建和管理。
- Babylon.js：另一个功能强大的 3D 引擎，支持动画、物理和大量 3D 渲染功能。
- PlayCanvas：专注于游戏开发的 WebGL 引擎，提供完整的开发和调试环境。
---

### 总结
通过 WebGL，你可以将 3D 图形和动画带入网页，提升用户的互动体验。本文介绍了 WebGL 的基础工作原理并实现了一个简单的三角形渲染示例。希望这些内容能帮助你入门 WebGL，并为后续深入学习 3D 开发奠定基础。
