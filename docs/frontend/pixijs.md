# 探索 PixiJS：强大的 2D 图形渲染库

- 随着 Web 技术的发展，越来越多的开发者希望在网页中实现丰富的视觉效果和动画。PixiJS 作为一个高性能的 2D 渲染库，凭借其强大的功能和易用性，成为了许多游戏和互动应用开发者的首选。本文将深入探讨 PixiJS 的特点、应用场景以及核心功能，帮助你更好地理解并应用这个库。

### 什么是 PixiJS？

- PixiJS 是一个开源的 2D 渲染引擎，旨在为 Web 应用提供高性能的图形渲染。它使用 WebGL 渲染技术，能够在现代浏览器中实现流畅的动画和交互效果，同时也兼容 Canvas 作为回退方案。PixiJS 的灵活性和扩展性使其非常适合开发游戏、图形应用、数据可视化等多种场景。

### 为什么选择 PixiJS？

- PixiJS 的设计理念是高效和易用。它不仅提供了强大的图形处理能力，还确保了良好的性能，能够支持大规模的图形和动画。以下是使用 PixiJS 的一些主要优势：

- 高性能渲染：

1. PixiJS 基于 WebGL 构建，能够利用 GPU 加速渲染，提供极高的帧率，适合制作动画密集型的应用。
   灵活的场景图形：

2. PixiJS 允许开发者创建复杂的场景结构，通过容器和精灵（Sprite）来管理和渲染对象，使得构建复杂的用户界面变得简单。
   丰富的内置功能：

3. PixiJS 内置了对滤镜、遮罩、纹理管理、动画等功能的支持，极大地简化了图形处理和效果实现。
   友好的开发体验：

4. PixiJS 提供了简洁的 API 和详细的文档，开发者可以快速上手，降低学习曲线。

- 跨平台支持：
- 由于基于 HTML5 技术，PixiJS 可以在所有支持 WebGL 的浏览器中运行，包括桌面和移动设备，确保了广泛的兼容性。

### 快速上手

- 首先，你需要在你的项目中引入 PixiJS。你可以通过 CDN 或 npm 安装。

1. ##### 使用 CDN

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>PixiJS Example</title>
    <script src="https://pixijs.download/release/pixi.js"></script>
  </head>
  <body>
    <script>
      // PixiJS 代码将在这里编写
    </script>
  </body>
</html>
```

2. ##### 使用 CDN

- 如果你使用 Node.js 项目，可以通过 npm 安装 PixiJS：

```bash
npm install pixi.js
```

3. ##### 创建 PixiJS 应用

- PixiJS 应用的创建非常简单。首先需要实例化一个 PIXI.Application 对象，并将其视图（canvas）添加到 HTML 文档中。

```js
import * as PIXI from 'pixi.js';

// 添加应用
const app = new PIXI.Application({
    width:window.innerWidth,
    height:window.innerHeight,
    background:0x1099bb,
    resolution:window.devicePixelRatio | 1
});


const circle = new PIXI.Graphics();
circle.beginFill(0x66ccff,0.9);
circle.drawCircle(0,0,32);
circle.endFill();
circle.position.set(300,200);
app.stage.addChild(circle);


document.body.appendChild(app.view as any);
```

### 常见图元绘制

1. ##### 绘制矩形

- 绘制矩形可以使用 drawRect 方法。需要指定矩形的位置和尺寸：

```js
import * as PIXI from 'pixi.js';

const app = new PIXI.Application({
    width: window.innerWidth,
    height: window.innerHeight,
    background: 0x1099bb,
    resolution: window.devicePixelRatio || 1
});


const graphics = new PIXI.Graphics();
graphics.beginFill(0xff0000);
graphics.drawRect(50,50,100,100);
graphics.endFill();
graphics.position.set(100,100);
app.stage.addChild(graphics);

document.body.appendChild(app.view as any);
```

2. ##### 绘制圆形

- 使用 drawCircle 方法可以绘制圆形。需要指定圆心坐标和半径：

```js
import * as PIXI from 'pixi.js';

