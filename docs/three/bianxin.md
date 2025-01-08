# 深入解析 Three.js 变形动画：从基础到高级实现


> **开发领域**：前端开发 | AI 应用 | Web3D | 元宇宙  
> **技术栈**：JavaScript、React、ThreeJs、WebGL、Go  
> **经验经验**：6 年+ 前端开发经验，专注于图形渲染和 AI 技术  
> **开源项目**：[AI智简未来](https://aint.top)、[晓智元宇宙](https://xiaozhi.shop/)、[数字孪生引擎](https://www.shuqin.cc/)  

> 大家好！我是 [晓智]，一位热爱探索新技术的前端开发者，在这里分享前端和Web3D、AI技术的干货与实战经验。如果你对技术有热情，欢迎关注我的文章，我们一起成长、进步！


在 3D 开发领域中，**变形动画** 是一种极具吸引力的动态表现形式。它通过逐渐改变几何体顶点的位置，实现物体的变形效果。无论是角色动画中的面部表情变化，还是炫酷的产品展示效果，变形动画都为 3D 应用带来了更多可能性。

> 本文将深入解析 Three.js 中的变形动画技术，从原理到实际代码实现，带你从基础入门到高级应用。我们还将探讨变形动画的优化技巧和实际案例，帮助你快速掌握并应用这项技能。

## 一、什么是变形动画？

### 1.1 变形动画的概念

变形动画（Morph Animation）是一种通过线性插值，将一个几何形状逐渐过渡到另一个几何形状的技术。它广泛用于以下场景：

- 角色表情动画（如嘴巴张合、眉毛抬起）。
- 复杂模型的动态过渡（如产品展示中的零件展开）。
- 数据可视化中的动态形状变换。

### 1.2 变形动画的原理

变形动画的核心是 **顶点插值**：

1. 定义一个基础形状（Base Geometry）。
2. 定义多个目标形状（Target Geometries）。
3. 根据插值权重（Weight），逐渐将基础形状的顶点位置变换为目标形状的顶点位置。

公式如下：  
\[ P = (1 - w) \times P*{\text{base}} + w \times P*{\text{target}} \]  
其中：

- \( P \) 是当前顶点位置。
- \( w \) 是插值权重（范围为 0 到 1）。
- \( P\_{\text{base}} \) 是基础形状的顶点位置。
- \( P\_{\text{target}} \) 是目标形状的顶点位置。

---

## 二、Three.js 中的变形动画支持

Three.js 提供了对变形动画的原生支持，主要通过以下类和方法实现：

- **`BufferGeometry.morphAttributes`**：存储目标形状的顶点数据。
- **`Mesh.morphTargetInfluences`**：控制变形权重的数组。
- **`AnimationMixer` 和 `AnimationClip`**：管理和播放动画。

---

## 三、创建基础变形动画示例

### 3.1 准备基础几何体

首先，我们定义一个基础几何体和目标形状。

```javascript
const geometry = new THREE.BoxGeometry(1, 1, 1); // 基础立方体
const targetPosition = Float32Array.from([
  // 定义目标形状的顶点位置
  -0.5, -0.5, -0.5, 0.5, -0.5, -0.5, 0.5, 0.5, -0.5, -0.5, 0.5, -0.5, -0.5, -0.5,
  0.5, 0.5, -0.5, 0.5, 0.5, 0.5, 0.5, -0.5, 0.5, 0.5,
]);

// 添加目标形状到变形属性中
geometry.morphAttributes.position = [
  new THREE.BufferAttribute(targetPosition, 3),
];
```

### 3.2 创建变形动画 Mesh

使用 morphTargetInfluences 控制顶点的变形程度。

```javascript
const material = new THREE.MeshStandardMaterial({
  color: 0x00ff00,
  morphTargets: true, // 启用变形动画
});

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);
```

### 3.3 播放变形动画

通过调整 morphTargetInfluences 实现动画。

```javascript
function animateMorph() {
  const clock = new THREE.Clock();
  function animate() {
    requestAnimationFrame(animate);
    const delta = clock.getElapsedTime();
    // 周期性调整变形权重
    mesh.morphTargetInfluences[0] = (Math.sin(delta) + 1) / 2;
    renderer.render(scene, camera);
  }
  animate();
}
animateMorph();
```

## 四、使用 AnimationMixer 创建高级变形动画

为了更精确地控制动画，我们可以结合 AnimationMixer 和 AnimationClip。

### 4.1 定义动画片段

我们通过 AnimationClip 定义变形权重随时间变化的关键帧。

```javascript
const times = [0, 1, 2]; // 动画时间点
const values = [0, 1, 0]; // 对应的权重值

const track = new THREE.NumberKeyframeTrack(
  '.morphTargetInfluences[0]',
  times,
  values,
);

const clip = new THREE.AnimationClip('MorphAnimation', -1, [track]);
```

### 4.2 播放动画

通过 AnimationMixer 播放关键帧动画。

```javascript
const mixer = new THREE.AnimationMixer(mesh);
const action = mixer.clipAction(clip);
action.play();

function animate() {
  requestAnimationFrame(animate);
  const delta = clock.getDelta();
  mixer.update(delta);
  renderer.render(scene, camera);
}
animate();
```

## 五、优化与高级技巧

### 5.1 优化顶点数据

压缩数据：使用更高效的 Float16 格式代替 Float32。
减少顶点数量：简化模型以降低渲染压力。

### 5.2 动态加载目标形状

对于复杂场景，可以使用 GLTF 或 OBJ 格式的模型，动态加载其目标形状。

```javascript
const loader = new THREE.GLTFLoader();
loader.load('model.glb', (gltf) => {
  const model = gltf.scene;
  scene.add(model);

  // 通过模型的 morphTargetInfluences 实现变形
  model.morphTargetInfluences[0] = 0.5;
});
```

## 六、实际案例：动态产品展示

假设我们需要展示一个电子产品的组装过程，可以通过变形动画动态展示零件的组合与分离。

```javascript
const times = [0, 2, 4];
const positions = [0, 0, 0, 1, 1, 1, 0, 0, 0];
const morphTrack = new THREE.VectorKeyframeTrack('.position', times, positions);

const clip = new THREE.AnimationClip('ProductAnimation', 4, [morphTrack]);
const action = mixer.clipAction(clip);
action.setLoop(THREE.LoopOnce);
action.play();
```

### 完整代码
```js
import * as THREE from 'three';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45,window.innerWidth / window.innerHeight,0.1,1000);
camera.position.set(200,200,200);
camera.lookAt(scene.position);

const renderer = new THREE.WebGLRenderer({
  antialias:true
});
renderer.setSize(window.innerWidth,window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

scene.add(new THREE.AmbientLight(0xffffff,1.0));
scene.add(new THREE.AxesHelper(100));


const geometry = new THREE.BoxGeometry(50,50,50);
const target1 = new THREE.BoxGeometry(50,200,50).attributes.position;
const target2 = new THREE.BoxGeometry(10,50,10).attributes.position;
geometry.morphAttributes.position = [target1,target2];


const material = new THREE.MeshBasicMaterial({
  color:0x00ffff
});
const mesh = new THREE.Mesh(geometry,material);
mesh.name = 'Box';

const KF1 = new THREE.KeyframeTrack('Box.morphTargetInfluences[0]',[0,5],[0,1]);
const KF2 = new THREE.KeyframeTrack('Box.morphTargetInfluences[1]',[5,10],[0,1]);
const clip = new THREE.AnimationClip('box',10,[KF1,KF2]);

const mixer = new THREE.AnimationMixer(mesh);
const clipAction = mixer.clipAction(clip);

clipAction.play();


scene.add(mesh);

const clock = new THREE.Clock();

function render() {
  mixer.update(clock.getDelta());

  renderer.render(scene,camera);
  requestAnimationFrame(render);
}
render();

```

## 七、总结与未来展望

变形动画是 Three.js 中非常强大且灵活的工具，从简单的顶点插值到复杂的模型动态演示，适用范围广泛。通过本文，你不仅掌握了变形动画的基本实现，还学会了结合 AnimationMixer 和 GLTFLoader 等工具实现更高级的应用。

未来，随着 WebGPU 的普及和前端硬件性能的提升，变形动画的效果将更加细腻和逼真。通过不断学习与实践，你的 3D 应用将焕发出新的活力！


<div align="center"> <img src="https://cdn.shuqin.cc/aint/assets/weixin.svg" width = 300 height = 300 /> </div>


