# 使用 Three.js 实现分形雪花特效

> 大家好！我是 [数擎 AI]，一位热爱探索新技术的前端开发者，在这里分享前端和 Web3D、AI 技术的干货与实战经验。如果你对技术有热情，欢迎关注我的文章，我们一起成长、进步！
> **开发领域**：前端开发 | AI 应用 | Web3D | 元宇宙  
> **技术栈**：JavaScript、React、ThreeJs、WebGL、Go  
> **经验经验**：6 年+ 前端开发经验，专注于图形渲染和 AI 技术  
> **经验经验**：[演示地址](https://shader.shuqin.cc/cine-shader) > **开源项目**：[AI 智简未来](https://aint.top)、[晓智元宇宙](https://xiaozhi.shop/)、[数字孪生引擎](https://www.shuqin.cc/) [源码地址](https://github.com/dezhizhang/shadertoy)

## 一、效果展示与实现原理

本教程实现了一个基于分形算法生成的动态雪花场景，主要技术特点包括：

- 极坐标变换：通过笛卡尔坐标系与极坐标系的相互转换

- 分形场叠加：使用多层 cos 函数构建复杂图案

- 时空变换：通过时间变量实现动态飘落效果

- 多重采样：多层级叠加创造丰富细节

## 二、核心算法解析

### 2.1 坐标系转换

```glsl
vec2 p_to_pc(vec2 p) {
    return vec2(atan(p.y, p.x), length(p));
}

vec2 pc_to_p(vec2 pc) {
    return vec2(pc.y * cos(pc.x), pc.y * sin(pc.x));
}
```

这里实现了笛卡尔坐标系与极坐标系的相互转换，是生成旋转对称图案的基础。

### 2.2 分形场生成

```glsl
vec2 fieldB(vec2 pc, float f) {
    pc.y += 0.1 * cos(pc.y * 100.0 + 10.0);
    pc.y += 0.1 * cos(pc.y * 20.0 + f);
    pc.y += 0.04 * cos(pc.y * 10.0 + 10.0);
    return pc;
}
```

通过多层余弦函数叠加，创造复杂的分形图案。参数 f 可用于生成不同的雪花变体。

### 2.3 动态效果

```
p.y += 2.0 * time;
p.x += 0.01 * cos(p.y * 3.0 + p.x * 3.0 + time * PI2);
```

通过时间变量实现雪花的垂直运动和水平摆动效果。

## 三、Three.js 集成要点

### 3.1 着色器材质配置

```js
const material = new THREE.ShaderMaterial({
  fragmentShader: snowflakeShader.fragmentShader,
  vertexShader: snowflakeShader.vertexShader,
  uniforms: {
    iTime: { value: 0 },
    iResolution: { value: new THREE.Vector2() },
  },
});
```

关键 Uniform 参数：

- iTime：时间计数器

- iResolution：画布分辨率

### 3.2 响应式处理

```js
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  material.uniforms.iResolution.value.set(
    window.innerWidth,
    window.innerHeight,
  );
});
```

确保画面在不同分辨率设备上正确显示。

## 四、效果优化技巧

- 增加雪花层级：修改 snow 函数中的重复次数

```glsl
col += 0.4 * snow(uv * 3.0);
col += 0.3 * snow(uv * 6.0);
```

改变运动速度：调整时间系数

```glsl
p.y += 1.5 * time; // 修改系数控制下落速度
```

颜色定制：修改基础背景色

```glsl
vec4 col = vec4(0.2, 0.4, 0.7, 1.0); // RGBA颜色值
```

## 五、完整代码

```js
import * as THREE from 'three';

const snowflakeShader = {
  uniforms: {
    iTime: { value: 0 },
    iResolution: { value: new THREE.Vector2(1, 1) },
  },

  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,

  fragmentShader: `
    precision highp float;
    varying vec2 vUv;
    uniform vec2 iResolution;
    uniform float iTime;

    #define PI2 6.28
    #define PI 3.1416

    vec2 p_to_pc(vec2 p) {
      return vec2(atan(p.y, p.x), length(p));
    }

    vec2 pc_to_p(vec2 pc) {
      return vec2(pc.y * cos(pc.x), pc.y * sin(pc.x));
    }

    vec2 fieldA(vec2 pc) {
      pc.y += 0.02 * floor(cos(pc.x * 6.0) * 5.0);
      pc.y += 0.01 * floor(10.0 * cos(pc.x * 30.0));
      pc.y += 0.5 * cos(pc.y * 10.0);
      return pc;
    }

    vec2 fieldB(vec2 pc, float f) {
      pc.y += 0.1 * cos(pc.y * 100.0 + 10.0);
      pc.y += 0.1 * cos(pc.y * 20.0 + f);
      pc.y += 0.04 * cos(pc.y * 10.0 + 10.0);
      return pc;
    }

    vec4 snow_flake(vec2 p, float f) {
      vec4 col = vec4(0.0);
      vec2 pc = p_to_pc(p * 10.0);
      pc = fieldA(fieldB(pc, f));
      p = pc_to_p(pc);
      float d = length(p);
      if(d < 0.3) {
        col.rgba += vec4(1.0);
      }
      return col;
    }

    vec4 snow(vec2 p) {
      vec4 col = vec4(0.0);
      float time = iTime / 2.0;
      p.y += 2.0 * time;
      p = fract(p + 0.5) - 0.5;
      p *= 1.0;
      p.x += 0.01 * cos(p.y * 3.0 + p.x * 3.0 + time * PI2);
      
      col += snow_flake(p, 1.0);
      col += snow_flake(p + vec2(0.2, -0.1), 4.0);
      col += snow_flake(p * 2.0 + vec2(-0.4, -0.5), 5.0);
      col += snow_flake(p * 1.0 + vec2(-0.2, 0.4), 9.0);
      col += 2.0 * snow_flake(p * 1.0 + vec2(0.4, -0.4), 5.0);
      col += snow_flake(p * 1.0 + vec2(-1.2, 1.2), 9.0);
      col += snow_flake(p * 1.0 + vec2(2.4, -1.2), 5.0);
      col += snow_flake(p * 1.0 + vec2(-1.2, 1.1), 9.0);
      
      return col;
    }

    void main() {
      vec2 uv = (vUv - 0.5) * vec2(iResolution.x / iResolution.y, 1.0) * 2.0;
      vec4 col = vec4(0.2, 0.4, 0.7, 1.0);
      
      col += 0.3 * snow(uv * 2.0);
      col += 0.2 * snow(uv * 4.0 + vec2(iTime / 2.0, 0.0));
      col += 0.1 * snow(uv * 8.0);
      
      gl_FragColor = col;
    }
  `,
};

// 使用示例
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

const geometry = new THREE.PlaneGeometry(2, 2);
const material = new THREE.ShaderMaterial({
  fragmentShader: snowflakeShader.fragmentShader,
  vertexShader: snowflakeShader.vertexShader,
  uniforms: {
    iTime: { value: 0 },
    iResolution: {
      value: new THREE.Vector2(window.innerWidth, window.innerHeight),
    },
  },
});

const plane = new THREE.Mesh(geometry, material);
scene.add(plane);

camera.position.z = 1;

function animate() {
  requestAnimationFrame(animate);
  material.uniforms.iTime.value = performance.now() / 1000;
  material.uniforms.iResolution.value.set(
    window.innerWidth,
    window.innerHeight,
  );
  renderer.render(scene, camera);
}

animate();

// 处理窗口大小变化
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  material.uniforms.iResolution.value.set(
    window.innerWidth,
    window.innerHeight,
  );
});
```

## 六、结语

本文实现的分形雪花效果展示了 WebGL 在复杂图形渲染方面的强大能力。通过调整分形参数、颜色值和运动函数，开发者可以创造出无限多样的冬日场景效果。这种基于数学函数生成图形的方式，在粒子系统、背景特效等领域都有广泛应用前景。
