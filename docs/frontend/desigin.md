# 如何彻底掌握 JavaScript 设计模式 23 大核心模式助你提升编程水平

### 构造器模式

- 在 ES6 引入 class 语法后，构造器模式变得更简洁。class 是 JavaScript 中的语法糖，底层依然是通过构造函数和原型链实现的。

```ts
class Person {
  name: string;
  age: number;
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  greet() {
    console.log(
      `Hello, my name is ${this.name} and I am ${this.age} years old.`,
    );
  }
}

const person = new Person('tom', 18);
person.greet();
```

- class：ES6 引入的 class 语法提供了更清晰的构造函数定义方式。
- constructor 方法：constructor 方法相当于传统的构造函数，初始化类的属性。
- 方法定义：在 class 中，所有的方法会自动添加到 prototype 上，供实例共享。

### 原型模式

- 原型模式（Prototype Pattern）是一种创建对象的设计模式。它通过复制现有对象的实例来创建新的对象，而不是通过构造函数来实例化对象。这种模式非常适合在不知道要创建多少对象的情况下使用，或者对象的创建成本较高时。
- 在 JavaScript 中，所有对象都可以作为原型，通过原型链来实现继承和属性共享。使用原型模式可以提高对象创建的效率，尤其是在需要创建大量相似对象的情况下。

```js
const carPrototype = {
  init(brand, model) {
    this.brand = brand;
    this.model = model;
  },
  getDetails() {
    return `Car brand: ${this.brand}, model: ${this.model}`;
  },
  clone() {
    const newCar = Object.create(this);
    newCar.init(this.brand, this.model);
    return newCar;
  },
};

// 创建一个原型对象
const car1 = Object.create(carPrototype);
car1.init('Toyota', 'Corolla');

console.log(car1.getDetails()); // 输出: Car brand: Toyota, model: Corolla

// 使用原型模式克隆一个新对象
const car2 = car1.clone();
console.log(car2.getDetails()); // 输
```

1. ##### 原型模式的优势

- 高效性：原型模式可以避免重复的对象创建过程，通过克隆现有对象提高效率。
- 内存节省：多个对象共享相同的方法，节省内存空间。
- 灵活性：可以轻松扩展原型对象，添加新的方法和属性，所有克隆的对象都能访问这些更新。

2. ##### 原型模式的应用场景

- 对象创建成本较高：当创建对象的开销较大时，使用原型模式可以通过克隆已有对象来减少开销。
- 需要频繁创建相似对象：在需要创建许多相似对象时，使用原型模式可以提高效率。
- 实现原型链：JavaScript 的继承机制是基于原型的，原型模式在 JavaScript 中具有天然的优势。

3. ##### 原型模式与构造器模式的对比

| 特点         | 原型模式                           | 构造器模式                 |
| :----------- | :--------------------------------- | -------------------------- |
| 对象创建方式 | 通过克隆已有对象                   | 通过构造函数创建新对象     |
| 方法共享     | 通过原型对象共享方法               | 通过 prototype 共享方法    |
| 内存占用     | 节省内存，通过共享方法             | 每个实例都有独立的方法拷贝 |
| 使用场景     | 对象创建成本高，需频繁创建相似对象 | 创建简单对象，需初始化属性 |

### 工厂模式

- 工厂模式（Factory Pattern）是一种用于创建对象的设计模式，它允许通过接口或函数来创建对象，而不需要显式地指定对象的类或构造函数。工厂模式的核心思想是将对象的创建逻辑集中到一个工厂函数中，调用者无需关心对象的具体创建过程。

```js
function CarFactory(type) {
  let car;

  switch (type) {
    case 'sedan':
      car = { type: 'Sedan', wheels: 4, doors: 4 };
      break;
    case 'suv':
      car = { type: 'SUV', wheels: 4, doors: 5 };
      break;
    case 'truck':
      car = { type: 'Truck', wheels: 6, doors: 2 };
      break;
    default:
      car = { type: 'Unknown', wheels: 4, doors: 4 };
  }

  car.drive = function () {
    console.log(`Driving a ${this.type}`);
  };

  return car;
}

// 使用工厂创建不同类型的汽车
const sedan = CarFactory('sedan');
const suv = CarFactory('suv');
const truck = CarFactory('truck');

sedan.drive(); // 输出: Driving a Sedan
suv.drive(); // 输出: Driving a SUV
truck.drive(); // 输出: Driving a Truck
```

