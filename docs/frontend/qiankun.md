# 微前端框架 qiankun 全面解析到源码实现

- 微前端（Micro Frontends）是一种将大型前端应用拆分为多个独立模块的架构设计思想，旨在解决复杂应用开发与维护的难题。qiankun 是目前流行的微前端解决方案之一，基于 single-spa 进行封装，提供了一种简单且完整的微前端架构实践。

### 微前端概念与优势

1. ##### 什么是微前端

- 微前端类似于后端的微服务架构，将一个大型的前端应用拆分为多个独立的前端模块，每个模块可以独立开发、测试、部署和运行。每个子应用（微应用）可以使用不同的技术栈，如 React、Vue、Angular 等。

2. ##### 微前端的优势

- 独立开发：每个微应用可以由独立的团队开发，甚至可以使用不同的技术栈，降低团队间的耦合度。
- 渐进迁移：在技术更新或重构过程中，可以通过逐步替换微应用来实现平滑迁移，而不是一次性更新整个系统。
- 独立部署：每个微应用可以独立部署，减少部署时的影响面。
- 复用性高：微应用可以在不同项目间复用，减少重复开发的工作。

### qiankun 简介

- qiankun 是基于 single-spa 实现的微前端框架，它通过提供完整的生命周期管理、应用间通信机制以及对沙箱的支持，简化了微前端的开发和集成。

1. ##### qiankun 特点

- 简单易用：对 single-spa 进行了封装，开发者不需要关心底层细节，只需按照简单的 API 使用即可。
- 无技术栈限制：支持任意框架（React、Vue、Angular 等）的微应用接入。
- 沙箱隔离：通过沙箱机制隔离不同微应用的全局变量、样式，确保互不干扰。
- 应用通信机制：支持主应用与微应用之间的数据传递与通信，提供灵活的 API。

### qiankun 核心概念

1. ##### 主应用（Master App）

- 主应用是整个微前端系统的宿主应用，负责微应用的注册、加载和调度。主应用通常使用统一的框架（如 React 或 Vue）进行开发。

2. ##### 微应用（Sub App）

- 微应用是独立开发的前端模块，可以在主应用中注册和运行。每个微应用可以独立运行，也可以在主应用中加载时与其他微应用协同工作。

3. ##### 应用生命周期

- qiankun 提供了标准的生命周期钩子，包括 bootstrap、mount、unmount，分别对应应用的初始化、挂载和卸载过程。

4. ##### 沙箱机制

- qiankun 通过沙箱机制隔离不同微应用的运行环境，确保它们之间的全局变量和样式互不影响。

5. ##### 应用间通信

- qiankun 提供了简单的 API 用于主应用与微应用之间进行数据传递和事件通

### 基本使用

1. ##### 安装 qiankun

- 在主应用中安装 qiankun：

```bash
npm install qiankun --save
```

2. ##### 主应用配置

```js
import { registerMicroApps, start } from 'qiankun';

// 注册微应用
registerMicroApps([
  {
    name: 'app1',
    entry: '//localhost:7100', // 子应用的访问地址
    container: '#container', // 子应用挂载的 DOM 节点
    activeRule: '/app1', // 子应用激活的路径
  },
  {
    name: 'app2',
    entry: '//localhost:7200',
    container: '#container',
    activeRule: '/app2',
  },
]);

// 启动微前端
start();
```

3. ##### 微应用配置

- 在每个微应用中，你需要导出标准的生命周期钩子：

```js
export async function bootstrap() {
  console.log('微应用启动');
}

export async function mount(props) {
  console.log('微应用挂载', props);
}

export async function unmount() {
  console.log('微应用卸载');
}
```

### qiankun 的高级功能

1. ##### 沙箱与样式隔离

qiankun 通过沙箱机制实现对微应用的全局变量和样式隔离，确保不同的微应用不会相互干扰。每个微应用的运行环境是相互独立的。