const app = new PIXI.Application({
    width: window.innerWidth,
    height: window.innerHeight,
    background: 0x1099bb,
    resolution: window.devicePixelRatio || 1
});

const graphics = new PIXI.Graphics();
graphics.beginFill(0xff0000);
graphics.drawCircle(200, 200, 50);
graphics.endFill();
graphics.position.set(100,100);
app.stage.addChild(graphics);


document.body.appendChild(app.view as any);

```

3. ##### 绘制线条

- 使用 lineStyle 方法设置线条的样式，然后使用 moveTo 和 lineTo 方法绘制线条：

```js
import * as PIXI from 'pixi.js';

const app = new PIXI.Application({
    width: window.innerWidth,
    height: window.innerHeight,
    background: 0x1099bb,
    resolution: window.devicePixelRatio || 1
});

const graphics = new PIXI.Graphics();
graphics.lineStyle(2,0x0000ff);
graphics.moveTo(300, 50);
graphics.lineTo(400, 150);
graphics.endFill();
graphics.position.set(100,100);
app.stage.addChild(graphics);

document.body.appendChild(app.view as any);

```

4. ##### 绘制多边形

- 使用 drawPolygon 方法可以绘制多边形。你需要传递一个数组，定义多边形的各个顶点：

```js
import * as PIXI from 'pixi.js';

const app = new PIXI.Application({
    width: window.innerWidth,
    height: window.innerHeight,
    background:0x1099bb,
    resolution: window.devicePixelRatio || 1,
});

const graphics = new PIXI.Graphics();
graphics.beginFill(0xffff00);
const points = [100, 100, 150, 50, 200, 100];
graphics.drawPolygon(points);
graphics.endFill();
graphics.position.set(100,100);
app.stage.addChild(graphics);

document.body.appendChild(app.view as any);

```

5. ##### 绘制贝塞尔曲线

- 使用 bezierCurveTo 方法可以绘制贝塞尔曲线。需要指定控制点和终点：

```js
import * as PIXI from 'pixi.js';

const app = new PIXI.Application({
    width: window.innerWidth,
    height: window.innerHeight,
    background:0x1099bb,
    resolution: window.devicePixelRatio || 1,
});

const graphics = new PIXI.Graphics();
graphics.lineStyle(2,0xff00ff);
graphics.moveTo(400, 200);
graphics.bezierCurveTo(450, 100, 500, 300, 600, 200);
graphics.position.set(100,100);
app.stage.addChild(graphics);

document.body.appendChild(app.view as any);

```

6. ##### 设置透明度和线条样式

```js
import * as PIXI from 'pixi.js';

const app = new PIXI.Application({
    width: window.innerWidth,
    height: window.innerHeight,
    background:0x1099bb,
    resolution: window.devicePixelRatio || 1,
});

const graphics = new PIXI.Graphics();
graphics.beginFill(0x0000ff,0.5);
graphics.drawRect(150, 150, 100, 100);
graphics.endFill();
graphics.position.set(100,100);
app.stage.addChild(graphics);

document.body.appendChild(app.view as any);

```

### 添加精灵

- 精灵是 PixiJS 中最基本的图形对象，用于显示纹理。你可以从本地文件或网络加载图像。

```js
import * as PIXI from 'pixi.js';

const app = new PIXI.Application({
    width: window.innerWidth,
    height: window.innerHeight,
    background:0x1099bb,
    resolution: window.devicePixelRatio || 1,
});

const graphics = new PIXI.Graphics();
graphics.beginFill(0x0000ff,0.5);
graphics.drawRect(150, 150, 100, 100);
graphics.endFill();
graphics.position.set(100,100);
app.stage.addChild(graphics);

// 创建纹理
const texture = PIXI.Texture.from('./vite.svg');
// 创建精灵
const sprite = new PIXI.Sprite(texture);
//  设置精灵位置
sprite.x = app.screen.width / 2;
sprite.y = app.screen.height / 2;

app.stage.addChild(sprite);

// 添加动画
app.ticker.add((delta) => {
    sprite.rotation += 0.01 * delta;
})