- 关键点：
- 工厂函数：CarFactory 是工厂函数，它根据输入的参数创建不同类型的对象。
- 封装创建逻辑：创建对象的过程被封装在工厂函数中，调用者只需要传递参数，而不需要关心对象的创建细节。
- 灵活性：可以根据输入的不同，生成不同类型的对象。

2. ##### 工厂模式的优势

- 封装复杂的创建逻辑：工厂模式将对象的创建逻辑集中封装，避免在代码中多次重复相同的创建过程。
- 解耦对象创建与使用：调用者无需知道对象的构造细节，只需关心工厂提供的接口即可。
- 易于扩展：可以很容易地扩展工厂函数，加入新的对象类型，而不会影响现有代码。

3. ##### 工厂模式的应用场景

- 创建复杂对象：当对象的创建过程复杂，需要初始化很多属性时，工厂模式可以简化对象创建。
- 根据条件创建不同对象：当需要根据不同条件创建不同对象时，工厂模式是一种很好的解决方案。
- 隐藏对象构造的复杂性：工厂模式可以隐藏对象的构造细节，使代码更易于维护和修改。

### 抽象工厂模式

- 抽象工厂模式是工厂模式的扩展，它允许创建一组相关或依赖的对象，而无需指定它们的具体类。抽象工厂模式提供了一种抽象层，使得工厂可以创建不同类型的对象，具体对象的创建细节交由子类或具体工厂实现。

```js
function CarFactory() {}

CarFactory.prototype.createCar = function () {
  throw new Error('This method should be overridden!');
};

//  Sedan 工厂
function SedanFactory() {}
SedanFactory.prototype = Object.create(CarFactory.prototype);
SedanFactory.prototype.createCar = function () {
  return { type: 'Sedan', wheels: 4, doors: 4 };
};

//  SUV 工厂
function SUVFactory() {}
SUVFactory.prototype = Object.create(CarFactory.prototype);
SUVFactory.prototype.createCar = function () {
  return { type: 'SUV', wheels: 4, doors: 5 };
};

// 使用抽象工厂创建汽车
const sedanFactory = new SedanFactory();
const suvFactory = new SUVFactory();

const sedan = sedanFactory.createCar();
const suv = suvFactory.createCar();

console.log(sedan); //  输出: { type: 'Sedan', wheels: 4, doors: 4 }
console.log(suv); //  输出: { type: 'SUV', wheels: 4, doors:
```

1. ##### 工厂模式与构造器模式的区别

- 工厂模式：通过工厂函数创建对象，调用者不需要直接使用 new 关键字，创建逻辑被封装在工厂内部。
- 构造器模式：通过构造函数直接创建对象，使用 new 关键字实例化。

| 特点            | 工厂模式                     | 构造器模式               |
| :-------------- | :--------------------------- | ------------------------ |
| 对象创建方式    | 通过工厂函数创建             | 通过构造函数创建         |
| 使用 new 关键字 | 不需要使用                   | 需要使用                 |
| 封装创建逻辑    | 封装复杂的对象创建逻辑       | 创建过程公开             |
| 灵活性          | 根据条件动态创建不同类型对象 | 一般用于创建单一类型对象 |

### 建造者模式

- 建造者模式（Builder Pattern）是一种创建型设计模式，用于构造复杂对象，将对象的构造过程与其表示分离。通过建造者模式，客户端可以一步步构建一个复杂的对象，而不必关心内部的具体细节和实现过程。
- 建造者模式非常适合在需要构建对象时涉及多个步骤的场景，或者当对象有很多可选属性时。与工厂模式相比，建造者模式更注重对象的构造过程，而不是简单的对象创建。

```js
// 产品类，表示要创建的复杂对象
class House {
  constructor() {
    this.floors = 0;
    this.windows = 0;
    this.garden = false;
  }
}

// 建造者类，负责构造复杂对象
class HouseBuilder {
  constructor() {
    this.house = new House();
  }

  buildFloors(floors) {
    this.house.floors = floors;
    return this; // 返回 this 以支持链式调用
  }

  buildWindows(windows) {
    this.house.windows = windows;
    return this; // 返回 this 以支持链式调用
  }

  buildGarden(hasGarden) {
    this.house.garden = hasGarden;
    return this;
  }

  // 返回构建好的对象
  build() {
    return this.house;
  }
}

// 使用建造者模式构建对象
const house = new HouseBuilder()
  .buildFloors(2)
  .buildWindows(4)
  .buildGarden(true)
  .build();

console.log(house);
// 输出: { floors: 2, windows: 4, garden: true }
```

