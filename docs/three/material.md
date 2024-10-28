# 深入了解 Three.js 中的材质与光照

> **开发领域**：前端开发 | AI 应用 | Web3D | 元宇宙  
> **技术栈**：JavaScript、React、ThreeJs、WebGL、Go  
> **经验经验**：6年+ 前端开发经验，专注于图形渲染和AI技术  
> **开源项目**：[github](https://github.com/dezhizhang) [晓智元宇宙](https://www.xiaozhi.shop/)、[数字孪生引擎](https://www.shuqin.cc/)、[前端面试题](https://fe.shuqin.cc/)   
> 大家好！我是 [晓智]，一位热爱探索新技术的前端开发者，在这里分享前端和Web3D、AI技术的干货与实战经验。如果你对技术有热情，欢迎关注我的文章，我们一起成长、进步！



Three.js 是一个强大的 JavaScript 库，用于在浏览器中创建和渲染 3D 场景。它的易用性和灵活性使得开发者能够轻松构建丰富的视觉体验。在 Three.js 中，材质与光照是影响物体外观和场景氛围的关键因素。本文将深入探讨 Three.js 中的材质类型、光源类型、光照模型，以及如何将它们结合以实现逼真的效果。

## 一、材质概述

### 1. 什么是材质？

材质决定了物体表面的视觉特性，包括颜色、光泽、透明度和纹理等。正确选择和配置材质可以显著提升场景的真实感和美观性。Three.js 提供了多种材质类型，以满足不同的应用需求。

### 2. 常用材质类型

#### 1. MeshBasicMaterial

- **特点**：不受光照影响，适合用于简单的几何体和不需要光照效果的场景。
- **应用**：用于显示纯色或简单纹理，通常用于背景或 UI 元素。

```javascript
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 }); // 红色
```

#### 2. MeshLambertMaterial

特点：支持漫反射光照，适合模拟粗糙表面。
应用：常用于木材、石材等自然材料，能够表现出表面的细微纹理。

```js
const material = new THREE.MeshLambertMaterial({ color: 0x00ff00 }); // 绿色
```

#### 3. MeshPhongMaterial

特点：支持镜面高光，适合光滑表面。
应用：用于模拟金属或塑料等材质，表现出光泽感和反射效果。

```js
const material = new THREE.MeshPhongMaterial({
  color: 0x0000ff,
  shininess: 100,
}); // 蓝色，高光
```

#### 4. MeshStandardMaterial

特点：基于物理的材质，支持更复杂的光照计算。
应用：适合用于需要真实光照效果的场景，广泛应用于现代 WebGL 渲染。

```javascript
const material = new THREE.MeshStandardMaterial({ color: 0xffff00 }); // 黄色
```

#### 5. MeshPhysicalMaterial

特点：在 MeshStandardMaterial 的基础上，增加了透明度、粗糙度和金属度等属性。
应用：用于需要高真实性的材质效果，如玻璃和水。

```javascript
const material = new THREE.MeshPhysicalMaterial({
  color: 0x00ffff,
  roughness: 0.1,
  metalness: 0.5,
}); // 青色
```

## 二、光源类型

光源是影响场景表现的重要因素。Three.js 提供了多种光源类型，每种类型有其独特的特性和应用场景。

#### 1. AmbientLight

特点：提供均匀的环境光，不产生阴影。
应用：适合用于基础的环境光照，增强整体亮度，减少阴影效果。

```js
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // 白色环境光
scene.add(ambientLight);
```

#### 2. PointLight

特点：从一个点向四周发射光线，模拟灯泡效果。
应用：适用于需要产生阴影的光源，能够在周围创建明显的阴影效果。

```js
const pointLight = new THREE.PointLight(0xffffff, 1, 100);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);
```

#### 3. DirectionalLight

特点：模拟太阳光，从一个方向发出平行光线，产生阴影。
应用：适合用于强烈的方向性光源，可以模拟日光的照射效果。

```js
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 10, 7);
scene.add(directionalLight);
```

#### 4. SpotLight

特点：产生锥形光束，可以产生阴影。
应用：适合用于聚焦光源，如舞台灯光，能够聚焦特定区域的光照。

```javascript
const spotLight = new THREE.SpotLight(0xffffff);
spotLight.position.set(10, 10, 10);
scene.add(spotLight);
```

#### 5. HemisphereLight

特点：模拟天空和地面之间的光照，提供柔和的光源。
应用：适合用于自然场景，模拟天空的光照效果。

```javascript
const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.5); // 天空光与地面光
scene.add(hemisphereLight);
```

## 三、光照模型

Three.js 中的光照模型决定了光源与材质之间的交互方式，不同的光照模型可以产生不同的视觉效果。

#### 1. 漫反射光照模型

漫反射光照模型基于 Lambertian 反射定律，光照强度与光线入射角度的余弦值成正比。使用 MeshLambertMaterial 时，光照效果就是基于漫反射模型的。此模型适合用于非光滑表面，呈现出柔和的光照效果。

#### 2. 镜面反射光照模型

镜面反射光照模型基于 Phong 反射模型，考虑光线的入射角、观察者的视角和表面的光泽度。使用 MeshPhongMaterial 时，光照效果则是基于镜面反射模型的。此模型适合光滑表面，能够表现出高光和反射效果。

#### 3. 物理光照模型

物理光照模型是现代渲染引擎中最为真实的光照模型。它通过考虑表面的粗糙度、金属度、反射率等属性，模拟现实中的光照效果。MeshStandardMaterial 和 MeshPhysicalMaterial 基于物理光照模型，能够提供更加真实的渲染效果。

## 四、结合材质与光照

将材质与光照结合能够创造出丰富的视觉效果。下面是一个完整示例，展示如何将材质与光源结合在一起。

```javascript

import \* as THREE from 'three';

// 创建场景、相机和渲染器
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 创建几何体和材质
const geometry = new THREE.SphereGeometry(1, 32, 32);
const material = new THREE.MeshStandardMaterial({ color: 0xff0000 }); // 红色
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

// 添加光源
const ambientLight = new THREE.AmbientLight(0x404040); // 环境光
const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(5, 5, 5);
scene.add(ambientLight);
scene.add(pointLight);

// 设置相机位置
camera.position.z = 5;

// 渲染循环
function animate() {
requestAnimationFrame(animate);
sphere.rotation.x += 0.01; // 旋转
sphere.rotation.y += 0.01; // 旋转
renderer.render(scene, camera);
}

animate();
```

在上述示例中，我们创建了一个红色的球体，使用 MeshStandardMaterial，并添加了环境光和点光源。通过旋转球体，能够看到光源与材质之间的互动效果，展现出逼真的光照效果。

### 五、优化材质与光照效果
为了提升性能和视觉效果，优化材质与光照的设置至关重要。以下是一些优化建议：

### 1. 合理选择材质

根据场景需求选择合适的材质类型。例如，对于不需要光照的物体，可以使用 MeshBasicMaterial，以提高性能；而对于需要真实感的物体，则应选择 MeshStandardMaterial 或 MeshPhysicalMaterial。

### 2. 使用低分辨率纹理

高分辨率纹理会增加渲染的负担，尽量使用适合的低分辨率纹理，以确保性能和质量的平衡。

### 3. 减少光源数量

尽量减少场景中的光源数量，尤其是动态光源。每个光源都会增加计算负担，合理利用环境光和少量的点光源可以有效降低性能消耗。

### 4. 启用阴影优化

启用阴影时，调整阴影的质量和分辨率。过高的阴影设置会影响性能。可以使用 shadowMap 来优化阴影效果。

```javascript
renderer.shadowMap.enabled = true; // 启用阴影
```

### 六、总结
在 Three.js 中，材质与光照是构建真实感 3D 场景的基础。通过合理使用不同类型的材质和光源，开发者能够实现多样化的视觉效果。掌握这些知识后，你可以进一步探索更复杂的技术，如自定义 Shader、后处理效果等。

希望这篇文章能够帮助你深入理解 Three.js 中的材质与光照机制，为你的 3D 项目打下坚实的基础。如果你有任何问题或建议，请在评论区留言，我们一起交流学习！