document.body.appendChild(app.view as any);
```

### 添加交互事件

- PixiJS 允许你为精灵和图形添加交互事件，如点击、拖拽等。

```js
import * as PIXI from 'pixi.js';

const app = new PIXI.Application({
    width: window.innerWidth,
    height: window.innerHeight,
    background:0x1099bb,
    resolution: window.devicePixelRatio || 1,
});

const graphics = new PIXI.Graphics();
graphics.beginFill(0x0000ff,0.5);
graphics.drawRect(150, 150, 100, 100);
graphics.endFill();
graphics.position.set(100,100);
app.stage.addChild(graphics);

// 创建纹理
const texture = PIXI.Texture.from('./vite.svg');
// 创建精灵
const sprite = new PIXI.Sprite(texture);
//  设置精灵位置
sprite.x = app.screen.width / 2;
sprite.y = app.screen.height / 2;
// 交互事件
//-----------------------------
sprite.interactive = true; // 使精灵可交互
sprite.on("click", () => {
  console.log("click");
});


app.stage.addChild(sprite);

// 添加动画
app.ticker.add((delta) => {
    sprite.rotation += 0.01 * delta;
})


document.body.appendChild(app.view as any);
```

### 加载纹理和资源

- PixiJS 提供了资源加载器，可以加载多个图像和纹理。

```js
import * as PIXI from 'pixi.js';

const app = new PIXI.Application({
    width: window.innerWidth,
    height: window.innerHeight,
    background: 0x1099bb,
    resolution: window.devicePixelRatio || 1,
});

const graphics = new PIXI.Graphics();
graphics.beginFill(0x0000ff, 0.5);
graphics.drawRect(150, 150, 100, 100);
graphics.endFill();
graphics.position.set(100, 100);
app.stage.addChild(graphics);

// 资源管理
PIXI.Assets.add("vite", "./textuer/vite.svg");

const texturePromise = PIXI.Assets.load(['vite']);
texturePromise.then((textures) => {
    const sprite = new PIXI.Sprite(textures.vite);
    sprite.x = app.screen.width / 2;
    sprite.y = app.screen.height / 2;

    sprite.anchor.set(0.5);

    sprite.scale.set(1.5);
    app.stage.addChild(sprite);

})


document.body.appendChild(app.view as any);
```

### 添加字体

- PixiJS 使用 Text 来创建字体样式。

```js
import * as PIXI from "pixi.js";

const app = new PIXI.Application({
  width: window.innerWidth,
  height: window.innerHeight,
  background: 0x1099bb,
  resolution: window.devicePixelRatio || 1,
});

const text = new PIXI.Text("hello world", {
  fontFamily: "Arial",
  fontSize: 80,
  fill: 0xff000,
  align: "center",
});

text.x = app.screen.width / 2 - 80;
text.y = app.screen.height / 2 - 80;

app.stage.addChild(text);


document.body.appendChild(app.view as any);

```

### 使用滤镜和效果

- 你可以为精灵和图形应用多种视觉效果，如模糊、颜色调整等。

```js
import * as PIXI from "pixi.js";

const app = new PIXI.Application({
  width: window.innerWidth,
  height: window.innerHeight,
  background: 0x1099bb,
  resolution: window.devicePixelRatio || 1,
});


// 创建纹理
const texture = PIXI.Texture.from("./texture/vite.svg");
// 创建精灵
const sprite = new PIXI.Sprite(texture);
//  设置精灵位置
sprite.x = app.screen.width / 2;
sprite.y = app.screen.height / 2;

app.stage.addChild(sprite);

// 添加动画
app.ticker.add((delta) => {
  sprite.rotation += 0.01 * delta;
});

const blurFilter = new PIXI.BlurFilter();
blurFilter.blur = 2;
sprite.filters = [blurFilter];


sprite.interactive = true;
sprite.on('pointerover',() => {
    blurFilter.blur = 0;
});

sprite.on('pointerout',() => {
    blurFilter.blur = 2.0;
})

document.body.appendChild(app.view as any);
```
