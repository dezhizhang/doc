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