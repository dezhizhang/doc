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
### 插值查找
```java
package src.com.xiaozhicloud.search;

public class InterpolationSearch {
  public static void main(String[] args) {
      int [] arr= new int[100];
      for(int i = 0;i < 100;i++) {
        arr[i] = i + 1;
      }

    int i = interpolationValue(arr, 0, arr.length - 1, 22);

    System.out.println(i);
  }
  // 插值查找算法
  public static int interpolationValue(int[] arr,int left,int right,int findVal) {
    if(left > right || findVal < arr[0] || findVal > arr[arr.length - 1]) {
      return  -1;
    }

    int mid = left + (right - left) * (findVal - arr[left]) / (arr[right] - arr[left]);
    int midVal = arr[mid];

    if(findVal > midVal) {
      return  interpolationValue(arr,mid + 1,right,findVal);
    }else if(findVal < midVal) {
      return interpolationValue(arr,left,mid - 1,findVal);
    }else {
      return mid;
    }
  }
}

```
### 哈希表
```java
package src.com.xiaozhicloud.hashtab;


import java.util.Scanner;

class HashTabDemo{
  public static void main(String[] args) {
    // 创建哈希表
    HashTab hashTab = new HashTab(7);

    // 写一个菜单
    String key = "";
    Scanner scanner = new Scanner(System.in);

    while (true) {
      System.out.println("add: 添加雇员");
      System.out.println("list: 显示雇员");
      System.out.println("find: 查找雇员");
      System.out.println("exit: 退出系统");

      key = scanner.next();
      switch (key) {
        case "add":
          System.out.println("输入id");
          int id = scanner.nextInt();
          System.out.println("输入名字");
          String name = scanner.next();
          Emp emp = new Emp(id,name);
          hashTab.add(emp);
          break;
        case "list":
          hashTab.list();
          break;
        case "find":
          System.out.println("请便入要查找的id");
          id = scanner.nextInt();
          hashTab.findEmpById(id);
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


public class HashTab {
    private EmpLinkedList[] empLinkedLists;
    private int size;
    public HashTab(int size) {
      this.size = size;
      empLinkedLists = new EmpLinkedList[size];
      // 分别初始化每一条链表
      for(int i=0;i < size;i++) {
        empLinkedLists[i] = new EmpLinkedList();
      }
    }
    // 添加雇员
    public void add(Emp emp) {
      int empLinkedListsNo = hashFun(emp.id);
      empLinkedLists[empLinkedListsNo].add(emp);

    }

    // 遍历所有链表
    public void list() {
      for(int i=0;i < size;i++) {
        empLinkedLists[i].list(i + 1);
      }
    }
    // 根据输入id查找雇员
    public void findEmpById(int id) {
      int empLinkedListsNo = hashFun(id);
      Emp emp = empLinkedLists[empLinkedListsNo].findEmpById(id);
      if(emp == null) {
        return;
      }
      System.out.printf("在第%d条锭表中找到该雇员id=%d",empLinkedListsNo,id);
      System.out.println();
    }
    // 散列函数
    public int hashFun(int id) {
      return  id % size;
    }
}

class Emp {
  public int id;
  public String name;
  public Emp next;

  public Emp(int id, String name) {
    super();
    this.id = id;
    this.name = name;
  }

}

class EmpLinkedList {
  private Emp head;
  // 添加节点
  public void add(Emp emp) {
    // 如果是添加第一个雇员
    if (head == null) {
      head = emp;
      return;
    }

    Emp curEmp = head;
    while (true) {
      if(curEmp.next == null) {
        break;
      }
      curEmp = curEmp.next;
    }

    curEmp.next = emp;
  }
  public void list(int no) {
    if(head == null) {
      System.out.println("链表"+no+"为空");
      return;
    }
    System.out.print("第" + no + "链表的信息为");
    Emp curEmp = head;
    while (true) {
      System.out.printf("=>id=%d name=%s\t",curEmp.id,curEmp.name);
      if(curEmp.next == null) {
        break;
      }
      curEmp = curEmp.next;
    }
    System.out.println();
  }
  // 根据id查找雇员
  public Emp findEmpById(int id) {
    // 判断链表是否为空
    if(head == null) {
      System.out.println("链表为空");
      return null;
    }

    Emp curEmp = head;
    while (true) {
      if(curEmp.id == id) {
        break;
      }
      if(curEmp.next == null) {
        curEmp = null;
        break;
      }
      curEmp = curEmp.next;
    }
    return curEmp;
  }


}

```
### 二叉树的前序中序后序遍历
```java
package src.com.xiaozhicloud.tree;

class BinaryTreeTest {
  public static void main(String[] args) {
    BinaryTree binaryTree = new BinaryTree();
    HeroNode root = new HeroNode(1, "宋江");
    HeroNode node2 = new HeroNode(2, "吴用");
    HeroNode node3 = new HeroNode(3, "卢俊义");
    HeroNode node4 = new HeroNode(4, "林冲");
    root.setLeft(node2);

    root.setRight(node3);
    node3.setRight(node4);

    binaryTree.setRoot(root);

    System.out.println("前序遍历");
    binaryTree.preOrder();

    System.out.println("中序遍历");
    binaryTree.infixOrder();

    System.out.println("后序遍历");
    binaryTree.postOrder();


  }
}

class BinaryTree {
  private HeroNode root;

  public void setRoot(HeroNode root) {
    this.root = root;
  }

  public void preOrder() {
    if (this.root == null) {
      System.out.println("二叉树为空，无法遍历");
      return;
    }

    this.root.preOrder();
  }

  public void infixOrder() {
    if (this.root == null) {
      System.out.println("二叉树为空，无法遍历");
      return;
    }
    this.root.infixOrder();
  }

  // 后序遍历
  public void postOrder() {
    if (this.root == null) {
      System.out.println("二叉树为空，无法遍历");
      return;
    }
    this.root.postOrder();
  }

}


class HeroNode {
  private int no;
  private String name;
  private HeroNode left;
  private HeroNode right;

  public HeroNode(int no, String name) {
    this.no = no;
    this.name = name;
  }

  public int getNo() {
    return no;
  }

  public void setNo(int no) {
    this.no = no;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public HeroNode getLeft() {
    return left;
  }

  public void setLeft(HeroNode left) {
    this.left = left;
  }

  public HeroNode getRight() {
    return right;
  }

  public void setRight(HeroNode right) {
    this.right = right;
  }

  // 前序遍历方法
  public void preOrder() {
    System.out.println(this);
    if (this.left != null) {
      this.left.preOrder();
    }
    if (this.right != null) {
      this.right.preOrder();
    }
  }

  // 中序遍历
  public void infixOrder() {
    if (this.left != null) {
      this.left.infixOrder();
    }
    System.out.println(this);
    if (this.right != null) {
      this.right.infixOrder();
    }
  }

  // 后序遍历
  public void postOrder() {
    if (this.left != null) {
      this.left.postOrder();
    }
    if (this.right != null) {
      this.right.postOrder();
    }
    System.out.println(this);
  }

  @Override
  public String toString() {
    return "HeroNode[no=" + no + ",name=" + name + "]";
  }
}

```
### 二叉树的查找
```java
package src.com.xiaozhicloud.tree;

class BinaryTreeTest {
  public static void main(String[] args) {
    BinaryTree binaryTree = new BinaryTree();
    HeroNode root = new HeroNode(1, "宋江");
    HeroNode node2 = new HeroNode(2, "吴用");
    HeroNode node3 = new HeroNode(3, "卢俊义");
    HeroNode node4 = new HeroNode(4, "林冲");
    root.setLeft(node2);

    root.setRight(node3);
    node3.setRight(node4);

    binaryTree.setRoot(root);

    System.out.println("前序遍历");
    binaryTree.preOrder();

    System.out.println("中序遍历");
    binaryTree.infixOrder();

    System.out.println("后序遍历");
    binaryTree.postOrder();


  }
}

class BinaryTree {
  private HeroNode root;

  public void setRoot(HeroNode root) {
    this.root = root;
  }

  public void preOrder() {
    if (this.root == null) {
      System.out.println("二叉树为空，无法遍历");
      return;
    }

    this.root.preOrder();
  }

  public void infixOrder() {
    if (this.root == null) {
      System.out.println("二叉树为空，无法遍历");
      return;
    }
    this.root.infixOrder();
  }

  // 后序遍历
  public void postOrder() {
    if (this.root == null) {
      System.out.println("二叉树为空，无法遍历");
      return;
    }
    this.root.postOrder();
  }

  // 前序查找
  public HeroNode preOrderSearch(int no) {
    if(root == null) {
      return null;
    }
    return root.postOrderSearch(no);
  }

  // 中序查找
  public HeroNode infixOrderSearch(int no) {
    if(root == null) {
      return null;
    }
    return root.infixOrderSearch(no);
  }

  // 后序查找
  public HeroNode postOrderSearch(int no) {
    if(root == null) {
      return null;
    }
    return root.postOrderSearch(no);
  }

}


class HeroNode {
  private int no;
  private String name;
  private HeroNode left;
  private HeroNode right;

  public HeroNode(int no, String name) {
    this.no = no;
    this.name = name;
  }

  public int getNo() {
    return no;
  }

  public void setNo(int no) {
    this.no = no;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public HeroNode getLeft() {
    return left;
  }

  public void setLeft(HeroNode left) {
    this.left = left;
  }

  public HeroNode getRight() {
    return right;
  }

  public void setRight(HeroNode right) {
    this.right = right;
  }

  // 前序遍历方法
  public void preOrder() {
    System.out.println(this);
    if (this.left != null) {
      this.left.preOrder();
    }
    if (this.right != null) {
      this.right.preOrder();
    }
  }

  // 中序遍历
  public void infixOrder() {
    if (this.left != null) {
      this.left.infixOrder();
    }
    System.out.println(this);
    if (this.right != null) {
      this.right.infixOrder();
    }
  }

  // 后序遍历
  public void postOrder() {
    if (this.left != null) {
      this.left.postOrder();
    }
    if (this.right != null) {
      this.right.postOrder();
    }
    System.out.println(this);
  }

  // 前序遍历查找
  public HeroNode preOrderSearch(int no) {
    if (this.no == no) {
      return this;
    }
    HeroNode curNode = null;
    if (this.left != null) {
      curNode = this.left.preOrderSearch(no);
    }
    if (curNode != null) {
      return curNode;
    }
    if (this.right != null) {
      curNode = this.right.preOrderSearch(no);
    }
    return curNode;
  }

  // 中序遍历查找
  public HeroNode infixOrderSearch(int no) {
    HeroNode curNode = null;
    if(this.left == null) {
      curNode = this.left.infixOrderSearch(no);
    }

    if(curNode != null) {
      return curNode;
    }

    if(this.no == no) {
      return this;
    }

    if(this.right !=null) {
      curNode = this.right.preOrderSearch(no);
    }

    return curNode;

  }

  // 后序遍历查找
  public HeroNode postOrderSearch(int no) {
    HeroNode curNode = null;
    if(this.left != null) {
      curNode = this.left.postOrderSearch(no);
    }

    if(curNode != null) {
      return curNode;
    }

    // 没有找到则递归向右子树遍历查找
    if(this.right != null) {
      curNode = this.right.postOrderSearch(no);
    }

    if(curNode != null) {
      return curNode;
    }

    if(this.no == no) {
      return this;
    }
    return curNode;
  }

  @Override
  public String toString() {
    return "HeroNode[no=" + no + ",name=" + name + "]";
  }
}

```
### 顺序存储二叉树
```java
package src.com.xiaozhicloud.tree;

class ArrayBinaryTreeTest {
  public static void main(String[] args) {
      int[] arr = {1,2,3,4,5,6,7};
      ArrayBinaryTree arrayBinaryTree = new ArrayBinaryTree(arr);
      arrayBinaryTree.preOrder();
  }
}


/*
* 第n个元素的左子节点为2 * n + 1
* 第n个元素的右子节点为2 * n + 2
* 第n个元素的父节点为(n - 1) / 2
* */
class  ArrayBinaryTree {
  private int[] arr;
  public ArrayBinaryTree(int[] arr) {
    this.arr = arr;
  }

  public void preOrder() {
    this.preOrder(0);
  }

  public void preOrder(int index) {
    if(arr == null || arr.length == 0) {
      System.out.println("数组为空");
      return;
    }
    System.out.printf("%d",arr[index]);

    // 向左遍历
    if((index * 2 + 1) < arr.length) {
      preOrder(2 * index + 1);
    }
    // 向右遍历
    if((index * 2 + 2) < arr.length) {
      preOrder(2 * index + 2);
    }

  }

}

```
### 线索二叉树没有看
<!-- 102-111 -->

