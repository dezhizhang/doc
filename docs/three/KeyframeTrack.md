# 三分钟学会 Three.js 关键帧动画：让你的 3D 项目动起来！



在当今的 3D 开发中，动画是吸引用户注意力的关键。作为最流行的 WebGL 库之一，**Three.js** 为开发者提供了强大的动画功能，尤其是关键帧动画，让复杂的动画效果变得简单易用。

> 本文将手把手教你使用 Three.js 创建关键帧动画，无论你是前端新手还是 3D 开发者，都能快速上手！此外，我们还提供了一个真实案例，帮你轻松学会关键帧动画的精髓。

## 什么是关键帧动画？

关键帧动画的核心思想是：

1. 在特定时间点设置对象的属性值（如位置、旋转、缩放等）。
2. 在这些关键帧之间自动插值生成动画。

**Three.js 的关键帧动画核心工具**：

- **`AnimationClip`**：定义动画的整体结构。
- **`KeyframeTrack`**：定义属性的关键帧序列。
- **`AnimationMixer`**：播放和管理动画。


## 快速实现一个关键帧动画

### 第一步：初始化 Three.js 场景

我们创建一个简单的 3D 场景，包括摄像机、渲染器和一个立方体。

```javascript
// 引入 Three.js 基础
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 添加一个立方体
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// 添加光源
const light = new THREE.PointLight(0xffffff, 1);
light.position.set(10, 10, 10);
scene.add(light);

camera.position.z = 5;
```

运行以上代码，你会看到一个绿色的立方体出现在屏幕中央。

### 第二步：定义关键帧动画

我们为立方体的 position 和 rotation 属性创建关键帧动画，使其移动和旋转。

```js
// 定义位置关键帧
const positionKF = new THREE.VectorKeyframeTrack(
  '.position', // 动画目标属性
  [0, 1, 2], // 时间点（单位：秒）
  [0, 0, 0, 2, 2, 0, 0, 0, 5], // 对应的位置 [x, y, z]
);

// 定义旋转关键帧
const rotationKF = new THREE.QuaternionKeyframeTrack(
  '.quaternion',
  [0, 1, 2],
  [
    0,
    0,
    0,
    1, // 初始旋转
    0,
    Math.sin(Math.PI / 4),
    0,
    Math.cos(Math.PI / 4), // 90度旋转
    0,
    0,
    0,
    1, // 恢复初始旋转
  ],
);

// 创建动画片段
const clip = new THREE.AnimationClip('cubeAnimation', 2, [
  positionKF,
  rotationKF,
]);
```

### 第三步：播放动画

利用 AnimationMixer 播放关键帧动画，并通过 requestAnimationFrame 不断更新。

```js
// 创建动画混合器
const mixer = new THREE.AnimationMixer(cube);

// 将动画片段加载到混合器中
const action = mixer.clipAction(clip);
action.play();

// 动画更新
const clock = new THREE.Clock();
function animate() {
  requestAnimationFrame(animate);

  // 更新动画
  const delta = clock.getDelta();
  mixer.update(delta);

  renderer.render(scene, camera);
}
animate();
```

### 扩展应用：制作互动动画

添加循环和缓动效果
Three.js 提供了丰富的动画控制选项，比如设置动画循环方式和缓动效果。

```javascript
action.setLoop(THREE.LoopPingPong, Infinity); // 动画循环模式：往返循环
```

加载复杂模型的动画
如果你想为模型添加动画，可以使用 GLTFLoader 加载 .gltf 或 .glb 文件，并直接调用其自带的动画。

```javascript
const loader = new THREE.GLTFLoader();
loader.load('path/to/model.glb', (gltf) => {
  const model = gltf.scene;
  scene.add(model);

  const mixer = new THREE.AnimationMixer(model);
  const action = mixer.clipAction(gltf.animations[0]);
  action.play();
});
```

### 关键帧动画的实际案例

假如你正在为一个产品展示网站设计动画，使用关键帧动画可以轻松实现以下效果：

产品模型的旋转展示。
不同配件的动态组合效果。
点击按钮触发特定动画（比如爆炸拆解动画）。
通过 Three.js 的关键帧动画工具，你只需要设置好关键帧，剩下的工作交给 Three.js 完成！

## 总结

Three.js 的关键帧动画为 WebGL 动画开发者提供了强大的工具。通过 AnimationClip 和 KeyframeTrack，你可以轻松实现从简单到复杂的动画效果，无论是位置变换、旋转动画，还是颜色渐变。结合实际项目需求，Three.js 能够帮助你快速构建高质量的交互式 3D 动画。

如果这篇文章对你有帮助，请分享给更多人！
更多 3D 技术干货，记得关注我！

<div align="center"> <img src="https://cdn.shuqin.cc/aint/assets/weixin.svg" width = 300 height = 300 /> </div>
