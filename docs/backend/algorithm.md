# 数据结构与算法

### 稀疏数组

```java
public class SparseArray {
  public static void main(String[] args) {
    int chessArr[][] = new int[11][11];
    chessArr[1][2]= 1;
    chessArr[2][3] = 2;

    for (int[] row:chessArr) {
      for (int data:row) {
        System.out.printf("%d\t",data);
      }
      System.out.println();
    }
    int total = 0;
    for(int [] row:chessArr) {
      for(int data:row) {
        if(data!=0) {
          total++;
        }
      }
    }
    System.out.println(total);
  }
}

```

### 数组模拟摸队列

```java
class ArrayQueue {
  private int maxSize; // 表示数组的最大容量
  private int front; // 队头
  private int near; // 队列尾
  private int[] arr; // 存放队列的数据

  public ArrayQueue(int arrMaxSize) {
    maxSize = arrMaxSize;
    arr = new int[maxSize];
    front = -1; // 指向队列头部
    near = -1; // 指向隐表尾，指向队列尾的数据
  }

  // 判断队列是否满
  public boolean isFull() {
    return near == maxSize - 1;
  }

  // 判断列表为空
  public boolean isEmpty() {
    return near == front;
  }

  // 添加数据到队列
  public void AddQueue(int n) {
    if (isFull()) {
      System.out.println("队列满，不能加入数据~");
      return;
    }
    near++;
    arr[near] = n;
  }

  // 获取队列的数据出队列
  public int getQueue() {
    if (isEmpty()) {
      throw new RuntimeException("队列为空，不能取数据");
    }
    front++;
    return arr[front];
  }

  // 显示队表中的所有数据
  public void showQueue() {
    if (isEmpty()) {
      System.out.println("队列为空,空空如也~~");
      return;
    }

    for (int i = 0; i < arr.length; i++) {
      System.out.printf("arr[%d]=%d\n", i, arr[i]);
    }
  }

  // 显示队列的头数据
  public int headQueue() {
    if (isEmpty()) {
      throw new RuntimeException("队列为空，不能取数据");
    }
    return arr[front + 1];

  }
}

```

### 单链表的增删改查