### 赫夫曼树
```java
package src.com.xiaozhicloud.tree;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class HuffmanTree {

  public static void main(String[] args) {
    int arr[] = {13,7,8,3,29,6,1};
    Node huffmanTree = createHuffmanTree(arr);
    preOrder(huffmanTree);

  }

  // 编写一个前序遍历的方法
  public static void preOrder(Node root) {
    if(root == null) {
      System.out.println("树为空");
      return;
    }
    root.preOrder();
  }
  public static Node createHuffmanTree(int[] arr) {
    List<Node> nodes = new ArrayList<Node>();

    for(int value:arr) {
      nodes.add(new Node(value));
    }



    while (nodes.size() > 1) {
      // 排序从小到大
      Collections.sort(nodes);
      // 取出根节点权值最小的两颗二叉树
      //(1) 取出权值最小的结点
      Node leftNode = nodes.get(0);
      //(2) 取出权值第二小的结点
      Node rightNode = nodes.get(1);

      //(3) 构建一颗新的二叉树
      Node parent = new Node(leftNode.value + rightNode.value);
      parent.left = leftNode;
      parent.right = rightNode;

      //(4) 从ArrayList删除处理过的二叉树
      nodes.remove(leftNode);
      nodes.remove(rightNode);

      //(5) 将parent加入到nodes
      nodes.add(parent);
    }

    // 返回哈夫曼的root节点
    return nodes.get(0);
  }
}


class Node implements Comparable<Node> {
  int value; // 结点的权值

  Node left; // 指向左子节点
  Node right; // 指向右子节点

  // 前序遍历
  public void preOrder() {
    System.out.println(this);
    if(this.left != null) {
      this.left.preOrder();
    }

    if(this.right != null) {
      this.right.preOrder();
    }
  }


  public Node(int value) {
    this.value = value;
  }

  @Override
  public int compareTo(Node o) {
    return this.value - o.value;
  }

  @Override
  public String toString() {
    return "Node[value="+value+"]";
  }
}

```
### 排序二叉树的增册除
```java
package src.com.xiaozhicloud.binarysorttree;

class BinarySortTreeTest {
  public static void main(String[] args) {
      int[] arr = {7,3,10,12,5,1,9};
      BinarySortTree binarySortTree = new BinarySortTree();
     for(int i=0;i < arr.length;i++) {
       binarySortTree.add(new Node(arr[i]));
     }

     binarySortTree.deleteNode(5);
     binarySortTree.infixOrder();

  }
}


class BinarySortTree{
  private Node root;

  public void add(Node node) {
    if(root == null) {
      root = node;
    }else {
      root.add(node);
    }
  }

  // 中序遍历
  public void infixOrder() {
    if(root == null) {
      System.out.println("二叉排序数为空");
      return;
    }

    root.infixOrder();
  }

  // 查找要删除的节点
  public Node search(int value) {
    if(root == null) {
      return null;
    }

    return root.search(value);
  }

  // 查找父节点
  public Node searchParent(int value) {
    if(root == null) {
      return null;
    }
    return root.searchParent(value);
  }

  // 删除节点
  public void deleteNode(int value) {
    if(root == null) {
      System.out.println("节点为空");
      return;
    }

    Node targetNode = search(value);
    if(targetNode == null) {
      System.out.println("没有找到要删除的节点");
      return;
    }

    // 当前这颗二叉树只有一个节点
    if(root.left == null && root.right == null) {
      root = null;
      return;
    }

    // 要删除的节点是叶子节点
    Node parent = searchParent(value);
    if(targetNode.left == null && targetNode.right == null) {
      if(parent.left != null && parent.left.value == value) {
        parent.left = null;
      }else if(parent.right != null && parent.right.value == value) {
        parent.right = null;
      }
    }

  }




}




// 创建节点
class Node {
  int value;
  Node left;
  Node right;

  public Node(int value) {
    this.value = value;
  }

  public Node search(int value) {
    if(value == this.value) {
      return  this;
    }

    // 如果查找的值小于当前节点的值，向左子树递归查找
    if(value < this.value) {
      if(this.left == null) {
        return null;
      }

      return this.left.search(value);
    }

    if(value > this.value) {
      if(this.right == null) {
        return null;
      }
      return  this.right.search(value);
    }

    return  null;
  }

  // 查找要删除节点的父节点
  public Node searchParent(int value) {
    if((this.left != null && this.left.value == value) ||
      (this.right != null && this.right.value == value)) {
      return this;
    }

    // 左子树递归查找
    if(value < this.value && this.left != null) {
      return this.left.searchParent(value);
    }

    // 右子树递归查找
    if(value > this.value && this.right != null) {
      return this.right.searchParent(value);
    }

    return null;
  }

  public void add(Node node) {
    if (node == null) {
      System.out.println("节点为空");
      return;
    }
    // 传入的结点值和当前子树的根节点的值关系
    if (node.value < this.value) {
      if (this.left == null) {
        this.left = node;
      } else {
        // 递归的向左子树添加
        this.left.add(node);
      }
    }

    if (node.value > this.value) {
      if (this.right == null) {
        this.right = node;
      } else {
        // 递当的向右子树添加
        this.right.add(node);
      }
    }
  }

  // 中序遍历
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
    return "Node [value=" + value + "]";
  }
}

```


