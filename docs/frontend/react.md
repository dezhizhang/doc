# react

## 生命周期

### 1. 创建阶段

- constructor 初始化 state 状态或 this 上挂载方法
- getDerivedStateFormProps 静态方法 不能访问组件实例
- render 用于渲染 dom 结构
- componentDidMount 挂载到真实 dom 节点后执行 render 方法之后执行 数据获取事件监听操作

### 2. 更新阶段
- getDerivedStateFromProps
- shouldComponentUpdate