- 关键点：
- 产品类：House 是最终构建的复杂对象，表示房子。
- 建造者类：HouseBuilder 包含了逐步构建 House 对象的逻辑，提供了多个方法来一步步设置对象的属性。
- 链式调用：每个构造方法返回 this，使得建造步骤可以链式调用，构建过程更简洁。
- build() 方法：最终通过 build() 方法返回构建好的对象。

1. ##### 建造者模式的优势

- 分步创建复杂对象：将对象的构造步骤分离出来，使得构建复杂对象变得简单和可控。
- 可读性强：通过链式调用，建造过程的每一步都清晰明了，增强代码的可读性。
- 解耦构造与表示：建造者模式将对象的构造过程与对象的表示分离，使构建过程可以独立扩展。

2. ##### 建造者模式的应用场景

- 构建复杂对象：对象的创建过程需要多个步骤时，可以通过建造者模式简化过程。
- 对象有很多可选参数：在构建有许多可选属性的对象时，使用建造者模式可以避免传递过多的构造函数参数。
- 对象的构造逻辑较复杂：当构造对象涉及到许多中间步骤时，建造者模式可以将这些步骤分离，使构造逻辑更加清晰。

3. ##### 建造者模式与工厂模式的对比

| 特点         | 建造者模式                           | 工厂模式                           |
| :----------- | :----------------------------------- | ---------------------------------- |
| 对象创建方式 | 按步骤逐步构建对象                   | 通过工厂函数直接创建对象           |
| 使用场景     | 构建复杂对象，多个步骤，多个可选属性 | 创建简单对象，根据条件返回不同对象 |
| 方法调用顺序 | 可以控制调用顺序，每个步骤可选       | 调用工厂函数一次，返回对象         |
| 链式调用     | 支持链式调用，按步骤设置属性         | 一般不涉及链式调用                 |

4. ##### 建造者模式的实际应用

- 建造者模式在需要构建复杂对象、需要可选参数的场景中非常实用。以下是一些常见的应用场景：
- 构建包含多个步骤的复杂对象：例如创建一份详细的文档、生成复杂的 UI 组件或对象需要多个可选参数时。
- 构造复杂的配置对象：在配置系统中，通常需要很多可选参数来定制配置，建造者模式可以很好地应对这种需求。
- 简化构造函数的调用：当构造函数参数过多时，建造者模式可以避免构造函数变得过于复杂，通过逐步设置属性简化调用。

### 单例模式

- 单例模式（Singleton Pattern）是一种常见的设计模式，用于确保一个类只有一个实例，并提供一个全局访问点来获取该实例。这在一些需要全局共享资源的场景下非常有用，比如全局配置、日志记录器、数据库连接等。

```js
class Singleton {
  constructor() {
    if (Singleton.instance) {
      return Singleton.instance;
    }
    Singleton.instance = this;
  }
}

const instance1 = new Singleton();
const instance2 = new Singleton();

console.log(instance1 === instance2); // true
```

关键点：
闭包：通过闭包创建一个私有的 instance 变量，外部无法直接访问。
惰性实例化：getInstance 方法只有在需要时才创建实例，并且每次返回的都是同一个实例

1. ##### 例模式的优势和劣势

- 优势：

1. 节省资源：由于单例模式只允许创建一个实例，因此在需要共享资源时非常高效，比如数据库连接池。
2. 全局访问点：提供一个全局唯一的访问点，确保全局状态的统一。
3. 防止重复实例化：避免多次实例化带来的问题，保证系统中只有一个实例存在。

- 劣势：

1. 难以扩展：单例模式由于只允许创建一个实例，可能会限制其扩展性。
2. 全局状态：在某些情况下，全局的共享实例可能会导致状态管理的复杂性。
3. 难以测试：由于单例模式持有状态，在测试时难以隔离环境，可能导致测试依赖全局状态。

4. ##### 适用场景

单例模式适用于以下场景：

- 日志系统：日志系统需要在整个应用程序中保持一个唯一的日志对象，方便记录日志。
- 全局配置对象：当应用程序需要共享一些全局配置时，可以通过单例模式实现统一的配置管理。
- 数据库连接池：在服务端应用中，使用单例模式可以确保只创建一个数据库连接池实例，节省资源。
- 浏览器中的本地存储管理：在前端开发中，可能需要一个全局对象来管理 localStorage 或 sessionStorage。