### 图
```java
package src.com.xiaozhicloud.graph;

import java.util.ArrayList;
import java.util.Arrays;


class GraphTest{
  public static void main(String[] args) {
    int n = 5;
    String vertex[] = {"A","B","C","D","E"};
    Graph graph = new Graph(n);
    for(String value:vertex) {
      graph.insertVertex(value);
    }

    graph.insertEdge(0,1,1);
    graph.insertEdge(0,2,1);
    graph.insertEdge(1,2,1);
    graph.insertEdge(1,3,1);
    graph.insertEdge(1,4,1);
    graph.showGraph();
  }
}

public class Graph {

  private ArrayList<String> vertexList; // 存储顶点的集合
  private int[][] edges;
  private int numOfEdges; // 表示边的数目
  public Graph(int n) {
    edges = new int[n][n];
    vertexList = new ArrayList<String>(n);
    numOfEdges = 0;
  }

  // 插入顶点
  public void insertVertex(String vertex) {
    vertexList.add(vertex);
  }

  // 添加这
  public void insertEdge(int v1,int v2,int weight) {
    edges[v1][v2] = weight;
    edges[v2][v1] = weight;
    numOfEdges++;
  }

  // 返回节点的个数
  public int getNumOfVertex() {
    return vertexList.size();
  }

  // 返回边的数目
  public int getNumOfEdges() {
    return  numOfEdges;
  }

  // 返回i对应的下标值
  public String getValueByIndex(int i) {
    return  vertexList.get(i);
  }

  // 返回v1和v2的权值
  public int getWeight(int v1,int v2) {
    return edges[v1][v2];
  }

  // 显示节点的个数
  public void showGraph() {
    for(int[] link:edges) {
      System.out.println(Arrays.toString(link));
    }
  }

}

```
### 图的深度优先遍历
```java
package src.com.xiaozhicloud.graph;

import java.util.ArrayList;
import java.util.Arrays;


class GraphTest{
  public static void main(String[] args) {
    int n = 5;
    String vertex[] = {"A","B","C","D","E"};
    Graph graph = new Graph(n);
    for(String value:vertex) {
      graph.insertVertex(value);
    }

    graph.insertEdge(0,1,1);
    graph.insertEdge(0,2,1);
    graph.insertEdge(1,2,1);
    graph.insertEdge(1,3,1);
    graph.insertEdge(1,4,1);
    graph.showGraph();

    graph.dfs();
  }
}

public class Graph {

  private ArrayList<String> vertexList; // 存储顶点的集合
  private int[][] edges;
  private int numOfEdges; // 表示边的数目
  private boolean[] isVisited;
  public Graph(int n) {
    edges = new int[n][n];
    isVisited = new boolean[n];
    vertexList = new ArrayList<String>(n);
    numOfEdges = 0;
  }
  // 得到第一个领接节点的下标w
  public int getFirstNeighbor(int index) {
    for(int j=0;j < vertexList.size();j++) {
      if(edges[index][j] > 0) {
        return j;
      }
    }
    return  -1;
  }

  // 根据前一个领接节点的下标返回下一个领接节点
  private int getNextNeighbor(int v1,int v2) {
    for(int j=v2 + 1;j < vertexList.size();j++) {
      if(edges[v1][j] > 0) {
        return j;
      }
    }
    return -1;
  }

  // 深度优先遍历算法
  public void dfs(boolean[] isVisited,int i) {
    System.out.print(getValueByIndex(i) + "->");

    // 将节点设置为已经访问
    isVisited[i] = true;

    int w = getFirstNeighbor(i);

    while (w !=-1) {
      if(!isVisited[w]) {
        dfs(isVisited,w);
      }
      w = getNextNeighbor(i,w);
    }
  }

  public void dfs() {
    for(int i=0;i < getNumOfVertex();i++) {
      if(!isVisited[i]) {
        dfs(isVisited,i);
      }
    }
  }



  // 插入顶点
  public void insertVertex(String vertex) {
    vertexList.add(vertex);
  }

  // 添加这
  public void insertEdge(int v1,int v2,int weight) {
    edges[v1][v2] = weight;
    edges[v2][v1] = weight;
    numOfEdges++;
  }

  // 返回节点的个数
  public int getNumOfVertex() {
    return vertexList.size();
  }

  // 返回边的数目
  public int getNumOfEdges() {
    return  numOfEdges;
  }

  // 返回i对应的下标值
  public String getValueByIndex(int i) {
    return  vertexList.get(i);
  }

  // 返回v1和v2的权值
  public int getWeight(int v1,int v2) {
    return edges[v1][v2];
  }

  // 显示节点的个数
  public void showGraph() {
    for(int[] link:edges) {
      System.out.println(Arrays.toString(link));
    }
  }

}

```
### 二分查找非递归
```java
package src.com.xiaozhicloud.binarysearch;

public class BinarySearch {
  public static void main(String[] args) {
    int[] arr = {1,3,8,10,11,67,100};
    int i = binarySearch(arr, 67);

    System.out.println(i);

  }

  public static int binarySearch(int[] arr, int target) {
    int left = 0;
    int right = arr.length - 1;
    while (left <= right) {
      int mid = (left + right) / 2;
      if (arr[mid] == target) {
        return mid;
      } else if (arr[mid] > target) {
        right = mid - 1;
      } else if (arr[mid] < target) {
        left = mid + 1;
      }
    }
    return -1;
  }

}

```
### 汉诺塔问题
```java
package src.com.xiaozhicloud.dac;

public class Dac {
  public static void main(String[] args) {
   // tower(32,'A','B','C');
  }

  // 使用分法算法角决
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
### 暴力匹配
```java
package src.com.xiaozhicloud.kmp;

