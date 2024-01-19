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
### [94. 二叉树的中序遍历](https://leetcode.cn/problems/binary-tree-inorder-traversal/description/)
```java
package src.com.leetcode.intersectionNode;

import java.util.ArrayList;
import java.util.List;

public class InorderTraversal {
  public static void main(String[] args) {
   
  }

  public List<Integer> inorderTraversal(TreeNode root) {
    List<Integer> res = new ArrayList<Integer>();
    accessTree(root,res);
    return res;
  }

  public void accessTree(TreeNode root,List<Integer> res) {
    if(root == null) {
      return;
    }
    accessTree(root.left,res);
    res.add(root.val);
    accessTree(root.right,res);
  }
}


class TreeNode {
  int val;
  TreeNode left;
  TreeNode right;

  TreeNode() {
  }

  TreeNode(int val) {
    this.val = val;
  }

  TreeNode(int val, TreeNode left, TreeNode right) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

```
### [144. 二叉树的前序遍历](https://leetcode.cn/problems/binary-tree-preorder-traversal/description/)
```java
package src.com.leetcode.preorderTraversal;

import java.util.ArrayList;
import java.util.Deque;
import java.util.LinkedList;
import java.util.List;

public class PreorderTraversal {
  public static void main(String[] args) {

  }
  public List<Integer> preorderTraversal(TreeNode root) {
    List<Integer> res = new ArrayList<>();
    Deque<TreeNode> stack = new LinkedList<>();
    while (root != null || !stack.isEmpty()) {
      while (root != null) {
        res.add(root.val);
        stack.push(root);
        root = root.left;
      }

      root = stack.pop();
      root = root.right;
    }
    return  res;
  }
}
class TreeNode {
  int val;
  TreeNode left;
  TreeNode right;
  TreeNode() {
  }

  TreeNode(int val) {
    this.val = val;
  }

  TreeNode(int val, TreeNode left, TreeNode right) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

```
### [145. 二叉树的后序遍历](https://leetcode.cn/problems/binary-tree-postorder-traversal/description/)
```java
class Solution {
    public List<Integer> postorderTraversal(TreeNode root) {
    List<Integer> res = new ArrayList<>();
    Deque<TreeNode> stack = new LinkedList<>();

    TreeNode preAccess = null;

    while (root != null || !stack.isEmpty()) {
      while (root != null) {
        stack.push(root);
        root = root.left;
      }
      root = stack.pop();
      if (root.right == null || root.right == preAccess) {
        res.add(root.val);
        preAccess = root;
        root = null;
      } else {
        stack.push(root);
        root = root.right;
      }
    }
    return res;

  }
}
```
### [101. 对称二叉树](https://leetcode.cn/problems/symmetric-tree/description/)
```java
package src.com.leetcode.isSymmetric;


import java.util.LinkedList;
import java.util.Queue;

class TreeNode {
  int val;
  TreeNode left;
  TreeNode right;

  TreeNode() {
  }

  TreeNode(int val) {
    this.val = val;
  }

  TreeNode(int val, TreeNode left, TreeNode right) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

public class IsSymmetric {
  public static void main(String[] args) {

  }

  public boolean isSymmetric(TreeNode root) {
    Queue<TreeNode> q = new LinkedList<TreeNode>();
    TreeNode u = root.left;
    TreeNode v = root.right;
    if(root == null || (u == null && v == null)) {
      return true;
    }
    q.offer(u);
    q.offer(v);

    while (!q.isEmpty()) {
      u = q.poll();
      v = q.poll();
      if(u == null && v == null) {
        continue;
      }
      if((u == null || v == null) || (u.val != v.val)) {
        return false;
      }
      q.offer(u.left);
      q.offer(v.right);


      q.offer(u.right);
      q.offer(v.left);
    }
    return  true;
  }

}

```
### [104. 二叉树的最大深度](https://leetcode.cn/problems/maximum-depth-of-binary-tree/description/)

