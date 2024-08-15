# java
| 项目     | 地址                                                                      |
| :------- | :------------------------------------------------------------------------ |
| 晓智科技 | [晓智科技](https://xiaozhi.shop)                                          |
| 晓智文档 | [晓智文档](https://doc.xiaozhi.shop/backend/java)                      |
| 源码地址 | [源码地址](https://github.com/dezhizhang/java) |
| 文档源码 | [文档源码](https://github.com/dezhizhang/doc)    

### 求取最大值

```java
class A02 {
    public int find(String str, String[] arr) {
        int index = -1;
        for (int i = 0; i < arr.length; i++) {
            if (arr[i] == str) {
                index = i;
            }

        }
        return index;
    }
}

public class This02 {
    public static void main(String[] args) {
        String arr[] = { "123", "hello", "change" };
        A02 a2 = new A02();
        System.out.println(a2.find("hello", arr));

    }
}
```

### this 的使用

```java
class Book {
    double price;
    String name;

    public Book(String name, double price) {
        this.name = name;
        this.price = price;
    }

    public void updatePrice(double price) {
        if (price > 150) {
            this.price = 150;
        } else if (price > 100) {
            this.price = 100;
        } else {
            this.price = price;
        }

    }

    public void showBook() {
        System.out.println("书名:" + this.name + "价格:" + this.price);
    }
}

public class This03 {
    public static void main(String[] args) {
        Book book = new Book("三国", 22);
        book.updatePrice(120);
        book.showBook();

    }
}

```

### 包的使用

```java
public class Inof01 {
  public static void main(String[] args) {
    Dog dog = new Dog();
    dog.cry();
    Cat cat = new Cat();
    cat.eta();
  }
}

```

### 继承的使用

```java
class GrandPa {
  String name = "大头爷爷";
  String hobby = "旅游";
}

class Father extends GrandPa {
  String name = "大头爸爸";
  int age = 39;
}

class Son extends  Father{
  String name = "大头儿子";
}

public class ExtendsTheory {
  public static void main(String[] args) {
    Son son = new Son();
    System.out.println(son.name);
  }
}

```

### 方法的重写

```java
class Animal{
  public void cry() {
    System.out.println("动物叫换...");
  }
}

class Dog extends Animal{
  public void cry() {
    System.out.println("小狗在叫...");
  }
}

public class Override01 {
  public static void main(String[] args) {
      Dog dog = new Dog();
      dog.cry();
  }
}
```

### 动态类型帮定

```java
package com.xiaozhi.pkg.dynamic;

public class Dynamic {
  public static void main(String[] args) {
     A a = new B();
     System.out.println(a.sum());
     System.out.println(a.sum1());
  }
}

class A {
  public int i= 10;
  public int sum() {
    return getI() + 10;
  }
  public int sum1() {
    return this.i + 10;
  }
  public int getI() {
    return i;
  }
}

class B extends A{
  public int i = 20;
  public int sum() {
    return i + 20;
  }
  public int getI() {
    return this.i;
  }

  public int sum1() {
    return this.i + 10;
  }
}

```

### 多态数组

```java
public class PolyArray {
  public static void main(String[] args) {
    Person[] person = new Person[5];
    person[0] = new Person("小明",22);
    person[1] = new Student("小强",20,100);
    person[2] = new Student("小华",18,90);
    person[3] = new Teacher("张老师",40,20000);
    person[4] = new Teacher("李老师",66,10000);

    for(int i=0;i < person.length;i++) {
      //如果是学生类
      if(person[i] instanceof  Student) {
        ((Student)person[i]).study();
      }
      //如果是老师类
      if(person[i] instanceof Teacher) {
        ((Teacher)person[i]).teach();
      }
      System.out.println(person[i].say());
    }

  }
}

```

### 动态参数

```java
public class PolyParameter {
  public static void main(String[] args) {
      Person person = new Person("小明",2222);
      Manager manager = new Manager("张经理",5000,20000);
      PolyParameter polyParameter = new PolyParameter();
      polyParameter.showEmpAnnual(person);
      polyParameter.showEmpAnnual(manager);
      polyParameter.testWork(person);
      polyParameter.testWork(manager);
  }

  public void showEmpAnnual(Employee e) {
    System.out.println(e.getAnnual());
  }

  public void  testWork(Employee e) {
    if(e instanceof  Person){
      ((Person)e).work();
    }
    if (e instanceof Manager) {
      ((Manager)e).manage();
    }
  }
}

```

### 对像的 toString 方法

```java
public class ToString {
  public static void main(String[] args) {
      Monster monster = new Monster("小王","搬砖",100);
      System.out.println(monster.toString());
  }
}

class Monster{
  private  String name;
  private String work;
  private Double salary;

  Monster(String name,String work,double salary) {
    this.name = name;
    this.work = work;
    this.salary = salary;
  }

}
```

### 静态属性

```java
public class VisitStatic {
  public static void main(String[] args) {
    System.out.println(A.name);
  }
}

class A{
  public static String name = "晓智云";
}

```

### 静态方法

```java
public class StaticMethod {
  public static void main(String[] args) {
     Student student = new  Student("小明");
     Student.payFee(100);

     Student student1 = new Student("小强");
     Student.payFee(200);

     Student.showFee();
  }
}

class  Student{
  private String name;
  //静态变量所有成员共享
  private static  double fee = 0;
  Student(String name){
    this.name = name;
  }

  public static void payFee(double fee) {
    Student.fee += fee;
  }

  public static void  showFee() {
    System.out.println("总学费有：" + Student.fee);
  }

}
```

### 静态方法与非静态方法

```java
public class StaticDetail1 {
  public static void main(String[] args) {
      D d = new D();
      d.say();

      D.hi();

  }
}

class D{
  private int n1 = 100;
  private static int n2 = 200;
  public void  say() {
    System.out.println("有人在说....");
  }

  public static void hi() {

    //静态方法不允许使用this和super
    //静态方法只能允许访问静态成员
    //静态方法不能访问非静态方法
    //静态方法只能访问静态成员
    System.out.println("hi..." + D.n2);
  }
}

```

### 代码块

```java
public class CodeBlock {
  public static void main(String[] args) {
//      Movie movie = new Movie("中国中华");

      Movie movie1 = new Movie("唐探3",100);

  }
}

class Movie{
  private String name;
  private double price;
  private String director;

  {
    System.out.println("电影屏幕打开...");
    System.out.println("广告开始...");
    System.out.println("电影正是开如");
  }

  public Movie(String name) {
    this.name = name;
  }

  public Movie(String name,double price) {
    this.name = name;
    this.price = price;
  }
}

```

### 代码块的使用细节

```java
public class CodeDetail {
  public static void main(String[] args) {
    //1创建对像的时候
    //2创建子类对像实例，父类也会被加载
    AA aa = new AA();
    // 使用类的静态成员时（静态属性，静态方法）
    System.out.println(Cat.n1);
  }
}

class Cat{
  public static int n1 = 999;
  static {
    System.out.println("Cat静态代码块被执行");
  }
}

class BB {
  static {
    System.out.println("BB代码块被执行了");
  }
}

class AA extends BB {
  static {
    System.out.println("AA代码块被执行了");
  }
}


```

### 如果使用类的静态面员，普通代码块不会执行

```java
public class CodeBlock02 {
  public static void main(String[] args) {
    // 如果使用类的静态面员，普通代码块不会执行
    System.out.println(DD.n1);
  }
}

class DD{
  public static int n1 = 8888;

  static {
    System.out.println("DD的静态代码块被执行....");
  }
  {
    System.out.println("DD的普通代码块....");
  }
}

```

### 静态代码块的调用

```java
public class CodeBlock03 {
  public static void main(String[] args) {
    A a = new A();
    //A 的静态代码块
    //getN1被调用...
  }
}

class A {
  static {
    System.out.println("A 的静态代码块");
  }

  private int n2 = getN2();

  private static int n1 = getN1();

  public int getN2() {
    System.out.println("getN2被调用...");
    return 200;
  }
  public static int getN1() {
    System.out.println("getN1被调用...");
    return 100;
  }
}
```

### 继承的普通代码块

```java
public class CodeBlock04 {
  public static void main(String[] args) {
      AAA aaa = new AAA();
      /*
        1BBB的无参构造器
        2AAA的普通代码块
        3AAA的无数构造器
       */
  }
}

class  BBB {
    BBB() {
      System.out.println("BBB的无参构造器");
    }
}

class AAA extends  BBB {
  {
    System.out.println("AAA的普通代码块");
  }
  AAA() {
    super();
    System.out.println("AAA的无数构造器");
  }
}

```

### 代码块的执行顺序

```java
public class CodeBlock05 {
  public static void main(String[] args) {
    A a = new A(); //1.B静态代码初始化2.B静态代码块3.A静态属性初始化
    // 4A普通代码执行5.B普通属性初始化6.A普通属性初始化7B的无参构造器8.A的无参构造器执行

  }
}

class B {
  public static int n1 = getN1();

  static {
    System.out.println("B静态代码块");
  }

  public int n2 = getN2();

  B() {
    System.out.println("B的无参构造器");
  }

  public static int getN1() {
    System.out.println("B静态代码初始化");
    return 10;
  }

  public int getN2() {
    System.out.println("B普通属性初始化");
    return 20;
  }
}

class A extends B {
  static {
    System.out.println("A代码执行");
  }

  public static int n1 = getN1();
  public int n2 = getN2();

  public static int getN1() {
    System.out.println("A静态属性初始化");
    return 10;
  }

  public int getN2() {
    System.out.println("A普通属性初始化");
    return 20;
  }

  {
    System.out.println("A普通代码执行");
  }

  A() {
    System.out.println("A的无参构造器执行");
  }

}
```

### final 可以在代码块和构造器中赋值

```java
public class Final01 {
  public static void main(String[] args) {
      AA aa = new AA();
      aa.show();
  }
}

class AA {
  public final double TAX_RATE;
  public final double TAX_RATE1;
  // 可以在代码块和构造器中赋值
  {
    TAX_RATE1 = 2;
  }

  public AA() {
    TAX_RATE = 1;
  }

  public void show() {
    System.out.println(TAX_RATE);
    System.out.println(TAX_RATE1);
  }
}
```

### final 修改的静态属性

```java
public class Final03 {
  public static void main(String[] args) {
    BB bb = new BB();
    bb.show();

  }
}

class BB{
  //如果final修饰的属性是静态的，
  //则初始化的位置是定义时和静态代码块不能在构造器中赋值
  public static final double TAX_RATE;

  static {
    TAX_RATE = 0.2;
  }

  public void  show() {
    System.out.println(BB.TAX_RATE);
  }
}

```

### final 方法

```java
public class Final04 {
  public static void main(String[] args) {
      D d = new D();
      d.show();
      d.cal();
  }
}

class C {
  //如果类不是final类
  //但含有final方法
  //则方法不能重写但是可以被继承
  final public void  cal() {
      System.out.println("final的方法执行了cal");
  }
}

class D extends C{
  public void show() {
    System.out.println("class D is show");
  }
}

```

### final 的使用

```java
public class Final05 {
  public static void main(String[] args) {
    Circle c = new Circle();
    c.setRadius(10);
    System.out.println(c.calculate());
  }
}

class Circle {
  private double radius;
  public final double PI;

  Circle() {
    PI = 3.14;
  }

  public void setRadius(double radius) {
    this.radius = radius;
  }

  public double calculate() {
    return (PI * radius * radius);
  }
}

```

### 抽像方法

```java

public class Abstract01 {
  public static void main(String[] args) {
    Dog dog = new Dog("小黄狗");
    dog.eat();
  }
}

abstract class Animal {
  public String name;
  //抽像类不能被实例化
  //抽像类可以没有抽像方法
  //一旦类包含abstract方法,
  //则这个类必须声明为抽像类abstract
  //abstract只能修饰类和方法不能修饰属性
  Animal(String name) {
    this.name = name;
  }

  public abstract void eat();
}

class Dog extends Animal{
  Dog(String name){
    super(name);
  }
  @Override
  public void eat() {
    System.out.println("小狗在吃东西");
  }
}
```

### 抽像类的实现

```java
public class Abstract03 {
  public static void main(String[] args) {
     Employee employee = new Employee("小明","012",1200);
     employee.work();

     Manager manager = new Manager("王经理","024",8000);
     manager.work();
  }
}


abstract class  CommonEmployee {
  private String name;
  private String id;
  private double salary;
  CommonEmployee(String name,String id,double salary) {
    this.id = id;
    this.name = name;
    this.salary = salary;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getName() {
    return this.name;
  }

  public void setSalary(double salary) {
    this.salary = salary;
  }

  public double getSalary() {
    return this.salary;
  }

  public abstract void  work();
}

class Employee extends CommonEmployee {
  Employee(String name,String id,double salary) {
    super(name,id,salary);
  }

  @Override
  public void work() {
    System.out.println("姓名：" + this.getName() + "正在工作");
  }
}

class Manager extends CommonEmployee {
  private double bonus;
  Manager(String name,String id,double salary) {
    super(name,id,salary);
  }

  @Override
  public void work() {
    System.out.println("经理：" + this.getName() + "正在工作");
  }
}
```

### 接口的实现

```java
public class Interface {
  public static void main(String[] args) {
      Phone phone = new Phone();
      Camera camera = new Camera();

      Computer computer = new Computer();
      computer.work(phone);
      computer.work(camera);
  }
}

class Computer{
  public void work(UsbInterface usbInterface) {
    usbInterface.start();
    usbInterface.stop();
  }
}


class Phone implements UsbInterface {
  @Override
  public void start() {
    System.out.println("手机开始工作");
  }

  @Override
  public void stop() {
    System.out.println("手机停止工作");
  }
}

class Camera implements UsbInterface {
  @Override
  public void start() {
    System.out.println("相机开始工作");
  }

  @Override
  public void stop() {
    System.out.println("相机停止工作");
  }
}
```

### 一个类可以同时实现多个接口

```java
public class Interface02 {
  public static void main(String[] args) {
    Pig pig = new Pig();
    pig.hi();
    pig.say();
  }
}

interface IB {
  void hi();
}

interface IC {
  void say();
}

class Pig implements IB, IC {

  @Override
  public void hi() {
    System.out.println("hi");
  }

  @Override
  public void say() {
    System.out.println("say");
  }
}
```

### 接口的练习

```java
public class Interface03 {
  public static void main(String[] args) {
    B b = new B();
    System.out.println(b.a);
    System.out.println(A.a);
    System.out.println(B.a);
  }
}

interface A {
  int a = 23;

}

class  B implements A {

}

```

### 接口多态性

```java
public class Interface04 {
  public static void main(String[] args) {
      Usb[] usbs = new Usb[2];
      usbs[0] = new MyPhone();
      usbs[1] = new MyCamera();

      for(int i=0;i < usbs.length;i++) {
        usbs[i].work();
        if(usbs[i] instanceof MyPhone) {
          ((MyPhone) usbs[i]).call();
        }
      }
  }
}

interface Usb{
  void work();
}

class MyPhone implements Usb {
  @Override
  public void work() {
    System.out.println("手机工作中...");
  }

  public void call() {
    System.out.println("手机可以打电话...");
  }
}

class MyCamera implements Usb {
  @Override
  public void work() {
    System.out.println("相机工作台...");
  }
}
```

### 内部类

```java
public class Inner01 {
  public static void main(String[] args) {
    Outer outer = new Outer(12);
    outer.m1();
  }
}


class Outer{
  private int n1;
  Outer(int n1) {
    this.n1 = n1;
  }
  private void m2() {
    System.out.println("m2");
  }
  public void m1() {
    class Inner{
      public void f1() {
        //可以访问外部类的所有成员，包括私有的
        //不能添加修饰符，但是可以用final访问
        System.out.println("n1=" + n1);
        m2();
      }
    }
    Inner inner = new Inner();
    inner.f1();
  }
}
```

### 基于接口的内部类

```java
public class Inner02 {
  public static void main(String[] args) {
    Outer01 outer01 = new Outer01();
    outer01.method();
  }
}

class Outer01{
  public void method() {
    IA tiger = new IA() {
      @Override
      public void cay() {
        System.out.println("老虎在叫....");
      }
    };
    tiger.cay();
  }
}

interface IA {
  void cay();
}

```

### 枚举

```java
public class Enum02 {
  public static void main(String[] args) {
        System.out.println(Season2.WINTER);
  }
}

enum Season2{

  SPRING("春天", "温暖"),
  WINTER("冬天", "実冷"),
  AUTUMN("秋天", "凉爽"),
  SUMMER("夏天", "炎热");

  private String name;
  private String desc;
;
  Season2(String name,String desc) {
    this.name = name;
    this.desc = desc;
  }

  @Override
  public String toString() {
    return  "季节：" + this.name + "描述：" + this.desc;
  }
}
```

### 枚举的常用

```java
public class Enum03 {
  public static void main(String[] args) {
    Gender boy = Gender.BOY;
    Gender boy2 = Gender.BOY;

    System.out.println(boy);
    System.out.println(boy2 == boy);
  }
}


enum Gender{
  BOY,GIRL
}


```

### 常用方法的使用

```java
public class Enum02 {
  public static void main(String[] args) {
    Season2 season2 = Season2.AUTUMN;
    System.out.println(season2.name());
    //常量对像的次序
    System.out.println(season2.ordinal());
    System.out.println(Season2.values().toString());
    System.out.println(Season2.valueOf("AUTUMN"));
    System.out.println(Season2.SPRING.compareTo(Season2.AUTUMN));
  }
}

enum Season2{
  SPRING("春天", "温暖"),
  WINTER("冬天", "実冷"),
  AUTUMN("秋天", "凉爽"),
  SUMMER("夏天", "炎热");

  private String name;
  private String desc;
  Season2(String name,String desc) {
    this.name = name;
    this.desc = desc;
  }
  public String toString(){
    return this.desc;
  }

}
```

### enum 方式的使用

```java
public class Enum04 {
  public static void main(String[] args) {
    Week[] weeks = Week.values();
    for (int i = 0; i < weeks.length; i++) {
      System.out.println(weeks[i]);
    }
  }
}

enum Week {
  MONDAY("星期一"),
  TUESDAY("星期二"),
  WEDNESDAY("星期三"),
  THURSDAY("星期四"),
  FRIDAY("星期五"),
  SATURDAY("星期六"),
  SUNDAY("星期日");
  private String name;
  Week(String name) {
    this.name = name;
  }

  @Override
  public String toString() {
    return this.name;
  }
}
```

### 重写 Override

```java
class Father{
  public void fly() {
    System.out.println("father is fly");
  }
}

class Son extends  Father {
  @Override
  public void fly() {
    super.fly();
  }
}
```

### 异常处理

```java
public class Exception01 {
  public static void main(String[] args) {

    try {
      int num1 = 10;
      int num2 = 0;
      int res = num1 / num2;
    }catch (Exception e) {
      //e.printStackTrace();
      System.out.println(e.getMessage());
    }

    System.out.println("程序继续运行...");
  }
}

```

### 包装类

```java
public class Wrapper {
  public static void main(String[] args) {
    //手动装箱
    int n1 = 100;
    Integer integer = new Integer(n1);
    Integer integer1 = Integer.valueOf(n1);

    System.out.println(integer);
    System.out.println(integer1);

    // 手动拆箱
    int i = integer.intValue();
    System.out.println(i);
  }
}

```

### 包装类型转 string

```java
public class Wrapper2 {
  public static void main(String[] args) {
    // 包装类型转string
    Integer i = 100;
    String str = i + "";
    System.out.println(str);
    System.out.println(i.toString());
    System.out.println(String.valueOf(i));
  }
}
```

### string 转成包装类

```java
public class Wrapper2 {
  public static void main(String[] args) {
    // 字符串转成包装类
    String str1 = "123456";
    System.out.println(Integer.parseInt(str1));
    System.out.println(new Integer(str1));
  }
}

```

### Integer 的使用

```java
public class Wrapper4 {
  public static void main(String[] args) {
     Integer n = 1;
     Integer m = 1;
     System.out.println(m == n); //true

     Integer x = 128;
     Integer y = 128;
     System.out.println(x == y); //false
  }
}
```

### intern 方法的使用

```java
public class String1 {
  public static void main(String[] args) {
      String a = "hsp";
      String b = new String("hsp");

      System.out.println(a == b.intern()); //true
      System.out.println(b == b.intern()); //false
  }
}

```

### String 转 StringBuffer

```java
public class StringBuffer2 {
  public static void main(String[] args) {
    String str = "hello world";
    StringBuffer stringBuffer2 = new StringBuffer(str);
    System.out.println(stringBuffer2);

    //使用append添加
    StringBuffer stringBuffer = new StringBuffer();
    stringBuffer = stringBuffer2.append(str);
    System.out.println(stringBuffer);
  }
}

```

### StringBuffer 转成 String

```java
public class StringBuffer2 {
  public static void main(String[] args) {

    // String转成StringBuffer
    StringBuffer stringBuffer1 = new StringBuffer("hello world");
    String str1 = stringBuffer1.toString();
    System.out.println(str1);
    String str2 = new String(stringBuffer1);
    System.out.println(str2);
  }
}

```

### Math 方法的学中

```java
public class Math01 {
  public static void main(String[] args) {
    //1 Math.abs 求约对值
    int abs = Math.abs(-9);
    System.out.println(abs);

    //2 Math.pow求幂
    double pow = Math.pow(2, 4);
    System.out.println(pow);

    //3 Math.ceil向上取整
    double ceil = Math.ceil(-3.0001);
    System.out.println(ceil);

    //4 Math.floor向下取整
    double floor = Math.floor(-4.999);
    System.out.println(floor);

    //5 Math.round四舍五入
    long round = Math.round(-5.0001);
    System.out.println(round);

    //6 Math.sqrt求平方
    double sqrt = Math.sqrt(9.0);
    System.out.println(sqrt);

    //7 Math.random()生成随面数
    double random = Math.random();
    System.out.println(random);

    //生成随面数
    int a = 2;
    int b = 7;

    for (int i = 0; i < 10; i++) {
      int random1 = (int) (a + Math.random() * (b - a + 1));
      System.out.println(random1);
    }
  }
}
```

### Arrays 方法的使用

```java
public class Math02 {
  public static void main(String[] args) {
    //显示字符串形式
    Integer[] integers = {1,-1,7,0,89};
    System.out.println(Arrays.toString(integers));

    // sort方法的使用
    Arrays.sort(integers, new Comparator<Integer>() {
      @Override
      public int compare(Integer o1, Integer o2) {
        return o2 - o1;
      }
    });
    System.out.println(Arrays.toString(integers));
  }
}

```

### 二分查找法

```java
public class Arrays01 {
  public static void main(String[] args) {
      Integer[] arr = {1,2,90,123,567};
      int index = Arrays.binarySearch(arr,2);
      System.out.println(index);
  }
}

```

### 数组的拷贝

```java
public class Array02 {
  public static void main(String[] args) {
    Integer[] arr = {1,2,3,4};
    Integer[] newArr = Arrays.copyOf(arr,arr.length);
    System.out.println(newArr.toString());
    System.out.println(arr == newArr);
  }
}
```

### 数组的填充

```java
public class Array03 {
  public static void main(String[] args) {
    Integer arr[] = {1,2,3,4};
    Arrays.fill(arr,5);
    System.out.println(Arrays.toString(arr));
  }
}

```

### 返回两个数组元数是否相等

```java
public class Array04 {
  public static void main(String[] args) {
      Integer arr1[] = new Integer[]{1,2,3};
      Integer arr2[] = new Integer[]{1,2,3};

      boolean equals = Arrays.equals(arr1,arr2);
      System.out.println(equals);
  }
}
```

### 数组的排序

```java
package com.xiaozhi.pkg.arrays;


import java.util.Arrays;
import java.util.Comparator;

public class Array05 {
  public static void main(String[] args) {
    Book[] books = new Book[4];
    books[0] = new Book("红楼梦~", 100);
    books[1] = new Book("金瓶梅~", 90);
    books[2] = new Book("青年文摘~", 5);
    books[3] = new Book("java从入门到放弃", 300);
    Arrays.sort(books, new Comparator<Book>() {
      @Override
      public int compare(Book o1, Book o2) {
        return (int) (o2.getPrice() - o1.getPrice());
      }
    });

    for (int i = 0; i < books.length; i++) {
      System.out.println(books[i].getName().toString());
    }

  }
}

class Book {
  private String name;
  private double price;

  Book(String name, double price) {
    this.name = name;
    this.price = price;
  }

  public double getPrice() {
    return this.price;
  }

  public String getName() {
    return this.name;
  }

}

```

### exit 退出程序

```java
public class Array06 {
  public static void main(String[] args) {
    System.out.println("ok1");

    System.exit(0);

    System.out.println("ok2");
  }
}
```

### arraycopy 数组的拷贝

```java
public class Array07 {
  public static void main(String[] args) {
    int[] src = {1, 2, 3};
    int[] dest = new int[3];

    System.arraycopy(src, 0, dest, 0, 3);
    System.out.println(Arrays.toString(dest));
  }
}
```

### 获取当前时间

```java
public class Date01 {
  public static void main(String[] args) {
    Date date = new Date();
    System.out.println("当前时间=" + date);
    System.out.println(date.getTime());

    SimpleDateFormat simpleDateFormat = new SimpleDateFormat("YYYY年MM月dd日 hh:mm:ss E");
    System.out.println(simpleDateFormat.format(date));

  }
}

```

### 第一代日期

```java
import java.text.SimpleDateFormat;
import java.util.Date;

public class Date01 {
  public static void main(String[] args) throws Exception {
    Date date = new Date();
    System.out.println("当前时间=" + date);
    System.out.println(date.getTime());

    SimpleDateFormat simpleDateFormat = new SimpleDateFormat("YYYY年MM月dd日 hh:mm:ss E");
    System.out.println(simpleDateFormat.format(date));

    String str = "2022年10月05日 10:31:02 周三";
    System.out.println(simpleDateFormat.format(simpleDateFormat.parse(str)));

  }
}

```

### 第二代日期 Calendar

```java
import java.util.Calendar;

public class Date02 {
  public static void main(String[] args) {
    Calendar calendar = Calendar.getInstance();

    System.out.println("年" + calendar.YEAR);
    System.out.println("月:" + calendar.get(Calendar.MONTH));
    System.out.println("日:" + calendar.get(Calendar.DAY_OF_MONTH));
    System.out.println("小时" + calendar.get(Calendar.HOUR));
    System.out.println("分钟：" + calendar.get(Calendar.MINUTE));
    System.out.println("秒：" + calendar.get(Calendar.SECOND));
  }
}

```

### 第三代日期 LocalDateTime

```java
public class Date03 {
  public static void main(String[] args) {
    LocalDateTime ldt = LocalDateTime.now();
    System.out.println(ldt);
    System.out.println("年：" + ldt.getYear());
    System.out.println("月:" + ldt.getMonthValue());
    System.out.println("月:" + ldt.getMonth());
    System.out.println("日：" + ldt.getDayOfMonth());
    System.out.println("时：" + ldt.getMinute());
    System.out.println("秒：" + ldt.getSecond());
  }
}


public class Date04 {
  public static void main(String[] args) {
    LocalDateTime ldt = LocalDateTime.now();

    DateTimeFormatter dtf = DateTimeFormatter.ofPattern("YYYY年MM月dd日 HH小时mm分钟ss秒");

    System.out.println(dtf.format(ldt));


    Instant now = Instant.now();
    System.out.println(now);

  }
}

```

### 第三代日期的使用 plusDays

```java
public class Date05 {
  public static void main(String[] args) {
    LocalDateTime ldt = LocalDateTime.now();

    LocalDateTime nLdt = ldt.plusDays(360);
    DateTimeFormatter dtf = DateTimeFormatter.ofPattern("YYYY年MM月dd日 HH小时mm分钟ss秒");

    System.out.println(dtf.format(nLdt));

  }
}

```

### 字符串的反转

```java
public class Date06 {
  public static void main(String[] args) {
    String str = "abcdef";
    str = reverse(str, 0, 5);
    System.out.println(str);
  }

  public static String reverse(String str, int start, int end) {
    char[] chars = str.toCharArray();
    char temp = ' ';
    for (int i = start, j = end; i < j; i++, j--) {
      temp = chars[i];
      chars[i] = chars[j];
      chars[j] = temp;
    }
    return new String(chars);

  }
}

```

### ArrayList 集合的常用方法

```java
public class Collection1 {
  public static void main(String[] args) {
    List arrayList =new ArrayList();
    arrayList.add("tom");
    arrayList.add(10);
    arrayList.add(true);


    System.out.println(arrayList);
    // 删除完素
    arrayList.remove(1);
    System.out.println(arrayList);
    //查找元素是否存在
    System.out.println(arrayList.contains("tom"));
    //获取元素的大小
    System.out.println(arrayList.size());
    //判断是否为空
    System.out.println(arrayList.isEmpty());
    //添空元素
    arrayList.clear();
    System.out.println(arrayList);

    ArrayList list2 = new ArrayList();
    list2.add("红楼攀");
    list2.add("三国演义");

    arrayList.addAll(list2);
    System.out.println(arrayList);
    //判断多个几何是否存在
    System.out.println( arrayList.containsAll(list2));
    arrayList.removeAll(list2);
    System.out.println(arrayList);
  }
}
```

### Iterator 的使用

```java
import java.util.ArrayList;
import java.util.Collection;
import java.util.Iterator;

public class Collection2 {
  public static void main(String[] args) {
    Collection col = new ArrayList();
    col.add(new Book("三国演义", "罗轴中", 10.1));
    col.add(new Book("小李飞刀", "古龙", 5.1));
    col.add(new Book("红楼梦", "蓝雪匠", 34.6));

    Iterator iterator = col.iterator();
    while (iterator.hasNext()) {
      //返回下一个元素
      Object next = iterator.next();
      System.out.println(next);
    }
  }
}


class Book {
  private String name;
  private String author;
  private double price;

  public Book(String name, String author, double price) {
    this.name = name;
    this.author = author;
    this.price = price;
  }

  @Override
  public String toString() {
    return "书名：" + this.name + "作者：" + this.author + "价格:" + this.price;
  }
}
```

### 增加 for 循环

```java
import java.util.ArrayList;
import java.util.Collection;

public class Collection3 {
  public static void main(String[] args) {
    Collection col = new ArrayList();
    col.add(new Book("三国演义", "罗轴中", 10.1));
    col.add(new Book("小李飞刀", "古龙", 5.1));
    col.add(new Book("红楼梦", "蓝雪匠", 34.6));

    for(Object book:col) {
      System.out.println(book);
    }
  }
}

```

### Iterator 练习题

```java
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class Collection4 {
  public static void main(String[] args) {
    List list = new ArrayList();
    list.add(new Dog("小黄",2));
    list.add(new Dog("大黄",4));
    list.add(new Dog("阿黄",8));

    Iterator iterator = list.iterator();
    while (iterator.hasNext()) {
      Object next = iterator.next();
      System.out.println(next);
    }

    for(Object dog:list) {
      System.out.println(dog);
    }
  }
}

class Dog {
  private String name;
  private int age;
  Dog(String name,int age) {
    this.name = name;
    this.age = age;
  }

  @Override
  public String toString() {
    return this.name + this.age;
  }
}
```

### list 接口和常用方法

```java
import java.util.ArrayList;
import java.util.List;

public class List1 {
  public static void main(String[] args) {
    List list = new ArrayList();
    list.add("jack");
    list.add("tom");
    list.add("mary");
    list.add("tom");

    for(int i=0;i < list.size();i++) {
      System.out.println(list.get(i));
    }

    list.set(1,"马力");
    System.out.println(list);

    System.out.println(list.lastIndexOf("tom"));

    List list1 = list.subList(1,3);
    System.out.println(list1);


  }
}
```

### List 练习

```java
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class List2 {
  public static void main(String[] args) {
    List list = new ArrayList();

    for(int i=0;i < 11;i++) {
      list.add("hello");
    }

    System.out.println(list);

    list.add(1,"韩顺平教育");

    String name = (String) (list.get(5));

    System.out.println(name);

    list.set(6,"world");

    Iterator integer =  list.iterator();
    while (integer.hasNext()) {
      Object next = integer.next();
      System.out.println(next);
    }

    for(Object name1:list) {
      System.out.println(name1);
    }

  }
}
```

### 集合的排序

```java
public class List3 {
  public static void main(String[] args) {
    List list = new ArrayList();
    list.add(new Book("红楼梦", 88.0, "曹雪芹"));
    list.add(new Book("三国演义", 44.00, "罗贯中"));
    list.add(new Book("水浒传", 100.00, "水浒传"));
    list.add(new Book("西游记", 90.00, "吴承恩"));
    sort(list);

    for(Object o:list) {
      System.out.println(o);
    }


  }

  public static void sort(List list) {
    for (int i = 0; i < list.size() - 1; i++) {
      for (int j = 0; j < list.size() - i - 1; j++) {
        Book book = (Book) list.get(j);
        Book book1 = (Book) list.get(j + 1);
        if (book.getPrice() > book1.getPrice()) {
          list.set(j,book1);
          list.set(j + 1,book);
        }
      }
    }

  }
}

class Book {
  public String name;
  public double price;
  public String author;

  public Book(String name, double price, String author) {
    this.name = name;
    this.price = price;
    this.author = author;
  }

  public double getPrice() {
    return this.price;
  }

  public String getName() {
    return this.name;
  }

  @Override
  public String toString() {
    return "名称：" + this.name +"\t\t"+ "价格：" + this.price + "\t\t"+ "作者：" + this.author;
  }
}
```

### set 的常用方法

```java
import java.util.HashSet;
import java.util.Iterator;

public class Set1 {
  public static void main(String[] args) {
    HashSet hashSet = new HashSet();
    hashSet.add("tom");
    hashSet.add("key");
    hashSet.add("change");
    hashSet.add(null);

    Iterator iterator = hashSet.iterator();
    while (iterator.hasNext()) {
      Object next = iterator.next();
      System.out.println(next);
    }
  }
}
```

### set 的练习

```java
public class Set2 {
  public static void main(String[] args) {
    HashSet hashSet = new HashSet();

    System.out.println(hashSet.add("john"));
    System.out.println(hashSet.add("lucy"));
    System.out.println(hashSet.add("john"));
    System.out.println(hashSet.add("jack"));
    System.out.println(hashSet.add("Rose"));
    hashSet.remove("john");
    System.out.println(hashSet);
  }
}
```

### 链表的使用

```java
public class Set05 {
  public static void main(String[] args) {
    Node[] table = new Node[16];

    Node john = new Node("john",null);
    table[2] = john;

    Node jack = new Node("jack",null);
    john.next = jack;

    Node rose = new Node("rose",null);
    jack.next = rose;
    System.out.println(table);
  }
}

class Node{
  Object item;
  Node next;
  public Node(Object item,Node next) {
    this.item = item;
    this.next = next;
  }
}
```

### 型

```java
public class Generic01 {
  public static void main(String[] args) {
    ArrayList<Dog> arrayList = new ArrayList<Dog>();
    arrayList.add(new Dog("阿黄",22));
    arrayList.add(new Dog("大黄",33));

    for (Dog dog:arrayList) {
      System.out.println(dog.getName());
    }
  }
}

```

### HashMap 的使用

```java
public class Generic02 {
  public static void main(String[] args) {
    List<Student> list = new ArrayList<Student>();
    list.add(new Student("小明",22));
    list.add(new Student("小黄",33));
    list.add(new Student("大黄",44));

    for (Student student:list) {
      System.out.println(student.toString());
    }

    Iterator<Student> integer = list.iterator();
    while (integer.hasNext()) {
      Student next = integer.next();
      System.out.println(next.toString());
    }

    HashMap<String,Student> hashMap = new HashMap<String,Student>();
    hashMap.put("小明",new Student("小明",22));
    hashMap.put("小黄",new Student("小黄",33));
    hashMap.put("大黄",new Student("大黄",44));

    Set<Map.Entry<String, Student>> entries = hashMap.entrySet();

    Iterator<Map.Entry<String, Student>> iterator = entries.iterator();
    while (integer.hasNext()) {
      Map.Entry<String, Student> next = iterator.next();
      System.out.println(next);
    }
    System.out.println(hashMap);
  }
}

class Student{
  private String name;
  private int age;
  public Student(String name,int age) {
    super();
    this.name = name;
    this.age = age;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getName() {
    return name;
  }

  public void setAge(int age) {
    this.age = age;
  }

  public int getAge() {
    return age;
  }

  @Override
  public String toString() {
    return this.name + this.age;
  }
}
```

### 泛型只能是引用类型不能是基本类型

```java
import java.util.ArrayList;
import java.util.List;

public class Generic03 {
  public static void main(String[] args) {
    List<Integer> list = new ArrayList<Integer>();
    list<int> list1 = new ArrayList<int>();
  }
}

```

### 泛型能传入子类

```java
package com.xiaozhi.pkg.generic;

import java.util.ArrayList;
import java.util.List;

public class Generic03 {
  public static void main(String[] args) {
    List<Integer> list = new ArrayList<Integer>();

    Pig<A> pig = new Pig<A>(new A());
    Pig<A> pig1 = new Pig<A>(new B());
  }
}

class A {

}

class B extends A {

}

class Pig<T> {
  T e;

  public Pig(T e) {
    this.e = e;
  }

  public T getE() {
    return e;
  }
}

```

### 自定义泛型

```java
package com.xiaozhi.pkg.generic;

@SuppressWarnings({"all"})
public class Generic05 {
  public static void main(String[] args) {
      Tiger g2 = new Tiger("john~");
      g2.setT("yy");
      System.out.println(g2.toString());
  }
}

class Tiger<T,R,M> {
  String name;
  R r;
  M m;
  T t;

  public Tiger(String name) {
    this.name = name;
  }

  public  Tiger(String name,R r,M m,T t) {
    this.name = name;
    this.r = r;
    this.m = m;
    this.t = t;
  }

  public void setR(R r) {
    this.r = r;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public M getM() {
    return m;
  }

  public T getT() {
    return t;
  }

  public void setM(M m) {
    this.m = m;
  }

  public void setT(T t) {
    this.t = t;
  }

  public R getR() {
    return r;
  }

  @Override
  public String toString() {
    return this.name + this.t + this.m + this.r;
  }
}
```

### 泛型的使用

```java
public class Generic07 {
  public static void main(String[] args) {
      Apple<String,Integer,Double> apple = new Apple<>();
      apple.fly(10);
      apple.fly(new Dog1());
  }
}

class Apple<T,R,M> {
  public <E> void fly(E e) {
    System.out.println(e.getClass().getSimpleName());
  }

  public void  run() {

  }
}

class Dog1{

}

```

### 泛型的通配符

```java
package com.xiaozhi.pkg.generic;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

public class Generic08 {
  public static void main(String[] args) {
    List<Object> list1 = new ArrayList<>();
    List<String> list2 = new ArrayList<>();
    List<AA> list3 = new LinkedList<>();
    List<BB> list4 = new LinkedList<>();
    List<CC> list5 = new LinkedList<>();

    print1(list1);
    print1(list2);
    print1(list3);
    print1(list4);
    print1(list5);

    print2(list3);
    print2(list4);
    print2(list5);

    print3(list1);
    print3(list3);

  }
  public static  void  print1(List<?> c) {
    for (Object object:c) {
      System.out.println(object);
    }
  }

  public static void  print2(List<? extends AA> c) {
    for (Object object:c) {
      System.out.println(object);
    }
  }

  public static void print3(List<? super AA> c) {
    for (Object object:c) {
      System.out.println(object);
    }
  }
}

class AA{

}

class BB extends  AA{

}

class CC extends BB {

}

```

### JUnit 测试框架的使用

```java
public class JUnit {
  public static void main(String[] args) {

  }


  @Test
  public void m1() {
    System.out.println("m1方法被调用");
  }

  @Test
  public void m2() {
    System.out.println("m2方法被调用");
  }
}

```

### 文件相关操作

```java

public class Io02 {
  public static void main(String[] args) {
  }
  @Test
  public void info() {
    File file = new File("./test.txt");

    System.out.println("获取文件名" + file.getName());
    System.out.println("获取绝对路径" + file.getAbsolutePath());
    System.out.println("获取文件父级目录" + file.getParent());
    System.out.println("文件大小=" + file.length());
    System.out.println("是不是一个文件" + file.isFile());
    System.out.println("是不是一个目录" + file.isDirectory());
  }
}

```

### 输入流

```java
public class Io04 {
  public static void main(String[] args) {

  }
  @Test
  public void readFile() {
    String path = "hello.txt";
    int readData = 0;
    FileInputStream fileInputStream = null;
    try {
       fileInputStream = new FileInputStream(path);
      while ((readData = fileInputStream.read()) != -1) {
          System.out.println((char) readData);
      }
    } catch (IOException e) {
       e.printStackTrace();
    } finally {
      try{
        fileInputStream.close();
      } catch (IOException e) {
        throw new RuntimeException(e);
      }
    }

  }
}
```

### 文件的写入

```java
import java.io.FileOutputStream;
import java.io.IOException;

public class Io05 {
  public static void main(String[] args) {

  }
  @Test
  public void  write() {
    String filePath = "./hello.txt";
    FileOutputStream fileOutputStream = null;

    try {
      fileOutputStream = new FileOutputStream(filePath,true);
      String str = "hello world";
      fileOutputStream.write(str.getBytes());
      System.out.println("写入完成");
    } catch (IOException e) {
      e.printStackTrace();
    } finally {
      try{
        fileOutputStream.close();
      } catch (IOException e) {
        e.printStackTrace();
      }

    }
  }
}

```

### 文件的拷贝

```java
public class Io06 {
  public static void main(String[] args) {

  }
  @Test
  public void  copyFile() {
    String srcFilePath = "./avatar.webp";
    String distFilePath = "./avatar.png";

    FileInputStream fileInputStream = null;
    FileOutputStream fileOutputStream = null;

    try{
      fileInputStream = new FileInputStream(srcFilePath);
      fileOutputStream = new FileOutputStream(distFilePath);

      byte[] buf = new byte[1024];
      int readLength = 0;
      while ((readLength = fileInputStream.read(buf)) != -1) {
        fileOutputStream.write(buf,0,readLength);
      }
      System.out.println("文件");

    } catch (IOException e) {
      e.printStackTrace();
    }finally {
      try{
        fileInputStream.close();
      }catch (IOException e) {
        e.printStackTrace();
      }

    }
  }

}

```

### FileReader

```java
public class Io07 {
  public static void main(String[] args) {
    String filePath = "./hello.txt";
    FileReader fileReader = null;
    int data = 0;

    try{
       fileReader = new FileReader(filePath);
       while ((data = fileReader.read()) != -1) {
         System.out.print((char) data);
       }
    }catch (IOException e) {
      e.printStackTrace();
    }

  }

}
```

### FileReader 批量读取

```java
import java.io.FileReader;
import java.io.IOException;

public class Io08 {
  public static void main(String[] args) {
    String filePath = "./hello.txt";
    FileReader fileReader = null;
    int readLength = 0;
    char[] buf = new char[8];

    try {
      fileReader = new FileReader(filePath);
      while ((readLength = fileReader.read(buf)) != -1) {
        System.out.print(new String(buf, 0, readLength));
      }
    } catch (IOException e) {
      e.printStackTrace();
    } finally {
      try {
        fileReader.close();
      } catch (IOException e) {
        e.printStackTrace();
      }

    }
  }
}

```

### 文件写入

```java
public class Io09 {
  public static void main(String[] args) {
    String filePath = "./info.txt";
    FileWriter fileWriter = null;

    char[] chars = {'a', 'b', 'c'};
    try {
      fileWriter = new FileWriter(filePath);
      fileWriter.write("韩顺平教育".toCharArray());
    } catch (IOException e) {
      e.printStackTrace();
    } finally {
      try{
        fileWriter.close();
      }catch (IOException e) {
        e.printStackTrace();
      }

    }
  }
}
```

### BufferedReader 文件的读取

```java
public class Io10 {
  public static void main(String[] args) {
    String filePath = "./info.txt";
    try {
      BufferedReader bufferedReader = new BufferedReader(new FileReader(filePath));
      String line;
      while ((line = bufferedReader.readLine())!= null) {
        System.out.println(line);
      }
      bufferedReader.close();
    } catch (IOException e) {
      throw new RuntimeException(e);
    }
  }
}

```

### bufferedWriter 文件的写入

```java
public class Io11 {
  public static void main(String[] args) {
    String filePath = "./hello.txt";
    try {
      BufferedWriter bufferedWriter = new BufferedWriter(new FileWriter(filePath));
      bufferedWriter.write("hello 你好贵州贵阳");
      bufferedWriter.close();
    } catch (IOException e) {
      throw new RuntimeException(e);
    }
  }
}

```

### 文件的拷贝

```java
public class Io12 {
  public static void main(String[] args) {
    String srcFilePath = "./hello.txt";
    String destFilePath = "./change.txt";

    BufferedWriter bufferedWriter = null;
    BufferedReader bufferedReader = null;
    String line;

    try {
      bufferedReader = new BufferedReader(new FileReader(srcFilePath));
      bufferedWriter = new BufferedWriter(new FileWriter(destFilePath));
      while ((line = bufferedReader.readLine()) != null) {
        bufferedWriter.write(line);
        bufferedWriter.newLine();
      }
      System.out.println("文件拷贝成功");
    } catch (IOException e) {
      throw new RuntimeException(e);
    } finally {
      if(bufferedReader != null) {
        try {
          bufferedWriter.close();
        } catch (IOException e) {
          throw new RuntimeException(e);
        }
      }
      if (bufferedWriter != null) {
        try {
          bufferedWriter.close();
        } catch (IOException e) {
          throw new RuntimeException(e);
        }
      }
    }

  }
}
```

### 解决中文乱码问题

```java
public class Standard {
  public static void main(String[] args) throws IOException {
    String filePath = "./hello.txt";
    InputStreamReader isr = new InputStreamReader(new FileInputStream(filePath), "utf-8");
    BufferedReader br = new BufferedReader(isr);

    String s = br.readLine();
    System.out.println(s);
    br.close();
  }
}
```

### 写入文件的格式

```java
public class Standard01 {
  public static void main(String[] args) throws IOException {
    String filePath = "./hello.txt";
    OutputStreamWriter osw = new OutputStreamWriter(new FileOutputStream(filePath), "utf8");
    osw.write("hi 晓智云");
    osw.close();
    System.out.println("保存文件成功");

  }
}

```

### 正则表过式

```java
public class Regexp01 {
  public static void main(String[] args) {
    String content = "你好hello world";
    Pattern pattern = Pattern.compile("[a-zA-Z]");
    Matcher matcher = pattern.matcher(content);
    System.out.println(matcher.find());
  }
}

```

### 正则表过式

```java
public class Regexp02 {
  public static void main(String[] args) {
    String content = "1994年6、7月间，在经历了一场历时三天的讨论之后，团队决定再一次改变了努力的目标，这次他们决定将该技术应用于万维网。" +
      "他们认为随着Mosaic浏览器的到来，因特网正在向同样的高度互动的远景演变，而这一远景正是他们在有线电视网中看到的。" +
      "作为原型，帕特里克·诺顿写了一个小型万维网浏览器WebRunner。";
    String regexp = "\\d\\d\\d\\d";

    Pattern pattern = Pattern.compile(regexp);

    Matcher matcher = pattern.matcher(content);

    while (matcher.find()) {
      System.out.println(matcher.group(0));
    }
  }
}
```

### 正则表过式的转义字符

```java
public class RegExp03 {
  public static void main(String[] args) {
    String content = "abc$(abc(123(";
    String regExp = "\\(";

    Pattern pattern = Pattern.compile(regExp);
    Matcher matcher = pattern.matcher(content);

    while (matcher.find()) {
      System.out.println("找到" + matcher.group(0));
    }
  }
}
```

### 匹配字符

```java
public class RegExp05 {
  public static void main(String[] args) {
    String content = "asd12345agd";
    String regExp = "\\D";
    Pattern pattern = Pattern.compile(regExp);
    Matcher matcher = pattern.matcher(content);

    while (matcher.find()) {
      System.out.println(matcher.group(0));
    }
  }
}

```

### 选择匹配符

```java
public class RegExp07 {
  public static void main(String[] args) {
    String content = "zhangdezhi 张 晓智";
    String regExp = "zhang|张|智";

    Pattern pattern = Pattern.compile(regExp);
    Matcher matcher = pattern.matcher(content);

    while (matcher.find()) {
      System.out.println(matcher.group(0));
    }
  }
}

```

### 限定符

```java
public class RegExp {
  public static void main(String[] args) {
    String content = "a1aaa12";

    String regExp = "a1?";

    Pattern pattern = Pattern.compile(regExp);
    Matcher matcher = pattern.matcher(content);
    while (matcher.find()) {
      System.out.println(matcher.group(0));
    }
  }
}

```

### 定位匹配符

```java
public class RegExp11 {
    public static void main(String[] args) {
        String content = "123abc";
        String regExp = "^[0-9]+[a-z]*";

        Pattern pattern = Pattern.compile(regExp);
        Matcher matcher = pattern.matcher(content);

        while (matcher.find()) {
            System.out.println(matcher.group(0));
        }
    }
}

```

### 非捕获分组

```java
public class RegExp15 {
  public static void main(String[] args) {
    String content = "hello韩顺平教育 jack韩顺平老师 韩顺平同学hello";

    String regExp = "韩顺平(?:教育|老师|同学)";

    Pattern pattern = Pattern.compile(regExp);
    Matcher matcher = pattern.matcher(content);
    while (matcher.find()) {
      System.out.println(matcher.group(0));
    }
  }
}
```

### 非捕获分组

```java
public class RegExp16 {
  public static void main(String[] args) {
    String content = "hello韩顺平教育 jack韩顺平老师 韩顺平同学hello";
    String regExp = "韩顺平(?=教育|老师)";

    Pattern pattern = Pattern.compile(regExp);
    Matcher matcher = pattern.matcher(content);

    while (matcher.find()) {
      System.out.println(matcher.group(0));
    }
  }
}

```

### 反向引用

```java
public class RegExp18 {
  public static void main(String[] args) {
    String content = "hello jack14 tom11 jack22 yyy xxx";
    String regExp = "(\\d)\\1";
    Pattern pattern = Pattern.compile(regExp);
    Matcher matcher = pattern.matcher(content);
    while (matcher.find()) {
      System.out.println(matcher.group(0));
    }
  }
}
```

### 实现接口

```java
public class Mysql02 {
  public static void main(String[] args) {
     JdbcInterface jdbcInterface =  new MysqlJdbcImpl();
     jdbcInterface.getConnection();
     jdbcInterface.crud();
     jdbcInterface.close();

  }
}
```

### 连接数据库的第二种方式

```java
public class Mysql04 {
  public static void main(String[] args) throws SQLException, ClassNotFoundException, InstantiationException, IllegalAccessException {
    //1.注册驱动
    Class<?> aClass = Class.forName("com.mysql.cj.jdbc.Driver");
    Driver driver = (Driver) aClass.newInstance();

    String url = "jdbc:mysql://localhost:3306/java?useUnicode=true&characterEncoding=utf-8&useSSL=false&allowPublicKeyRetrieval=true";

    // 得到连接
    Properties properties = new Properties();
    properties.setProperty("user", "root");
    properties.setProperty("password", "701XTAY1993");

    Connection connect = driver.connect(url, properties);
    System.out.println(connect);
    // 执行sql

    String sql = "insert into users values('422','刘德华','40')";
    // 用于执行sql语句并执行生成
    Statement statement = connect.createStatement();
    int rows = statement.executeUpdate(sql);
    System.out.println(rows > 0 ? "成功" : "失败");


    // 关闭连接
    statement.close();
    connect.close();
  }
}
```

### 第三种连接数据库的方式

```java
public class Mysql05 {
  public static void main(String[] args) throws ClassNotFoundException, InstantiationException, IllegalAccessException, SQLException {
    //1.注册驱动
    Class<?> aClass = Class.forName("com.mysql.cj.jdbc.Driver");
    Driver driver = (Driver) aClass.newInstance();
    String url = "jdbc:mysql://localhost:3306/java?useUnicode=true&characterEncoding=utf-8&useSSL=false&allowPublicKeyRetrieval=true";
    String user = "root";
    String password = "701XTAY1993";
    // 得到连接
//    Properties properties = new Properties();
//    properties.setProperty("user", "root");
//    properties.setProperty("password", "701XTAY1993");

    DriverManager.registerDriver(driver);
    Connection connection = DriverManager.getConnection(url, user, password);
    System.out.println(connection);


  }
}
```

### 第四种方式连接

```java
public class Mysql06 {
  public static void main(String[] args) throws Exception {
    Class.forName("com.mysql.cj.jdbc.Driver");
    String url = "jdbc:mysql://localhost:3306/java?useUnicode=true&characterEncoding=utf-8&useSSL=false&allowPublicKeyRetrieval=true";
    String user = "root";
    String password = "701XTAY1993";

    Connection connection = DriverManager.getConnection(url, user, password);

    System.out.println("第四种方式连接" + connection);
  }
}

```

### 第五种方式连接数据库

```java
public class Mysql08 {
  public static void main(String[] args) throws IOException, SQLException, ClassNotFoundException {

    Properties properties = new Properties();
    properties.load(new FileInputStream("./mysql.properties"));

    String user = properties.getProperty("user");
    String url = properties.getProperty("url");
    String password = properties.getProperty("password");
    Class.forName(properties.getProperty("driver"));

    Connection connection = DriverManager.getConnection(url, user, password);
    System.out.println("第5种方式连接" + connection);
  }
}
```

### resultSet 获取查询数据

```java
public class Mysql08 {
  public static void main(String[] args) throws IOException, SQLException, ClassNotFoundException {

    Properties properties = new Properties();
    properties.load(new FileInputStream("./mysql.properties"));

    String user = properties.getProperty("user");
    String url = properties.getProperty("url");
    String password = properties.getProperty("password");
    Class.forName(properties.getProperty("driver"));

    Connection connection = DriverManager.getConnection(url, user, password);

    Statement statement = connection.createStatement();

    String sql = "select id,name,age from users";
    ResultSet resultSet = statement.executeQuery(sql);
    System.out.println(resultSet);
    while (resultSet.next()) {
      String id = resultSet.getString(1);
      String name = resultSet.getString("name");
      int age = resultSet.getInt("age");

      System.out.println(id + "\t" + name + "\t" + age);
    }

    // 关闭连接
    resultSet.close();
    statement.close();
    connection.close();
  }
}

```

### 预处理

```java
public class Mysql10 {
  public static void main(String[] args) throws IOException, ClassNotFoundException, SQLException {
    Properties properties = new Properties();
    properties.load(new FileInputStream("./mysql.properties"));
    String url = properties.getProperty("url");
    String user = properties.getProperty("user");
    String password = properties.getProperty("password");


    Class.forName(properties.getProperty("driver"));

    Connection connection = DriverManager.getConnection(url, user, password);
    String sql = "select id, name,age from users where name=? and age= ?";
    PreparedStatement preparedStatement = connection.prepareStatement(sql);
    preparedStatement.setString(1, "小明");
    preparedStatement.setInt(2, 12);

    ResultSet resultSet = preparedStatement.executeQuery();

    while (resultSet.next()) {
      String id = resultSet.getString(1);
      String name = resultSet.getString("name");
      int age = resultSet.getInt("age");
      System.out.println(id + "\t" + name + "\t" + age);
    }
    // 关闭连接
    resultSet.close();
    connection.close();
    preparedStatement.close();
  }
}

```

### mysql 的连接封装

```java
public class JDBCUtils {
  private static String user;
  private static String password;
  private static String url;
  private static String driver;

  static {
    Properties properties = new Properties();
    try {
      properties.load(new FileInputStream("./mysql.properties"));
      url = properties.getProperty("url");
      user = properties.getProperty("user");
      password = properties.getProperty("password");
      driver = properties.getProperty("driver");
    } catch (IOException e) {
      throw new RuntimeException(e);
    }
  }

  // 调用链接
  public static Connection getConnection() {
    try {
      return DriverManager.getConnection(url, user, password);
    } catch (SQLException e) {
      throw new RuntimeException(e);
    }
  }

  // 关闭连接
  public static void close(ResultSet resultSet, Statement statement, Connection connection) {
    try {
      if (resultSet != null) {
        resultSet.close();
      }
      if (statement != null) {
        statement.close();
      }
      if (connection != null) {
        statement.close();
      }
    } catch (SQLException e) {
      throw new RuntimeException(e);
    }
  }
}
```

### 封装方法操作

```java
public class Mysql12 {
  public static void main(String[] args) {

  }
  @Test
  public void testDML() {
    Connection connection = JDBCUtils.getConnection();
    PreparedStatement preparedStatement = null;
    String sql = "update users set name=? where id =?";

    try {
      preparedStatement = connection.prepareStatement(sql);
      preparedStatement.setString(1,"小明");
      preparedStatement.setInt(2,12314);

      preparedStatement.executeUpdate();

    } catch (SQLException e) {
      throw new RuntimeException(e);
    } finally {
      JDBCUtils.close(null,preparedStatement,connection);
    }
  }
}
```

### 事务

```java
public class Mysql14 {
  public static void main(String[] args) throws SQLException {
    Connection connection = null;
    PreparedStatement preparedStatement = null;
    String sql = "update users set balance = balance - 100 where id = 1";
    String sql2 = "update users set balance = balance + 100 where id = 2";

    try {
      connection = JDBCUtils.getConnection();
      connection.setAutoCommit(false);
      preparedStatement = connection.prepareStatement(sql);
      preparedStatement.executeUpdate();
      preparedStatement = connection.prepareStatement(sql2);
      preparedStatement.executeUpdate();
      connection.commit();
    } catch (SQLException e) {
      System.out.println("执行发生了异常");
      connection.rollback();
      throw new RuntimeException(e);
    } finally {
      JDBCUtils.close(null, preparedStatement, connection);
    }
  }
}
```

### 德鲁伊的封装

```java
public class JDBCUtilsByDruid {
  private static DataSource dataSource;

  static {
    Properties properties = new Properties();
    try {
      properties.load(new FileInputStream("./druid.properties"));
      dataSource = DruidDataSourceFactory.createDataSource(properties);
    } catch (Exception e) {
      throw new RuntimeException(e);
    }
  }

  // 获取连接
  public static Connection getConnection() {
    try {
      return dataSource.getConnection();
    } catch (Exception e) {
      throw new RuntimeException(e);
    }
  }

  // 关闭连接
  public static void close(ResultSet resultSet, Statement statement, Connection connection) {
    try {
      if (resultSet != null) {
        resultSet.close();
      }
      if (statement != null) {
        statement.close();
      }
      if (connection != null) {
        connection.close();
      }
    } catch (SQLException e) {
      throw new RuntimeException(e);
    }
  }
}

```

### 封装到集合中

```java
package com.xiaozhi.pkg.mysql;

import com.xiaozhi.pkg.utils.JDBCUtilsByDruid;
import org.junit.jupiter.api.Test;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;

public class Mysql18 {
  public static void main(String[] args) {

  }
  @Test
  public void testSelect1() {
    Connection connection = JDBCUtilsByDruid.getConnection();
    PreparedStatement preparedStatement = null;
    ResultSet resultSet = null;
    ArrayList<Users> list = new ArrayList<>();
    String sql = "select * from users";

    try {
      preparedStatement = connection.prepareStatement(sql);
      resultSet = preparedStatement.executeQuery();
      while (resultSet.next()) {
        int id = resultSet.getInt("id");
        int age = resultSet.getInt("age");
        String name = resultSet.getString("name");
        list.add(new Users(id,name,age));
      }
      System.out.println(list);
    } catch (Exception e) {
      throw new RuntimeException(e);
    }

  }
}

```

### QueryRunner 包的使用

```java
public class Mysql19 {
  public static void main(String[] args) {
    Connection connection = JDBCUtilsByDruid.getConnection();
    PreparedStatement preparedStatement = null;
    ResultSet resultSet = null;
    ArrayList<Users> list = new ArrayList<>();
    String sql = "select * from users";

    try {
      preparedStatement = connection.prepareStatement(sql);
      resultSet = preparedStatement.executeQuery();
      while (resultSet.next()) {
        int id = resultSet.getInt("id");
        int age = resultSet.getInt("age");
        String name = resultSet.getString("name");
        list.add(new Users(id,name,age));
      }
      System.out.println(list);
    } catch (Exception e) {
      throw new RuntimeException(e);
    }
  }
  @Test
  public void testQueryMany() {
    // 得到连接
    Connection connection = JDBCUtilsByDruid.getConnection();
    //使用DBUtils
    QueryRunner queryRunner = new QueryRunner();
    //执行查询
    String sql = "select * from users";
    try {
      List<Users> list = queryRunner.query(connection, sql, new BeanListHandler<>(Users.class));
      for (Users user:list) {
        System.out.println(user);
      }
      JDBCUtilsByDruid.close(null,null,connection);
    } catch (SQLException e) {
      throw new RuntimeException(e);
    }

  }
}
```

### 查询单条数据

```java

package com.xiaozhi.pkg.mysql;

import com.xiaozhi.pkg.use.Use;
import com.xiaozhi.pkg.utils.JDBCUtilsByDruid;
import org.apache.commons.dbutils.QueryRunner;
import org.apache.commons.dbutils.handlers.BeanHandler;
import org.apache.commons.dbutils.handlers.BeanListHandler;
import org.apache.commons.dbutils.handlers.ScalarHandler;
import org.junit.jupiter.api.Test;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class Mysql19 {
  public static void main(String[] args) {
    Connection connection = JDBCUtilsByDruid.getConnection();
    PreparedStatement preparedStatement = null;
    ResultSet resultSet = null;
    ArrayList<Users> list = new ArrayList<>();
    String sql = "select * from users";

    try {
      preparedStatement = connection.prepareStatement(sql);
      resultSet = preparedStatement.executeQuery();
      while (resultSet.next()) {
        int id = resultSet.getInt("id");
        int age = resultSet.getInt("age");
        String name = resultSet.getString("name");
        list.add(new Users(id,name,age));
      }
      System.out.println(list);
    } catch (Exception e) {
      throw new RuntimeException(e);
    }
  }
  @Test
  public void testQueryMany() {
    // 得到连接
    Connection connection = JDBCUtilsByDruid.getConnection();
    //使用DBUtils
    QueryRunner queryRunner = new QueryRunner();
    //执行查询
    String sql = "select * from users";
    try {
      List<Users> list = queryRunner.query(connection, sql, new BeanListHandler<>(Users.class));
      for (Users user:list) {
        System.out.println(user);
      }
      JDBCUtilsByDruid.close(null,null,connection);
    } catch (SQLException e) {
      throw new RuntimeException(e);
    }
  }
  @Test
  public void testQuerySingle() {
    // 得到连接
    Connection connection = JDBCUtilsByDruid.getConnection();
    //使用DBUtils
    QueryRunner queryRunner = new QueryRunner();
    //执行查询
    String sql = "select * from users where id =?";
    try {
      Users users = queryRunner.query(connection, sql, new BeanHandler<>(Users.class),1);
      System.out.println(users);
      JDBCUtilsByDruid.close(null,null,connection);
    } catch (SQLException e) {
      throw new RuntimeException(e);
    }
  }
  // 返回单行单列
  @Test
  public void testScalar() {
    Connection connection = JDBCUtilsByDruid.getConnection();
    QueryRunner queryRunner = new QueryRunner();
    String sql = "select name from users where id =?";
    try{
      Object obj = queryRunner.query(connection,sql,new ScalarHandler<>(),1);
      System.out.println(obj);
      JDBCUtilsByDruid.close(null,null,connection);
    } catch (Exception e) {
      throw  new RuntimeException(e);
    }
  }

  @Test
  public void testDML() throws SQLException {
    Connection connection = JDBCUtilsByDruid.getConnection();
    QueryRunner queryRunner = new QueryRunner();

//    String sql = "update users set name = ? where id=?";

    String sql ="insert into users values(null,?,?)";

    int affectedRow = queryRunner.update(connection,sql,"张三峰",22);
    System.out.println(affectedRow);
    JDBCUtilsByDruid.close(null,null,connection);
  }
}


```

## 异常模块

### 空指钟异常

```java
public class Error {
  public static void main(String[] args) {
    String name = null;
    System.out.println(name.length());
  }
}
```

### 数组下标越界

```java
public class Error01 {
  public static void main(String[] args) {
    int[] arr  = {1,2,3};
    for(int i=0;i <= arr.length;i++) {
      System.out.println(arr[i]);
    }
  }
}
```

### 类型转换异常

```java
public class Error02 {
  public static void main(String[] args) {
    A b = new B();
    B b2 = (B) b;
    C c1 = (C) b;
    System.out.println(c1);
  }
}

class A {
}

class B extends A {
}

class C extends A {
}
```

### 数字转换异常

```java
public class Error03 {
  public static void main(String[] args) {
    String name = "hello";
    int num = Integer.parseInt(name);
    System.out.println(name);
  }
}

```

## 数据结构与算法

### 栈

```java
import java.util.Scanner;

public class Stack {
  public static void main(String[] args) {
    ArrayStack stack = new ArrayStack(4);
    String key = "";
    boolean loop = true;
    Scanner scanner = new Scanner(System.in);

    while (loop) {
      System.out.println("show:表示显示栈");
      System.out.println("exit:退出程序");
      System.out.println("push:添加数据");
      System.out.println("pop:获取数据");
      System.out.println("请输入您的选择");
      key = scanner.next();
      switch (key) {
        case "show":
          stack.list();
          break;
        case "push":
          System.out.println("请输入一个数");
          int value = scanner.nextInt();
          stack.push(value);
          break;
        case "pop":
          int res = stack.pop();
          System.out.println(res);
          break;
        case "exit":
          scanner.close();
          loop = false;
          break;
        default:
          break;
      }
    }

  }
}

class ArrayStack {
  private int maxSize; //栈的大小
  private int[] stack;
  private int top = -1;

  public ArrayStack(int maxSize) {
    this.maxSize = maxSize;
    stack = new int[maxSize];
  }

  // 栈满
  public boolean isFull() {
    return top == maxSize - 1;
  }

  // 栈空
  public boolean isEmpty() {
    return top == -1;
  }

  // 入栈
  public void push(int value) {
    if (isFull()) {
      throw new RuntimeException("栈满");
    }
    top++;
    stack[top] = value;
  }

  // 出栈
  public int pop() {
    if (isEmpty()) {
      throw new RuntimeException("栈空");
    }
    int value = stack[top];
    this.top--;
    return value;
  }

  // 显示栈
  public void list() {
    if (isEmpty()) {
      throw new RuntimeException("栈空");
    }
    for (int i = top; i > 0; i--) {
      System.out.printf("stack[%d]=%d", i, stack[i]);
      System.out.println();
    }
  }
}

```

### 逆波兰计算器

```java
package com.xiaozhi.algorithm.stack;

import java.util.ArrayList;
import java.util.List;
import java.util.Stack;

public class Stack01 {
  public static void main(String[] args) {
    String suffixExpression = "3 4 + 5 * 6 - ";
    List<String> list = getListString(suffixExpression);
    int result = calculate(list);
    System.out.println(result);
  }

  public static List<String> getListString(String suffixExpression) {
    // suffixExpression分割
    String[] split = suffixExpression.split(" ");
    List<String> list = new ArrayList<>();
    for (String item : split) {
      list.add(item);
    }
    return list;
  }

  public static int calculate(List<String> list) {
    Stack<String> stack = new Stack<>();
    for (String item : list) {
      if (item.matches("\\d+")) {
        // 匹配多位数
        stack.push(item);
      } else {
        //pop出两个数并运算
        int num2 = Integer.parseInt(stack.pop());
        int num1 = Integer.parseInt(stack.pop());
        int result = 0;
        if (item.equals("+")) {
          result = num1 + num2;
        } else if (item.equals("-")) {
          result = num1 - num2;
        } else if (item.equals("*")) {
          result = num1 * num2;
        } else if (item.equals("/")) {
          result = num1 / num2;
        } else {
          throw new RuntimeException("运算符不合法");
        }
        stack.push("" + result);
      }
    }
    return Integer.parseInt(stack.pop());
  }
}

```

### 泡冒排序

```java
public class BubbleSort {
  public static void main(String[] args) {
    int arr[] = {3, 9, -1, 10, -2};

    int temp = 0;
    for(int i=0;i < arr.length - 1;i++) {
      for (int j = 0; j < arr.length - 1 - i; j++) {
        if (arr[j] > arr[j + 1]) {
          temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
        }
      }
    }
    System.out.println(Arrays.toString(arr));
  }
}
```

### 冒泡排序优化

```java
public class BubbleSortOptimize {
  public static void main(String[] args) {
    int arr[] = {3, 9, -1, 10, 20};

    int temp = 0;
    boolean flag = true;
    for (int i = 0; i < arr.length - 1; i++) {
      for (int j = 0; j < arr.length - 1 - i; j++) {
        if (arr[j] > arr[j + 1]) {
          temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
        }
      }
      System.out.println("第" + (i + 1) + "趟排序后的数组");
      System.out.println(Arrays.toString(arr));
      if (!flag) {
        break;
      }
      flag = false;
    }
  }
}
```

### 线性查找

```java
public class Search {
  public static void main(String[] args) {
    int arr[] = {1, 9, 11, -1, 34, 89};
    int value = seqSearch(arr, 34);
    System.out.println(value);
  }

  public static int seqSearch(int[] arr, int value) {
    for (int i = 0; i < arr.length; i++) {
      if (arr[i] == value) {
        return i;
      }
    }
    return -1;
  }
}

```

### 二分查找

```java
public class BinarySearch {
  public static void main(String[] args) {
    int arr[] = {1,8,10,89,1000,1234};
    int value = binarySearch(arr,0,arr.length-1,10);
    System.out.println(value);
  }

  public static int binarySearch(int[] arr, int left, int right, int value) {
    int mid = (left + right) / 2;
    int midValue = arr[mid];
    if (value > midValue) {
      return binarySearch(arr, mid + 1, right, value);
    } else if (value < midValue) {
      return binarySearch(arr, left, mid - 1, value);
    } else {
      return mid;
    }
  }
}

```

### 二分查找返回多个值

```java
public class BinarySearch01 {
  public static void main(String[] args) {
    int arr[] = {1, 8, 10, 89, 89, 89, 1000, 1234};
    List<Integer> list = binarySearch(arr, 0, arr.length, 89);
    System.out.println(list);
  }

  public static ArrayList<Integer> binarySearch(int[] arr, int left, int right, int value) {

    if (left > right) {
      return new ArrayList<Integer>();
    }
    int mid = (left + right) / 2;
    int midVal = arr[mid];

    if (value > midVal) {
      return binarySearch(arr, mid + 1, right, value);
    } else if (value > midVal) {
      return binarySearch(arr, left, mid - 1, value);
    } else {
      List<Integer> list = new ArrayList<>();
      int temp = mid - 1;
      while (true) {
        if (temp < 0 || arr[temp] != value) {
          break;
        }
        list.add(temp);
        temp -= 1;
      }
      list.add(mid);
      temp = mid + 1;
      while (true) {
        if (temp > arr.length - 1 || arr[temp] != value) {
          break;
        }
        list.add(temp);
        temp += 1;
      }
      return (ArrayList<Integer>) list;
    }

  }
}
```

### 插值查找

```java
public class Interpolation {
  public static void main(String[] args) {
    int[] arr = new int[100];
    for (int i = 0; i < 100; i++) {
      arr[i] = i + 1;
    }
    int index = interpolation(arr, 0, arr.length - 1, 22);
    System.out.println(index);
  }

  public static int interpolation(int[] arr, int left, int right, int findValue) {
    if (left > right || findValue < arr[0] || findValue > arr[arr.length - 1]) {
      return -1;
    }
    int mid = left + (right - left) * (findValue - arr[left]) / (arr[right] - arr[left]);
    int midVal = arr[mid];
    if (findValue > midVal) {
      return interpolation(arr, mid + 1, right, findValue);
    } else if (findValue < midVal) {
      return interpolation(arr, left, mid - 1, findValue);
    } else {
      return mid;
    }

  }
}
```

### hashTable

```java
public class Hash01 {
  public static void main(String[] args) {
    HashTable hashTable = new HashTable(7);

    // 一个简单的菜单
    String key = "";
    Scanner scanner = new Scanner(System.in);
    while (true) {
      System.out.println("add:添加员工");
      System.out.println("list:显示员工");
      System.out.println("find:查找员工");
      System.out.println("exit:退出系统");
      key = scanner.next();

      switch (key) {
        case "add":
          System.out.println("输入id");
          int id = scanner.nextInt();
          System.out.println("输入名字");
          String name = scanner.next();
          // 创建员工
          Employee employee = new Employee(id, name);
          hashTable.add(employee);
          break;
        case "list":
          hashTable.list();
          break;
        case "find":
          System.out.println("输入id");
          id = scanner.nextInt();
          hashTable.findEmployee(id);
          break;
        case "exit":
          scanner.close();
          System.exit(0);
        default:
          break;
      }
    }

  }
}

class HashTable {
  private int size;
  private EmployeeLinkList[] employeeLinkList;

  public HashTable(int size) {
    this.size = size;
    employeeLinkList = new EmployeeLinkList[size];
    for (int i = 0; i < size; i++) {
      employeeLinkList[i] = new EmployeeLinkList();
    }
  }

  // 添加员工
  public void add(Employee employee) {
    int employeeNo = hashFunc(employee.id);
    employeeLinkList[employeeNo].add(employee);
  }

  // 遍历所有的链表
  public void list() {
    for (int i = 0; i < size; i++) {
      employeeLinkList[i].list();
    }
  }

  // 根据id查找员工
  public void findEmployee(int id) {
    int employeeNo = hashFunc(id);
    Employee employee = employeeLinkList[employeeNo].findEmployee(id);
    if (employee == null) {
      System.out.println("没有找到员工");
      return;
    }
    System.out.printf("找到员工信息id=%d name=%s", employee.id, employee.name);
  }


  // 散列函数
  public int hashFunc(int id) {
    return id % size;
  }
}


class Employee {
  public int id;
  public String name;
  public Employee next;

  public Employee(int id, String name) {
    super();
    this.id = id;
    this.name = name;

  }

}

class EmployeeLinkList {
  private Employee head;

  public void add(Employee employee) {
    // 如果添加的是第一个
    if (head == null) {
      head = employee;
      return;
    }

    Employee temp = head;
    while (true) {
      if (temp.next == null) {
        break;
      }
      temp = temp.next;
    }
    // 退出时加入链表
    temp.next = employee;
  }

  // 遍历链表信息
  public void list() {
    if (head == null) {
      System.out.println("当前链表为空");
      return;
    }
    Employee temp = head;
    while (true) {
      System.out.printf("=> id=%d name=%s\t", temp.id, temp.name);
      if (temp.next == null) {
        break;

      }
      temp = temp.next;
    }
    System.out.println();
  }

  public Employee findEmployee(int id) {
    if (head == null) {
      System.out.println("链表为空");
      return null;
    }
    Employee temp = head;
    while (true) {
      if (temp.id == id) {
        break;
      }
      if (temp.next == null) {
        temp = null;
        break;
      }
      temp = temp.next;
    }
    return temp;
  }
}
```

### 二叉树遍历

```java
public class Tree01 {
  public static void main(String[] args) {

    BinaryTree binaryTree = new BinaryTree();
    HeroNode root = new HeroNode(1, "宋江");
    HeroNode node2 = new HeroNode(2, "吴用");
    HeroNode node3 = new HeroNode(3, "卢俊义");
    HeroNode node4 = new HeroNode(4, "林冲");
    HeroNode node5 = new HeroNode(5, "关胜");
    binaryTree.setRoot(root);
    root.setLeft(node2);
    root.setRight(node3);
    node3.setRight(node4);
    node3.setLeft(node5);

    HeroNode result = null;

    System.out.println("=======前序遍历=====");
    binaryTree.preOrder();
    System.out.println("=======中序遍历====");
    binaryTree.infixOrder();
    System.out.println("=======后序遍历====");
    binaryTree.postOrder();


    System.out.println("===================");
    System.out.println("=======前序查找=====");
    result = binaryTree.preOrderSearch(5);
    if (result != null) {
      System.out.printf("找到信息id=%d,name=%s\n", result.getNo(), result.getName());
    }
    System.out.println("=======中序查找====");
    result = binaryTree.infixOrderSearch(5);
    if (result != null) {
      System.out.printf("找到信息id=%d,name=%s\n", result.getNo(), result.getName());
    }
    System.out.println("=======后序查找====");
    result = binaryTree.preOrderSearch(5);
    if (result != null) {
      System.out.printf("找到信息id=%d,name=%s\n", result.getNo(), result.getName());
    }
  }
}

class BinaryTree {
  private HeroNode root;

  public void setRoot(HeroNode root) {
    this.root = root;
  }

  public void preOrder() {
    if (this.root == null) {
      System.out.println("二叉树为空不能遍历");
      return;
    }
    this.root.preOrder();
  }

  // 中序遍历
  public void infixOrder() {
    if (this.root == null) {
      System.out.println("二叉树为空不能遍历");
      return;
    }
    this.root.infixOrder();
  }

  // 后序遍历
  public void postOrder() {
    if (this.root == null) {
      System.out.println("二叉树为空不能遍历");
      return;
    }
    this.root.postOrder();
  }

  // 前序遍历
  public HeroNode preOrderSearch(int no) {
    if (this.root == null) {
      System.out.println("二叉树为空不能遍历");
      return null;
    }
    return this.root.preOrderSearch(no);
  }

  // 中序遍历
  public HeroNode infixOrderSearch(int no) {
    if (this.root == null) {
      System.out.println("二叉树为空不能遍历");
      return null;
    }

    return this.root.infixOrderSearch(no);
  }

  // 后序遍历
  public HeroNode postOrderSearch(int no) {
    if (this.root == null) {
      System.out.println("二叉树为空不能遍历");
      return null;
    }
    return this.root.postOrderSearch(no);
  }


}

class HeroNode {
  private int no;
  private String name;
  private HeroNode left;
  private HeroNode right;

  public HeroNode(int no, String name) {
    super();
    this.no = no;
    this.name = name;
  }

  public void setNo(int no) {
    this.no = no;
  }

  public int getNo() {
    return no;
  }

  public void setRight(HeroNode right) {
    this.right = right;
  }

  public HeroNode getRight() {
    return right;
  }

  public void setLeft(HeroNode left) {
    this.left = left;
  }

  public HeroNode getLeft() {
    return left;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getName() {
    return name;
  }

  @Override
  public String toString() {
    return "HeroNode[" + "no=" + no + ", name='" + name + '\'' + ']';
  }

  //编写前序遍历
  public void preOrder() {
    System.out.println(this);
    // 递归向左子树前序遍历
    if (this.left != null) {
      this.left.preOrder();
    }

    if (this.right != null) {
      this.right.preOrder();
    }
  }

  //中序遍历
  public void infixOrder() {
    if (this.left != null) {
      this.left.infixOrder();
    }
    System.out.println(this);
    if (this.right != null) {
      this.right.infixOrder();
    }
  }

  //后序遍历
  public void postOrder() {
    if (this.left != null) {
      this.left.postOrder();
    }
    if (this.right != null) {
      this.right.postOrder();
    }
    System.out.println(this);
  }

  // 前序查找
  public HeroNode preOrderSearch(int no) {
    if (this.no == no) {
      return this;
    }
    HeroNode resultNode = null;
    if (this.left != null) {
      resultNode = this.left.preOrderSearch(no);
    }
    if (resultNode != null) {
      return resultNode;
    }
    if (this.right != null) {
      resultNode = this.right.preOrderSearch(no);
    }
    return resultNode;
  }

  // 中序遍历查找
  public HeroNode infixOrderSearch(int no) {
    HeroNode resultNode = null;
    if (this.left != null) {
      resultNode = this.left.infixOrderSearch(no);
    }
    if (resultNode != null) {
      return resultNode;
    }
    if (this.no == no) {
      return this;
    }
    // 否则向左进行中间查找
    if (this.right != null) {
      resultNode = this.right.infixOrderSearch(no);
    }
    return resultNode;
  }

  // 后序遍历查找
  public HeroNode postOrderSearch(int no) {
    HeroNode resultNode = null;
    if (this.left != null) {
      resultNode = this.left.postOrderSearch(no);
    }
    if (resultNode != null) {
      return resultNode;
    }
    if (this.right != null) {
      resultNode = this.right.postOrderSearch(no);
    }

    if (this.no == no) {
      return this;
    }
    return resultNode;
  }

}

```

### 数组转树

```java
public class TreeToArray {
  public static void main(String[] args) {
    int[] arr = {1, 2, 3, 4, 5, 6, 7};
    ArrayBinaryTree tree = new ArrayBinaryTree(arr);
    tree.preOrder(0);

  }
}

class ArrayBinaryTree {
  private int[] arr;

  public ArrayBinaryTree(int[] arr) {
    this.arr = arr;
  }

  // 编写一个方法完成存储二叉树
  public void preOrder(int index) {
    if (arr == null || arr.length == 0) {
      System.out.println("数组为空不能遍历");
      return;
    }
    System.out.println(arr[index]);
    // 向左递归遍历
    if ((index * 2 + 1) < arr.length) {
      preOrder(2 * index + 1);
    }
    // 向左递归遍历
    if ((index * 2 + 2) < arr.length) {
      preOrder(2 * index + 2);
    }
  }
}

```

### 堆排序

```java
public class TreeSort {
  public static void main(String[] args) {
    int arr[] = {4, 6, 8, 5, 9};
    heapSort(arr);
  }

  //堆排序方法
  public static void heapSort(int arr[]) {
    int temp = 0;
    // 调整为大顶堆
    for (int i = arr.length / 2 - 1; i >= 0; i--) {
      adjustHeap(arr, i, arr.length);
    }
    // 调换数据
    for(int j=arr.length - 1;j > 0;j--) {
      temp = arr[j];
      arr[j] = arr[0];
      arr[0] = temp;
      adjustHeap(arr,0,j);
    }
    System.out.println("调整后的数据" + Arrays.toString(arr));
  }

  // 将一个数组调整成一个大顶堆
  public static void adjustHeap(int arr[], int i, int length) {
    int temp = arr[i];
    for (int k = i * 2 + 1; k < length; k = k * 2 + 1) {
      if (k + 1 < length && arr[k] < arr[k + 1]) {
        k++; // k指向右子节点
      }
      if (arr[k] > temp) {
        // 如果子节点大于父节点
        // 把较大的值赋给当前节点
        arr[i] = arr[k];
        i = k; // 指向k继续循环比较
      } else {
        break;
      }
    }
    // 当for循环完后，已经装i为父结点的最大值放在最顶(局部)
    arr[i] = temp;
  }
}

```

### 赫夫曼树

```java
public class HuffmanTree {
  public static void main(String[] args) {
    int arr[] = {13, 7, 8, 3, 29, 6, 1};
    Node node = createHuffmanTree(arr);
    preOrder(node);
  }

  public static void preOrder(Node root) {
    if (root == null) {
      System.out.println("该树为空不能遍历~~~");
      return;
    }
    root.preOrder();
  }

  public static Node createHuffmanTree(int[] arr) {
    //将node放入集合中
    List<Node> nodes = new ArrayList<>();
    for (int value : arr) {
      nodes.add(new Node(value));
    }

    while (nodes.size() > 1) {

      Collections.sort(nodes);
      // 取出根节点权值最小的两颗二叉树
      //(1) 取出权值最小的节点
      Node left = nodes.get(0);
      //(2) 取出权值第二小的的节点
      Node right = nodes.get(1);

      //(3)构建成一颗新的二叉树
      Node parent = new Node(left.value + right.value);
      parent.left = left;
      parent.right = right;

      //(4)从ArrayList删除处理过的二叉树
      nodes.remove(left);
      nodes.remove(right);

      //(5)将parent加入到nodes
      nodes.add(parent);
    }
    // 返回赫夫曼树的节点
    return nodes.get(0);
  }
}

class Node implements Comparable<Node> {
  int value; // 节点的权值
  Node left; // 指缶左子节点
  Node right;// 指向右子节点

  public Node(int value) {
    this.value = value;
  }

  //前序遍历
  public void preOrder() {
    System.out.println(this);
    if (this.left != null) {
      this.left.preOrder();
    }
    if (this.right != null) {
      this.right.preOrder();
    }
  }

  @Override
  public String toString() {
    return "Node[" + "value=" + value + ']';
  }

  @Override
  public int compareTo(Node o) {
    return this.value - o.value;
  }
}
```

### 赫夫慢树

```java
package com.xiaozhi.algorithm.huffman;

import java.util.*;

public class HuffmanCode {
  public static void main(String[] args) {
    String content = "i like like like java do you like a java";
    byte[] bytes = content.getBytes();

    List<Node> nodes = getNodes(bytes);
    Node huffmanTree = createHuffmanTree(nodes);
    preOrder(huffmanTree);
//    System.out.println("huffmanTree" + huffmanTree);

  }

  public static List<Node> getNodes(byte[] bytes) {
    //创建一个ArrayList
    ArrayList nodes = new ArrayList();
    //遍历bytes 统计每一个byte出现的次数
    Map<Byte, Integer> map = new HashMap<>();
    for (byte b : bytes) {
      Integer count = map.get(b);
      if (count == null) {
        map.put(b, 1);
      } else {
        map.put(b, count + 1);
      }
    }
    // 把每个键值转成一个Node对像并加入到node集合
    // 遍历map
    for (Map.Entry<Byte, Integer> entry : map.entrySet()) {
      nodes.add(new Node(entry.getKey(), entry.getValue()));
    }
    return nodes;
  }

  // 前序遍历
  public static void preOrder(Node root) {
    if(root == null) {
      System.out.println("树不能为空");
      return;
    }
    root.perOrder();
  }

  // 通过List创建赫夫曼树
  public static Node createHuffmanTree(List<Node> nodes) {
    while (nodes.size() > 1) {
      //从小到大排序
      Collections.sort(nodes);
      // 取出第一颗最小的二叉树
      Node leftNode = nodes.get(0);
      // 取出第二棵最小二叉树
      Node rightNode = nodes.get(1);

      Node parent = new Node(null, leftNode.weight + rightNode.weight);
      parent.left = leftNode;
      parent.right = rightNode;

      // 将已处理的两棵二叉树node移除
      nodes.remove(leftNode);
      nodes.remove(rightNode);

      nodes.add(parent);

    }
    return nodes.get(0);
  }

}

class Node implements Comparable<Node> {
  Byte data; // 存放数据本身
  int weight; // 权值
  Node left;
  Node right;

  public Node(Byte data, int weight) {
    this.data = data;
    this.weight = weight;
  }

  @Override
  public int compareTo(Node o) {
    //从小到大排序
    return this.weight - o.weight;
  }

  @Override
  public String toString() {
    return "Node[" + "data=" + data + ", weight=" + weight + ']';
  }

  // 前序遍历
  public void perOrder() {
    System.out.println(this);
    if (this.left != null) {
      this.left.perOrder();
    }
    if (this.right != null) {
      this.right.perOrder();
    }
  }
}

```

### 二叉排序数

```java
package com.xiaozhi.algorithm.binarysort;

public class BinarySort {
  public static void main(String[] args) {
      int[] arr = {7,3,10,12,5,1,9};
    BinarySortTree binarySortTree = new BinarySortTree();

    for(int i=0;i < arr.length;i++) {

      binarySortTree.add(new Node(arr[i]));
    }

    binarySortTree.infixOrder();

  }
}

// 创建二叉排序树
class BinarySortTree {
  private Node root;

  public void add(Node node) {
    if (root == null) {
      this.root = node;
    } else {
      this.root.add(node);
    }
  }

  // 中序遍历
  public void infixOrder() {
    if (root == null) {
      System.out.println("二叉排序树为空");
      return;
    }
    root.infixOrder();
  }

}

// 创建node节点
class Node {
  int value;
  Node left;
  Node right;

  public Node(int value) {
    this.value = value;
  }

  // 添加节点的方法
  public void add(Node node) {
    if (node == null) {
      System.out.println("树为空");
      return;
    }
    if (node.value < this.value) {
      if (this.left == null) {
        this.left = node;
      } else {
        this.left.add(node);
      }
    } else {
      if (this.right == null) {
        this.right = node;
      } else {
        this.right.add(node);
      }
    }
  }

  // 中序遍历二叉树
  public void infixOrder() {
    if (this.left != null) {
      this.left.infixOrder();
    }
    System.out.println(this);
    if (this.right != null) {
      this.right.infixOrder();
    }
  }

  @Override
  public String toString() {
    return "Node[" + "value=" + value + ']';
  }
}

```

### 平衡二叉树

```java
package com.xiaozhi.algorithm.balancetree;

public class BalanceTree {
  public static void main(String[] args) {
//    int[] arr = {4, 3, 6, 5, 7, 8};
    int[] arr = {10, 12, 8, 9, 7, 6};

    BalanceTreeNode tree = new BalanceTreeNode();
    for (int i = 0; i < arr.length; i++) {
      tree.add(new Node(arr[i]));
    }

    tree.infixOrder();

    System.out.println("当前树的高度" + tree.getRoot().height());
    System.out.println("当前左子树的高度" + tree.getRoot().leftHeight());
    System.out.println("当前右子树的高度" + tree.getRoot().rightHeight());

  }
}

class BalanceTreeNode {
  private Node root;

  public Node getRoot() {
    return this.root;
  }

  public void add(Node node) {
    if (root == null) {
      this.root = node;
    } else {
      this.root.add(node);
    }
  }

  // 中序遍历
  public void infixOrder() {
    if (root == null) {
      System.out.println("二叉排序树为空");
      return;
    }
    root.infixOrder();
  }
}


// 创建node节点
class Node {
  int value;
  Node left;
  Node right;

  public Node(int value) {
    this.value = value;
  }

  public void add(Node node) {
    if (node == null) {
      System.out.println("树为空");
      return;
    }
    if (node.value < this.value) {
      if (this.left == null) {
        this.left = node;
      } else {
        this.left.add(node);
      }
    } else {
      if (this.right == null) {
        this.right = node;
      } else {
        this.right.add(node);
      }
    }
    // 当添加一个节点后如果右子树的高度-左子树的高度大于1左旋转
    if (rightHeight() - leftHeight() > 1) {

      leftRotate();

    }else if(leftHeight() - rightHeight() > 1) {
      rightRotate();
    }
  }

  // 返回当前节点的高度
  public int height() {
    return Math.max(left == null ? 0 : left.height(), right == null ? 0 : right.height()) + 1;
  }

  // 返回左子树的高度
  public int leftHeight() {
    if (left == null) {
      return 0;
    }
    return left.height();
  }

  // 返回右子树高度
  public int rightHeight() {
    if (right == null) {
      return 0;
    }
    return right.height();
  }

  // 左旋转方法
  public void leftRotate() {
    // 创建新的结点，已当前结节的值
    Node newNode = new Node(value);
    // 把新结点的左子树设置成当前结点左子树
    newNode.left = left;
    //把新的节点的右子树设置成根节点的左子树的右子树
    newNode.right = right.left;
    // 把当前节点的值替换成右子结点
    value = right.value;
    //把当前节点的右子树设置成当前节点的左子树的右子树
    right = right.right;
    //把当前节点的左子树设置成新节点
    left = newNode;

  }

  // 右旋转
  public void rightRotate() {
    Node newNode = new Node(value);
    newNode.right = right;
    newNode.left = left.right;
    value = left.value;
    left = left.left;
    right = newNode;
  }


  // 中序遍历二叉树
  public void infixOrder() {
    if (this.left != null) {
      this.left.infixOrder();
    }
    System.out.println(this);
    if (this.right != null) {
      this.right.infixOrder();
    }
  }

  @Override
  public String toString() {
    return "Node[" + "value=" + value + ']';
  }
}

```

### 分治算法

```java
public class Divide {
  public static void main(String[] args) {
    tower(64,'A','B','C');
  }

  public static void tower(int num, char a, char b, char c) {
    if (num == 1) {
      System.out.println("第1个盘从" + a + "->" + c);
    } else {
      tower(num - 1, a, c, b);
      System.out.println("第" + num + "个盘从" + a + "->" + c);
      tower(num - 1, b, a, c);
    }
  }
}

```

### 设计模式

```java
public class Single {
  public static void main(String[] args) {
    Vehicle vehicle = new Vehicle();
    vehicle.run("汽转");
  }
}


class Vehicle {
  public void run(String vehicle) {
    System.out.println(vehicle + "交通工具在跑");
  }
}

```

### 单例设计模式

```java
public class Single01 {
  public static void main(String[] args) {

    SingleTon singleTon = SingleTon.getInstance();
    SingleTon singleTon1 = SingleTon.getInstance();

    System.out.println(singleTon1 == singleTon);
  }
}

class SingleTon{
  private SingleTon() {

  }
  private final static SingleTon instance = new SingleTon();

  public static SingleTon getInstance() {
    return instance;
  }
}

```

### 单例设计模式

```java
public class Single02 {
  public static void main(String[] args) {
    SingleTon02 singleTon02 = SingleTon02.getInstance();
    SingleTon02 singleTon03 = SingleTon02.getInstance();

    System.out.println(singleTon02 == singleTon03);
  }
}

class SingleTon02 {
  private SingleTon02() {
  }

  private static SingleTon02 instance;

  static {
    instance = new SingleTon02();
  }

  public static SingleTon02 getInstance() {
    return instance;
  }
}

```

### 懒汉式单例模式

```java
public class Single03 {
  public static void main(String[] args) {
      SingleTon03 singleTon03 = SingleTon03.getInstance();
      SingleTon03 singleTon04 = SingleTon03.getInstance();
      System.out.println(singleTon04 == singleTon03);
  }
}

class SingleTon03{
  private static SingleTon03 instance;

  private SingleTon03() {

  }

  public static SingleTon03 getInstance() {
    if(instance == null) {
      instance = new SingleTon03();
    }
    return instance;
  }
}

```

### 懒汉式单例模式（线程安全）

```java
public class Single04 {
  public static void main(String[] args) {
    SingleTon04 singleTon04 = SingleTon04.getInstance();
    SingleTon04 singleTon05 = SingleTon04.getInstance();
    System.out.println(singleTon04 == singleTon05);
  }
}

class SingleTon04 {

  private static SingleTon04 instance;

  private SingleTon04() {

  }

  public static synchronized SingleTon04 getInstance() {
    if(instance == null) {
      instance = new SingleTon04();
    }
    return instance;
  }
}

```

### 单例线程安全

```java
public class Single05 {
  public static void main(String[] args) {
    SingleTon05 instance = SingleTon05.getInstance();
    SingleTon05 instance1 = SingleTon05.getInstance();
    System.out.println(instance == instance1);


  }
}

class SingleTon05 {
  private static volatile SingleTon05 instance;

  private SingleTon05() {

  }

  public static synchronized SingleTon05 getInstance() {
    if (instance == null) {
      synchronized (SingleTon05.class) {
        if (instance == null) {
          instance = new SingleTon05();
        }
      }
    }
    return instance;
  }
}
```

### 静态内部内实现单例模式

```java
public class Single06 {
  public static void main(String[] args) {
    SingleTon06 singleTon06 = SingleTon06.getInstance();
    SingleTon06 singleTon07 = SingleTon06.getInstance();
    System.out.println(singleTon07 == singleTon06);
  }
}


class SingleTon06 {
  private static volatile SingleTon06 instance;

  private SingleTon06() {
  }

  private static class SingleTon06Instance {
    private static final SingleTon06 INSTANCE = new SingleTon06();
  }

  public static synchronized SingleTon06 getInstance() {
    return SingleTon06Instance.INSTANCE;
  }
}
```

### 枚养实现

```java
public class Single07 {
  public static void main(String[] args) {
    SingleTon07 instance = SingleTon07.INSTNCE;
    SingleTon07 instance1 = SingleTon07.INSTNCE;

    instance1.sayOk();

    System.out.println(instance == instance1);
  }
}

enum SingleTon07 {
  INSTNCE;
  public void sayOk() {
    System.out.println("ok");
  }
}

```

### 原型模式

```java
package com.xiaozhi.desigin.prototype;

public class Sheep implements Cloneable {

  private String name;
  private int age;
  private String color;

  public Sheep(String name, int age, String color) {
    super();
    this.name = name;
    this.age = age;
    this.color = color;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public int getAge() {
    return age;
  }

  public void setAge(int age) {
    this.age = age;
  }

  public void setColor(String color) {
    this.color = color;
  }

  public String getColor() {
    return color;
  }

  //克隆该实现，使用默认的clone方法来成
  @Override
  protected Object clone() {
    try {
      Sheep sheep = null;
      sheep = (Sheep) super.clone();
      return sheep;
    } catch (Exception e) {
      throw new RuntimeException(e);
    }
  }

  @Override
  public String toString() {
    return "Sheep{" + "name='" + name + '\'' + ", age=" + age + ", color='" + color + '\'' + '}';
  }
}

```

### 深拷贝的实现

```java
public class DeepProtoType implements Serializable, Cloneable {
  public String name;
  public DeepCloneableTarget deepCloneableTarget;

  public DeepProtoType() {
    super();

  }

  @Override
  protected Object clone() throws CloneNotSupportedException {
    Object deep = null;
    deep = super.clone();
    //对引用类型进行单独处于
    DeepProtoType deepProtoType = (DeepProtoType) deep;
    deepProtoType.deepCloneableTarget = (DeepCloneableTarget) deepCloneableTarget.clone();
    return deep;
  }
}

```

### 建造者模式

```java
public class CommonHouse extends AbstractHouse {
  @Override
  public void buildBasic() {
    System.out.println("普通房子打地基");
  }

  @Override
  public void BuildWalls() {
    System.out.println("普通房子砌墙");
  }

  @Override
  public void roofed() {
    System.out.println("普通房子封顶");
  }
}

```

```java

public abstract class AbstractHouse {
  //打地基
  public abstract void buildBasic();

  //砌墙
  public abstract void BuildWalls();

  //封顶
  public abstract void roofed();

  public void build() {
    buildBasic();
    BuildWalls();
    roofed();

  }
}

```

## 算法 leetcode

```java
public class TwoSum {
  public static void main(String[] args) {
    int[] nums = {2, 7, 11, 15};
    int target = 9;
    int[] arr = twoSum(nums, target);
    System.out.println(Arrays.toString(arr));
  }

  public static int[] twoSum(int[] nums, int target) {
    int[] result = new int[2];
    for (int i = 0; i < nums.length; i++) {
      for (int j = i + 1; j < nums.length; j++) {
        if (nums[i] + nums[j] == target) {
          result[0] = i;
          result[1] = j;
          return result;
        }
      }
    }
    return result;
  }
}
```

### 数组的合并

```java
public class Merge {
  public static void main(String[] args) {
    int[] nums1 = {1, 2, 3, 0, 0, 0};
    int m = 3;
    int[] nums2 = {2, 5, 6};
    int n = 3;

    System.out.println(Arrays.toString(merge(nums1, m, nums2, n)));
  }

  public static int[] merge(int[] nums1, int m, int[] nums2, int n) {
    for (int i = 0; i < n; i++) {
      nums1[m + i] = nums2[i];
    }
    Arrays.sort(nums1);
    return nums1;
  }
}
```

### 移动非零远素

```java
public class MoveZero {
  public static void main(String[] args) {
    int[] nums = {0, 1, 0, 3, 12};
    System.out.println(Arrays.toString(moveZeroes(nums)));
  }

  public static int[] moveZeroes(int[] nums) {
    if (nums == null) {
      return new int[0];
    }
    int j = 0;
    for (int i = 0; i < nums.length; ++i) {
      if (nums[i] != 0) {
        nums[j++] = nums[i];
      }
    }
    for (int i = j; i < nums.length; ++i) {
      nums[i] = 0;
    }
    return nums;
  }
}
```

###

```java
public class DisappearNum {
  public static void main(String[] args) {
    int[] nums = {4, 3, 7, 5, 1};
    System.out.println(findDisappearNum(nums));
  }

  public static List<Integer> findDisappearNum(int[] nums) {
    int n = nums.length;
    for (int num : nums) {
      int x = (num - 1) % n;
      nums[x] += n;
    }
    List<Integer> result = new ArrayList<>();
    for (int i = 0; i < n; i++) {
      if (nums[i] <= n) {
        result.add(i + 1);
      }
    }
    return result;
  }
}
```

### 链表的反转

```java
public class Prim {
  public static void main(String[] args) {
    Node node5 = new Node(5, null);
    Node node4 = new Node(4, node5);
    Node node3 = new Node(3, node4);
    Node node2 = new Node(2, node3);
    Node node1 = new Node(1, node2);
    Node prev = recursion(node1);
    System.out.println(prev);
  }

  public static Node iterate(Node head) {
    Node prev = null;
    Node next;
    Node temp = head;
    while (temp != null) {
      next = temp.next;
      temp.next = prev;
      prev = temp;
      temp = next;
    }
    return prev;
  }

  public static Node recursion(Node head) {
    if (head == null || head.next == null) {
      return head;
    }
    Node temp = recursion(head.next);
    head.next.next = head;
    head.next = null;
    return temp;
  }
}

class Node {
  public int value;
  public Node next;

  public Node(int value, Node next) {
    this.value = value;
    this.next = next;
  }
}
```

### 救素数

```java
public class PrimeNumber {
  public static void main(String[] args) {
    System.out.println(eratosthenes(100));
  }

  public static int bf(int n) {
    int count = 0;
    for (int i = 2; i < n; i++) {
      count += isPrime(i) ? 1 : 0;
    }
    return count;
  }

  public static boolean isPrime(int x) {
    for (int i = 2; i < x; i++) {
      if (x % i == 0) {
        return false;
      }
    }
    return true;
  }
  public static int eratosthenes(int n) {
    boolean[] isPrime = new boolean[n];
    int count = 0;
    for(int i = 2;i < n;i++) {
      if(!isPrime[i]) {
        count++;
        for(int j=2 * i; j < n;j+=i) {
          isPrime[j] = true;
        }
      }
    }
    return count;
  }
}
```

### 双指钟算法

```java
public class ArrayDuplicates {
  public static void main(String[] args) {
    System.out.println(removeDuplicates(new int[]{0,1,2,2,3,3,4}));
  }
  public  static int removeDuplicates(int[] nums) {
    if(nums.length == 0) {
      return 0;
    }
    int i=0;
    for(int j=1;j < nums.length;j++) {
     if(nums[j] != nums[i]) {
       i++;
       nums[i] =nums[j];
     }

    }
    return i + 1;
  }
}
```

### 相等中间索引

```java
public class CenterIndex {
  public static void main(String[] args) {
    System.out.println(pivotIndex(new int[]{1, 7, 3, 6, 5, 6}));
  }

  public static int pivotIndex(int[] nums) {
    int sum = Arrays.stream(nums).sum();
    int total = 0;
    for (int i = 0; i < nums.length; i++) {
      total += nums[i];
      if (total == sum) {
        return i;
      }
      sum = sum - nums[i];
    }
    return -1;
  }
}

```

### 二分查找求平方根

```java
public class SqrtX {
  public static void main(String[] args) {
    System.out.println(binarySearch(24));
  }

  public static int binarySearch(int x) {
    int index = -1, l = 0, r = x;
    while (l <= r) {
      int mid = l + (r - l) / 2;
      if (mid * mid <= x) {
        index = mid;
        l = mid + 1;
      } else {
        r = mid - 1;
      }
    }
    return index;
  }

}

```

### 求取最大值

```java
public class MaxArea {
  public static void main(String[] args) {
    int[] nums= new int[]{1,2,3,4,5,6};
    System.out.println(sort(nums));
  }

  public static int sort(int[] nums) {
    Arrays.sort(nums);
    int n = nums.length;
    return Math.max(nums[0] * nums[1] * nums[n - 1], nums[n - 1] * nums[n - 2] * nums[n - 3]);
  }
}

```

### 二数之和

```java
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

public class TwoSum {
  public static void main(String[] args) {
    int[] mums = new int[]{1, 2, 3, 4, 5, 6};
    System.out.println(Arrays.toString(solution(mums, 10)));
    System.out.println(Arrays.toString(solution1(mums,10)));
  }

  public static int[] solution(int[] nums, int target) {
    int len = nums.length;
    for(int i=0;i < len;i++) {
      for(int j=1;j < len;j++) {
        if(nums[i] + nums[j] == target) {
          return new int[]{i,j};
        }
      }
    }
    return new int[0];
  }

  public static int[] solution1(int[] nums,int target) {
    Map<Integer,Integer> map = new HashMap<>();
    for(int i=0;i < nums.length;i++) {
      if(map.containsKey(target - nums[i])) {
        return new int[]{map.get(target - nums[i]),i};
      }
      map.put(nums[i],i);
    }
    return new int[0];
  }
}
```

### 两数之后

```java
public class ToSearch {
  public static void main(String[] args) {
    int[] mums = new int[]{1, 2, 3, 4, 5, 6};
    System.out.println(Arrays.toString(toPoint(mums, 10)));

  }
  // 有序查找
  public static int[] toSearch(int[] numbers, int target) {
    for (int i = 0; i < numbers.length; i++) {
      int low = i;
      int high = numbers.length - 1;
      while (low <= high) {
        int mid = (high - low) / 2 + low;
        if (numbers[mid] == target - numbers[i]) {
          return new int[]{i, mid};
        } else if (numbers[mid] > target - numbers[i]) {
          high = mid - 1;
        } else {
          low = mid + 1;
        }
      }
    }
    return new int[0];
  }

  // 双指针查找
  public static int[] toPoint(int[] nums, int target) {
    int low = 0;
    int high = nums.length - 1;
    while (low < high) {
      int sum = nums[low] + nums[high];
      if (sum == target) {
        return new int[]{low, high};
      } else if (sum > target) {
        high = high - 1;
      } else {
        low = low + 1;
      }
    }
    return new int[0];
  }

}

```

### 判断是否是循环链表

```java
package com.xiaozhi.algorithm.linkCycle;

import java.util.HashSet;
import java.util.Set;

public class LinkCycle {

  static class ListNode {
    int val;
    ListNode next;

    public ListNode(int val, ListNode next) {
      this.val = val;
      this.next = next;
    }
  }

  public static void main(String[] args) {
    ListNode node5 = new ListNode(5, null);
    ListNode node4 = new ListNode(4, node5);
    ListNode node3 = new ListNode(3, node4);
    ListNode node2 = new ListNode(2, node3);
    ListNode node1 = new ListNode(1, node2);

//    node5.next = node1;

    System.out.println(hasCycle(node1));

    System.out.println(hasCycle2(node1));

  }

  public static boolean hasCycle(ListNode head) {
    Set<ListNode> set = new HashSet<>();
    while (head.next != null) {
      if(!set.add(head)) {
        return true;
      }
      head = head.next;
    }
    return false;
  }

  public static boolean hasCycle2(ListNode head) {
    if(head == null || head.next == null) {
      return false;
    }
    ListNode slow = head;
    ListNode quick = head.next;
    while (slow != null) {
      if(quick == null || quick.next == null) {
        return false;
      }
      slow = slow.next;
      quick = quick.next.next;
    }
    return true;
  }

}

```

### 求最大平均数

```java
public class MaxAverage {
  public static void main(String[] args) {
      System.out.println(findMaxAverage(new int[]{1,12,-5,-6,50,3},4));
  }

  public static double findMaxAverage(int[] nums, int k) {
    int sum = 0;
    int n = nums.length;
    for (int i = 0; i < k; i++) {
      sum += nums[i];
    }

    int max = sum;
    for (int i = k; i < n; i++) {
      sum = sum - nums[i - k] + nums[i];
      max = Math.max(sum, max);
    }

    return 1.0 * max / k;
  }
}
```

### 深度优先遍历

```java
package com.xiaozhi.algorithm.treeNode;

public class TreeNode {
  public static void main(String[] args) {
    Node node7 = new Node(7, null, null);
    Node node6 = new Node(6, node7, null);
    Node node5 = new Node(5, null, null);
    Node node4 = new Node(4, null, null);
    Node node3 = new Node(3, node6, null);
    Node node2 = new Node(2, node4, node5);
    Node node1 = new Node(1, node2, node3);


    System.out.println(minDepth(node1));
  }

  public static int minDepth(Node root) {
    if(root == null) {
      return 0;
    }
    if(root.left == null && root.right == null) {
      return 1;
    }

    int min = Integer.MAX_VALUE;
    if(root.left != null) {
      min = Math.min(minDepth(root.left),min);
    }
    if(root.right != null) {
      min = Math.min(minDepth(root.right),min);
    }

    return min + 1;
  }
}

class Node {
  public int val;
  public Node left;
  public Node right;

  public Node(int val, Node left, Node right) {
    this.val = val;
    this.left = left;
    this.right = right;
  }

  @Override
  public String toString() {
    return "Node{" + "val=" + val + ", left=" + left + ", right=" + right + '}';
  }
}

```

### 求取最大字串

```java
public class MaxSeq {
  public static void main(String[] args) {
    int[] nums = new int[]{1, 2, 3, 2, 3, 4, 3, 4, 5, 6, 7};
    System.out.println(findLength(nums));
  }

  public static int findLength(int[] nums) {
    int start = 0;
    int max = 0;
    for (int i = 0; i < nums.length; i++) {
      if (i > 0 && nums[i] <= nums[i - 1]) {
        start = i;
      }
      max = Math.max(max, i - start + 1);
    }
    return max;
  }
}
```

### 求最大周长

```java
public class Triangles {
  public static void main(String[] args) {
    int[] nums = new int[]{3,6,2,3};
    System.out.println(largesPerimeter(nums));
  }

  public static int largesPerimeter(int[] nums) {
    Arrays.sort(nums);
    for(int i = nums.length - 1;i >= 2;i--) {
      if(nums[i - 1] + nums[i - 2] > nums[i]) {
        return nums[i - 1] + nums[i -2] + nums[i];
      }
    }
    return 0;
  }
}

```

### 选择排序

```java
public class SelectSort {
  public static void main(String[] args) {
    int[] arr = new int[]{101, 34, 119, 1};
    selectSort(arr);

    System.out.println(Arrays.toString(arr));
  }

  // 选择排序
  public static int[] selectSort(int[] arr) {
    for(int i=0;i < arr.length - 1;i++) {
      int minIndex = i;
      int min = arr[i];
      for(int j = i + 1;j < arr.length;j++) {
        if (min > arr[j]) {
          min = arr[j];
          minIndex = j;
        }
      }
      if(minIndex != i) {
        arr[minIndex] = arr[i];
        arr[i] = min;
      }
    }
    return arr;
  }

}
```

### 插入排序

```java
public class InsertSort {
  public static void main(String[] args) {
    int[] arr = {34, 101, 119, 1};

    insertSort(arr);
    System.out.println(Arrays.toString(arr));
  }
  public static void insertSort(int[] arr) {
    for (int i = 1; i < arr.length; i++) {
      int insertValue = arr[i];
      int insertIndex = i - 1;

      while (insertIndex >= 0 && insertValue < arr[insertIndex]) {
        arr[insertIndex + 1] = arr[insertIndex];
        insertIndex--;
      }

      arr[insertIndex + 1] = insertValue;

    }
  }

}

```

### 希尔排序

```java
public class ShellSort {
  public static void main(String[] args) {
    int[] arr = {8,9,1,7,2,3,5,4,6,0};
    shellSort(arr);

    System.out.println(Arrays.toString(arr));
  }
  public static void shellSort(int[] arr) {
    int temp = 0;

    for(int gap = arr.length / 2;gap > 0; gap /= 2) {
      for(int i = gap;i < arr.length;i++) {
        for(int j = i - gap;j >= 0;j -= gap) {
          if(arr[j] > arr[j + gap]) {
            temp = arr[j];
            arr[j] = arr[j + gap];
            arr[j + gap] = temp;
          }
        }
      }
    }
  }
}

```