### 装饰器模式

- 装饰器模式（Decorator Pattern）是一种结构型设计模式，用于在不改变对象本身的情况下，动态地给对象添加新功能。这种模式可以让我们灵活地为对象增添职责，并且避免了创建子类来扩展功能的繁琐。
- 装饰器模式的核心思想：

1. 动态扩展功能：装饰器为对象提供了额外的行为，而不改变对象的原始结构。
2. 组合而非继承：通过组合装饰器对象，可以灵活地扩展功能，而不是通过继承来增加复杂度。

```js
class Car {
  drive() {
    console.log('The car is driving.');
  }
}

// 装饰器类
class CarDecorator {
  constructor(car) {
    this.car = car;
  }

  drive() {
    console.log('Starting the engine...');
    this.car.drive();
    console.log('Turning on the headlights.');
  }
}

const myCar = new Car();
const decoratedCar = new CarDecorator(myCar);

decoratedCar.drive();
```

1. ##### 装饰器模式的优势和劣势

- 优势：

1. 灵活性高：装饰器模式允许我们动态添加功能，而不需要修改对象的代码。这让功能扩展变得更加灵活。
2. 遵循开闭原则：对象可以通过添加装饰器来扩展功能，而不需要修改其原有代码。
3. 可以组合：多个装饰器可以叠加使用，形成功能的组合，这比继承链更加灵活和易于维护。

- 劣势：

1. 复杂性增加：装饰器模式可能会导致系统中增加大量的装饰器类或函数，增加代码的复杂性。
2. 调试困难：由于装饰器是动态添加行为，调试时很难直接看到对象的真实状态。

3. ##### 装饰器模式的应用场景

装饰器模式非常适合以下场景：

1. 日志记录：为函数或方法添加日志记录，而不修改原函数代码。
2. 数据验证：在函数执行前动态添加数据验证逻辑。
3. 权限控制：为某些方法添加权限检查功能，例如确保用户具有某些权限才能调用特定功能。
4. 函数节流：限制函数的调用频率，可以使用装饰器在函数外部添加节流逻辑。

### 适配器模式

- 适配器模式（Adapter Pattern）是一种结构型设计模式，主要用于解决接口不兼容的问题。适配器通过包装一个对象，使其与客户端期望的接口兼容，从而允许原本不兼容的对象协同工作。
- 适配器模式的核心思想：

1. 将一个类的接口转换为另一个客户端希望的接口。
2. 使得原本由于接口不兼容而无法一起工作的类可以协同工作。

```js
// 第三方库提供的类
class ThirdPartyApi {
  send() {
    return 'Sending data via ThirdPartyApi';
  }
}

// 我们系统需要的接口
class MySystemApi {
  request() {
    return 'Sending data via MySystemApi';
  }
}

// 适配器类，适配第三方 API 到我们的系统
class ApiAdapter {
  constructor(thirdPartyApi) {
    this.thirdPartyApi = thirdPartyApi;
  }

  request() {
    // 调用第三方 API 的 send 方法，但暴露给客户端的是 request 方法
    return this.thirdPartyApi.send();
  }
}

const thirdPartyApi = new ThirdPartyApi();
const adaptedApi = new ApiAdapter(thirdPartyApi);

console.log(adaptedApi.request()); // 输出：Sending data via ThirdPartyApi
```

1. ##### 适配器模式的优势和劣势

- 优势：

1. 提高兼容性：适配器模式可以帮助不同接口之间的协作，使得旧代码与新系统无缝对接。
2. 遵循开闭原则：适配器模式允许我们在不修改原有类的情况下，为其增加新的接口兼容性。
3. 解耦：通过适配器，客户端与具体实现解耦，可以更灵活地使用不同接口。

- 劣势：

1. 增加代码复杂度：为每个不兼容的接口创建适配器可能会导致代码量增加，尤其在大型系统中。
2. 性能开销：适配器模式需要引入一层中间处理逻辑，可能会带来一定的性能开销。

3. ##### 适配器模式的应用场景

- 适配器模式广泛应用于以下场景：