```java
package src.com.leetcode.maxDepth;

public class MaxDepth {
  public static void main(String[] args) {

  }
  public int maxDepth(TreeNode root) {
      if(root == null) {
        return 0;
      }
      return Math.max(maxDepth(root.left),maxDepth(root.right)) + 1;
  }
}


class TreeNode {
  int val;
  TreeNode left;
 TreeNode right;

  TreeNode() {
  }

  TreeNode(int val) {
    this.val = val;
  }

  TreeNode(int val, TreeNode left, TreeNode right) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}
```
### [136. 只出现一次的数字](https://leetcode.cn/problems/single-number/description/)
```java
package src.com.leetcode.singleNumber;

public class SingleNumber {
  public static void main(String[] args) {
    int[] nums= {4,1,2,1,2};
    System.out.println(singleNumber(nums));
  }
  public static int singleNumber(int[] nums) {
    int result = 0;
    for(int num:nums) {
      result = result ^ num;
    }
    return result;
  }
}

```
### [338. 比特位计数](https://leetcode.cn/problems/counting-bits/description/)
```java
package src.com.leetcode.countBits;

import java.util.Arrays;

public class CountBits {
  public static void main(String[] args) {
    int[] ints = countBits(2);
    System.out.println(Arrays.toString(ints));
  }
  public static int[] countBits(int n) {
      int[] bits = new int[n+1];
      for(int i=1;i <=n;i++) {
        bits[i] = bits[i &(i-1)] +1;
      }
      return bits;
  }
}

```
### [415. 字符串相加](https://leetcode.cn/problems/add-strings/description/)
```java
package src.com.leetcode.decodeString;

public class DecodeString {
  public static void main(String[] args) {
      String num1 = "11";
      String num2 = "123";

    String str = addStrings(num1, num2);
    System.out.println(str);

  }

  public static String addStrings(String num1, String num2) {
    StringBuffer sb = new StringBuffer();
    int carry = 0;
    for(int i= num1.length() - 1,j = num2.length() - 1;i >=0 || j >=0 || carry == 1;i--,j--) {
      int x = i < 0 ? 0:num1.charAt(i) - '0';
      int y = j < 0 ? 0:num2.charAt(j) - '0';
      sb.append((x + y + carry) % 10);
      carry = (x + y + carry) / 10;
    }
    return sb.reverse().toString();
  }

}

```
### [344. 反转字符串](https://leetcode.cn/problems/reverse-string/description/)
```java
package src.com.leetcode.reverseString;

public class ReverseString {
  public static void main(String[] args) {
    char[] s = {'h','e','l','l','o'};
    reverseString(s);

    System.out.println(s);

  }
  public static void reverseString(char[] s) {
    int n = s.length;
    for(int left = 0,right = n - 1;left < right;++left,--right) {
      char temp = s[left];
      s[left] = s[right];
      s[right] = temp;
    }
  }
}

//----------------------------------------------
package main

import "fmt"

func main() {
	s := []byte{'h', 'e', 'l', 'l', 'o'}
	reverseString(s)

	fmt.Println(string(s))
}
func reverseString(s []byte) {
	for left, right := 0, len(s)-1; left < right; left++ {
		s[left], s[right] = s[right], s[left]
		right--
	}
}


```
### [414 第三大的数](https://leetcode.cn/problems/third-maximum-number/description/)
```java
package src.com.leetcode.thirdMax;

import java.util.Arrays;

public class ThirdMax {
  public static void main(String[] args) {
    int[] arr = {3,2,1};
    int i = thirdMax(arr);
    System.out.println(i);

  }
  public static int thirdMax(int[] nums) {
    Arrays.sort(nums);
    reverse(nums);

    for(int i=1,diff = 1;i < nums.length;i++) {
      if(nums[i] != nums[i - 1] && ++diff == 3) {
        return nums[i];
      }
    }
    return nums[0];
  }
  public static void reverse(int[] nums) {
    int left = 0,right = nums.length - 1;
    while (left < right) {
      int temp = nums[left];
      nums[left] = nums[right];
      nums[right] = temp;
      left++;
      right--;
    }
  }
}

```


 <!-- [last](https://www.bilibili.com/video/BV1eg411w7gn?p=45&vd_source=e38cd951f2ee7bda48ec574f4e9ba363) -->