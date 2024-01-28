### 获取webgpu设置对像
```js
async function  init() {
  const adapter = await navigator.gpu.requestAdapter();
  const device = await adapter?.requestDevice();
  console.log('device',device);
  
}
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