1. 老系统与新系统的集成：在大型企业系统中，老旧系统与新系统的接口通常不兼容，适配器模式可以帮助它们无缝协作。
2. 第三方库的封装：使用第三方库时，库的接口可能不符合项目的标准，可以通过适配器来包装这些接口，提供符合项目标准的接口。
3. 兼容不同接口的实现：当需要同时支持多个不兼容的接口时，可以使用适配器进行转换。

### 策略模式

- 策略模式（Strategy Pattern）是一种行为型设计模式，它定义了一系列算法，将每个算法封装起来，并且使它们可以互相替换。策略模式让算法独立于使用它的客户端独立变化。这样我们可以在运行时选择合适的算法，而不需要修改客户端代码。

策略模式的核心思想：

1. 将算法封装成独立的策略，并通过接口进行调用。
2. 允许算法之间可以互换使用，而不会影响使用它们的客户端。

```js
// 定义不同的策略
class RegularStrategy {
  calculate(price) {
    return price; // 正常价格，无折扣
  }
}

class SaleStrategy {
  calculate(price) {
    return price * 0.9; // 打9折
  }
}

class PremiumStrategy {
  calculate(price) {
    return price * 0.8; // 打8折
  }
}

// Context，负责根据不同策略进行计算
class PriceContext {
  constructor(strategy) {
    this.strategy = strategy;
  }

  setStrategy(strategy) {
    this.strategy = strategy;
  }

  calculatePrice(price) {
    return this.strategy.calculate(price);
  }
}

// 使用策略模式
const price = 100;
const priceContext = new PriceContext(new RegularStrategy());

console.log(priceContext.calculatePrice(price)); // 输出：100

// 切换到打折策略
priceContext.setStrategy(new SaleStrategy());
console.log(priceContext.calculatePrice(price)); // 输出：90

// 切换到高级会员折扣策略
priceContext.setStrategy(new PremiumStrategy());
console.log(priceContext.calculatePrice(price)); // 输出：80
```

关键点：

- 策略类：RegularStrategy、SaleStrategy 和 PremiumStrategy 是不同的策略类，它们实现了相同的接口（calculate 方法）。
- 上下文类：PriceContext 是上下文类，负责根据不同的策略类计算价格。
- 动态选择策略：我们可以在运行时动态选择策略，而不需要修改 PriceContext 的内部逻辑。

1. ##### 策略模式的优势和劣势

优势：

- 开闭原则：通过将算法封装到独立的策略类中，可以在不修改客户端代码的情况下添加新的策略。
- 避免条件语句：使用策略模式可以避免在代码中编写大量的条件语句，增强代码的可维护性和可读性。
- 更灵活的算法选择：客户端可以根据不同的条件动态选择不同的策略。
  劣势：
- 增加类的数量：每一个策略都是一个独立的类，这可能会导致类的数量增加，从而增加系统的复杂性。
- 策略类之间的差异难以控制：策略类的算法可能差异较大，难以统一处理，尤其在涉及多个复杂策略时。

2. ##### 策略模式的应用场景

策略模式适用于以下场景：

1. 算法变体很多：当一个算法有多个实现方式，或者算法会频繁更改时，可以使用策略模式来灵活选择算法。
2. 避免条件分支过多：当一个类中包含大量的条件分支（如 if...else 或 switch），可以考虑使用策略模式代替这些条件分支。
3. 需要动态选择算法：当算法需要根据不同的条件在运行时进行切换时，可以使用策略模式。

### 代理模式

- 代理模式（Proxy Pattern）是一种结构型设计模式，它为对象提供一个代理（即替身），并控制客户端对原始对象的访问。代理对象可以在客户端与目标对象之间进行一些额外的操作，如控制访问权限、延迟加载、缓存、日志记录等。

代理模式的核心思想：

- 代理对象 作为客户端与目标对象之间的中介，它可以控制对目标对象的访问。
- 通过代理对象，可以在访问目标对象前后进行一些额外操作。

```js
// 目标对象
class RealSubject {
  request() {
    return 'Request from RealSubject';
  }
}

// 代理对象
class ProxySubject {
  constructor(realSubject) {
    this.realSubject = realSubject;
  }

  request() {
    // 执行一些额外的操作
    console.log('Proxy: Checking access before forwarding the request.');

    // 调用真实对象的请求
    const result = this.realSubject.request();

    // 执行一些后续操作
    console.log('Proxy: Logging the result after forwarding the request.');
    return result;
  }
}

// 客户端代码
const realSubject = new RealSubject();
const proxy = new ProxySubject(realSubject);

console.log(proxy.request());
// 输出：
// Proxy: Checking access before forwarding the request.
// Proxy: Logging the result after forwarding the request.
// Request from RealSubject
```

