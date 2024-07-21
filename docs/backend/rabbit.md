# rabbitmq

### rabbitmq安装
[mac安装rabbitmq](https://blog.csdn.net/CSDNwei/article/details/130965219)



| 项目              | 地址                                           |
| :----------------------- | :--------------------------------------- |
| 晓智科技                 | [晓智科技](https://xiaozhi.shop)|
| 晓智文档                 | [晓智文档](https://doc.xiaozhi.shop/backend/docker) |
| 文档源码                 | [文档源码](https://github.com/dezhizhang/doc) |

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
### 消息的手动确认生产者
```java
package com.xiaozhicloud.loss;

import com.rabbitmq.client.Channel;
import com.xiaozhicloud.utils.Utils;

import java.util.Scanner;

public class Producer {
  public static final String TASK_QUEUE_NAME = "ack_queue";

  public static void main(String[] args) throws Exception {
    Channel channel = Utils.getChannel();

    channel.queueDeclare(TASK_QUEUE_NAME, false, false, false, null);

    // 从控制台获取信息
    Scanner scanner = new Scanner(System.in);

    while (scanner.hasNext()) {
      String message = scanner.next();
      channel.basicPublish("", TASK_QUEUE_NAME, null, message.getBytes("UTF-8"));
      System.out.println("生产者发出的消息" + message);
    }


  }
}

```
### 消息的手动确认消费者1
```java
package com.xiaozhicloud.loss;

import com.rabbitmq.client.CancelCallback;
import com.rabbitmq.client.Channel;
import com.rabbitmq.client.DeliverCallback;
import com.xiaozhicloud.utils.Utils;

public class Consumer1 {
  public static final String TASK_QUEUE_NAME = "ack_queue";
  public static void main(String[] args) throws Exception {
    Channel channel = Utils.getChannel();
    System.out.println("c1等持接收消息处理");

    DeliverCallback deliverCallback = (consumerTag, message) -> {
      Utils.sleep(1);
      System.out.println("接收消息"+ new String(message.getBody()));
      // 手动应答
      channel.basicAck(message.getEnvelope().getDeliveryTag(),false);
    };

    // 取消消息
    CancelCallback cancelCallback = consumerTag -> {
      System.out.println("消费消息被中断");
    };

    boolean autoAck = false;

    channel.basicConsume(TASK_QUEUE_NAME,autoAck,deliverCallback,cancelCallback);

  }
}
```
### 消息的手动确认消费者2
```java
package com.xiaozhicloud.loss;

import com.rabbitmq.client.CancelCallback;
import com.rabbitmq.client.Channel;
import com.rabbitmq.client.DeliverCallback;
import com.xiaozhicloud.utils.Utils;

public class Consumer2 {
  public static final String TASK_QUEUE_NAME = "ack_queue";
  public static void main(String[] args) throws Exception {
    Channel channel = Utils.getChannel();
    System.out.println("c2等持接收消息处理");

    DeliverCallback deliverCallback = (consumerTag, message) -> {
      Utils.sleep(30);
      System.out.println("接收消息"+ new String(message.getBody()));
      // 手动应答
      channel.basicAck(message.getEnvelope().getDeliveryTag(),false);
    };

    // 取消消息
    CancelCallback cancelCallback = consumerTag -> {
      System.out.println("消费消息被中断");
    };

    boolean autoAck = false;

    channel.basicConsume(TASK_QUEUE_NAME,autoAck,deliverCallback,cancelCallback);

  }

}

```
### 单个确认消息
```java
package com.xiaozhicloud.confirmation;

import com.rabbitmq.client.Channel;
import com.xiaozhicloud.utils.Utils;

import java.util.UUID;

public class Producer {
  public static void main(String[] args) throws Exception {
    publishMessageIndividually();
  }

  public static void publishMessageIndividually() throws Exception {
    Channel channel = Utils.getChannel();
    String queueName = UUID.randomUUID().toString();

    channel.queueDeclare(queueName,true,false,false,null);

    // 开启发布确认
    channel.confirmSelect();
    long begin = System.currentTimeMillis();

    for(int i=0;i < 1000;i++) {
      String message = i +"";
      channel.basicPublish("",queueName,null,message.getBytes());
      // 单个消息马上进行发布确认
      boolean flag = channel.waitForConfirms();
      if(flag) System.out.println("消息发布成功");

    }

    long end = System.currentTimeMillis();
    System.out.println("用时:"+ (end - begin));


  }

}

```
### 消息的确认发布
```java
package com.xiaozhicloud.confirmation;

import com.rabbitmq.client.Channel;
import com.rabbitmq.client.ConfirmCallback;
import com.xiaozhicloud.utils.Utils;

import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentNavigableMap;

public class Producer {
  public static void main(String[] args) throws Exception {
    publishMessageAsync();
  }

  public static void publishMessageIndividually() throws Exception {
    Channel channel = Utils.getChannel();
    String queueName = UUID.randomUUID().toString();

    channel.queueDeclare(queueName,true,false,false,null);

    // 开启发布确认
    channel.confirmSelect();
    long begin = System.currentTimeMillis();

    for(int i=0;i < 1000;i++) {
      String message = i +"";
      channel.basicPublish("",queueName,null,message.getBytes());
      // 单个消息马上进行发布确认
      boolean flag = channel.waitForConfirms();
      if(flag) System.out.println("消息发布成功");

    }

    long end = System.currentTimeMillis();
    System.out.println("用时:"+ (end - begin));

  }
  public static void publishMessageBatch() throws Exception {
    Channel channel = Utils.getChannel();

    String queueName = UUID.randomUUID().toString();
    channel.queueDeclare(queueName,true,false,false,null);

    // 开启发布确认
    channel.confirmSelect();

    // 开始时间
    long begin = System.currentTimeMillis();

    // 批量确认消息大小
    int batchSize = 100;

    for(int i=0;i < 1000;i++) {
      String message = i + "";
      channel.basicPublish("",queueName,null,message.getBytes());
      if(i % batchSize == 0) {
        channel.waitForConfirms();
      }
    }
    long end = System.currentTimeMillis();
    System.out.println("用时:"+ (end - begin));

  }

  // 异点发步确认
  public static void publishMessageAsync() throws Exception {
    Channel channel = Utils.getChannel();

    String queueName = UUID.randomUUID().toString();

    channel.queueDeclare(queueName,true,false,false,null);

    channel.confirmSelect();

    // 线程安全有序哈希表
    ConcurrentHashMap<Long,String> outstandingConfirms = new ConcurrentHashMap<>();


    // 开始时间
    long begin = System.currentTimeMillis();

    // 消息确认成功回调
    ConfirmCallback ackCallback = (deliveryTag, multiple) ->{
      // 删除确认消息
//      if(multiple) {
//        ConcurrentNavigableMap<Long,String> confirmed = outstandingConfirms.headMap(deliveryTag);
//        confirmed.clear();
//        return;
//      }
      outstandingConfirms.remove(deliveryTag);

      System.out.println("确认消息" + deliveryTag);
    };

    // 消息确认成功回调
    ConfirmCallback nackCallback =(deliveryTag, multiple ) -> {
        System.out.println(outstandingConfirms.get(deliveryTag));
        System.out.println("未确认消息" + deliveryTag);
    };

    channel.addConfirmListener(ackCallback,nackCallback);


    for(int i=0;i < 1000;i++) {
      String message = "消息" + i;
      channel.basicPublish("",queueName,null,message.getBytes());
      outstandingConfirms.put(channel.getNextPublishSeqNo(),message);
    }



    long end = System.currentTimeMillis();
    System.out.println("异步发布确认" + (end - begin) + "ms");


  }

}

```
### 交换机fanout(发布订阅模式)生产者
```java
package com.xiaozhicloud.fanout;

import com.rabbitmq.client.Channel;
import com.xiaozhicloud.utils.Utils;

import java.util.Scanner;

public class Producer {
  public static final String EXCHANGE_NAME = "logs";
  public static void main(String[] args) throws Exception{
    Channel channel = Utils.getChannel();

    channel.exchangeDeclare(EXCHANGE_NAME,"fanout");

    Scanner scanner = new Scanner(System.in);

    while (scanner.hasNext()) {
      String message = scanner.next();
      channel.basicPublish(EXCHANGE_NAME,"",null,message.getBytes("utf-8"));
      System.out.println("生产者成功发送消息");
    }

  }

}

```
### 交换机fanout(发布订阅模式)消费者
```java
package com.xiaozhicloud.fanout;

import com.rabbitmq.client.CancelCallback;
import com.rabbitmq.client.Channel;
import com.rabbitmq.client.DeliverCallback;
import com.xiaozhicloud.utils.Utils;

public class Consumer2 {
  public static final String EXCHANGE_NAME = "logs";

  public static void main(String[] args) throws Exception {
    Channel channel = Utils.getChannel();

    channel.exchangeDeclare(EXCHANGE_NAME,"fanout");

    // 创建一个临时队列
    String queueName = channel.queueDeclare().getQueue();

    // 绑定交换机与队列
    channel.queueBind(queueName,EXCHANGE_NAME,"");

    System.out.println("等待接收消息...");

    DeliverCallback deliverCallback = (consumerTag, message) -> {

      System.out.println("接收消息"+ new String(message.getBody()));
    };

    // 取消消息
    CancelCallback cancelCallback = consumerTag -> {
      System.out.println("消费消息被中断");
    };

    // 消费者接收消息
    channel.basicConsume(queueName,true,deliverCallback,cancelCallback);

  }
}

```
### topic模式消费者
```java
消费者1
package com.xiaozhicloud.topic;

import com.rabbitmq.client.Channel;
import com.rabbitmq.client.DeliverCallback;
import com.xiaozhicloud.utils.Utils;

public class Consumer01 {
  public static final String EXCHANGE_NAME = "topic";
  public static void main(String[] args) throws Exception {
    Channel channel = Utils.getChannel();

    // 声明交换机
    channel.exchangeDeclare(EXCHANGE_NAME,"topic");

    // 声明队列
    String queueName ="Q1";
    channel.queueDeclare(queueName,false,false,false,null);

    channel.queueBind(queueName,EXCHANGE_NAME,"*.orange.*");
    System.out.println("等待接收消息....");

    DeliverCallback deliverCallback = (consumerTag, message) -> {
      System.out.println("接收消息"+ new String(message.getBody()));
      System.out.println("接收消息" + queueName + "绑定键" + message.getEnvelope().getRoutingKey());
    };


    // 接收消息
    channel.basicConsume(queueName,true,deliverCallback,consumerTag -> {});

  }
}

消费者2
package com.xiaozhicloud.topic;

import com.rabbitmq.client.Channel;
import com.rabbitmq.client.DeliverCallback;
import com.xiaozhicloud.utils.Utils;

public class Consumer02 {
  public static final String EXCHANGE_NAME = "topic";
  public static void main(String[] args) throws Exception {
    Channel channel = Utils.getChannel();

    // 声明交换机
    channel.exchangeDeclare(EXCHANGE_NAME,"topic");

    // 声明队列
    String queueName ="Q2";
    channel.queueDeclare(queueName,false,false,false,null);
    channel.queueBind(queueName,EXCHANGE_NAME,"*.*.rabbit");
    channel.queueBind(queueName,EXCHANGE_NAME,"lazy.#");
    System.out.println("等待接收消息....");

    DeliverCallback deliverCallback = (consumerTag, message) -> {
      System.out.println("接收消息"+ new String(message.getBody()));
      System.out.println("接收消息" + queueName + "绑定键" + message.getEnvelope().getRoutingKey());
    };


    // 接收消息
    channel.basicConsume(queueName,true,deliverCallback,consumerTag -> {});
  }
}

```
### topic模式生产者
```java
package com.xiaozhicloud.topic;

import com.rabbitmq.client.Channel;
import com.xiaozhicloud.utils.Utils;

import java.util.HashMap;
import java.util.Map;

public class Producer {
  public static final String EXCHANGE_NAME = "topic";
  public static void main(String[] args) throws Exception{
    Channel channel = Utils.getChannel();

    Map<String,String> bindingKeyMap = new HashMap<>();
    bindingKeyMap.put("quick.orange.rabbit", "被队列 Q1Q2 接收到");
    bindingKeyMap.put("lazy.orange.elephant", "被队列 Q1Q2 接收到");
    bindingKeyMap.put("quick.orange.fox", "被队列 Q1 接收到");
    bindingKeyMap.put("lazy.brown.fox", "被队列 Q2 接收到");
    bindingKeyMap.put("lazy.pink.rabbit", "虽然满足两个绑定但只被队列 Q2 接收一次");
    bindingKeyMap.put("quick.brown.fox", "不匹配任何绑定不会被任何队列接收到会被丢弃");
    bindingKeyMap.put("quick.orange.male.rabbit", "是四个单词不匹配任何绑定会被丢弃");
    bindingKeyMap.put("lazy.orange.male.rabbit", "是四个单词但匹配 Q2");

    for(Map.Entry<String,String> bindingKeyEntry:bindingKeyMap.entrySet()) {
      String key = bindingKeyEntry.getKey();
      String message = bindingKeyEntry.getValue();

      channel.basicPublish(EXCHANGE_NAME,key,null,message.getBytes("utf-8"));
      System.out.println("生产者发送消息" + message);
    }

  }
}

```

<!-- [last](https://www.bilibili.com/video/BV1cb4y1o7zz?p=49&spm_id_from=pageDriver&vd_source=e38cd951f2ee7bda48ec574f4e9ba363) -->