```java
package src.com.xiaozhicloud.linklist;

class SingleLinkListDemo {
  public static void main(String[] args) {
    HeroNode hero1 = new HeroNode(1, "宋江", "及时");
    HeroNode hero2 = new HeroNode(2,"卢俊义","玉諆房");
    HeroNode hero3 = new HeroNode(3,"呈用","智多星");


    HeroNode newHero2 =  new HeroNode(2,"卢俊义1","玉諆房1");

    SingleLinkList singleLinkList = new SingleLinkList();
    singleLinkList.addByOrder(hero1);
    singleLinkList.addByOrder(hero3);
    singleLinkList.addByOrder(hero2);


    singleLinkList.update(newHero2);
//    singleLinkList.delete(1);


    singleLinkList.list();
    int length = SingleLinkList.getLength(singleLinkList.getHead());
    System.out.println(length);

    HeroNode lastIndexNode = SingleLinkList.findLastIndexNode(singleLinkList.getHead(), 1);
    System.out.println(lastIndexNode);

  }
}

class SingleLinkList{
  private HeroNode head = new HeroNode(0,"","");

  public HeroNode getHead() {
    return head;
  }

  public void add(HeroNode heroNode) {
    HeroNode temp = head;
    while (true) {
      if(temp.next == null) {
        break;
      }
      temp = temp.next;
    }
    temp.next = heroNode;
  }
  // 按顺序加入节点
  public void  addByOrder(HeroNode heroNode) {
    HeroNode temp = head;
    boolean flag = false;

    while (true) {
      if(temp.next == null) {
        break;
      }
      if(temp.next.no > heroNode.no) {
        break;
      }
      if(temp.next.no == heroNode.no) {
        flag = true;
        break;
      }
      temp = temp.next;
    }

    if(flag) {
      System.out.printf("准备插入的英雄的编号%d 已存在不能添加",heroNode.no);
      System.out.println();
      return;
    }

    heroNode.next = temp.next;
    temp.next = heroNode;

  }

  // 修改链表
  public  void update(HeroNode newHeroNode) {
    if(head.next == null) {
      System.out.println("链表为空~");
      return;
    }
    HeroNode temp = head.next;
    boolean flag = false;
    while (true) {
      if(temp == null) {
        break;
      }
      if(temp.no == newHeroNode.no) {
        flag = true;
        break;
      }
      temp = temp.next;
    }
    if(flag) {
      temp.name = newHeroNode.name;
      temp.nickname = newHeroNode.nickname;
    }
    if(!flag) {
      System.out.printf("没有找到要修改的节点%d",newHeroNode.no);
      System.out.println();
    }
  }

  public void  delete(int no) {
    HeroNode temp = head;
    boolean flag = false; // 标志是否找到待删除节点
    while (true) {
      if(temp.next == null) {
        break;
      }
      if(temp.next.no == no) {
          flag = true;
          break;
      }
      temp = temp.next;

    }
    temp.next.next = temp.next;
  }

  // 统计链表有效个数
  public static int getLength(HeroNode head) {
    if(head.next == null) {
      return  0;
    }
    int length = 0;
    HeroNode cur = head.next;
    while (cur != null) {
      length++;
      cur = cur.next;
    }
    return  length;
  }

  // 查看单链表中的倒数第k个节点
  public static HeroNode findLastIndexNode(HeroNode head,int index) {
    if(head.next == null) {
      return null;
    }

    int size = getLength(head);

    if(index <=0 || index > size) {
      return null;
    }

    HeroNode cur = head.next;
    for(int i=0;i < size - index;i++) {
      cur = cur.next;
    }
    return  cur;

  }


  // 显示链表
  public void list() {
    if(head.next == null) {
      System.out.println("链表为空");
      return;
    }
    HeroNode temp = head.next;
    while (true) {
      if(temp == null) {
        break;
      }
      System.out.println(temp);
      temp = temp.next;
    }
  }
}


class HeroNode {
  public int no;
  public String name;
  public String nickname;
  public HeroNode next;

  public HeroNode(int no, String name,String nickname) {
    this.no = no;
    this.name = name;
    this.nickname = nickname;
  }

  @Override
  public String toString() {
    return "HeroNode{" +
      "no=" + no +
      ", name='" + name + '\'' +
      ", nickname='" + nickname +
      '}';
  }
}

```

### 单链表的反转

```java
public static void reverseList(HeroNode head) {
      if(head.next == null || head.next.next == null) {
        return;
      }
      HeroNode cur = head.next;
      HeroNode next = null;
      HeroNode reverseHead = new HeroNode(0,"","");

      while (cur != null) {
        next = cur.next;
        cur.next = reverseHead.next;
        reverseHead.next = cur;
        cur = next;
      }

      head.next = reverseHead.next;
  }
```
### 两数之和

