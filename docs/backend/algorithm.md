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
### 消失的数字448
```java
package src.com.leetcode.findDisapernum;

import java.util.ArrayList;
import java.util.List;

class FindDisappearedNumbersTest {
  public static void main(String[] args) {
    int[]nums =  {4,3,2,7,8,2,3,1};
    List<Integer> disappearedNumbers = findDisappearedNumbers(nums);
    System.out.println(disappearedNumbers);

  }
  public static List<Integer> findDisappearedNumbers(int[] nums) {
    int n = nums.length;
    for(int num:nums) {
      int x = (num - 1) % n;
      nums[x] += n;
    }
    List<Integer> result = new ArrayList<Integer>();
    for(int i=0;i < n;i++) {
      if(nums[i] <=n) {
        result.add(i + 1);
      }
    }
    return  result;
  }

}

```
### 栈的增删改查
```java
package src.com.xiaozhicloud.stack;

import java.util.Scanner;

class ArrayStackTest {
  public static void main(String[] args) {
    ArrayStack stack = new ArrayStack(4);
    String key = "";
    boolean loop = true; // 控制是否退出菜单
    Scanner scanner = new Scanner(System.in);

    while (loop) {
      System.out.println("show:显示栈");
      System.out.println("exit:退出程序");
      System.out.println("push:添加数据");
      System.out.println("pop: 出栈");
      System.out.println("请输入你的选择");
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
          try{
            int result = stack.pop();
            System.out.printf("出栈的数据为%d",result);
          }catch (Exception e) {
            System.out.println(e.getMessage());
          }
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
  private int maxSize; // 栈的大小
  private int[] stack;
  private int top = -1; //top表示栈顶

  public ArrayStack(int maxSize) {
    this.maxSize = maxSize;
    stack = new int[this.maxSize];
  }

  // 栈满
  public boolean isFull() {
    return top == maxSize - 1;
  }

  // 栈空
  public boolean isEmpty() {
    return top == -1;
  }

  // 入栈push
  public void push(int value) {
    if (isFull()) {
      System.out.println("栈满");
      return;
    }
    top++;
    stack[top] = value;
  }

  // 出栈
  public int pop() {
    // 先判断栈是否为空
    if (isEmpty()) {
      System.out.println("栈为空");
      throw new RuntimeException("栈空");
    }
    int value = stack[top];
    top--;
    return value;
  }

  // 显示栈
  public void list() {
    if (isEmpty()) {
      System.out.println("栈空");
      return;
    }
    for (int i = top; i >= 0; i--) {
      System.out.printf("stack[%d]=%d\n", i, stack[i]);
    }
  }

}

```
### 冒泡排序
```java
package src.com.xiaozhicloud.sort;

import java.util.Arrays;

public class BubbleSort {
  public static void main(String[] args) {
      int arr[] = {3,9,-1,10,-2};

      int temp = 0;
      for(int i=0;i < arr.length - 1;i++) {
        for(int j=0;j < arr.length - 1 - i;j++) {
          if(arr[j] > arr[j + 1]) {
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
package src.com.xiaozhicloud.sort;

import java.util.Arrays;

public class BubbleSort {
  public static void main(String[] args) {
    int arr[] = {3,9,-1,10,20};
    int temp = 0;
    boolean flag = false;
    for(int i=0;i < arr.length - 1;i++) {
      flag = false;
      for(int j=0;j < arr.length - 1;j++) {
        if(arr[j] > arr[j + 1]) {
          flag = true;
          temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
        }
      }
      System.out.printf("第(%d)趟排序",i + 1);
      System.out.println();
      if(!flag) {
        break;
      }

    }

    System.out.println(Arrays.toString(arr));
  }

}

```
### 选择排序
```java
package src.com.xiaozhicloud.sort;

import java.util.Arrays;

public class SelectSort {
  public static void main(String[] args) {
    int[] arr = {101, 34, 199, 1};
    selectSort(arr);


  }

  public static void selectSort(int[] arr) {
    for (int i = 0; i < arr.length - 1; i++) {
      int minIndex = i;
      int min = arr[minIndex];
      for (int j = i + 1; j < arr.length; j++) {
        if (min > arr[j]) {
          min = arr[j];
          minIndex = j;
        }
      }
      if (minIndex != i) {
        arr[minIndex] = arr[i];
        arr[i] = min;

      }
    }
    System.out.println(Arrays.toString(arr));
  }

}

```
### 插入排序
```java
package src.com.xiaozhicloud.sort;

import java.util.Arrays;

public class InsertSort {
  public static void main(String[] args) {
    int[] arr = {101, 34, 119, 1,-1,89};
    insertSort(arr);
    System.out.println(Arrays.toString(arr));
  }

  public static void insertSort(int[] arr) {
    for (int i = 1; i < arr.length; i++) {
      int insertVal = arr[i];
      int insetIndex = i - 1;
      while (insetIndex >= 0 && insertVal < arr[insetIndex]) {
        arr[insetIndex + 1] = arr[insetIndex];
        insetIndex--;
      }
      arr[insetIndex + 1] = insertVal;
    }
  }
}

```
### 希尔排序
```java
package src.com.xiaozhicloud.sort;

import java.util.Arrays;

public class ShellSort {
  public static void main(String[] args) {
    int[] arr = {8,9,1,7,2,3,5,4,6,0};
    shellSort(arr);
    System.out.println(Arrays.toString(arr));
  }

  public static void shellSort(int[] arr) {
    int temp = 0;
    for (int gap = arr.length / 2; gap > 0; gap /= 2) {
      for (int i = gap; i < arr.length; i++) {
        for (int j = i - gap; j >= 0; j -= gap) {
          if (arr[j] > arr[j + gap]) {
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
### 二分查找
```java
public class BinarySearch {
  public static void main(String[] args) {
    int arr[] = {1,8,10,89,1000,1234};
    int i = binarySearch(arr,0,arr.length -1, 88);
    System.out.println(i);
    
  }

  public static int binarySearch(int[]arr,int left,int right,int findValue) {
    if(left > right) return  -1;
    int mid = (left + right) / 2;
    int midValue = arr[mid];


    if(findValue > midValue) {
      return  binarySearch(arr,mid +1,right,findValue);
    }

    if(findValue < midValue) {
      return binarySearch(arr,left,mid - 1,findValue);
    }

    return mid;

  }
}

```

#TODO
last(https://www.bilibili.com/video/BV1E4411H73v?p=40&spm_id_from=pageDriver&vd_source=e38cd951f2ee7bda48ec574f4e9ba363)
