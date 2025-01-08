# 使用 Three.js 精灵模型 (Sprite) 实现 3D 标签效果

> **开发领域**：前端开发 | AI 应用 | Web3D | 元宇宙  
> **技术栈**：JavaScript、React、ThreeJs、WebGL、Go  
> **经验经验**：6 年+ 前端开发经验，专注于图形渲染和 AI 技术  
> **开源项目**：[AI智简未来](https://aint.top)、[晓智元宇宙](https://xiaozhi.shop/)、[数字孪生引擎](https://www.shuqin.cc/)  


在 Three.js 中，精灵模型 (Sprite) 是一种特殊的平面，它总是面向摄像机，非常适合作为 3D 场景中的标签展示。例如，标注场景中的某个位置、显示动态信息等。

本文将详细介绍如何使用 Three.js 的 `Sprite` 作为标签，实现 3D 空间中的注释或标注效果。


## 一、什么是 Sprite？

`Sprite` 是 Three.js 中的一种平面对象，与 `Mesh` 不同，`Sprite` 始终面向摄像机。这种特性使得它非常适合用作 3D 场景中的图标、标签或标记。

**应用场景：**

- 在 3D 场景中为物体添加名称或说明。
- 显示动态数据（如健康值、距离等）。
- 显示交互式按钮或图标。

## 二、实现 Sprite 标签的基本步骤

以下是实现 Sprite 标签的基本流程：

1. **创建 Sprite 材质 (SpriteMaterial)**：材质可以是颜色、纹理或者带文字的 Canvas。
2. **实例化 Sprite 对象**：为 Sprite 设置位置，使其与标注的物体对齐。
3. **更新 Sprite 始终面向摄像机**：由于 Sprite 自带面向功能，无需手动调整其朝向。

## 三、代码实现示例

以下是一个使用 Sprite 实现标签的完整代码示例：

### 3.1 基础场景设置

```javascript
import * as THREE from 'three';

// 创建场景、摄像机和渲染器
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 添加一个简单的立方体
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);
```

### 3.2 创建 Sprite 标签

```js
// 创建一个带文字的 Canvas，用作 Sprite 的纹理
function createTextSprite(text, fontSize = 24, color = 'white') {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const padding = 10;

  // 设置画布大小和样式
  ctx.font = `${fontSize}px Arial`;
  const textWidth = ctx.measureText(text).width;
  canvas.width = textWidth + padding * 2;
  canvas.height = fontSize + padding * 2;

  // 绘制背景和文字
  ctx.fillStyle = 'rgba(0, 0, 0, 0.6)'; // 半透明背景
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = color;
  ctx.fillText(text, padding, fontSize + padding / 2);

  // 将 Canvas 转换为纹理
  const texture = new THREE.CanvasTexture(canvas);
  const material = new THREE.SpriteMaterial({ map: texture });

  return new THREE.Sprite(material);
}

// 创建 Sprite 标签
const sprite = createTextSprite('我是标签', 32, 'yellow');
sprite.position.set(0, 1.5, 0); // 将标签放置在立方体上方
scene.add(sprite);
```

### 3.3 动画循环

```js
function animate() {
  requestAnimationFrame(animate);

  // 旋转立方体
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  renderer.render(scene, camera);
}

animate();
```

## 四、优化与扩展

### 4.1 标签与对象动态绑定

当目标对象移动时，需要更新标签的位置，使其始终位于目标对象上方。

```javascript
function updateSpritePosition(
  target,
  sprite,
  offset = new THREE.Vector3(0, 1.5, 0),
) {
  sprite.position.copy(target.position).add(offset);
}

// 在动画循环中更新标签位置
function animate() {
  requestAnimationFrame(animate);

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  // 更新标签位置
  updateSpritePosition(cube, sprite);

  renderer.render(scene, camera);
}

animate();
```

### 4.2 为 Sprite 添加交互

可以通过 Raycaster 实现标签的点击或悬停交互，提升用户体验。

```javascript
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

window.addEventListener('click', (event) => {
  pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
  pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(pointer, camera);
  const intersects = raycaster.intersectObjects([sprite]);

  if (intersects.length > 0) {
    console.log('标签被点击！');
  }
});
```

### 4.3 使用图片或自定义图标作为标签

除了文字标签，还可以使用图片或图标作为 Sprite。

```javascript
const textureLoader = new THREE.TextureLoader();
const iconTexture = textureLoader.load('path/to/icon.png');
const iconMaterial = new THREE.SpriteMaterial({ map: iconTexture });
const iconSprite = new THREE.Sprite(iconMaterial);

iconSprite.position.set(0, 1.5, 0);
scene.add(iconSprite);
```

## 五、总结

使用 Three.js 的 Sprite 实现 3D 标签，不仅可以提升场景的交互性，还能增强视觉效果和信息表达能力。无论是文字标签还是图标标签，都可以根据实际需求进行灵活设计。

## 关注作者
<div align="center">数擎AI公众号</div>
<div align="center"> <img src="https://cdn.shuqin.cc/aint/assets/weixin.svg" width = 300 height = 300 /> </div>
