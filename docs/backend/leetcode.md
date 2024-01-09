# leetcode
### 21. 合并两个有序链表

```java
package src.com.leetcode.mergetwolist;

public class MergeTwoList {
  public static void main(String[] args) {
    ListNode l1 = new ListNode(1);
    l1.next = new ListNode(2);
    l1.next.next = new ListNode(4);

    ListNode l2 = new ListNode(1);
    l2.next = new ListNode(3);
    l2.next.next = new ListNode(4);
    ListNode listNode = mergeTwoLists(l1, l2);

    System.out.println(listNode);

  }

  public static ListNode mergeTwoLists(ListNode l1, ListNode l2) {
    if(l1 == null) return  l2;
    if(l2 == null) return l1;
    if(l1.val < l2.val) {
      l1.next = mergeTwoLists(l1.next,l2);
      return l1;
    }
    l2.next = mergeTwoLists(l1,l2.next);
    return l2;
  }
}

class ListNode {
  int val;
  ListNode next;

  ListNode() {
  }

  ListNode(int val) {
    this.val = val;
  }

  ListNode(int val, ListNode next) {
    this.val = val;
    this.next = next;
  }

  @Override
  public String toString() {
    return super.toString();
  }
}

```
### [83. 删除排序链表中的重复元素](https://leetcode.cn/problems/remove-duplicates-from-sorted-list/description/)
```java
package src.com.leetcode.deleteDuplicates;

public class DeleteDuplicates {
  public static void main(String[] args) {
    ListNode listNode = new ListNode(1);
    listNode.next = new ListNode(1);
    listNode.next.next = new ListNode(2);
    listNode.next.next.next = new ListNode(3);
    listNode.next.next.next.next = new ListNode(3);
    deleteDuplicates(listNode);

//    [1,1,2,3,3]
  }
  public static ListNode deleteDuplicates(ListNode head) {
    if(head == null) {
      return head;
    }
    ListNode currentNode = head;
    while (null != currentNode.next) {
      if(currentNode.next.val == currentNode.val) {
        currentNode.next = currentNode.next.next;
      }else {
        currentNode = currentNode.next;
      }
    }
    return head;
  }
}

class ListNode{
  int val;
  ListNode next;
  ListNode(){}
  ListNode(int val) { this.val = val; }
  ListNode(int val, ListNode next) { this.val = val; this.next = next; }
}


```
### [141. 环形链表](https://leetcode.cn/problems/linked-list-cycle/description/)
```java
package src.com.leetcode.hasCycle;

public class HasCycle {
  public static void main(String[] args) {

  }

  public boolean hasCycle(ListNode head) {
    if (head == null) return false;
    ListNode slowPtr = head, fastPtr = head;
    while (fastPtr.next != null && fastPtr.next.next != null) {
      slowPtr = slowPtr.next;
      fastPtr = fastPtr.next.next;
      if (slowPtr == fastPtr) {
        return true;
      }
    }
    return false;
  }
}

class ListNode {
  int val;
  ListNode next;

  ListNode(int x) {
    val = x;
    next = null;
  }
}

```
### [142. 环形链表 II](https://leetcode.cn/problems/linked-list-cycle-ii/description/)
```java
package src.com.leetcode.detectCycle;

public class DetectCycle {
  public static void main(String[] args) {

  }
  public ListNode detectCycle(ListNode head) {
      if(head == null) return null;
      ListNode slowPtr = head,fastPtr = head;
      boolean loopExists = false;
      while (fastPtr.next != null && fastPtr.next.next != null) {
        slowPtr = slowPtr.next;
        fastPtr = fastPtr.next.next;
        if(slowPtr == fastPtr) {
          loopExists = true;
          break;
        }
      }
      if(loopExists) {
        slowPtr = head;
        while (slowPtr != fastPtr) {
          fastPtr = fastPtr.next;
          slowPtr = slowPtr.next;
        }
        return  slowPtr;
      }
      return  null;
  }
}

class ListNode{
  int val;
  ListNode next;
  ListNode(int x) {
    val = x;
    next = null;
  }
}

```
### [206. 反转链表](https://leetcode.cn/problems/reverse-linked-list/description/)
```java
package src.com.leetcode.reverseList;

public class ReverseList {
  public static void main(String[] args) {

  }

  public ListNode reverseList(ListNode head) {
    ListNode preNode = null;
    ListNode curr = head;
    while (curr != null) {
      ListNode next = curr.next;
      curr.next = preNode;
      preNode = curr;
      curr = next;
    }
    return preNode;
  }
}


class ListNode {
  int val;
  ListNode next;

  ListNode() {
  }

  ListNode(int val) {
    this.val = val;
  }

  ListNode(int val, ListNode next) {
    this.val = val;
    this.next = next;
  }
}

```