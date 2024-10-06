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
