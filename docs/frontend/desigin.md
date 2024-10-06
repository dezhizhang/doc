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
