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


<!-- last(https://www.bilibili.com/video/BV1G4411c7N4?p=6&vd_source=e38cd951f2ee7bda48ec574f4e9ba363) -->