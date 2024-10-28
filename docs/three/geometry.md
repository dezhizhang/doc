# Three.js 自定义几何体 — 深入探索与应用

> **开发领域**：前端开发 | AI 应用 | Web3D | 元宇宙  
> **技术栈**：JavaScript、React、ThreeJs、WebGL、Go  
> **经验经验**：6年+ 前端开发经验，专注于图形渲染和AI技术  
> **开源项目**：[github](https://github.com/dezhizhang) [晓智元宇宙](https://www.xiaozhi.shop/)、[数字孪生引擎](https://www.shuqin.cc/)、[前端面试题](https://fe.shuqin.cc/)   
> 大家好！我是 [晓智]，一位热爱探索新技术的前端开发者，在这里分享前端和Web3D、AI技术的干货与实战经验。如果你对技术有热情，欢迎关注我的文章，我们一起成长、进步！


在 Three.js 中，几何体是构建 3D 模型的基础。虽然 Three.js 提供了多种几何体类型（如立方体、球体、平面、环形几何体等），但在某些项目中，你可能需要创建独特的几何形状，以满足个性化的需求。本篇博客将深入讲解如何在 Three.js 中构建和应用自定义几何体，帮助你理解其原理和构建方法，打造属于你的个性化 3D 模型。

---

## 一、几何体的基础知识

### 1.1 `Geometry` 与 `BufferGeometry`

在 Three.js 中，`Geometry` 和 `BufferGeometry` 是定义几何体的核心类：
- **Geometry**：Three.js 早期的几何类，结构简单，适合学习和入门。
- **BufferGeometry**：更高效的几何类，性能比 `Geometry` 更好，适合用于需要优化的应用中，现已成为标准。

### 1.2 几何体的基本结构

一个几何体通常包含以下几个部分：
- **顶点（Vertices）**：每个顶点由三维坐标 `(x, y, z)` 定义。
- **面（Faces）**：连接顶点形成三角形或四边形，构成几何体的表面。
- **法线（Normals）**：每个顶点或面的法向量，决定光照效果。
- **UV 坐标**：二维纹理坐标，用于将纹理贴到几何体表面。

---

## 二、使用 BufferGeometry 创建自定义几何体

`BufferGeometry` 提供了更细粒度的控制，可以让我们从零开始创建几何体。这包括定义顶点、索引、法线和 UV 等信息。

### 2.1 创建自定义顶点和面

首先，让我们从一个简单的几何体开始：自定义的平面。

```javascript
// 创建一个空的 BufferGeometry 实例
const geometry = new THREE.BufferGeometry();

// 定义顶点位置
const vertices = new Float32Array([
  -1.0, -1.0,  0.0,  // 左下角
   1.0, -1.0,  0.0,  // 右下角
   1.0,  1.0,  0.0,  // 右上角
  -1.0,  1.0,  0.0,  // 左上角
]);

// 设置顶点属性
geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
```
这里，我们手动定义了一个平面的四个顶点。每个顶点都有三个数值，分别对应 (x, y, z) 坐标。

### 2.2 使用索引创建面
在 Three.js 中，可以使用索引将顶点连接成面。接下来，我们将两个三角形组成一个正方形平面。

```javascript

const indices = new Uint16Array([
  0, 1, 2,  // 第一个三角形
  2, 3, 0   // 第二个三角形
]);

geometry.setIndex(new THREE.BufferAttribute(indices, 1));
```
### 2.3 添加法线和 UV 坐标
法线用于定义顶点的朝向，以确定光照效果，而 UV 坐标用于贴图纹理映射。

```javascript
// 添加法线
const normals = new Float32Array([
  0, 0, 1, // 顶点 0 的法线
  0, 0, 1, // 顶点 1 的法线
  0, 0, 1, // 顶点 2 的法线
  0, 0, 1  // 顶点 3 的法线
]);
geometry.setAttribute('normal', new THREE.BufferAttribute(normals, 3));

// 添加 UV 坐标
const uvs = new Float32Array([
  0, 0,  // 顶点 0 的 UV
  1, 0,  // 顶点 1 的 UV
  1, 1,  // 顶点 2 的 UV
  0, 1   // 顶点 3 的 UV
]);
geometry.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));
```
### 2.4 完整代码示例
我们现在可以使用这些顶点、索引、法线和 UV 来创建一个带纹理的平面几何体。

```javascript

const geometry = new THREE.BufferGeometry();
geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
geometry.setIndex(new THREE.BufferAttribute(indices, 1));
geometry.setAttribute('normal', new THREE.BufferAttribute(normals, 3));
geometry.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));

const texture = new THREE.TextureLoader().load('texture.jpg');
const material = new THREE.MeshStandardMaterial({ map: texture });
const mesh = new THREE.Mesh(geometry, material);

scene.add(mesh);
```
## 三、案例：创建自定义多边形
在实际项目中，可能需要创建复杂的自定义几何体，例如多边形、星形、甚至是带凹凸的曲面。接下来，我们将创建一个简单的星形几何体。

### 3.1 定义星形的顶点
星形的顶点通常可以通过极坐标公式生成。每个尖端和凹陷点的坐标依次排列，形成星形。

```javascript
const geometry = new THREE.BufferGeometry();
const vertices = [];

const numPoints = 5;
const outerRadius = 1;
const innerRadius = 0.5;

for (let i = 0; i < numPoints * 2; i++) {
  const angle = (i / (numPoints * 2)) * Math.PI * 2;
  const radius = i % 2 === 0 ? outerRadius : innerRadius;
  vertices.push(Math.cos(angle) * radius, Math.sin(angle) * radius, 0);
}

geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
```
### 3.2 设置索引并创建面
要构建星形的面，我们需要将顶点按顺序连接为三角形。通过循环连接每对顶点并封闭形状即可完成星形的索引。

```javascript

const indices = [];
for (let i = 0; i < vertices.length / 3; i++) {
  indices.push(i, (i + 1) % (vertices.length / 3), vertices.length / 3);
}

geometry.setIndex(indices);
geometry.computeVertexNormals();
```
### 3.3 渲染星形
将星形几何体应用于网格，并将其添加到场景中。

```javascript
const material = new THREE.MeshBasicMaterial({ color: 0xffff00, side: THREE.DoubleSide });
const star = new THREE.Mesh(geometry, material);
scene.add(star);
```
## 四、案例：曲面几何体
复杂几何体如曲面、波浪等，可以通过数学公式生成动态顶点。以下是如何生成简单波浪面几何体的步骤。

### 4.1 使用公式定义顶点
波浪效果的顶点可以通过正弦函数生成，形成动态起伏。

```javascript
const width = 10, height = 10;
const segments = 20;
const vertices = [];

for (let i = 0; i <= segments; i++) {
  for (let j = 0; j <= segments; j++) {
    const x = (i / segments) * width - width / 2;
    const z = (j / segments) * height - height / 2;
    const y = Math.sin(x) * Math.cos(z);
    vertices.push(x, y, z);
  }
}

const geometry = new THREE.BufferGeometry();
geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
```
### 4.2 设置索引和法线
定义索引以连接相邻的顶点形成面，并生成波浪法线。

```javascript
const indices = [];
for (let i = 0; i < segments; i++) {
  for (let j = 0; j < segments; j++) {
    const a = i * (segments + 1) + j;
    const b = i * (segments + 1) + j + 1;
    const c = (i + 1) * (segments + 1) + j;
    const d = (i + 1) * (segments + 1) + j + 1;

    indices.push(a, b, d);
    indices.push(d, c, a);
  }
}

geometry.setIndex(indices);
geometry.computeVertexNormals();
```
### 4.3 渲染曲面几何体
```javascript

const material = new THREE.MeshPhongMaterial({ color: 0x00ff00, wireframe: true });
const waveMesh = new THREE.Mesh(geometry, material);
scene.add(waveMesh);
```
### 五、总结
通过学习以上案例，你可以理解 Three.js 中自定义几何体的构建流程。自定义几何体的核心在于顶点、面、索引的合理组合，不论是简单的星形还是复杂的波浪，都能通过数学公式和顶点操作来实现。

三维世界的创造力在于对几何体的掌握，通过掌握顶点、法线、UV、索引等关键要素，你将能在 Three.js 中自由构建所需的各种形状，为你的 3D 项目增添更多独特的元素。

