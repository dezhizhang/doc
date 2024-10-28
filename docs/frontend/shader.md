# 深入探索 Three.js Shader

Three.js 是一个强大的 3D JavaScript 库，能够帮助开发者创建和渲染复杂的 3D 场景。在 Three.js 中，Shader 是实现各种视觉效果的核心组件。本文将介绍 Shader 的基本概念、使用方法以及一些常见的例子。

## 什么是 Shader？

Shader 是一种在 GPU 上运行的小程序，用于处理渲染过程中的图形数据。通常分为两种类型：
- **顶点 Shader**：负责处理每个顶点的属性，如位置、法线和纹理坐标。
- **片段 Shader**（或像素 Shader）：负责为每个像素计算颜色和纹理。

## 基本 Shader 示例

以下是一个简单的 Three.js Shader 示例，展示如何自定义一个材质。

### 1. 设置场景

首先，创建一个基本的 Three.js 场景：

```javascript
import * as THREE from 'three';

// 创建场景、相机和渲染器
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
```