public class Violence {
  public static void main(String[] args) {
    String s1 = "你好刘德华，刘德华 ";
    String s2 = "刘德华";

    int i = violenceMatch(s1, s2);

    System.out.println(i);

  }

  public static int violenceMatch(String str1, String str2) {
    char[] s1 = str1.toCharArray();
    char[] s2 = str2.toCharArray();

    int s1Len = s1.length;
    int s2Len = s2.length;

    int i = 0;
    int j = 0;

    while (i < s1Len && j < s2Len) {
      if (s1[i] == s2[j]) {
        i++;
        j++;
      } else {
        i = i - (j - 1);
        j = 0;
      }
    }

    if (j == s2Len) {
      return i - j;
    }
    return -1;
  }
}

```
### 贪心算法
```java
package src.com.xiaozhicloud.greedy;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.HashSet;

public class GreedyAlgorithm {
  public static void main(String[] args) {
    HashMap<String, HashSet<String>> hashMap = new HashMap<String,HashSet<String>>();
    HashSet<String> hashSet1 = new HashSet<String>();
    hashSet1.add("北京");
    hashSet1.add("上海");
    hashSet1.add("天津");


    HashSet<String> hashSet2 = new HashSet<String>();
    hashSet2.add("广州");
    hashSet2.add("北京");
    hashSet2.add("深圳");

    HashSet<String> hashSet3 = new HashSet<String>();
    hashSet3.add("成都");
    hashSet3.add("上海");
    hashSet3.add("杭州");

    HashSet<String> hashSet4 = new HashSet<String>();
    hashSet4.add("成都");
    hashSet4.add("上海");

    HashSet<String> hashSet5 = new HashSet<String>();
    hashSet5.add("杭州");
    hashSet5.add("大连");

    // 加入到hashmap中
    hashMap.put("k1",hashSet1);
    hashMap.put("k2",hashSet2);
    hashMap.put("k3",hashSet3);
    hashMap.put("k4",hashSet4);
    hashMap.put("k5",hashSet5);

    // 存放所有的地区
    HashSet<String> allArea = new HashSet<String>();
    allArea.add("北京");
    allArea.add("上海");
    allArea.add("天津");
    allArea.add("广州");
    allArea.add("深圳");
    allArea.add("成都");
    allArea.add("杭州");
    allArea.add("大连");

    // 创建ArrayList 存放选择的电台集合
    ArrayList<String> selects = new ArrayList<String>();


    HashSet<String> tempSet = new HashSet<String>();

    String maxKey = null;

    while (allArea.size() != 0) {
      maxKey = null;
      for(String key:hashMap.keySet()) {
        tempSet.clear();
        HashSet<String> areas = hashMap.get(key);
        tempSet.addAll(areas);
        tempSet.retainAll(allArea);
        if(tempSet.size() > 0 && (maxKey == null || tempSet.size() > hashMap.get(maxKey).size())) {
            maxKey = key;
        }
      }
      if(maxKey != null) {
        selects.add(maxKey);
        // 将maxKey指向的广播从all集合里清除
        allArea.removeAll(hashMap.get(maxKey));
      }
    }
    
    System.out.println(selects);

  }
}

