# 圆形电景动画

## 着色器代码解析

> 大家好！我是 [数擎AI]，一位热爱探索新技术的前端开发者，在这里分享前端和Web3D、AI技术的干货与实战经验。如果你对技术有热情，欢迎关注我的文章，我们一起成长、进步！
> **开发领域**：前端开发 | AI 应用 | Web3D | 元宇宙  
> **技术栈**：JavaScript、React、ThreeJs、WebGL、Go  
> **经验经验**：6 年+ 前端开发经验，专注于图形渲染和 AI 技术  
> **经验经验**：[演示地址](https://shader.shuqin.cc/cine-shader) 
> **开源项目**：[AI智简未来](https://aint.top)、[晓智元宇宙](https://xiaozhi.shop/)、[数字孪生引擎](https://www.shuqin.cc/)  [源码地址](https://github.com/dezhizhang/shadertoy)



提供的 GLSL 着色器代码通过光线行进算法（Ray Marching）生成一个动态的三维场景。以下是代码的核心功能概述：

### 1. 平滑联合（Smooth Union）

opSmoothUnion 函数用于平滑地融合两个几何体，使它们看起来像一个整体。
公式如下：

```js
float opSmoothUnion( float d1, float d2, float k ) {
    float h = clamp( 0.5 + 0.5*(d2-d1)/k, 0.0, 1.0 );
    return mix( d2, d1, h ) - k*h*(1.0-h);
}

```

其中：

- d1 和 𝑑2 表示两个几何体的距离场值。
- k：控制平滑程度的参数。
- mix 函数用于插值，clamp 函数限制范围。

### 2. 符号距离函数（SDF）

sdSphere 函数定义了一个点到球体表面的距离：

```js
float sdSphere( vec3 p, float s ) {
    return length(p) - s;
}
```

- 输入 p 是点的三维坐标，s 是球体的半径。
- 返回值为点到球表面的最短距离。

### 3. 场景组合

map 函数动态地组合多个球体，通过时间参数让它们产生动画：

```js
float map(vec3 p) {
    float d = 2.0;
    for (int i = 0; i < 16; i++) {
        float fi = float(i);
        float time = iTime * (fract(fi * 412.531 + 0.513) - 0.5) * 2.0;
        d = opSmoothUnion(
            sdSphere(p + sin(time + fi * vec3(52.5126, 64.62744, 632.25)) * vec3(2.0, 2.0, 0.8),
            mix(0.5, 1.0, fract(fi * 412.531 + 0.5124))),
            d,
            0.4
        );
    }
    return d;
}

```
- 通过循环，生成 16 个动态移动的球体，并用 opSmoothUnion 进行平滑组合。
- 球体的位置随时间（iTime）变化，实现动画效果。

### 4. 光线行进
在 mainImage 中实现了光线行进算法，通过迭代寻找光线与几何体的交点：
```js
vec3 rayOri = vec3(...); // 光线起点
vec3 rayDir = vec3(0.0, 0.0, -1.0); // 光线方向
for (int i = 0; i < 64; i++) {  
    p = rayOri + rayDir * depth;  
    float dist = map(p);  
    depth += dist;  
    if (dist < 1e-6) break;  
}

```
- depth 表示光线当前行进的深度。
- map(p) 计算光线与场景的最近距离。

### 完整代码
```js
import * as THREE from 'three';
import React, { useEffect, useRef } from 'react';

const CineShader: React.FC = () => {
  const cineShaderRef = useRef<any>();

  useEffect(() => {
    // 初始化场景、相机和渲染器
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

    // 设置相机位置
    camera.position.z = 5;

    // 创建自定义 ShaderMaterial
    const shaderMaterial = new THREE.ShaderMaterial({
      uniforms: {
        iResolution: {
          value: new THREE.Vector2(window.innerWidth, window.innerHeight),
        },
        iTime: { value: 0.0 },
      },
      vertexShader: `
            varying vec2 vUv;
            void main() {
                vUv = uv;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `,
      fragmentShader: `
            uniform vec2 iResolution;
            uniform float iTime;
            varying vec2 vUv;
    
            // 平滑联合
            float opSmoothUnion(float d1, float d2, float k) {
                float h = clamp(0.5 + 0.5 * (d2 - d1) / k, 0.0, 1.0);
                return mix(d2, d1, h) - k * h * (1.0 - h);
            }
    
            // 球体 SDF
            float sdSphere(vec3 p, float s) {
                return length(p) - s;
            }
    
            // 场景组合
            float map(vec3 p) {
                float d = 2.0;
                for (int i = 0; i < 16; i++) {
                    float fi = float(i);
                    float time = iTime * (fract(fi * 412.531 + 0.513) - 0.5) * 2.0;
                    d = opSmoothUnion(
                        sdSphere(p + sin(time + fi * vec3(52.5126, 64.62744, 632.25)) * vec3(2.0, 2.0, 0.8), 
                                 mix(0.5, 1.0, fract(fi * 412.531 + 0.5124))),
                        d,
                        0.4
                    );
                }
                return d;
            }
    
            // 计算法线
            vec3 calcNormal(vec3 p) {
                const float h = 1e-5;
                const vec2 k = vec2(1, -1);
                return normalize(
                    k.xyy * map(p + k.xyy * h) +
                    k.yyx * map(p + k.yyx * h) +
                    k.yxy * map(p + k.yxy * h) +
                    k.xxx * map(p + k.xxx * h)
                );
            }
    
            void main() {
                vec2 uv = gl_FragCoord.xy / iResolution;
                uv = uv * 2.0 - 1.0; // 将坐标转换为 [-1, 1]
    
                // 设置光线起点和方向
                vec3 rayOri = vec3(uv * vec2(iResolution.x / iResolution.y, 1.0) * 6.0, 3.0);
                vec3 rayDir = vec3(0.0, 0.0, -1.0);
    
                // 光线行进
                float depth = 0.0;
                vec3 p;
                for (int i = 0; i < 64; i++) {
                    p = rayOri + rayDir * depth;
                    float dist = map(p);
                    depth += dist;
                    if (dist < 1e-6) {
                        break;
                    }
                }
    
                depth = min(6.0, depth); // 限制最大深度
    
                // 计算颜色
                vec3 n = calcNormal(p);
                float b = max(0.0, dot(n, vec3(0.577))); // 简单光照
                vec3 col = (0.5 + 0.5 * cos((b + iTime * 3.0) + uv.xyx * 2.0 + vec3(0, 2, 4))) * (0.85 + b * 0.35);
                col *= exp(-depth * 0.15); // 添加深度雾效
    
                gl_FragColor = vec4(col, 1.0);
            }
        `,
    });

    // 创建平面并添加到场景
    const geometry = new THREE.PlaneGeometry(window.innerWidth, window.innerHeight);
    const plane = new THREE.Mesh(geometry, shaderMaterial);
    scene.add(plane);

    // 动画渲染循环
    function animate() {
      requestAnimationFrame(animate);

      // 更新时间
      shaderMaterial.uniforms.iTime.value += 0.1;

      renderer.render(scene, camera);
    }
    animate();

    // 响应窗口大小调整
    window.addEventListener('resize', () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      shaderMaterial.uniforms.iResolution.value.set(
        window.innerWidth,
        window.innerHeight,
      );
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    });
  }, []);

  return <div ref={cineShaderRef}/>;
};

export default CineShader;

```

<div align="center">关注我们</div>
<div align="center"> <img src="https://cdn.shuqin.cc/aint/assets/weixin.svg" width = 300 height = 300 /> </div>