```java
package src.com.leetcode.twosum;

import java.util.HashMap;
import java.util.Map;

class TwoSumTest {
  public static void main(String[] args) {
      int[] nums = {2,7,11,15};
      int target = 9;
      int[] result = twoSum1(nums, target);
      System.out.println(result[0]);
      System.out.println(result[1]);

  }

  public static int[] twoSum(int[] nums,int target) {
    int[] result = new int[2];
    for(int  i=0;i < nums.length;i++) {
      for(int j=i+1;j < nums.length;j++) {
        if(nums[i] + nums[j] == target) {
          result[0] = i;
          result[1] = j;
        }
      }
    }
    return  result;
  }

  // 通过哈希map来计算
  public static int[] twoSum1(int[] nums,int target) {
    int[] result = new int[2];
    Map<Integer,Integer> storeNums = new HashMap<>(nums.length);

    for(int i=0;i < nums.length;i++) {
      int another = target - nums[i];
      Integer anotherIndex = storeNums.get(another);
      if(anotherIndex != null) {
        result[0] = anotherIndex;
        result[1] = i;
        break;
      }
      storeNums.put(nums[i],i);
    }
    return result;
  }

  @Override
  public String toString() {
    return super.toString();
  }
}

```
### 双向链表的增删改查
```java
package src.com.xiaozhicloud.linklist;

class DoubleLinkListTest {
  public static void main(String[] args) {
    HeroNode2 heroNode2 = new HeroNode2(1, "宋江", "及时丽");
    HeroNode2 heroNode21 = new HeroNode2(2, "卢俊义", "玉妄谈");
    HeroNode2 heroNode22 = new HeroNode2(3, "吴用", "智多星");

    DoubleLinkList doubleLinkList = new DoubleLinkList();
    doubleLinkList.add(heroNode2);
    doubleLinkList.add(heroNode21);
    doubleLinkList.add(heroNode22);

    doubleLinkList.list();


    System.out.println("---------------");

    HeroNode2 heroNode23 = new HeroNode2(2, "公孙胜", "入云龙");
    doubleLinkList.update(heroNode23);

    doubleLinkList.delete(2);

    doubleLinkList.list();

  }
}

class DoubleLinkList {
  private HeroNode2 head = new HeroNode2(0, "", "");

  // 获取链表的头节点
  public HeroNode2 getHead() {
    return head;
  }

  // 添加节点
  public void add(HeroNode2 heroNode2) {
    HeroNode2 temp = head;
    while (true) {
      if (temp.next == null) {
        break;
      }
      temp = temp.next;
    }
    temp.next = heroNode2;
    heroNode2.prev = temp;
  }

  // 双向链表修改
  public void update(HeroNode2 newHeroNode2) {
    if (head.next == null) {
      System.out.println("链表为空");
      return;
    }
    HeroNode2 temp = head.next;
    boolean flag = false;
    while (true) {
      if (temp == null) {
        break;
      }
      if (temp.no == newHeroNode2.no) {
        flag = true;
        break;
      }
      temp = temp.next;
    }
    if (flag) {
      temp.name = newHeroNode2.name;
      temp.nickname = newHeroNode2.nickname;
      return;
    }
    System.out.printf("没有找到%d的节点", newHeroNode2.no);
  }

  public void delete(int no) {
    if (head.next == null) {
      System.out.println("链表为空，不能删除");
      return;
    }

    HeroNode2 temp = head.next;
    boolean flag = false;
    while (true) {
      if (temp == null) {
        break;
      }
      if (temp.no == no) {
        flag = true;
        break;
      }
      temp = temp.next;
    }
    if (flag) {
      temp.prev.next = temp.next;
      if (temp.next != null) {
        temp.next.prev = temp.prev;
      }
      return;
    }
    System.out.printf("要删除的节点不存在%d", no);

  }


  // 遍历双向链表
  public void list() {
    if (head.next == null) {
      System.out.println("链表为空");
      return;
    }
    HeroNode2 temp = head.next;
    while (true) {
      if (temp == null) {
        break;
      }
      System.out.println(temp);
      temp = temp.next;
    }
  }
}


class HeroNode2 {
  public int no;
  public String name;
  public String nickname;
  public HeroNode2 next;
  public HeroNode2 prev; // 指向前一个位置的节点

  public HeroNode2(int no, String name, String nickname) {
    this.no = no;
    this.name = name;
    this.nickname = nickname;
  }

  @Override
  public String toString() {
    return "HeroNode{" + "no=" + no + ", name='" + name + '\'' + ", nickname='" + nickname + '}';
  }
}

```
### 移动零283
```java
package src.com.leetcode.movezero;

import java.util.Arrays;

public class MoveZero {
  public static void main(String[] args) {
    int[] nums =  {0,1,0,3,12};
    moveZeroes(nums);
    System.out.println(Arrays.toString(nums));
  }

  public static void moveZeroes(int[] nums) {
    if(nums == null) {
      return;
    }
    int j = 0;
    for(int i=0;i < nums.length;i++) {
      if(nums[i]!= 0) {
        nums[j++] = nums[i];
      }
    }
    for(int i=j;i < nums.length;i++) {
      nums[i] = 0;
    }
  }
}

```
