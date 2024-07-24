# algorithm

## 数据结构和算法的概述

### 数据结构与算法的关系
- 数据data结构(structue)是一门研究组台企数据方式的学科，有了编程语言就有了数据结构，学好数据结构可以编写出更加漂亮高效的代码。
- 要学习好数据结构就要多多考虑如何将生活中遇到的问题用程序去实现解决。
- 程序=数据结构+算法
- 数据结构是算法的基础，换言之想要学好算法，需要把数据结构学好。

### 线性结构与非线性结构
1. ##### 线性结构
- 线性结构作为最常用的数据结构，其特点就是数据元素之前存在一对一的线性关系
- 线性结构有两种不同的存储结构，即顺序存储结构和链式存储结构。 顺序存储的线性表称为顺序表，顺序表中的存储元素是链续的
- 链式存储的线性表称为链表，链表中的存储元不一定的连续的，元素节点中存放数据元素以及相邻元素的地址信息。
- 线性结构常见的有： 数组，队列，链表和栈

2. ##### 非线性结构
- 非线性结构包括： 二维数组，多维数组，广义表，树结构，图结构

## 稀疏数组
1. ### 基本介绍
- 当一个数组中大部分元素为0,或者为同一个值的数据时,可以使用稀疏数组来保存该数组

2. ### 处理方法
- 记录数组一个有几行几列，有多少个不同的值
- 把具有不同值的元素的行列及值记录在一个小规模的数组中，从而缩小程序的规模
![稀疏数组](../../public/algorithm/sparsearray1.png)

3. ### 思路分析
###### 二维数组转稀疏的思路
1. 遍历原始的二维数组得到有效的个数sum
2. 根据sum就可以创建稀疏数组sparseArr int[sum+1][3]
3. 将二维数组的有效数据存入到稀疏数组
###### 稀疏数组转原始的二维数组思路
1. 先读取稀疏的第一行，根据第一行的数据创建原如的二维数组，比如上面的cheeArr=int[11][11]
2. 在读取稀疏数组后几行的数据，并赋给原始二维数组即可

![稀疏数组](../../public/algorithm/sparsearray.png)

4. ### 代码实现
```java
package shop.xiaozhi.sparsearray;
public class SparseArray {
    public static void main(String[] args) {
        // 创建一个原始的二维数组11*11
        //0：表示没有棋子，1：表示黑子，2示不白子
        int chessArr[][] = new int[11][11];
        chessArr[1][2] = 1;
        chessArr[2][3] = 2;

        for(int[] row:chessArr) {
            for(int col:row) {
                System.out.printf("%d\t",col);
            }
            System.out.println();
        }

        //1 将二维数组转换成稀疏数组
        //2 先遍历二维数组，得到非0数据个数
        int sum = 0;
        for(int i =0;i < chessArr.length;i++) {
            for(int j =0;j < chessArr[i].length;j++) {
                if(chessArr[i][j] !=0) {
                    sum++;
                }
            }
        }

        //3 创建对应的稀疏数组
        int spareArr[][] = new int[sum + 1][3];
        //4 给稀疏数赋值
        spareArr[0][0] = chessArr.length;
        spareArr[0][1] = chessArr.length;
        spareArr[0][2] = sum;

        int count = 0;

        for(int i =0;i < chessArr.length;i++) {
            for(int j =0;j < chessArr[i].length;j++) {
                if(chessArr[i][j] !=0) {
                    count++;
                    spareArr[count][0] = i;
                    spareArr[count][1] = j;
                   spareArr[count][2] = chessArr[i][j];
                }
            }
        }

        System.out.println("得到的稀疏数组");
        for(int[] row:spareArr) {
            for(int col:row) {
                System.out.printf("%d\t",col);
            }
            System.out.println();
        }

        // 稀疏数组恢复成原始二维数组
        // 先读取稀疏数组的第一行，概据第一行的数据创建原始的二维数组
        // 在读取稀疏数组后几行的数据，并赋给原始二维数组即可
        int cheeseArr2[][] = new int[spareArr[0][0]][spareArr[0][1]];

        for(int i = 1;i < spareArr.length;i++) {
            cheeseArr2[spareArr[i][0]][spareArr[i][1]] =spareArr[i][2];
        }

        for(int[] row:chessArr) {
            for(int col:row) {
                System.out.printf("%d\t",col);
            }
            System.out.println();
        }
    }
}

```
## 队列
1. ### 基本介绍
- 队列是一个有序列表，可以用数组或链表来实现
- 先入先出的原则，即：先存入队列的数据，要先取出，后存入的数据要后取出
![队列](../../public/algorithm/queue.png)