关键点：

- 目标对象：RealSubject 提供了核心功能（如 request 方法）。
- 代理对象：ProxySubject 控制对 RealSubject 的访问，在调用前后添加额外的逻辑。
  通过代理对象，客户端可以透明地调用目标对象，同时代理对象可以拦截请求，并在合适的时机执行额外逻辑。

1. ##### 代理模式的优势和劣势
   优势：

- 控制访问：代理模式可以控制对目标对象的访问，执行权限控制、延迟加载、缓存等功能。
- 开闭原则：通过代理模式，可以在不修改目标对象的情况下扩展其功能。
- 性能优化：虚拟代理和缓存代理可以有效减少系统资源的消耗和重复操作，提升性能。
  劣势：
- 增加复杂性：引入代理对象会增加系统的复杂性，尤其当代理逻辑复杂时，可能会导致代码难以维护。
- 延迟真实对象的操作：虚拟代理会延迟真实对象的初始化，有时可能会导致意外的行为。

2. ##### 代理模式的应用场景
   代理模式广泛应用于以下场景：

- 延迟初始化：如按需加载资源，避免过早初始化开销较大的对象。
- 权限控制：在系统中，控制用户对某些敏感数据或操作的访问权限。
- 性能优化：通过缓存代理减少重复计算或请求的次数，提高系统的性能。
- 远程代理：在分布式系统中，代理对象可以代表远程服务，从而简化客户端与远程服务的交互。

### 观察者模式

- 观察者模式（Observer Pattern）是一种行为型设计模式，它定义了对象之间的一对多依赖关系，使得当一个对象的状态发生变化时，所有依赖它的对象都会自动得到通知并更新。这种模式常用于事件系统、数据绑定和实时通信等场景。

观察者模式的核心思想：

- 主体对象（Subject）维护一组依赖它的观察者对象（Observer）。
- 当主体对象发生变化时，它会通知所有观察者，从而更新观察者的状态。

```js
// 主体对象（被观察者）
class Subject {
  constructor() {
    this.observers = [];
  }

  // 添加观察者
  addObserver(observer) {
    this.observers.push(observer);
  }

  // 移除观察者
  removeObserver(observer) {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }

  // 通知所有观察者
  notifyObservers(data) {
    this.observers.forEach((observer) => observer.update(data));
  }
}

// 观察者对象
class Observer {
  constructor(name) {
    this.name = name;
  }

  // 更新方法，当主体状态改变时调用
  update(data) {
    console.log(`${this.name} received update: ${data}`);
  }
}

// 创建主体
const subject = new Subject();

// 创建观察者
const observer1 = new Observer('Observer 1');
const observer2 = new Observer('Observer 2');

// 注册观察者
subject.addObserver(observer1);
subject.addObserver(observer2);

// 通知观察者
subject.notifyObservers('New data available');
// 输出：
// Observer 1 received update: New data available
// Observer 2 received update: New data available
```

关键点：

- 主体对象：Subject 维护一个观察者列表，当状态发生变化时，它会调用每个观察者的 update 方法。
- 观察者对象：Observer 是依赖于主体对象的，它通过 update 方法响应主体的变化。
- 通过这种设计，当 Subject 的状态改变时，所有依赖它的 Observer 都会被通知并做出相应的处理。

1. ##### 观察者模式的优势和劣势

优势：

- 解耦观察者和主体：观察者模式使得观察者与主体之间的关系松散耦合，主体不需要知道观察者的具体实现，只需通过通用的接口通知它们。
- 动态扩展：可以在运行时添加或移除观察者，灵活性高，便于系统扩展。
- 实时响应：观察者模式允许系统对变化进行实时响应，特别适用于需要动态更新的场景。
  劣势：
- 性能问题：当观察者数量较多时，通知的频率和开销可能较大，尤其在频繁变化的系统中，可能影响性能。
- 调试困难：在复杂的观察者模式中，由于观察者和主体的解耦，追踪问题和调试可能变得更加困难。
- 通知顺序不确定：观察者接收到通知的顺序可能不确定，如果对顺序有要求，可能需要额外处理。

2. ##### 观察者模式的应用场景

观察者模式适用于以下场景：

