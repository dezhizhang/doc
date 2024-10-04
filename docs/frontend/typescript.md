# 深入了解 TypeScript 现代 JavaScript 的超集

- TypeScript 是由微软开发的一个开源编程语言，它是 JavaScript 的超集，增加了静态类型和其他特性。随着前端开发的复杂性增加，TypeScript 越来越受到开发者的青睐。本文将探讨 TypeScript 的基本概念、优势以及如何在项目中使用。

### 什么是 TypeScript？

- TypeScript 是一种强类型的编程语言，编译成 JavaScript 代码。它允许开发者在编写代码时添加类型注解，从而提高代码的可读性和可维护性。

### TypeScript 的优势

- 静态类型检查：TypeScript 在编译时进行类型检查，能够及早发现错误，减少运行时错误的风险。
- 更好的开发工具支持：类型信息可以帮助编辑器提供更强大的自动补全、重构和代码导航功能，提高开发效率。
- 支持最新的 JavaScript 特性：TypeScript 支持 ES6 及以上的语法，并可以编译成适用于不同浏览器的 JavaScript 版本。
- 增强的可读性和可维护性：类型注解使得代码更加清晰，特别是在大型项目中，能够帮助团队更好地理解和管理代码。

### 基本类型

##### boolean（布尔类型）

- 布尔值类型表示 true 或 false

```js
const isDone: boolean = true;
```

##### number（数字类型）

- number 类型包括所有的整数和浮点数。

```js
const decimal: number = 6;
const hex: number = 0xf00d;
const binary: number = 0b1010;
const octal: number = 0o744;
```

##### string（字符串类型）

- string 类型表示文本数据。可以使用单引号或双引号，模板字符串也可以用于嵌入表达式。

```js
const decimal: number = 6;
const hex: number = 0xf00d;
const binary: number = 0b1010;
const octal: number = 0o744;
```

##### Array（数组类型）

- 数组有两种定义方式：
  使用元素类型加方括号 ([])
  使用 Array<元素类型> 泛型语法

```js
const list: number[] = [1, 2, 3];
const list2: Array<string> = ['one', 'two', 'three'];
```

##### Tuple（元组类型）

- 元组类型允许表示一个已知数量和类型的数组，各元素类型可以不同。

```js
const tuple: [string, number];
tuple = ["hello", 10]; // 正确
```

##### enum（枚举类型）

- 枚举类型用于定义一组命名的常量。默认情况下，从 0 开始为成员自动编号。

```js
enum Color {
  Red,
  Green,
  Blue,
}

const c: Color = Color.Green;
```

##### any（任意类型）

- any 类型可以表示任何类型，用于绕过类型检查。适合在动态内容或与第三方库交互时使用。

```js
const notSure: any = 4;
notSure = 'maybe a string';
notSure = false; // 也可以是布尔值
```

##### void（空类型）

- void 类型通常用于表示没有任何返回值的函数。与 any 相反，表示没有类型。

```js
function warnUser(): void {
  console.log('This is my warning message');
}
```

##### null 和 undefined

- TypeScript 中有两种原始数据类型 null 和 undefined。它们是所有类型的子类型，这意味着可以将它们赋值给任何类型的变量。

```js
const u: undefined = undefined;
const n: null = null;
```

##### never（永不存在的值类型）

- never 类型表示那些永不存在的值的类型。例如，永远抛出异常或无法正常返回的函数。

```js
function error(message: string): never {
  throw new Error(message);
}
```

##### object（对象类型）

- object 类型表示非原始类型，即除 number、string、boolean、symbol、null 或 undefined 之外的类型。

```js
const obj: object = { name: 'Alice' };
```

###### 类型断言

- 类型断言可以明确告诉 TypeScript 变量的具体类型，这有点类似于类型转换。

```js
const someValue: any = "this is a string";
const strLength: number = (someValue as string).length;
```

### 接口类型

##### 基本接口类型

- 接口用于定义对象的属性及其类型：

```js
interface Person {
  name: string;
  age: number;
}

const user: Person = {
  name: 'Alice',
  age: 35,
};

console.log(user.age);
```

- 在上面的例子中，Person 接口规定了一个对象必须包含 name 和 age 两个属性，且 name 是字符串，age 是数字。

