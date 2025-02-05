# 实现动态卡通笑脸的着色器实现

> 大家好！我是 [数擎 AI]，一位热爱探索新技术的前端开发者，在这里分享前端和 Web3D、AI 技术的干货与实战经验。如果你对技术有热情，欢迎关注我的文章，我们一起成长、进步！
> **开发领域**：前端开发 | AI 应用 | Web3D | 元宇宙  
> **技术栈**：JavaScript、React、ThreeJs、WebGL、Go  
> **经验经验**：6 年+ 前端开发经验，专注于图形渲染和 AI 技术  
> **经验经验**：[演示地址](https://shader.shuqin.cc/lscczl)
> **开源项目**：[智简未来](https://aint.top)、[晓智元宇宙](https://xiaozhi.shop/)、[数字孪生引擎](https://www.shuqin.cc/) 、[源码地址](https://github.com/dezhizhang/shadertoy)


## 效果概述

本文通过使用 Three.js 实现的动态卡通笑脸着色器，解析其核心实现原理。该效果具有以下特性：

- 😃 基础笑脸轮廓
- 👀 眨动的眼睛（带动态偏移）
- 👄 周期性开合的嘴巴
- 🍎 动态变化的红晕脸颊
- ⏱️ 基于时间的动画效果

最终呈现效果：
![动态笑脸示意图](https://example.com/sample.gif)

## 核心实现原理

### 1. 坐标系处理

```glsl
vec2 uv = vUv;
uv -= 0.5;                // 坐标系中心移到画布中心
uv.x *= iResolution.x/iResolution.y; // 保持宽高比
```

通过坐标变换实现：

- 中心点(0,0)对应屏幕中心
- 消除屏幕宽高比变形

### 2. 基础图形函数

```glsl
float rect(vec2 uv, vec2 pos, float width, float height) {
    return (step(pos.x-width, uv.x) - step(pos.x+width, uv.x)) *
           (step(pos.y-height, uv.y) - step(pos.y+height, uv.y));
}
```

利用 step 函数实现：

- 横向范围：pos.x±width
- 纵向范围：pos.y±height

圆形绘制函数

```glsl
float Circle(vec2 uv, vec2 pos, float rad, float blur) {
    float d = length(uv-pos);
    return smoothstep(rad, rad-blur, d);
}
```

特点：

- 支持边缘模糊效果
- 半径控制精度达 0.01

### 2. 动态元素实现

眼睛动画

```glsl
float v = abs(clamp(sin(iTime), 0.0, 0.07));
Mask = mix(Mask, black, Circle(uv, vec2(0.05 + v, 0.07), 0.03, 0.01));
```

- sin(iTime)产生周期性运动
- clamp 限制移动范围在[0,0.07]
- 通过位置偏移实现眨眼效果

嘴巴动画

```glsl
float w = abs(clamp(sin(iTime*3.0), 0.0, 0.03));
Mask = mix(Mask, vec3(3.0), rect(uv, vec2(0.00, 0.13-w), 0.15, 0.03));
```

- 3 倍速动画（iTime\*3.0）

- 垂直方向位置偏移实现嘴巴开合

```glsl
Mask = mix(Mask, red, Circle(uv, vec2(0.05+v, -0.05), 0.04, 0.01));
```

- 与眼睛动画联动的位置偏移

- 圆形叠加实现渐变效果

## 4. 颜色混合策略

使用 mix 函数层级叠加：

```glsl
Mask = mix(baseColor, overlayColor, alpha);
```

混合顺序：

- 黄色基础轮廓

- 眼睛黑点

- 嘴巴线条

- 脸颊红晕

## 5. 完整代码

```js
/*
 * :file description:
 * :name: /threejs/src/index.js
 * :author:张德志
 * :copyright: (c) 2025, Xiaozhi
 * :date created: 2024-07-27 12:32:40
 * :last editor: 张德志
 * :date last edited: 2025-02-05 17:52:47
 */
import * as THREE from 'three';

class ShaderEffect {
  constructor() {
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);

    this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    this.scene = new THREE.Scene();

    this.uniforms = {
      iTime: { value: 0 },
      iResolution: { value: new THREE.Vector2() },
    };

    this.init();
    this.animate();
    window.addEventListener('resize', () => this.onResize());
  }

  init() {
    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: `
                varying vec2 vUv;
                void main() {
                    vUv = uv;
                    gl_Position = projectionMatrix * modelMatrix * viewMatrix * vec4(position, 1.0);
                }
            `,
      fragmentShader: `
                uniform vec2 iResolution;
                uniform float iTime;
                varying vec2 vUv;

                float rect(vec2 uv, vec2 pos, float width, float height) {
                    float square = (step(pos.x - width, uv.x) - step(pos.x + width, uv.x)) *
                                   (step(pos.y - height, uv.y) - step(pos.y + height, uv.y));
                    return square;
                }

                float Circle(vec2 uv, vec2 pos, float rad, float blur) {
                    float d = length(uv - pos);
                    float t = smoothstep(rad, rad - blur, d);
                    return t;
                }

                void main() {
                    vec3 red = vec3(0.8, 0.0, 0.0);
                    vec3 white = vec3(1.0);
                    vec3 yellow = vec3(0.9, 0.9, 0.3);
                    vec3 blue = vec3(0.5, 0.8, 0.9);
                    vec3 black = vec3(0.0);
                    vec3 green = vec3(0.0, 1.0, 0.0);

                    vec2 uv = vUv;
                    uv -= 0.5;
                    uv.x *= iResolution.x / iResolution.y;

                    vec3 Mask = mix(black, vec3(3.0, 3.0, 0.0), Circle(uv, vec2(0.0, 0.01), 0.2, 0.01));
                    
                    Mask = mix(Mask, vec3(3.0, 3.0, 0.0), Circle(uv, vec2(-0.13, 0.15), 0.07, 0.01));
                    Mask = mix(Mask, vec3(3.0, 3.0, 0.0), Circle(uv, vec2(0.13, 0.15), 0.07, 0.01));
                    
                    float v = abs(clamp(sin(iTime), 0.0, 0.07));
                    Mask = mix(Mask, black, Circle(uv, vec2(0.05 + v, 0.07), 0.03, 0.01));
                    Mask = mix(Mask, black, Circle(uv, vec2(-0.10 + v, 0.07), 0.03, 0.01));
                    
                    float w = abs(clamp(sin(iTime * 3.0), 0.0, 0.03));
                    Mask = mix(Mask, vec3(3.0, 3.0, 0.0), rect(uv, vec2(0.00, 0.13 - w), 0.15, 0.03));
                    
                    Mask = mix(Mask, black, rect(uv, vec2(-0.02 + v, -0.05), 0.03, 0.010));
                    
                    vec3 Mouth = mix(black, vec3(-10.0), rect(uv, vec2(-0.02 + v, -0.05), 0.08, 0.015));
                    Mask = mix(Mouth, blue, Mask);
                    
                    Mask = mix(Mask, red, Circle(uv, vec2(0.05 + v, -0.05), 0.04, 0.01));
                    Mask = mix(Mask, red, Circle(uv, vec2(-0.09 + v, -0.05), 0.04, 0.01));

                    gl_FragColor = vec4(Mask, 1.0);
                }
            `,
    });

    this.mesh = new THREE.Mesh(geometry, material);
    this.scene.add(this.mesh);

    this.onResize();
  }

  animate() {
    requestAnimationFrame(() => this.animate());
    this.uniforms.iTime.value = performance.now() / 1000;
    this.renderer.render(this.scene, this.camera);
  }

  onResize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    this.renderer.setSize(width, height);
    this.uniforms.iResolution.value.set(width, height);
  }
}

new ShaderEffect();
```