2. ##### 应用间通信
   qiankun 提供了 initGlobalState 和 onGlobalStateChange API，用于微应用与主应用之间共享数据和通信。

```js
// 主应用中创建全局状态
import { initGlobalState } from 'qiankun';
const actions = initGlobalState({ user: 'admin' });

actions.onGlobalStateChange((state, prev) => {
  console.log('状态变化', state, prev);
});

// 微应用中使用全局状态
props.onGlobalStateChange((state, prev) => {
  console.log('子应用状态变化', state, prev);
});
```

3. ##### 动态加载微应用

- qiankun 支持动态注册和加载微应用，可以根据业务需求在运行时决定是否加载某个微应用。

```js
import { loadMicroApp } from 'qiankun';

const microApp = loadMicroApp({
  name: 'app3',
  entry: '//localhost:7300',
  container: '#container',
  props: { someProp: 'someValue' },
});

// 动态卸载微应用
microApp.unmount();
```

4. ##### 多实例应用

- qiankun 支持多实例的微应用，可以在同一页面上运行同一个微应用的多个实例。

### 源码分析

- qiankun 是基于 single-spa 封装的微前端解决方案，旨在提供更加简单、开箱即用的微前端架构。通过对 qiankun 源码的分析，能帮助我们更好地理解其工作原理及微前端的核心思想。本文将逐步分析 qiankun 源码的核心部分，包括微应用的注册、加载、沙箱机制、应用间通信等。

1. ##### 源码结构概览

qiankun 的核心代码主要包括以下模块：

- registerMicroApps：微应用的注册、管理模块。
- start：微前端的启动模块。
- loadMicroApp：微应用的动态加载模块。
- 沙箱机制：隔离微应用的全局变量和样式。
- 应用间通信：主应用和微应用之间的状态管理。

```plaintext
src
├── globalState // 应用间状态管理
├── interfaces  // 类型声明和接口定义
├── sandbox     // 沙箱隔离机制
├── utils       // 工具方法
├── index.ts    // 核心注册与启动代码
├── start.ts    // start 函数，启动微前端
└── register.ts // registerMicroApps 函数，注册微前端应用

```

- registerMicroApps 是 qiankun 的核心 API，负责将微应用注册到主应用中。其源码位于 register.ts 文件。

```js
export function registerMicroApps(
  apps: Array<RegistrableApp<any>>,
  lifeCycles?: FrameworkLifeCycles<any>,
) {
  // 对微应用的配置进行标准化
  const unmountPromises = apps.map((app) => {
    return validateRegistrableApp(app);
  });

  // 传递到 single-spa 中注册微应用
  unmountPromises.forEach((promise) => {
    promise.then((appConfig) => {
      registerApplication(appConfig);
    });
  });
}
```

2. ##### 启动微前端：start

- 在 start.ts 文件中，start 方法用于启动微前端环境。它会触发微应用的加载，并控制应用的生命周期。

```js
export function start(opts: StartOptions = {}) {
  // 启动 single-spa
  startSingleSpa(opts);

  // 初始化沙箱
  if (opts.sandbox) {
    initializeSandbox(opts.sandbox);
  }

  // 启动全局状态管理
  if (opts.globalState) {
    initializeGlobalState(opts.globalState);
  }
}
```

qiankun 使用 single-spa 管理应用的生命周期，而 start 方法会通过 startSingleSpa 启动整个微前端架构，并根据配置初始化沙箱机制和全局状态管理。

3. ##### 沙箱机制

- 沙箱机制是 qiankun 的核心之一，它通过隔离不同微应用的全局变量和样式，确保应用之间互不干扰。qiankun 的沙箱模块位于 src/sandbox 中，主要包括 ProxySandbox 和 LegacySandbox 两种沙箱实现。
- proxySandbox 使用现代浏览器的 Proxy API 来隔离全局对象。这是 qiankun 默认的沙箱实现方式。