##### 可选属性接口类型

- 使用 ? 可以标识接口中的可选属性。

```js
interface Person {
  name: string;
  age?: number;
}

const user1: Person = {
  name: 'Alice',
};

const user2: Person = {
  name: 'Bob',
  age: 30,
};

console.log(user2.name);
```

- 在这个例子中，age 属性是可选的，user1 没有 age 属性也是合法的。

##### 只读属性接口类型

- 使用 readonly 可以将属性设置为只读，一旦对象被初始化，就无法修改该属性。

```js
interface Person {
  readonly id: number;
  name: string;
}

const user: Person = {
  id: 1,
  name: "Alice",
};

console.log(user.name);
```

##### 函数类型接口类型

- 接口也可以用于定义函数类型。以下示例定义了一个接受两个参数的函数，并且返回一个数字：

```js
interface Add {
  (x: number, y: number): number;
}

const add: Add = (a, b) => a + b;

console.log(add(1, 2));
```

##### 索引签名接口

- 索引签名允许你动态地访问对象的属性。

```js
interface StringArray {
  [index: number]: string;
}

let arr: StringArray = ['Alice', 'Bob'];
console.log(arr);
// 你还可以使用字符串索引签名：
//-------------------------------------

interface Dictionary {
  [key: string]: string;
}

let dict: Dictionary = {
  name: 'tom',
  city: '广州',
};

console.log(dict.name);
```

##### 接口类型继承

- 接口可以通过 extends 关键字来继承其他接口，进行扩展。

```js
interface Person {
  name: string;
}

interface Employee extends Person {
  employeeId: number;
}

let emp: Employee = {
  name: 'Bob',
  employeeId: 123,
};

console.log(emp.employeeId);
```

- 在这个例子中，Employee 接口继承了 Person，所以 Employee 必须包含 name 和 employeeId 两个属性。

##### 接口类型实现

- 接口可以通过 implements 关键字约束类，使得类必须实现接口中定义的所有属性和方法。

```js
interface Animal {
  name: string;
  speak(): void;
}

class Dog implements Animal {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  speak(): void {
    console.log(`${this.name} barks.`);
  }
}

const dog = new Dog('tom');
dog.speak();
```

### 真值缩小

- 是 TypeScript 中的一种类型缩小（type narrowing）机制。它基于条件语句的布尔上下文来自动推断和缩小变量的类型。当 TypeScript 确定某些类型在布尔上下文中总是 false（如 null 或 undefined），它就会根据代码路径排除掉不可能的类型，从而缩小变量的类型范围。

```js
function printAll(strs: string | string[] | null) {
  if (strs && typeof strs === 'object') {
    for (const s of strs) {
      console.log(s);
    }
  } else if (typeof strs === 'string') {
    console.log(strs);
  }
}
```

### 等值缩小

- 是 TypeScript 中的一种类型缩小机制，它通过等值比较（例如 ===、!==、==、!=）自动推断并缩小变量的类型。在进行等值比较时，TypeScript 会根据比较的结果来排除不可能的类型，从而缩小变量的类型范围。

##### 使用 === 和 !== 判断基本类型

- 当使用严格相等（===）和不相等（!==）运算符时，TypeScript 会自动缩小变量的类型。例如：

```js
function checkValue(x: string | number | boolean) {
  if (x === 'hello') {
    // x 被缩小为 "hello" 字符串字面量类型
    console.log("x is the string 'hello'");
  } else if (x === 42) {
    // x 被缩小为数字字面量类型 42
    console.log('x is the number 42');
  } else {
    // x 被缩小为剩余的类型 boolean | number | string
    console.log('x is either a number, boolean, or other string');
  }
}
```

- 在这个例子中，x === "hello" 和 x === 42 的判断分别缩小了 x 的类型。TypeScript 能够推断出对应的精确字面量类型或联合类型。

##### 联合类型中的等值缩小

- 等值缩小对于处理联合类型特别有用，尤其是在判断一个变量属于哪个具体的类型时。

```js
function handleInput(input: string | number | boolean | null) {
  if (input === null) {
    // input 被缩小为 null
    console.log('Input is null');
  } else if (typeof input === 'string') {
    // input 被缩小为 string
    console.log(`String input: ${input}`);
  } else if (typeof input === 'number') {
    // input 被缩小为 number
    console.log(`Number input: ${input}`);
  } else {
    // input 被缩小为 boolean
    console.log(`Boolean input: ${input}`);
  }
}
```