- 事件驱动系统：比如浏览器中的事件模型，当用户触发一个事件时，多个监听器（观察者）会做出响应。
- 数据绑定和同步：在现代前端框架（如 Vue、React）中，观察者模式常用于双向数据绑定和组件状态管理，当数据变化时，视图会自动更新。
- 实时系统：在需要实时更新的应用（如股票价格更新、消息推送等）中，观察者模式可以及时通知客户端变化。

### 发布订阅模式

- 发布订阅模式（Publish-Subscribe Pattern）是一种消息传递机制，它允许多个对象之间通过事件调度进行通信。发布者将消息发送给中间的事件通道，订阅者则从事件通道中接收消息。通过这种模式，发布者和订阅者之间实现了解耦。
核心思想：
- 发布者：负责发布事件或消息。
- 订阅者：负责接收和处理消息。
- 事件通道（消息中介）：连接发布者和订阅者，负责转发消息。
- 与观察者模式不同，发布订阅模式是通过一个中介对象来传递消息，发布者和订阅者之间没有直接联系。
```js
// 事件管理器（发布订阅系统）
class EventEmitter {
    constructor() {
        this.events = {};
    }

    // 订阅事件
    subscribe(event, listener) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(listener);
    }

    // 取消订阅
    unsubscribe(event, listener) {
        if (!this.events[event]) return;
        this.events[event] = this.events[event].filter(l => l !== listener);
    }

    // 发布事件
    publish(event, data) {
        if (!this.events[event]) return;
        this.events[event].forEach(listener => listener(data));
    }
}

// 创建发布订阅系统
const eventEmitter = new EventEmitter();

// 订阅者
function listener1(data) {
    console.log('Listener 1 received:', data);
}

function listener2(data) {
    console.log('Listener 2 received:', data);
}

// 订阅事件
eventEmitter.subscribe('message', listener1);
eventEmitter.subscribe('message', listener2);

// 发布事件
eventEmitter.publish('message', 'Hello, Subscribers!');
// 输出：
// Listener 1 received: Hello, Subscribers!
// Listener 2 received: Hello, Subscribers!

// 取消订阅
eventEmitter.unsubscribe('message', listener1);

// 再次发布事件
eventEmitter.publish('message', 'Another message');
// 输出：
// Listener 2 received: Another message

```
关键点：
- 发布者通过 publish 方法发布消息。
- 订阅者通过 subscribe 方法订阅特定事件，并在事件触发时执行回调函数。
- 取消订阅可以通过 unsubscribe 方法移除订阅者。

1. ##### 发布订阅模式的优势与劣势

优势：
1. 解耦：发布者和订阅者完全分离，互相不知道对方的存在，降低了代码的耦合性。
2. 灵活性高：可以动态地添加或移除订阅者，发布事件时可以有多个订阅者响应。
3. 扩展性好：适用于分布式系统、异步处理和复杂应用中的模块解耦。
劣势：
1. 性能开销：如果有大量订阅者，或事件发布频率很高，可能会造成性能问题。
2. 难以调试：由于发布者和订阅者之间没有直接联系，调试和排查问题时可能较为复杂。
3. 消息丢失：如果订阅者在事件发布之前没有订阅事件，可能会错过消息。

2. ##### 发布订阅模式的应用场景

发布订阅模式在以下场景中非常常见：

1. 事件驱动编程：如浏览器中的事件模型、Node.js 的 EventEmitter。
2. 消息队列：在微服务架构中，用于服务之间的解耦和通信。
3. 实时通信：聊天室、实时数据推送等应用。
4. 模块解耦：在复杂应用中，使用发布订阅模式可以减少模块之间的依赖。

### 模块模式
- 模块模式（Module Pattern）是一种创建私有作用域和封装代码的设计模式，用来组织和隔离代码，避免全局变量污染。它通过使用闭包，将模块内部的变量和方法隐藏起来，只暴露必要的接口给外部。

核心思想：
1. 私有性：模块内部的变量和方法默认是私有的，外部无法直接访问。
2. 封装：通过返回一个对象，将需要暴露的属性和方法以接口形式提供给外部。
3. 闭包：利用闭包的特性，创建模块的私有作用域。
```js
const module = (function () {
  // 私有变量和方法
  const privateVar = "I am private";
  const privateMethod = function () {
    console.log(privateVar);
  };
  return {
    // 公共方法
    publicMethod: function () {
      privateMethod();
    },
    //公共属性
    publicVar: "I am public",
  };
})();

console.log(module.publicVar); // 输出: I am public
console.log(module.publicMethod()); //  输出: I am private       
```


