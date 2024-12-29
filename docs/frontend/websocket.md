# WebSocket 入门详解

> **开发领域**：前端开发 | AI 应用 | Web3D | 元宇宙  
> **技术栈**：JavaScript、React、Three.js、WebGL、Go  
> **经验经验**：6年+ 前端开发经验，专注于图形渲染和AI技术  
> **开源项目**：[智简未来](https://aint.top) [晓智元宇宙](https://www.xiaozhi.shop/)、[数字孪生引擎](https://www.shuqin.cc/)   
> 大家好！我是 [晓智]，一位热爱探索新技术的前端开发者，在这里分享前端和Web3D、AI技术的干货与实战经验。如果你对技术有热情，欢迎关注我的文章，我们一起成长、进步！


## 什么是 WebSocket？

WebSocket 是一种在单个 TCP 连接上提供全双工通信的协议。它由 IETF 于 2011 年标准化，被广泛应用于实时应用程序中，例如在线聊天、游戏、股票行情更新等。

相比于传统的 HTTP 请求-响应模式，WebSocket 具有以下特点：

1. **全双工通信**：客户端和服务器可以随时互相发送消息。
2. **低延迟**：由于协议头部较小且无需频繁建立连接，通信效率更高。
3. **状态保持**：WebSocket 连接一旦建立，可以长期保持，避免了 HTTP 的无状态性问题。

---

## WebSocket 的工作原理

1. **握手阶段**：

   - WebSocket 连接始于客户端通过 HTTP 向服务器发起的 WebSocket 握手请求。
   - 请求包含 `Upgrade` 和 `Connection` 头部，用于标识升级协议。
   - 服务器接受请求后，会返回 `101 Switching Protocols` 响应码，完成协议切换。

2. **通信阶段**：
   - 握手成功后，客户端和服务器之间建立一个持续的双向通信通道。
   - 数据通过帧（frames）的形式传输，帧头部较小，效率高。

---

## WebSocket 与 HTTP 的区别

| 特性     | WebSocket                | HTTP                  |
| -------- | ------------------------ | --------------------- |
| 协议类型 | 全双工                   | 半双工                |
| 连接保持 | 长连接                   | 每次请求需要新连接    |
| 消息方向 | 双向通信                 | 单向通信（请求-响应） |
| 头部大小 | 小（适合频繁通信）       | 大（适合偶发性通信）  |
| 应用场景 | 实时应用（聊天、游戏等） | 静态资源获取          |

---

## 如何使用 WebSocket？

以下是一个简单的 WebSocket 示例：

### 安装 websocket 包

```bash
pnpm i websocket
```

### 客户端代码

```javascript
// 0 链接还没有建立
// 1 链接建立
// 2 链接正在关闭
// 3 链接已关闭
const websocket = new WebSocket('ws://localhost:8080/');

websocket.onopen = function () {
  console.log(websocket.readyState);
};

const btn = document.getElementById('btn');
btn.addEventListener('click', () => {
  const value = document.getElementById('text').value;
  websocket.send(value);
});

websocket.onmessage = function (msg) {
  console.log(msg.data);
};
```

### 服务端代码（Node.js 示例）

```js
const WebSocketServer = require('websocket').server;
const http = require('http');

const server = http.createServer(function (request, response) {
  response.writeHead(404);
  response.end();
});

server.listen(8080, function () {
  console.log('server run in 8080');
});

const wsServer = new WebSocketServer({
  httpServer: server,
  autoAcceptConnections: false,
});

wsServer.on('request', function (request) {
  const connection = request.accept();
  connection.on('message', function (msg) {
    connection.send(msg.utf8Data + 'world');
  });
});
```

### 应用场景

1. 在线聊天：如即时通讯工具、聊天室。
2. 实时数据推送：如股票行情、体育比分。
3. 多人游戏：如在线实时对战游戏。
4. 物联网：如设备状态监控、实时数据采集。

### WebSocket 的优势与局限

#### 优势

1. 实时性强：适合对低延迟和高频数据更新有需求的应用。
2. 高效通信：相比 HTTP 请求，数据传输更高效。
3. 持续连接：减少了频繁建立和断开连接的开销。

#### 局限

1. 浏览器兼容性：较老版本的浏览器可能不支持 WebSocket。
2. 复杂性：需要更多的开发和运维工作，比如连接管理和安全性保障。
3. 防火墙限制：部分防火墙可能阻止 WebSocket 连接。

### 总结

WebSocket 为实时通信提供了一个高效的解决方案，广泛应用于各种需要低延迟、双向数据传输的场景。虽然它存在一些局限性，但通过合理的架构设计和技术选型，可以充分发挥其优势，为用户带来更优质的体验。

### 关注作者
<img src="https://cdn.shuqin.cc/aint/assets/weixin.svg" width = 300 height = 300 />
