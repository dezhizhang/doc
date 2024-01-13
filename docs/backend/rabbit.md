# rabbitmq

### rabbitmq安装
[mac安装rabbitmq](https://blog.csdn.net/CSDNwei/article/details/130965219)
### 配置文件

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
  <modelVersion>4.0.0</modelVersion>

  <groupId>org.example</groupId>
  <artifactId>rabbitmq</artifactId>
  <version>1.0-SNAPSHOT</version>
  <dependencies>
    <!--rabbitmq 依赖客户端-->
    <dependency>
      <groupId>com.rabbitmq</groupId>
      <artifactId>amqp-client</artifactId>
      <version>5.8.0</version>
    </dependency>
    <!--操作文件流的一个依赖-->
    <dependency>
      <groupId>commons-io</groupId>
      <artifactId>commons-io</artifactId>
      <version>2.6</version>
    </dependency>
  </dependencies>

  <!--指定 jdk 编译版本-->
  <build>
    <plugins>
      <plugin>
        <groupId>org.apache.maven.plugins</groupId>
        <artifactId>maven-compiler-plugin</artifactId>
        <configuration>
          <source>8</source>
          <target>8</target>
        </configuration>
      </plugin>
    </plugins>
  </build>

</project>

```
### 生产者
```java
package com.xiaozhicloud.producer;

import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Connection;
import com.rabbitmq.client.ConnectionFactory;

public class Producer {
  public static final String QUEUE_NAME = "hello";

  public static void main(String[] args) throws Exception {
    ConnectionFactory factory = new ConnectionFactory();
    // 设置ip地址
    factory.setHost("127.0.0.1");
    // 设置用户名
    factory.setUsername("guest");
    // 设置密码
    factory.setPassword("guest");

    // 创建连接
    Connection connection = factory.newConnection();

    Channel channel = connection.createChannel();
    // 生成一个队列
    channel.queueDeclare(QUEUE_NAME,false, false,false,null);
    // 发消息
    String message = "hello world";
    channel.basicPublish("",QUEUE_NAME,null,message.getBytes());
    System.out.println("消息发送完毕");
    
  }

}

```
###  消息者
```java
package com.xiaozhicloud.consumer;

import com.rabbitmq.client.*;

public class Consumer {
  public static final String QUEUE_NAME = "hello";

  public static void main(String[] args) throws Exception {
    ConnectionFactory factory = new ConnectionFactory();
    // 设置ip地址
    factory.setHost("127.0.0.1");
    // 设置用户名
    factory.setUsername("guest");
    // 设置密码
    factory.setPassword("guest");

    // 创建连接
    Connection connection = factory.newConnection();

    Channel channel = connection.createChannel();

    // 声明接收消息
    DeliverCallback deliverCallback = (consumerTag,message) -> {
      System.out.println("接收消息"+ new String(message.getBody()));
    };

    CancelCallback cancelCallback =  consumerTag -> {
      System.out.println("消费消息被中断");
    };


    // 消费者消费消息
    channel.basicConsume(QUEUE_NAME,true,deliverCallback,cancelCallback);


  }

}

```
### 封装连接工具
```java
package com.xiaozhicloud.utils;

import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Connection;
import com.rabbitmq.client.ConnectionFactory;

public class Utils {
  // 连接工厂创建信道工具类
  public static Channel getChannel() throws Exception {
    ConnectionFactory factory = new ConnectionFactory();
    factory.setHost("127.0.0.1");
    factory.setUsername("guest");
    factory.setPassword("guest");

    Connection connection = factory.newConnection();
    Channel channel = connection.createChannel();
    return channel;
  }
}

```
### 工程进程生产者
```java
package com.xiaozhicloud.work;

import com.rabbitmq.client.Channel;
import com.xiaozhicloud.utils.Utils;

import java.util.Scanner;

public class Producer {

  public static final String QUEUE_NAME = "hello";

  public static void main(String[] args) throws  Exception{
    Channel channel = Utils.getChannel();

    channel.queueDeclare(QUEUE_NAME,false,false,false,null);


    Scanner scanner = new Scanner(System.in);

    while (scanner.hasNext()) {
      String message = scanner.next();
      channel.basicPublish("",QUEUE_NAME,null,message.getBytes());
      System.out.println("消息发送完毕" + message);
    }

  }
}

```
### 工程进程消费者
```java
package com.xiaozhicloud.work;

import com.rabbitmq.client.CancelCallback;
import com.rabbitmq.client.Channel;
import com.rabbitmq.client.DeliverCallback;
import com.xiaozhicloud.utils.Utils;

public class Consumer {
  public static final String QUEUE_NAME = "hello";

  public static void main(String[] args) throws Exception {
    Channel channel = Utils.getChannel();


    DeliverCallback deliverCallback = (consumerTag, message) -> {
      System.out.println("接收消息"+ new String(message.getBody()));
    };

    // 取消消息
    CancelCallback cancelCallback = consumerTag -> {
      System.out.println("消费消息被中断");
    };
    System.out.println("c1等待接收消息...");
    // 消费者消费消息
    channel.basicConsume(QUEUE_NAME,true,deliverCallback,cancelCallback);

  }
}

```

[last](https://www.bilibili.com/video/BV1cb4y1o7zz?p=13&vd_source=e38cd951f2ee7bda48ec574f4e9ba363)