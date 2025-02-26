# Threejs 实现圆形脉冲特效

<!-- https://www.shadertoy.com/view/3tdSRn -->


## 一、片元着色器解析

### 1. HSV 色彩空间转换

```glsl
vec3 hsv2rgb(float h, float s, float v) {
  vec4 t = vec4(1.0, 2.0/3.0, 1.0/3.0, 3.0);
  vec3 p = abs(fract(vec3(h) + t.xyz) * 6.0 - vec3(t.w));
  return v * mix(vec3(t.x), clamp(p - vec3(t.x), 0.0, 1.0), s);
}
```

实现原理：通过相位偏移和颜色分量混合生成彩虹色系

### 2. 动态光环生成算法

```glsl
vec3 drawCircle(vec2 pos, float radius, float width, float power, vec4 color) {
  vec2 mousePos = mouse * 2.0 - 1.0;  // 转换到[-1,1]坐标系
  float dist1 = length(pos);
  dist1 = fract((dist1 * 5.0) - fract(time)); // 创建波纹重复效果
  float dist2 = dist1 - radius;
  float intensity = pow(radius / abs(dist2), width);
  return color.rgb * intensity * power * max((0.8 - abs(dist2)), 0.0);
}
```

关键参数控制：

- \*5.0：控制波纹密度
- fract(time)：生成无限循环动画
- pow()函数：控制光环衰减曲线

### 3. 主渲染逻辑

```glsl
void main() {
  // 坐标标准化处理
  vec2 aspect = vec2(resolution.x / resolution.y, 1.0);
  vec2 pos = (vUv * 2.0 - 1.0) * aspect; // 转换到[-aspect, aspect]坐标系

  // 动态颜色生成
  float h = mix(0.5, 0.65, length(pos)); // 基于距离混合色相
  vec4 color = vec4(hsv2rgb(h, 1.0, 1.0), 1.0);

  // 合成最终效果
  vec3 finalColor = drawCircle(pos, 0.5, 0.8, 0.1, color);
  gl_FragColor = vec4(finalColor, 1.0);
}

```

##  二、完整代码

```js
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// 初始化场景
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

// 着色器材质
const shaderMaterial = new THREE.ShaderMaterial({
  uniforms: {
    time: { value: 0 },
    resolution: { value: new THREE.Vector2() },
    mouse: { value: new THREE.Vector2(0.5, 0.5) },
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
    uniform vec2 resolution;
    uniform float time;
    uniform vec2 mouse;
    varying vec2 vUv;

    vec3 hsv2rgb(float h, float s, float v) {
      vec4 t = vec4(1.0, 2.0/3.0, 1.0/3.0, 3.0);
      vec3 p = abs(fract(vec3(h) + t.xyz) * 6.0 - vec3(t.w));
      return v * mix(vec3(t.x), clamp(p - vec3(t.x), 0.0, 1.0), s);
    }

    vec3 drawCircle(vec2 pos, float radius, float width, float power, vec4 color) {
      vec2 mousePos = mouse * 2.0 - 1.0;
      float dist1 = length(pos);
      dist1 = fract((dist1 * 5.0) - fract(time));
      float dist2 = dist1 - radius;
      float intensity = pow(radius / abs(dist2), width);
      return color.rgb * intensity * power * max((0.8 - abs(dist2)), 0.0);
    }

    void main() {
      vec2 aspect = vec2(resolution.x / resolution.y, 1.0);
      vec2 pos = (vUv * 2.0 - 1.0) * aspect;
      
      float h = mix(0.5, 0.65, length(pos));
      vec4 color = vec4(hsv2rgb(h, 1.0, 1.0), 1.0);
      
      vec3 finalColor = drawCircle(pos, 0.5, 0.8, 0.1, color);
      gl_FragColor = vec4(finalColor, 1.0);
    }
  `,
});

// 创建平面网格
const geometry = new THREE.PlaneGeometry(2, 2);
const mesh = new THREE.Mesh(geometry, shaderMaterial);
scene.add(mesh);

// 设置相机
camera.position.z = 1;

// 响应式处理
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  shaderMaterial.uniforms.resolution.value.set(
    window.innerWidth,
    window.innerHeight,
  );
});

// 鼠标交互
document.addEventListener('mousemove', (e) => {
  shaderMaterial.uniforms.mouse.value.set(
    e.clientX / window.innerWidth,
    1.0 - e.clientY / window.innerHeight,
  );
});

// 初始分辨率
shaderMaterial.uniforms.resolution.value.set(
  window.innerWidth,
  window.innerHeight,
);

// 动画循环
function animate() {
  requestAnimationFrame(animate);
  shaderMaterial.uniforms.time.value = performance.now() / 1000;
  renderer.render(scene, camera);
}
animate();
```

## 总结
该着色器创造了一个动态的极光波纹特效系统，通过 HSV 色彩空间转换生成彩虹色谱，利用标准化坐标映射技术实现自适应屏幕比例，核心采用分形时间函数 fract(time)驱动无限循环的波纹扩散。特效呈现中心辐射状多层光环，具备色相随距离渐变（0.5→0.65HSV 区间）、动态波纹密度（5 倍压缩系数）和指数衰减光晕（0.8 宽度参数