```js
export class ProxySandbox {
  private updatedValueSet = new Set<string>();
  private sandboxRunning = false;
  private proxy: WindowProxy;

  constructor() {
    const rawWindow = window;
    const fakeWindow = Object.create(null);

    this.proxy = new Proxy(fakeWindow, {
      get(target, key) {
        return key in target ? target[key] : rawWindow[key];
      },
      set(target, key, value) {
        target[key] = value;
        if (this.sandboxRunning) {
          this.updatedValueSet.add(key);
        }
        return true;
      }
    });
  }

  // 启动沙箱
  activate() {
    this.sandboxRunning = true;
  }

  // 停止沙箱
  deactivate() {
    this.sandboxRunning = false;
  }
}

```

- 激活沙箱：调用 activate() 方法时，Proxy 开始拦截对 window 对象的修改。
- 停止沙箱：调用 deactivate() 方法后，所有全局对象的修改将不再生效。

4. ##### LegacySandbox

- LegacySandbox 是为不支持 Proxy 的浏览器设计的沙箱实现。它通过手动保存和恢复全局变量的方式来实现隔离。

```js
export class LegacySandbox {
  private originalWindowProperties: Map<string, any>;

  constructor() {
    this.originalWindowProperties = new Map();
  }

  // 记录原始全局变量
  recordOriginalState() {
    Object.keys(window).forEach((key) => {
      this.originalWindowProperties.set(key, window[key]);
    });
  }

  // 恢复原始全局变量
  restoreOriginalState() {
    this.originalWindowProperties.forEach((value, key) => {
      window[key] = value;
    });
  }
}

```

- 这类沙箱实现比较粗糙，性能上不如 ProxySandbox，但能兼容旧浏览器。

5. ##### 应用间通信

- qiankun 提供了全局状态管理器 GlobalState，用于主应用和微应用之间的数据通信。
- initGlobalState 用于初始化全局状态，并提供 setGlobalState 和 onGlobalStateChange 方法，用于跨应用通信。

```js
export function initGlobalState(initialState: Record<string, any>) {
  let state = initialState;

  function setGlobalState(newState: Record<string, any>) {
    state = { ...state, ...newState };
    // 通知所有订阅者
    subscribers.forEach((listener) => listener(state));
  }

  function onGlobalStateChange(listener: (state: any) => void) {
    subscribers.push(listener);
    return () => {
      subscribers = subscribers.filter((item) => item !== listener);
    };
  }

  return {
    setGlobalState,
    onGlobalStateChange,
  };
}
```

- setGlobalState: 设置新的全局状态，所有应用会自动收到更新。
- onGlobalStateChange: 订阅状态变化的监听器，微应用可以通过它获取主应用的数据更新。

5. ##### loadMicroApp 动态加载微应用

- loadMicroApp 是 Qiankun 提供的用于动态加载微应用的方法，允许在运行时按需加载微应用，而不需要在应用启动时注册。

```js
export function loadMicroApp(
  appConfig: LoadableApp<any>,
  opts?: FrameworkConfiguration,
) {
  // 加载微应用
  const microApp = loadApp(appConfig, opts);

  // 启动微应用
  microApp.mount();

  return microApp;
}
```

- 通过 loadMicroApp，开发者可以在特定场景下按需加载微应用，而无需一开始就注册所有应用。这样可以减小主应用的初始加载体积，提升性能。

### 相关链接


[贵州数擎科技](https://www.shuqin.cc/market/design-component)  
[贵州晓智信息科技](https://www.xiaozhi.shop/)  
[源码地址](https://github.com/dezhizhang/interview/tree/main/desigin)  

### 
<img src="https://cdn.xiaozhi.shop/digitwin/assets/weixin.jpg" width = 300 height = 300 />


<!-- ### https://www.bilibili.com/video/BV1H34y117fe/?spm_id_from=333.337.search-card.all.click&vd_source=10257e657caa8b54111087a9329462e8 -->
