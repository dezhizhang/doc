
https://www.bilibili.com/video/BV1uN411M7Km/?spm_id_from=333.788&vd_source=10257e657caa8b54111087a9329462e8
# webgpu
- 所谓

###  配置webgpu对像
```js

async function init() {
  const canvas = document.createElement('canvas');
  canvas.width = 500;
  canvas.height = 500;

  const adapter = await navigator.gpu.requestAdapter();
  const device = await adapter.requestDevice();

  const ctx = canvas.getContext('webgpu');


  const format = navigator.gpu.getPreferredCanvasFormat();

  // 设置gup设置对像
  ctx.configure({
    device,
    format, //颜色格式
  });

  document.body.append(canvas);

}

init();
```
### 配置webgup
```ts
async function  init() {
  const adapter = await navigator.gpu.requestAdapter();
  const device = await adapter?.requestDevice();

  const canvas = document.getElementById('canvas');

  // 配置gpu

  const context = (canvas as any)?.getContext('webgpu');
  const format = navigator.gpu.getPreferredCanvasFormat();
  context.configure({
    device,
    format:format
  });
  console.log('canvas',context);
  
}

init();
```


<!-- https://www.bilibili.com/video/BV11M41137UH?p=12&vd_source=10257e657caa8b54111087a9329462e8 -->