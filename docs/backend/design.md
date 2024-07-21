# design

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
### 悚汉式(线程安全，同步方法)
```java
package src.com.desgin.single;

class Singleton5Test {
  public static void main(String[] args) {
    Singleton5 singleton = Singleton5.getInstance();
    Singleton5 singleton2 = Singleton5.getInstance();

    System.out.println(singleton == singleton2);
  }
}

class Singleton5{
  private static volatile Singleton5 instance;

  private Singleton5() {};

  public static synchronized Singleton5 getInstance() {
    if(instance == null) {
      synchronized (Singleton5.class) {
        if(instance == null) {
          instance = new Singleton5();
        }
      }
    }
    return instance;
  }

}

```
### 静态内部类实现单例(推荐使用)
```java
package src.com.desgin.single;

class Singleton6Test {
  public static void main(String[] args) {
    Singleton6 instance = Singleton6.getInstance();
    Singleton6 instance2 = Singleton6.getInstance();

    System.out.println(instance ==instance2);
  }
}

// 静态内部类单例模式
class Singleton6{
  private static volatile Singleton6 instance;

  private static class Singleton6Instance {
    private static final Singleton6 INSTANCE = new Singleton6();
  }

  // 提供一个静态公共方法
  public static synchronized Singleton6 getInstance() {
    return Singleton6Instance.INSTANCE;
  }
}

```
### 枚举方式实现单例(推荐使用)
```java
package src.com.desgin.single;

class Singleton7Test {
  public static void main(String[] args) {
    Singleton7 instance = Singleton7.INSTANCE;
    Singleton7 instance2 = Singleton7.INSTANCE;

    System.out.println(instance == instance2);

  }
}

enum  Singleton7{
  INSTANCE;
  public void sayOk() {
    System.out.println("ok");
  }
}

```
### 原型模式
```java
package src.com.desgin.prototype;

public class Sheep implements Cloneable {
  private String name;
  private int age;
  private String color;
  public Sheep(String name,int age,String color) {
    super();
    this.name = name;
    this.age = age;
    this.color = color;
  }

  public String getName() {
    return this.name;
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

  public String getColor() {
    return color;
  }
  public void  setColor(String color) {
    this.color = color;
  }

  @Override
  public String toString() {
    return this.name + this.age + this.color;
  }

  @Override
  protected Object clone() {
    Sheep sheep = null;
    try{
      sheep = (Sheep) super.clone();
    }catch (Exception e) {
      System.out.println(e.getMessage());
    }
    return sheep;
  }
}


package src.com.desgin.prototype;

public class Client {
  public static void main(String[] args) {
    Sheep sheep = new Sheep("tom", 1, "白色");
    Object clone = sheep.clone();
    System.out.println(clone);

  }
}


```
### 原型模式烤贝对像
```java
package src.com.desgin.prototype;

import java.io.*;

public class DeepProtoType implements Serializable, Cloneable {
  public String name;
  public DeepCloneTable deepCloneTable;

  public DeepProtoType() {
    super();
  }
  // 深拷贝

  @Override
  protected Object clone() throws CloneNotSupportedException {
    Object deep = null;
    deep = super.clone();

    DeepProtoType deepProtoType = (DeepProtoType) deep;
    deepProtoType.deepCloneTable = (DeepCloneTable) deepCloneTable.clone();
    return deepProtoType;
  }

  public Object deepClone() {
    ByteArrayOutputStream bos = null;
    ObjectOutputStream oss = null;
    ByteArrayInputStream bis = null;
    ObjectInputStream ois = null;
    try {
      bos = new ByteArrayOutputStream();
      oss = new ObjectOutputStream(bos);
      oss.writeObject(this);

      // 反序化
      bis = new ByteArrayInputStream(bos.toByteArray());
      ois = new ObjectInputStream(bis);
      DeepProtoType copyObj = (DeepProtoType) ois.readObject();

      return copyObj;

    } catch (Exception e) {
      System.out.println(e.getMessage());
      return null;
    } finally {
      try {
        bos.close();
        ois.close();
        oss.close();
      } catch (Exception e) {
        System.out.println(e.getMessage());
      }
    }

  }
}

```


<!-- last(https://www.bilibili.com/video/BV1G4411c7N4?p=88&vd_source=10257e657caa8b54111087a9329462e8) -->