```
### prim算法
```java
package src.com.xiaozhicloud.prim;

import java.util.Arrays;

public class Prim {
  public static void main(String[] args) {
    int max = 10000;
    char[] data = new char[]{'A', 'B', 'C', 'D', 'E', 'F', 'G'};

    int vertex = data.length;
    int[][] weight = new int[][]{
      {max, 5, 7, max, max, max, 2},
      {5, max, max, 9, max, max, 3},
      {7, max, max, max, 8, max, max},
      {max, 9, max, max, max, 4, max},
      {max, max, 8, max, max, 5, 4},
      {max, max, max, 4, 5, max, 6},
      {2, 3, max, max, 4, 6, max},
    };
    // 创建graph对像
    Graph graph = new Graph(vertex);
    MinTree minTree = new MinTree();
    minTree.createGraph(graph, vertex, data, weight);
//    minTree.showGraph(graph);
    minTree.prim(graph, 0);
  }
}


// 创建最小生成树

class MinTree {
  public void createGraph(Graph graph, int vertex, char data[], int[][] weight) {
    int i, j;
    for (i = 0; i < vertex; i++) {
      graph.data[i] = data[i];
      for (j = 0; j < vertex; j++) {
        graph.weight[i][j] = weight[i][j];
      }
    }
  }