- 通过等值比较 input === null，我们可以有效地缩小变量的类型并进行安全的类型操作。

##### 处理字面量类型

- TypeScript 支持字面量类型的等值缩小。可以通过比较变量的值来缩小到特定的字面量类型。

```js
type TrafficLight = 'red' | 'green' | 'yellow';

function operateLight(light: TrafficLight) {
  if (light === 'red') {
    // light 被缩小为 "red" 类型
    console.log(light);
  } else if (light === 'green') {
    //  light 被缩小为 "green" 类型
    console.log(light);
  } else {
    // light 被缩小为 "yellow" 类型
    console.log(light);
  }
}

console.log(operateLight('red'));
```

- 在这个例子中，light === "red"、light === "green" 的判断将变量缩小为相应的字面量类型，使得我们可以针对特定值编写逻辑。

##### 使用 in 操作符

- 当判断对象是否具有某个属性时，in 操作符也可以帮助缩小类型。例如：

```js
interface Dog {
  bark: () => void;
}

interface Cat {
  meow: () => void;
}

function makeSound(animal: Dog | Cat) {
  if ('bark' in animal) {
    // animal 被缩小为 Dog 类型
    animal.bark();
  } else {
    // animal 被缩小为 Cat 类型
    animal.meow();
  }
}
```

- 通过 in 操作符，TypeScript 可以缩小联合类型为具有该属性的具体类型。

##### 等值缩小与 switch 语句

- switch 语句同样可以通过等值缩小有效推断类型。它能够自动处理不同的分支，缩小变量的类型。

```js
type Direction = 'north' | 'south' | 'east' | 'west';

function handleDirection(direction: Direction) {
  switch (direction) {
    case 'north':
      console.log('Going north');
      break;
    case 'south':
      console.log('Going south');
      break;
    case 'east':
      console.log('Going east');
      break;
    case 'west':
      console.log('Going west');
      break;
  }
}
```

- 在这个例子中，switch 的每个分支将 direction 缩小为具体的字面量类型，使代码更加类型安全。

##### 使用 instanceof 操作符

- instanceof 操作符也可以用于缩小对象的类型。它通常用于判断对象的类或构造函数。

```js
class Dog {
  bark() {
    console.log('Woof!');
  }
}

class Cat {
  meow() {
    console.log('Meow!');
  }
}

function speak(pet: Dog | Cat) {
  if (pet instanceof Dog) {
    // pet 被缩小为 Dog
    pet.bark();
  } else {
    // pet 被缩小为 Cat
    pet.meow();
  }
}
```

- 通过 instanceof，我们可以将 pet 缩小为 Dog 或 Cat 类实例，从而安全地调用其方法。

##### 使用 == 和 !=

- 虽然不推荐使用宽松的相等运算符（== 和 !=），但 TypeScript 仍然支持基于它们的类型缩小。只不过 TypeScript 对 === 和 !== 的处理会更加严格和精确。

```js
function compareValue(value: string | number | null) {
  if (value == null) {
    // value 被缩小为 null 或 undefined
    console.log('Value is null or undefined');
  } else {
    console.log(`Value is not null: ${value}`);
  }
}
```

- value == null 会缩小 value 为 null 或 undefined，这是一种常见的用于简洁判断空值的写法。

### 函数在 TS 中的使用

- 在 TypeScript 中，函数是最重要的编程结构之一。它允许你封装逻辑并重用代码。与 JavaScript 类似，TypeScript 中的函数具有更多的类型支持和静态检查功能。你可以为函数的参数、返回值和回调函数指定类型，从而提高代码的可读性和类型安全性。

##### 函数声明

- 在 TypeScript 中，声明一个函数的语法和 JavaScript 类似，但你可以为函数的参数和返回值指定类型。

```js
function add(x: number, y: number): number {
  return x + y;
}
```

##### 匿名函数

- 你可以将函数作为值赋给变量。这样的函数叫做匿名函数或函数表达式。

```js
const subtract = function (x: number, y: number): number {
  return x - y;
};
```

##### 箭头函数