2. ### 思路分析
- 将尾指针往后移near+1当front=near数据为空
- 苦尾指针near小于队列的最大下标maxSize-1,则将数据存入near所指的数据元素中，否则无法存入数据，near==maxSize-1队列满
3. ### 数组实现队列
```java
// 使用数组模拟队列
class ArrayQueue {
    private final int maxSize; //表示数组的最大容量
    private int front; // 队列头
    private int rear; // 队列尾
    private final int[] array; // 用于存放数据
    // 创建隐列构造器
    public ArrayQueue(int maxSize) {
        this.maxSize = maxSize;
        this.front = -1;
        this.rear = -1;
        this.array = new int[maxSize];
    }
    // 判断队列是否满
    public boolean isFull() {
        return rear == maxSize - 1;
    }
    // 判断隐表是否为空
    public boolean isEmpty() {
        return rear == front;
    }
    // 添加数据到队列中
    public void addQueue(int value) {
        if(isFull()) {
            System.out.println("队列满不能加入数据");
            return;
        }
        rear++; // 让rear后移
        array[rear] = value;
    }
    public int getQueue() {
        // 判断队列是否为空
        if(isEmpty()) {
            // 通过出异常
            throw new RuntimeException("队列为空不能取数据");
        }
        front++;
        return array[front];
    }
    // 显示队列所有数据
    public void showQueue() {
        for(int i=0;i < array.length;i++) {
            System.out.printf("arr[%d]=%d\n",i,array[i]);
        }
    }
    // 显示队列的头数据,注意不是取数据
    public int headQueue() {
        if(isEmpty()) {
           throw new RuntimeException("队列为空不能取数据");
        }
        return array[front+1];
    }

}
```
4. ### 数组实现环形队列
- front指向队列的第一个元素，也就是说arr[front]就是队列的第一个元素front的初始值为0
- near指向队列的最后一个元素的后一个位置，因为希望空出一个空间做预留，rear的初始值为0
- 当队列满时条件是(near + 1) % maxSize = front
- 当队列为空的条件near == front
- 队列中有效数据的个数(near + maxSize - front) % maxSize

```java
class CircleArrayQueue {
    private  final int maxSize; // 表示数组的最大容量
    private int front; //指向队列的第一个元素初始值为0
    private int near; // 指向队尾元素初始值为0
    private final int[] arr; // 用于存放数据

    public CircleArrayQueue(int maxSize) {
        this.maxSize = maxSize;
        arr = new int[maxSize];
    }

    // 判断队列是否满
    public boolean isFull() {
        return (near + 1) % maxSize == front;
    }

    // 判断队列是否为空
    public boolean isEmpty() {
        return near == front;
    }

    // 添加数据
    public void addQueue(int n) {
        // 判断队列是否满
        if (isFull()) {
            System.out.println("队列满不能加入数据");
            return;
        }
        // 直接将数据加入
        arr[near] = n;
        near = (near + 1) % maxSize;
    }

    // 获取队列中的数据
    public int getQueue() {
        // 判断队列是否空
        if (isEmpty()) {
            throw new RuntimeException("队列空，不能取数据");
        }
        //1 先把front对应的值保留到一个临时变量
        int value = arr[front];
        front = (front + 1) % maxSize;
        return value;
    }

    // 显示队列
    public void showQueue() {
        if (isEmpty()) {
            System.out.println("队列为空");
            return;
        }
        for (int i = front; i < front + size(); i++) {
            System.out.printf("arr[%d]=%d\n", i % maxSize, arr[i % maxSize]);
        }
    }

    // 显示头元素
    public int headQueue() {
        if (isEmpty()) {
            throw new RuntimeException("队列为空");
        }

        return arr[front];
    }

    // 求出当前队列有效数据个数
    public int size() {
        return (near + maxSize - front) % maxSize;
    }

}
```





<!-- [https://www.bilibili.com/video/BV1E4411H73v?p=9&spm_id_from=pageDriver&vd_source=10257e657caa8b54111087a9329462e8] -->