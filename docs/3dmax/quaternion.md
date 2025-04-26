# Three.js 实现四元数（Quaternion）与常用运算



在 3D 图形学中，四元数是一种非常有效的旋转表示方法。与欧拉角和旋转矩阵相比，四元数在表示旋转时避免了万向锁问题，并且计算效率较高。在 Three.js 中，四元数由 `THREE.Quaternion` 类表示，它可以帮助我们更准确、更高效地进行旋转计算。

> 大家好！我是 [数擎AI]，一位热爱探索新技术的前端开发者，在这里分享前端和Web3D、AI技术的干货与实战经验。如果你对技术有热情，欢迎关注我的文章，我们一起成长、进步！  
> **开发领域**：前端开发 | AI 应用 | Web3D | 元宇宙  
> **技术栈**：JavaScript、React、ThreeJs、WebGL、Go  
> **经验经验**：6 年+ 前端开发经验，专注于图形渲染和 AI 技术  
> **开源项目**：[AI简历](https://aint.top)、[晓智科技](https://xiaozhi.shop/)、[数擎科技](https://www.shuqin.cc/) 

## 1. 什么是四元数？

四元数是一种扩展了复数的数学结构，由一个实部和三个虚部组成，通常表示为：

$$ q = w + xi + yj + zk $$

其中：

- `w` 是实部（标量部分）。
- `x, y, z` 是虚部（向量部分）。

在 3D 图形学中，四元数常用于表示物体的旋转。它提供了一种无奇异点、无万向锁的旋转方式，特别适合用于 3D 动画和物理引擎中。

## 2. 使用四元数进行旋转

### 2.1 创建四元数

在 Three.js 中，可以使用 `THREE.Quaternion` 来创建四元数。以下是几种常用的创建四元数的方法：

```javascript
// 创建单位四元数，表示没有旋转
const q1 = new THREE.Quaternion();

// 创建一个四元数，表示绕 Z 轴旋转 90 度（π/2 弧度）
const q2 = new THREE.Quaternion();
q2.setFromAxisAngle(new THREE.Vector3(0, 0, 1), Math.PI / 2);
```

### 2.2 使用四元数旋转物体

通过将四元数应用到物体的 rotation 属性，可以对物体进行旋转。

```javascript
const quaternion = new THREE.Quaternion();
quaternion.setFromAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI / 2);

// 使用四元数旋转物体
cube.quaternion.multiplyQuaternions(quaternion, cube.quaternion);
```

### 2.3 四元数与欧拉角的转换

可以将四元数转换为欧拉角，也可以将欧拉角转换为四元数。在 Three.js 中，我们可以使用 THREE.Euler 和 THREE.Quaternion 之间进行转换。

```javascript
// 将四元数转换为欧拉角
const euler = new THREE.Euler();
euler.setFromQuaternion(cube.quaternion);

// 将欧拉角转换为四元数
const newQuaternion = new THREE.Quaternion();
newQuaternion.setFromEuler(euler);
```

## 3. 四元数常用运算

四元数支持多种常见的数学运算，如加法、乘法、共轭、逆等。

### 3.1 四元数的乘法

四元数的乘法通常用于将两个旋转合成。通过乘法，可以得到两个旋转的复合旋转。

```javascript
const q1 = new THREE.Quaternion(0, 0, 0, 1); // 单位四元数
const q2 = new THREE.Quaternion(0, 1, 0, 0); // 绕 Y 轴旋转

const result = new THREE.Quaternion();
result.multiplyQuaternions(q1, q2); // 将 q1 和 q2 合成一个旋转
```

### 3.2 四元数的共轭

四元数的共轭用于表示与旋转方向相反的旋转。它在逆旋转、求逆时非常有用。

```javascript
const q = new THREE.Quaternion(0, 0, 0, 1); // 单位四元数

const conjugate = q.conjugate(); // 计算四元数的共轭
```

### 3.3 四元数的逆

四元数的逆表示与四元数旋转相反的旋转。在 Three.js 中，可以通过 invert() 方法计算逆四元数。

```javascript
const q = new THREE.Quaternion(0, 1, 0, 0); // 绕 Y 轴旋转

const inverse = q.clone().invert(); // 获取四元数的逆
```

### 3.4 四元数的归一化

四元数的归一化用于将四元数转换为单位四元数（模长为 1）。这是非常常见的操作，因为单位四元数表示一个有效的旋转。

```javascript
const q = new THREE.Quaternion(0, 1, 0, 0); // 绕 Y 轴旋转
q.normalize(); // 将四元数归一化
```

### 3.5 四元数的插值

在动画和物理引擎中，四元数的插值非常重要，它允许我们在两个旋转之间平滑过渡。Three.js 提供了 THREE.Quaternion.slerp() 方法进行球面线性插值（Slerp）。

```javascript
const q1 = new THREE.Quaternion(0, 0, 0, 1);
const q2 = new THREE.Quaternion(0, 1, 0, 0);

const result = new THREE.Quaternion();
result.slerp(q1, 0.5); // 在 q1 和 q2 之间进行 50% 的插值
```

## 4. 完整代码
```js
import * as THREE from "three";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
// 设置相机的位置
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({
  color: 0x00ff00,
});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

const quaternion = new THREE.Quaternion();
quaternion.setFromAxisAngle(new THREE.Vector3(0,1,0),Math.PI / 4);

cube.quaternion.multiplyQuaternions(quaternion,cube.quaternion);



function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();

```

## 5. 总结

四元数在 3D 图形学中是非常重要的工具，它为旋转提供了高效且稳定的表示方式。通过使用 THREE.Quaternion 类，你可以轻松地实现旋转、合成旋转、逆旋转等操作，避免了欧拉角和矩阵旋转的缺陷。常见的四元数运算，如乘法、共轭、逆、归一化和插值，可以帮助你创建更加平滑和高效的 3D 动画效果。