  // 显示图的方法
  public void showGraph(Graph graph) {
    for (int[] link : graph.weight) {
      System.out.println(Arrays.toString(link));
    }
  }

  // prim算法
  public void prim(Graph graph, int v) {
    int visited[] = new int[graph.vertex];

    // 标记节点已访问
    visited[v] = 1;

    int h1 = -1;
    int h2 = -1;

    int minWeight = 10000;
    for (int k = 1; k < graph.vertex; k++) {
      for (int i = 0; i < graph.vertex; i++) {
        for (int j = 0; j < graph.vertex; j++) {
          if (visited[i] == 1 && visited[j] == 0 && graph.weight[i][j] < minWeight) {
            minWeight = graph.weight[i][j];
            h1 = i;
            h2 = j;
          }
        }
      }
      System.out.println("边<" + graph.data[h1] + "," + graph.data[h2] + ">" + "权值" + minWeight);
      visited[h2] = 1;
      minWeight = 10000;
    }

  }

}

class Graph {
  int vertex; // 表示图的节点个数
  char[] data; // 存放节点数据
  int[][] weight; // 存放边

  public Graph(int vertex) {
    this.vertex = vertex;
    this.data = new char[vertex];
    this.weight = new int[vertex][vertex];
  }
}

```

132,133,134 没有看
<!-- #TODO
last(https://www.bilibili.com/video/BV1E4411H73v?p=151&spm_id_from=pageDriver&vd_source=e38cd951f2ee7bda48ec574f4e9ba363) -->
