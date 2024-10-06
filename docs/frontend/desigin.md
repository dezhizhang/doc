# js 设计模式

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
