# 设计模式

### 依赖倒置
```java
package src.com.desgin.inversion;

public class Improve {
  public static void main(String[] args) {
      Person person = new Person();
      person.receive(new Email());
  }
}

interface IReceiver{
  public String getInfo();
}

class Email implements IReceiver{

  @Override
  public String getInfo() {
    return "电子邮箱:hello world";
  }
}


class Person{
  public void receive(IReceiver receiver) {
    System.out.println(receiver.getInfo());
  }
}


```
### 饿汉式单例
```java
package src.com.desgin.single;

class SingletonTest {
  public static void main(String[] args) {
    Singleton instance = Singleton.getInstance();
    Singleton singleton2 = Singleton.getInstance();

    System.out.println(instance == singleton2);

  }
}

class  Singleton{
  // 构造器私有化,外部不能new
  private Singleton() {

  }
  private final static Singleton instance = new Singleton();

  public static Singleton getInstance() {
    return  instance;
  }

}

```
### 饿汉式(静态代码块单例模式)
```java
package src.com.desgin.single;

class Singleton2Test {
  public static void main(String[] args) {
    Singleton2 instance = Singleton2.getInstance();

    System.out.println(instance);
  }
}

class Singleton2 {
  private Singleton2() {

  }
  private static Singleton2 instance;

  static {
    // 创建单例对像，在静态代码块里
    instance = new Singleton2();
  }

  public static Singleton2 getInstance() {
    return instance;
  }
}

```
### 懒汉式单例模式(线程不安全)
```java
package src.com.desgin.single;

class Singleton3Test {
  public static void main(String[] args) {
    Singleton3 instance = Singleton3.getInstance();
    Singleton3 instance2 = Singleton3.getInstance();
    System.out.println(instance == instance2);

  }
}

class Singleton3{
  private static Singleton3 instance;

  private Singleton3(){}

  public static Singleton3 getInstance() {
    if(instance == null) {
      instance = new Singleton3();
    }
    return instance;
  }
}

```
### 懒汉式单例模式(线程安全)
```java
package src.com.desgin.single;

class Singleton4Test {
  
  public static void main(String[] args) {
    Singleton4 singleton4 = Singleton4.getInstance();
    Singleton4 singleton42 = Singleton4.getInstance();

    System.out.println(singleton4 == singleton42);
  }
}

class Singleton4 {
  private static Singleton4 instance;

  private Singleton4() {
  }

  public static synchronized Singleton4 getInstance() {
    if (instance == null) {
      instance = new Singleton4();
    }
    return instance;
  }
}

```


<!-- last(https://www.bilibili.com/video/BV1G4411c7N4?p=6&vd_source=e38cd951f2ee7bda48ec574f4e9ba363) -->