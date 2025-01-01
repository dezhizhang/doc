# Three.js 中的四元数：理解与应用

> **开发领域**：前端开发 | AI 应用 | Web3D | 元宇宙  
> **技术栈**：JavaScript、React、ThreeJs、WebGL、Go  
> **经验经验**：6年+ 前端开发经验，专注于图形渲染和AI技术  
> **开源项目**：[智简未来](https://aint.top)、[晓智元宇宙](https://xiaozhi.shop/)、[数字孪生引擎](https://www.shuqin.cc/)   
> 大家好！我是 [晓智]，一位热爱探索新技术的前端开发者，在这里分享前端和Web3D、AI技术的干货与实战经验。如果你对技术有热情，欢迎关注我的文章，我们一起成长、进步！


在 3D 图形编程中，旋转是一个至关重要的操作。无论是动画中的物体旋转，还是游戏中的角色控制，如何高效、精确地处理旋转都会直接影响到项目的表现。在 Three.js 中，四元数（Quaternion）是旋转变换的基础，它解决了传统欧拉角旋转的一些问题。本文将深入探讨 Three.js 中的四元数，以及如何在 Three.js 中使用它们来实现流畅的 3D 旋转效果。

## 什么是四元数？

四元数是一种扩展复数的数学结构，由一个实数部分和三个虚数部分组成，通常表示为：

```js
q = w + xi + yj + zk;
```

其中：

- `w` 是实数部分
- `x, y, z` 是虚数部分，表示空间中的一个向量

四元数的主要优点是它们可以表示三维空间中的旋转，并且避免了欧拉角旋转常见的“万向节锁”问题。欧拉角旋转会导致某些旋转组合无法正确表示，而四元数的方式则能避免这种问题，从而提供更加稳定和高效的旋转表示。

## 四元数在 Three.js 中的应用

在 Three.js 中，旋转通常通过`THREE.Quaternion`对象来实现。四元数不仅在 3D 动画和物理仿真中使用，在摄像机控制和物体姿态控制等方面也有广泛应用。

### 1. 创建和初始化四元数

可以通过不同的方式来创建和初始化四元数，最常见的有以下几种方式：

```javascript
// 使用默认构造函数，表示单位四元数
const quaternion = new THREE.Quaternion();

// 通过轴-角度方式创建四元数（比如绕某个轴旋转30度）
const axis = new THREE.Vector3(0, 1, 0); // 绕Y轴旋转
const angle = Math.PI / 6; // 30度（弧度）
const quaternionFromAxisAngle = new THREE.Quaternion().setFromAxisAngle(
  axis,
  angle,
);

// 使用欧拉角创建四元数
const euler = new THREE.Euler(Math.PI / 4, 0, 0); // 绕X轴旋转45度
const quaternionFromEuler = new THREE.Quaternion().setFromEuler(euler);
```

2. 应用四元数旋转
   在 Three.js 中，物体的旋转可以直接通过四元数进行设置。例如，设置一个物体的旋转为一个四元数：

```js
// 假设有一个物体
const mesh = new THREE.Mesh(geometry, material);

// 使用四元数来旋转物体
const quaternion = new THREE.Quaternion().setFromAxisAngle(
  new THREE.Vector3(0, 1, 0),
  Math.PI / 4,
); // 绕Y轴旋转45度
mesh.rotation.setFromQuaternion(quaternion);
```

3. 四元数和欧拉角的转换
   尽管四元数是旋转的更优方式，但有时我们仍然需要使用欧拉角进行旋转控制，特别是与用户输入交互时。Three.js 提供了从四元数到欧拉角的转换方法：

```javascript
复制代码;
const quaternion = new THREE.Quaternion();
const euler = new THREE.Euler();
euler.setFromQuaternion(quaternion); // 从四元数转换为欧拉角
```

相反，也可以通过欧拉角设置四元数：

```javascript
const euler = new THREE.Euler(Math.PI / 4, Math.PI / 4, 0); // 绕X轴和Y轴旋转45度
const quaternion = new THREE.Quaternion().setFromEuler(euler);
```

4. 四元数的旋转插值
   在动画中，我们常常需要在两个旋转之间进行平滑过渡。四元数非常适合这种情况，因为它们可以有效地进行插值，避免了欧拉角可能出现的插值不连续问题。Three.js 提供了 THREE.Quaternion.slerp()方法来进行球面线性插值（Slerp）：

```javascript
const q1 = new THREE.Quaternion().setFromEuler(new THREE.Euler(0, 0, 0));
const q2 = new THREE.Quaternion().setFromEuler(
  new THREE.Euler(Math.PI / 2, Math.PI / 2, 0),
);

const result = new THREE.Quaternion().slerp(q1, q2, 0.5); // 插值0.5，表示两者之间的中间旋转
```

通过四元数插值，可以实现平滑的旋转过渡，避免了传统欧拉角插值时可能发生的旋转异常。

5. 四元数的组合
   如果需要将多个旋转进行合成，四元数可以通过乘法来实现旋转的组合。例如，先旋转 45 度，再旋转 90 度：

```javascript
const q1 = new THREE.Quaternion().setFromEuler(
  new THREE.Euler(0, Math.PI / 4, 0),
);
const q2 = new THREE.Quaternion().setFromEuler(
  new THREE.Euler(0, Math.PI / 2, 0),
);
const combined = q1.multiply(q2); // 合成两个旋转
```

四元数的乘法是非交换的，意味着 q1.multiply(q2)和 q2.multiply(q1)的结果不同，所以它们的乘积顺序非常重要。

### 四元数的优势

避免万向节锁：传统的欧拉角旋转会遇到万向节锁问题，即某些角度的组合无法正确表示。四元数可以避免这个问题，提供更为平滑和高效的旋转表示。
高效的插值：四元数支持高效的球面线性插值（Slerp），使得旋转之间的过渡更加自然。
更为稳定的组合：四元数的旋转组合不会受到欧拉角的限制，避免了旋转顺序带来的问题。

### 总结

四元数在 3D 编程中是旋转变换的核心，它们通过提供高效、稳定的旋转表示，避免了传统旋转方法中的种种问题。在 Three.js 中，四元数不仅能让你更轻松地实现物体的旋转控制，还能帮助你解决复杂的旋转插值和组合问题。掌握四元数的使用，将使你在 3D 图形编程中更加得心应手。