关键点：
- privateVar 和 privateMethod 是模块的私有成员，外部无法直接访问。
- publicMethod 和 publicVar 是模块的公共接口，外部可以访问和使用。

1. ##### 模块模式的优势与劣势

优势：

- 私有性和封装性：模块模式通过闭包隐藏内部实现细节，增强代码的安全性和可维护性。
- 减少全局污染：将代码封装在模块内，避免了不必要的全局变量污染。
- 易于维护：代码逻辑清晰，模块化的设计可以使得代码更容易维护和扩展。
劣势：

- 私有成员无法访问：私有变量和方法无法被外部直接访问，如果需要测试或调试私有成员，可能需要额外的处理。
- 依赖于闭包：模块模式依赖闭包的特性，可能会增加内存占用，特别是在频繁创建和销毁模块时。

2. ##### 模块模式的应用场景

- 命名空间：使用模块模式可以创建命名空间，避免全局变量冲突和命名污染。
- 代码组织：大型项目可以通过模块模式将不同功能模块化，提升代码的可维护性。
- 依赖管理：模块模式可以通过依赖注入的方式管理依赖关系，增强代码的灵活性和扩展性。

### 桥接模式

- 桥接模式（Bridge Pattern）是一种结构型设计模式，目的是将抽象部分与实现部分分离，使它们可以独立变化。通过这种分离，抽象和实现可以独立扩展，不会相互影响，增强了系统的灵活性。
- 桥接模式的核心思想是将两个维度的变化分离：一个是抽象部分的变化，另一个是实现部分的变化。这种模式特别适合在需要跨多个平台或具有多个接口实现的场景中应用。
```js
// 实现部分：颜色接口
class Color {
    constructor(name) {
        this.name = name;
    }

    applyColor() {
        console.log(`Applying color: ${this.name}`);
    }
}

// 具体实现：红色和蓝色
class Red extends Color {
    constructor() {
        super('red');
    }
}

class Blue extends Color {
    constructor() {
        super('blue');
    }
}

// 抽象部分：形状类
class Shape {
    constructor(color) {
        this.color = color; // 颜色是通过桥接引用的
    }

    draw() {
        throw new Error('This method should be overwritten!');
    }
}

// 扩展的抽象：不同的形状
class Circle extends Shape {
    constructor(color) {
        super(color);
    }

    draw() {
        console.log('Drawing a Circle');
        this.color.applyColor(); // 使用桥接引用的颜色
    }
}

class Square extends Shape {
    constructor(color) {
        super(color);
    }

    draw() {
        console.log('Drawing a Square');
        this.color.applyColor(); // 使用桥接引用的颜色
    }
}

// 使用桥接模式
const redCircle = new Circle(new Red());
const blueSquare = new Square(new Blue());

redCircle.draw(); // 输出：Drawing a Circle, Applying color: red
blueSquare.draw(); // 输出：Drawing a Square, Applying color: blue
```
关键点：
- 抽象部分：Shape 类定义了形状的基本功能，具体形状通过继承扩展。
- 实现部分：Color 类负责定义颜色的接口，不同的颜色通过继承实现。
- 桥接：形状通过 this.color 来桥接颜色，调用不同的颜色实现。

1. ##### 桥接模式的优势与劣势
优势：
- 解耦：抽象与实现可以独立扩展，降低了系统的复杂度和耦合性。
- 可扩展性强：在不修改现有代码的情况下，轻松添加新的实现或抽象类。
- 减少代码重复：避免在不同的类中重复实现相似的功能（如颜色）。
劣势：
- 复杂性增加：引入多个抽象类和接口后，系统结构可能变得更加复杂。
- 性能开销：使用桥接模式可能增加一些额外的间接调用，导致性能上的轻微开销。

2. ##### 桥接模式的应用场景
- 平台无关的代码：当一个系统需要在多个平台上运行时，桥接模式可以帮助将平台相关的实现与平台无关的部分分离。
- 多维度变化的系统：当一个系统有多个维度的变化时（如形状和颜色、设备和操作系统），桥接模式可以帮助解耦这两个维度的变化。
- 图形绘制系统：如上例中，不同形状和颜色的组合是桥接模式的经典应用场景。



