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