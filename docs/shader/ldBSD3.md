# Threejs 实现加载动画

> 大家好！我是 [数擎 AI]，一位热爱探索新技术的前端开发者，在这里分享前端和 Web3D、AI 技术的干货与实战经验。如果你对技术有热情，欢迎关注我的文章，我们一起成长、进步！
> **开发领域**：前端开发 | AI 应用 | Web3D | 元宇宙  
> **技术栈**：JavaScript、React、ThreeJs、WebGL、Go  
> **经验经验**：6 年+ 前端开发经验，专注于图形渲染和 AI 技术  
> **经验经验**：[演示地址](https://shader.shuqin.cc/cine-shader)
> **开源项目**：[AI 智简未来](https://aint.top)、[晓智元宇宙](https://xiaozhi.shop/)、[数字孪生引擎](https://www.shuqin.cc/) [源码地址](https://github.com/dezhizhang/shadertoy)

##  核心实现原理

### 1. 坐标系统转换 ‌

- 将屏幕空间坐标转换为归一化极坐标系：

```glsl
vec2 uv = vUv * vec2(iResolution.x/iResolution.y, 1.0);
uv -= vec2(0.87, 0.5);
```

通过保持宽高比一致性 ‌57，确保图形在不同分辨率下保持正确比例

### 2. 旋转动画矩阵 ‌

- 基于时间变量生成动态旋转角度：

```glsl
float angle = -(time - sin(time + PI) * cos(time)) - time * 0.95;
mat2 rot = mat2(cos(angle), sin(angle), -sin(angle), cos(angle));
```

这种非线性时间函数 ‌36 创造了复杂的运动轨迹

#### 3. 形状绘制

```glsl
float L = length(p);
float f = 0.;
f = smoothstep(L - .005, L, .35);
f -= smoothstep(L, L + 0.005, .27);
```

- L < 0.35 形成外圈。
- L > 0.27 内部减弱，形成环形带。

#### 4. 角度控制弧形

```glsl
float t = mod(time, TPI) - PI;
float t1 = -PI;
float t2 = sin(t) * (PI - .25);
```

- t：随时间变化的角度范围（mod(time, TPI) - PI）。
- t1, t2：限制弧形的角度范围。

```glsl
float a = atan(p.y, p.x);
f = f * step(a, t2) * (1. - step(a, t1));
```

- a = atan(p.y, p.x) 计算当前像素的极坐标角度。
- step(a, t2) \* (1. - step(a, t1)) 限制 f 仅在 [t1, t2] 之间，使其成为弧形，而不是完整圆环。

#### 5. 颜色计算

```glsl
col = mix(col, vec3(cos(time), cos(time + TPI / 3.), cos(time + 2. * TPI / 3.)), f);
```

- vec3(cos(time), cos(time + TPI / 3.), cos(time + 2. \* TPI / 3.)) 生成基于 cos(time) 变化的 RGB 颜色，实现动态色彩过渡。
- mix(col, color, f) 按 f 进行颜色混合，使得弧形具有渐变色。

6. 输出颜色
```glsl
gl_FragColor = vec4(col, 1.0);

```
- 将计算出的颜色 col 赋值给 gl_FragColor，用于渲染像素。


## 完整代码

```js
import * as THREE from 'three';

// 创建场景
const scene = new THREE.Scene();
const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
camera.position.z = 1;

// 创建 WebGL 渲染器
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 片段着色器
const fragmentShader = `
#define PI 3.14159265359
#define TPI 6.28318530718
#define HPI 1.57079632679

uniform vec2 iResolution;
uniform float iTime;

void main() {
    vec2 fragCoord = gl_FragCoord.xy;
    vec2 uv = fragCoord.xy / iResolution.y;

    vec2 p = uv - vec2(.87,.5);
    float time = iTime * 1.5;
    
    float angle = -(time - sin(time + PI) * cos(time )) - time * .95;
    mat2 rot = mat2(cos(angle), sin(angle), -sin(angle), cos(angle));
    p = rot * p;
    
    vec3 col = vec3(0.);
    float L = length(p);
    float f = 0.;
    
    f = smoothstep(L - .005, L, .35);
    f -= smoothstep(L, L + 0.005, .27);
    
    float t = mod(time, TPI) - PI;
    float t1 = -PI;
    float t2 = sin(t) * (PI - .25);
    
    float a = atan(p.y, p.x);
    f = f * step(a, t2) * (1. - step(a, t1));
    
    col = mix(col, vec3(cos(time), cos(time + TPI / 3.), cos(time + 2. * TPI / 3.)), f);

    gl_FragColor = vec4(col, 1.0);
}
`;

// 顶点着色器
const vertexShader = `
void main() {
    gl_Position = vec4(position, 1.0);
}
`;

// 创建 ShaderMaterial
const material = new THREE.ShaderMaterial({
  uniforms: {
    iResolution: {
      value: new THREE.Vector2(window.innerWidth, window.innerHeight),
    },
    iTime: { value: 0 },
  },
  vertexShader,
  fragmentShader,
});

// 创建屏幕四边形
const geometry = new THREE.PlaneGeometry(2, 2);
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// 动画循环
function animate() {
  material.uniforms.iTime.value = performance.now() / 1000;
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

animate();

// 窗口大小变化时更新
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  material.uniforms.iResolution.value.set(
    window.innerWidth,
    window.innerHeight,
  );
});
```