- TypeScript 支持箭头函数（arrow function），这种写法更加简洁。箭头函数的类型注解与普通函数相同

```js
const multiply = (x: number, y: number): number => x * y;
```

##### 可选参数

- 在 TypeScript 中，函数的参数可以是可选的。你可以通过在参数名后添加 ? 来实现可选参数。可选参数必须位于参数列表的最后。

```js
function greet(name: string, greeting?: string): string {
  if (greeting) {
    return `${greeting}, ${name}!`;
  } else {
    return `Hello, ${name}!`;
  }
}
```

##### 默认参数

- 你可以为函数参数指定默认值。如果调用函数时未传递该参数，TypeScript 会使用默认值。

```js
function greet(name: string, greeting: string = 'Hello'): string {
  return `${greeting}, ${name}!`;
}
```

##### 剩余参数（Rest Parameters）

- TypeScript 支持函数的剩余参数，它允许你将多个参数作为数组传递给函数。

```js
function sum(...numbers: number[]): number {
  return numbers.reduce((total, num) => total + num, 0);
}
```

### 函数重载

- 是 TypeScript 提供的一项功能，允许你为同一个函数定义多个函数签名，从而支持不同类型的参数组合。通过函数重载，可以让函数在接收不同类型或数量的参数时，执行不同的逻辑，同时保持类型安全。

1. ##### 基本用法

- 函数重载由多个函数签名和一个函数实现组成。函数签名声明了函数不同的调用方式，而函数实现包含了函数的实际逻辑。类型检查器会基于传入的参数类型来选择最匹配的重载签名。

```js
function combine(input1: string, input2: string): string;
function combine(input1: number, input2: number): number;

// 函数实现
function combine(input1: any, input2: any): any {
  if (typeof input1 === "string" && typeof input2 === "string") {
    return input1 + input2; // 拼接字符串
  }

  if (typeof input1 === "number" && typeof input2 === "number") {
    return input1 + input2; // 数值相加
  }
}

console.log(combine("Hello", "World")); // 输出: HelloWorld
console.log(combine(10, 20));
```

- 函数有两个签名，一个接受两个 string 参数，另一个接受两个 number 参数。
- 函数实现使用 any 类型，以便能够处理不同类型的输入。
- 根据参数类型，函数会执行不同的逻辑。

2. ##### 多个参数类型重载

- 你可以为函数定义多个不同的参数组合，使其适应多种调用情况。

```js
function greet(person: string): string;
function greet(person: string, age: number): string;

function greet(person: string, age?: number): string {
  if (age) {
    return `Hello ${person}, you are ${age} years old.`;
  }
  return `Hello ${person}!`;
}

console.log(greet("tom"));
console.log(greet("bob", 30));
```

2. ##### 返回值类型不同的重载

- 函数重载不仅可以用于参数类型不同的情况，还可以处理返回值类型不同的情况。

```js
function parseInput(input: string): string[];
function parseInput(input: number): number[];

function parseInput(input: string | number): string[] | number[] {
  if (typeof input === "string") {
    return input.split(" ");
  }

  if (typeof input === "number") {
    return input.toString().split(" ").map(Number);
  }

  return [];
}

console.log(parseInput("123"));  // 输出: ["1", "2", "3"]
console.log(parseInput(123));  // 输出: [1, 2, 3]
```

- 在这个例子中，根据传入的参数是 string 还是 number，parseInput 函数返回的类型也会相应变化，分别是字符串数组或数字数组。

### 参数展开

- 在 TypeScript 中，参数展开（也叫剩余参数，Rest Parameters）是指将函数的多个参数收集为一个数组。这样可以让函数接收任意数量的参数，而不需要明确指定参数的个数。这在处理变长参数列表或处理不定数量的参数时非常有用。

1. ##### 基本语法

- 使用 ... 语法将参数展开为数组，可以将任意数量的参数传递给函数，并在函数体中将它们当作数组进行处理。

```js
function sum(...numbers: number[]): number {
  return numbers.reduce((total, num) => total + num, 0);
}

console.log(sum(1, 2, 3));
```

- ...numbers: number[]：numbers 是一个数组，它包含传入的所有 number 类型参数。
- 函数内部可以像处理普通数组一样处理这些参数，比如使用 reduce 方法计算它们的和。

