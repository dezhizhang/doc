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