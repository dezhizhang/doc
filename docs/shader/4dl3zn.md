# Three.js实现动态水泡效果逐步解析GLSL着色器


> 大家好！我是 [数擎 AI]，一位热爱探索新技术的前端开发者，在这里分享前端和 Web3D、AI 技术的干货与实战经验。如果你对技术有热情，欢迎关注我的文章，我们一起成长、进步！
> **开发领域**：前端开发 | AI 应用 | Web3D | 元宇宙  
> **技术栈**：JavaScript、React、ThreeJs、WebGL、Go  
> **经验经验**：6 年+ 前端开发经验，专注于图形渲染和 AI 技术  
> **经验经验**：[演示地址](https://shader.shuqin.cc/lscczl)
> **开源项目**：[智简未来](https://aint.top)、[晓智元宇宙](https://xiaozhi.shop/)、[数字孪生引擎](https://www.shuqin.cc/) 、[源码地址](https://github.com/dezhizhang/shadertoy)


在这个示例中，我们将使用GLSL着色器来模拟多个水泡漂浮的效果。每个水泡的大小、位置和颜色都会随着时间变化，创造出一个生动的动态场景。接下来，我们将逐步解析着色器代码，并了解如何将其集成到Three.js中。

## GLSL着色器代码解析

首先，我们来看一下GLSL着色器的代码：

```js
uniform float iTime;        // 当前时间
uniform vec3 iResolution;   // 屏幕分辨率

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    vec2 uv = (2.0*fragCoord-iResolution.xy) / iResolution.y;

    // 背景     
    vec3 color = vec3(0.8 + 0.2*uv.y);

    // 水泡  
    for( int i=0; i<40; i++ )
    {
        // 水泡的种子
        float pha = sin(float(i)*546.13+1.0)*0.5 + 0.5;
        float siz = pow(sin(float(i)*651.74+5.0)*0.5 + 0.5, 4.0);
        float pox = sin(float(i)*321.55+4.1) * iResolution.x / iResolution.y;

        // 水泡的大小、位置和颜色
        float rad = 0.1 + 0.5*siz;
        vec2 pos = vec2(pox, -1.0-rad + (2.0+2.0*rad)*mod(pha+0.1*iTime*(0.2+0.8*siz),1.0));
        float dis = length(uv - pos);
        vec3 col = mix(vec3(0.94, 0.3, 0.0), vec3(0.1, 0.4, 0.8), 0.5 + 0.5*sin(float(i)*1.2+1.9));
        
        // 渲染水泡
        float f = length(uv - pos) / rad;
        f = sqrt(clamp(1.0 - f * f, 0.0, 1.0));
        color -= col.zyx * (1.0 - smoothstep(rad*0.95, rad, dis)) * f;
    }

    // 镜头效果  
    color *= sqrt(1.5 - 0.5 * length(uv));

    fragColor = vec4(color, 1.0);
}

void main() {
    mainImage(gl_FragColor, gl_FragCoord.xy);
}

```

### 1. 着色器基础
着色器是计算图形中每个像素（或片段）颜色的程序。它们通常在GPU上运行，负责计算图像的最终呈现。在这个着色器中，我们主要关注片元着色器，它决定了每个像素的颜色和透明度。

iTime: 这个 uniform 变量表示程序运行的时间。它可以用来动态地控制效果，比如使水泡的位置随着时间变化。
iResolution: 这个 uniform 变量表示屏幕的分辨率，它帮助着色器计算屏幕坐标，以便在不同分辨率下生成相同效果。

### 2. 背景色渐变
着色器的第一部分是设置背景颜色。背景的颜色根据屏幕的垂直坐标（uv.y）进行渐变：
```glsl
vec3 color = vec3(0.8 + 0.2 * uv.y);

```
这里，背景颜色随着uv.y（即y轴坐标）从0.8渐变到1.0，创造出一种简单的渐变效果。

### 3. 水泡效果
水泡的效果是通过一个for循环生成多个水泡来实现的。每个水泡的种子（pha）和大小（siz）由数学公式控制，随着时间（iTime）变化，水泡的位置和大小会不断变化。

生成水泡的位置
水泡的位置pos是根据多个因素计算出来的，其中包括每个水泡的种子（pha）和与时间相关的变化。mod(pha + 0.1 * iTime * (0.2 + 0.8 * siz), 1.0)部分使得每个水泡的位置随时间变化，模拟水泡漂浮的效果。
```glsl
vec2 pos = vec2(pox, -1.0 - rad + (2.0 + 2.0 * rad) * mod(pha + 0.1 * iTime * (0.2 + 0.8 * siz), 1.0));

```

计算每个水泡的颜色
每个水泡的颜色通过mix函数进行渐变计算。水泡的颜色在红色和蓝色之间变化，以增加视觉多样性。

```glsl
vec3 col = mix(vec3(0.94, 0.3, 0.0), vec3(0.1, 0.4, 0.8), 0.5 + 0.5 * sin(float(i) * 1.2 + 1.9));
```
### 4. 水泡的渲染
为了渲染水泡，我们计算每个像素与水泡中心的距离。如果距离小于水泡的半径，表示该像素位于水泡内。我们使用smoothstep函数来平滑过渡，使水泡的边缘看起来更柔和。

```glsl
float f = length(uv - pos) / rad;
f = sqrt(clamp(1.0 - f * f, 0.0, 1.0));
color -= col.zyx * (1.0 - smoothstep(rad * 0.95, rad, dis)) * f;
```
### 5. 镜头效果
最后，通过对每个像素的uv坐标进行缩放，模拟了一个简单的镜头效果，使得图像的中心部分更加清晰，边缘逐渐变得模糊。

```glsl
color *= sqrt(1.5 - 0.5 * length(uv));
```
## 完整threejs代码
```js
import * as THREE from 'three';

// Create the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create a plane geometry (to display the shader)
const geometry = new THREE.PlaneGeometry(window.innerWidth, window.innerHeight);

// Define the shader material
const material = new THREE.ShaderMaterial({
  uniforms: {
    iTime: { value: 0 },  // Uniform for time
    iResolution: { value: new THREE.Vector3(window.innerWidth, window.innerHeight, 1) } // Resolution
  },
  fragmentShader: `
    uniform float iTime;
    uniform vec3 iResolution;

    void mainImage( out vec4 fragColor, in vec2 fragCoord )
    {
      vec2 uv = (2.0*fragCoord-iResolution.xy) / iResolution.y;

      // background     
      vec3 color = vec3(0.8 + 0.2*uv.y);

      // bubbles  
      for( int i=0; i<40; i++ )
      {
          // bubble seeds
          float pha =      sin(float(i)*546.13+1.0)*0.5 + 0.5;
          float siz = pow( sin(float(i)*651.74+5.0)*0.5 + 0.5, 4.0 );
          float pox =      sin(float(i)*321.55+4.1) * iResolution.x / iResolution.y;

          // bubble size, position and color
          float rad = 0.1 + 0.5*siz;
          vec2  pos = vec2( pox, -1.0-rad + (2.0+2.0*rad)*mod(pha+0.1*iTime*(0.2+0.8*siz),1.0));
          float dis = length( uv - pos );
          vec3  col = mix( vec3(0.94,0.3,0.0), vec3(0.1,0.4,0.8), 0.5+0.5*sin(float(i)*1.2+1.9));
          
          // render
          float f = length(uv-pos)/rad;
          f = sqrt(clamp(1.0-f*f,0.0,1.0));
          color -= col.zyx *(1.0-smoothstep( rad*0.95, rad, dis )) * f;
      }

      // vigneting  
      color *= sqrt(1.5-0.5*length(uv));

      fragColor = vec4(color,1.0);
    }

    void main() {
      mainImage(gl_FragColor, gl_FragCoord.xy);
    }
  `,
});

// Create the mesh with the shader material and geometry
const plane = new THREE.Mesh(geometry, material);
scene.add(plane);

// Position the camera
camera.position.z = 1;

// Animate the scene
function animate(time) {
  requestAnimationFrame(animate);

  // Update uniforms
  material.uniforms.iTime.value = time * 0.001;

  // Render the scene
  renderer.render(scene, camera);
}

// Start the animation
animate(0);

// Handle window resizing
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  // Update resolution uniform on resize
  material.uniforms.iResolution.value.set(window.innerWidth, window.innerHeight, 1);
});

```
### 总结
本文介绍了如何使用Three.js和GLSL着色器实现一个动态水泡效果。我们通过创建自定义着色器，控制水泡的动画、位置、大小和颜色，最终通过ShaderMaterial将其应用到Three.js场景中。这个过程不仅帮助我们理解了GLSL的基本使用方法，也展示了如何将着色器与Three.js结合，制作出动态的视觉效果。