2. ##### 展开参数与其他参数结合

- 剩余参数必须是函数参数列表中的最后一个参数，意味着它后面不能再有其他参数。

```js
function multiply(factor: number, ...numbers: number[]): number[] {
  return numbers.map((num) => num * factor);
}

console.log(multiply(2, 1, 2, 3));
```

- factor: number 是一个普通的参数。
- ...numbers: number[] 是剩余参数，用于收集所有之后传入的 number 参数。

3. ##### 与元组结合

- TypeScript 中，剩余参数可以与元组（Tuple）类型结合使用，表示函数接受特定类型和长度的参数，随后可以有不定数量的参数。

```js
function tupleExample(a: string, b: number, ...rest: boolean[]) {
  console.log(a, b, rest);
}

tupleExample('hello', 43, true, false, true);
```

4. ##### 结合 apply 和 spread

- 除了用于定义函数参数，剩余参数还可以结合 apply 和 spread 操作符使用，这些操作符允许你将一个数组展开为单个参数传递给函数。

```js
const numbers = [1, 2, 3, 4];
console.log(Math.max(...numbers));
```

- 这里我们使用 ...numbers 将数组展开为 Math.max 函数的单个参数。

5. ##### 类型推断与剩余参数

- 当使用剩余参数时，TypeScript 能够自动推断出传入参数的类型。

```js
function concatStrings(...strings: string[]): string {
  return strings.join(', ');
}

console.log(concatStrings('a', 'b', 'c'));
```

- 在这个例子中，TypeScript 自动推断出 strings 是一个 string[] 类型数组。

### 对象类型

- 在 TypeScript 中，对象类型 是用来定义对象结构和其属性类型的。对象类型可以指定对象的属性名称和对应的类型，使代码更加清晰、可维护，并能提供编译时的类型检查。

1. ##### 基本对象类型

- 对象类型可以通过显式地列出属性名称和它们的类型来定义。使用 : 后面紧跟具体的类型声明。

```js
let person: {
  name: string,
  age: number,
};

person = {
  name: 'Alice',
  age: 25,
};

console.log(person.name);
```

- person 是一个对象，它必须具有 name 属性（类型为 string）和 age 属性（类型为 number）。
- 如果对象的结构与指定的类型不匹配（例如缺少属性或类型不符），TypeScript 会抛出错误。

2. ##### 可选属性

- 可以通过在属性名后面加上 ?，将属性标记为可选属性。可选属性允许对象的某些属性可以不存在。

```js
let car: { make: string, model?: string };
car = { make: 'Toyota' };
car = { make: 'Ford', model: 'Mustang' };

console.log(car);
```

- 在这个例子中，model 是一个可选属性，意味着对象 car 可以有或没有 model 属性。

3. ##### 只读属性

- 使用 readonly 关键字可以定义只读属性。只读属性在对象初始化时可以被赋值，但之后不能被修改。

```js
let book: {
  title: string;
  readonly author: string;
};

book = {
  title: "TypeScript",
  author: "Dan",
};

book.author = "Alice"; // 错误: 不能修改只读属性
```

- 在这个例子中，author 是只读属性，因此一旦被赋值，就不能再被修改。

4. ##### 索引签名

- 索引签名允许我们定义对象的动态属性名称，即对象可以有任意数量的属性，只要这些属性的名称和类型符合定义的规则。

```js
let user: { [key: string]: string };

user = {
  name: 'Alice',
  email: 'alice@example.com',
};

console.log(user.name);
```

- user 对象可以有任意数量的属性，属性名称是 string 类型，属性值也必须是 string 类型。
- 索引签名的常用场景包括处理动态键名或处理键值对结构的数据。

5. ##### 对象类型与函数

- 对象类型还可以包含方法，即对象的某些属性可以是函数类型。

```js
let person: {
  name: string,
  greet: () => void,
};

person = {
  name: 'Alice',
  greet() {
    console.log('Hello, ' + this.name);
  },
};

person.greet();
```
6. ##### 使用接口定义对象类型
- 对于复杂的对象类型，可以使用 接口（interface）来定义对象类型的结构。相比直接定义对象类型，接口提供了更简洁的语法，并且接口可以扩展或继承其他接口。
