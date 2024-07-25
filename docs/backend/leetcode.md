# leetcode
| 项目              | 地址                                           |
| :----------------------- | :--------------------------------------- |
| 晓智科技                 | [晓智科技](https://xiaozhi.shop)|
| 晓智文档                 | [晓智文档](https://doc.xiaozhi.shop/backend/elastic) |
| 源码地址                 | [源码地址](https://github.com/dezhizhang/java-awesome/tree/main/es)|
| 文档源码                 | [文档源码](https://github.com/dezhizhang/doc) |

### 认识复杂度和简单排序算法

###### 常数时间的操作
- 一个操作如果和样本的数量没有关系，每次都是固定时间内完成的操作，叫作常数操作。
- 时间复杂度在一个算法流程中，常数操作数量的一个指标。常数O（读作big O）来表示，具体来说先要对一个算法流程非常熟悉，然后去写出这个算法流程中发生了多少常数操作，进而总结出常数操作数量的表过式。
- 在表过式中只要高阶项，不要低阶项，要不要高阶项的系数，剩下的部分如果为f(N),那么时间复杂度为O(f(N));
- 评价一个算法流程的好坏，先看时间复杂度的指标，然后再分析不同数据样本下的实际运行时间，也就是“常数项时间”。

### 爬楼梯
- 假设你正在爬楼梯。需要 n 阶你才能到达楼顶。
- 每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？

```java
package shop.xiaozhi.climbstairs;

import java.util.HashMap;
import java.util.Map;

//假设你正在爬楼梯。需要 n 阶你才能到达楼顶。
//每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？
//https://leetcode.cn/problems/climbing-stairs/description/
public class Solution {
    private static final Map<Integer, Integer> storeMap = new HashMap<>();
    public static void main(String[] args) {
        int res = climbStairs(12);
        System.out.println(res);
    }
    public static int climbStairs(int n) {
        if(n == 1) return 1;
        if(n == 2) return 2;

        if(null != storeMap.get(n)) {
            return storeMap.get(n);
        }else {
            int result = climbStairs(n - 1) + climbStairs(n -2);
            storeMap.put(n,result);
            return result;
        }
    }
    public static int climbStairs1(int n) {
        if(n == 1) return 1;
        if(n == 2) return 2;

        int result = 0;
        int pre = 2;
        int prePre = 1;

        for(int i=3;i <=n;i++) {
            result = pre + prePre;
            prePre = pre;
            pre = result;
        }
        return  result;
    }
}
```
### 两数之和
- 给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出 和为目标值 target  的那 两个 整数，并返回它们的数组下标。
- 你可以假设每种输入只会对应一个答案。但是，数组中同一个元素在答案里不能重复出现。你可以按任意顺序返回答案。
```java
package shop.xiaozhi.twosum;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

//https://leetcode.cn/problems/two-sum/
//给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出 和为目标值 target  的那 两个 整数，并返回它们的数组下标。
//你可以假设每种输入只会对应一个答案。但是，数组中同一个元素在答案里不能重复出现。你可以按任意顺序返回答案。
public class Solution {
    public static void main(String[] args) {
        int[] nums = {2,7,11,15};
        int[] index = twoSum1(nums, 9);
        System.out.println(Arrays.toString(index));
    }
    public  static int[] twoSum(int[] nums,int target) {
        int[] result = new int[2];
        for(int i=0;i <nums.length;i++) {
            for(int j=i+1;j < nums.length;j++) {
                if(nums[i] + nums[j] == target) {
                    result[0] = i;
                    result[1] = j;
                    return result;
                }
            }
        }
        return result;
    }
    public static int[] twoSum1(int[] nums,int target) {
        Map<Integer,Integer> storeNums = new HashMap<>(nums.length);

        int[] result = new int[2];

        for(int i=0;i < nums.length;i++) {
            int another = target - nums[i];
            Integer index = storeNums.get(another);
            if(null != index) {
                result[0] = index;
                result[1] = i;
                return result;
            }else {
                storeNums.put(nums[i],i);
            }
        }
        return result;
    }
}
```
### 合并两个有序数组
- 给你两个按 非递减顺序 排列的整数数组 nums1 和 nums2，另有两个整数 m 和 n ，分别表示 nums1 和 nums2 中的元素数目。
- 请你 合并 nums2 到 nums1 中，使合并后的数组同样按 非递减顺序 排列。
- 注意：最终，合并后数组不应由函数返回，而是存储在数组 nums1 中。为了应对这种情况，nums1 的初始长度为 m + n，其中前 m 个元素表示应合并的元素，后 n 个元素为 0 ，应忽略。nums2 的长度为 n 。
```java
package shop.xiaozhi.merge;
import java.util.Arrays;
//给你两个按 非递减顺序 排列的整数数组 nums1 和 nums2，另有两个整数 m 和 n ，分别表示 nums1 和 nums2 中的元素数目。
//请你 合并 nums2 到 nums1 中，使合并后的数组同样按 非递减顺序 排列。
//注意：最终，合并后数组不应由函数返回，而是存储在数组 nums1 中。为了应对这种情况，nums1 的初始长度为 m + n，其中前 m 个元素表示应合并的元素，后 n 个元素为 0 ，应忽略。nums2 的长度为 n 。
// https://leetcode.cn/problems/merge-sorted-array/description/
public class Solution {
    public static void main(String[] args) {
        int[] nums1 = {1,2,3,0,0,0};
        int[] nums2 = {2,5,6};
        merge1(nums1,3,nums2,3);

        System.out.println(Arrays.toString(nums1));
    }
    public static void merge(int[] nums1,int m,int[] nums2,int n) {
        int k = m + n;
        int[] temp = new int[k];
        for(int index = 0,nums1Index = 0,nums2Index = 0; index < k;index++) {
            if(nums1Index >= m) {
                // mums1数组已经取完完全取nums2数组的值即可
                temp[index] = nums2[nums2Index++];
            }else if(nums2Index >= n) {
                // mums2数组已经取完，完全取nums1数组的值即可
                temp[index] = nums1[nums1Index++];
            }else if(nums1[nums1Index] < nums2[nums2Index]) {
                // nums1数组的元素小于num2数组,取nums1数据的值
                temp[index] = nums1[nums1Index++];
            }else {
                temp[index] = nums2[nums2Index++];
            }
        }

        for(int i=0;i < k;i++) {
            nums1[i] = temp[i];
        }
    }
    public static void merge1(int[] nums1,int m,int[] nums2,int n) {
        int k = m + n;
        for(int index = k -1,nums1Index = m - 1,nums2Index = n-1;index >=0;index--) {
            if(nums1Index < 0) {
                // nums1已经取完，完全取nums2的值即可
                nums1[index] = nums2[nums2Index--];
            }else if(nums2Index <0) {
                // nums已取完，完全取nums1的值即可
                break;
            }else if(nums1[nums1Index] > nums2[nums2Index]) {
                // nums1的元素大于nums2取nums1值
                nums1[index] = nums1[nums1Index--];
            }else {
                //nums2的元素值大于等于nums1取nums的值
                nums1[index] = nums2[nums2Index--];
            }
        }
    }
}
```
### 移动零
- 给定一个数组 nums，编写一个函数将所有 0 移动到数组的末尾，同时保持非零元素的相对顺序。
- 请注意 ，必须在不复制数组的情况下原地对数组进行操作。
```java
package shop.xiaozhi.movezero;
import java.util.Arrays;

//给定一个数组 nums，编写一个函数将所有 0 移动到数组的末尾，同时保持非零元素的相对顺序。
//请注意 ，必须在不复制数组的情况下原地对数组进行操作。
// https://leetcode.cn/problems/move-zeroes/description/
public class Solution {
    public static void main(String[] args) {
        int[] nums = {0,1,0,3,12};
        moveZeroes(nums);
        System.out.println(Arrays.toString(nums));
    }
    public static void moveZeroes(int[] nums) {
        if(nums == null) {
            return;
        }
        // 第一次遍历j指针记录非0的个数，只要是非0的统统都赋给nums[j]
        int j=0;
        for(int i=0;i < nums.length;i++) {
            if(nums[i]!=0) {
                nums[j++] = nums[i];
            }
        }

        for(int i=j;i < nums.length;i++) {
            nums[i] = 0;
        }
    }
}
```
###  找到所有数组中消失的数字
- 给你一个含 n 个整数的数组 nums ，其中 nums[i] 在区间 [1, n] 内。请你找出所有在 [1, n] 范围内但没有出现在 nums 中的数字，并以数组的形式返回结果。
```java
package shop.xiaozhi.disappeared;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
// 找到所有数组中消失的数字
// 给你一个含 n 个整数的数组 nums ，其中 nums[i] 在区间 [1, n] 内。请你找出所有在 [1, n] 范围内但没有出现在 nums 中的数字，并以数组的形式返回结果。
// https://leetcode.cn/problems/find-all-numbers-disappeared-in-an-array/description/
public class Solution {
    public static void main(String[] args) {
        int[] nums = {4, 3, 2, 7, 8, 2, 3, 1};
        List<Integer> disappearedNumbers = findDisappearedNumbers(nums);

        System.out.println(disappearedNumbers);
    }
    public static List<Integer> findDisappearedNumbers(int[] nums) {
        int n = nums.length;
        for (int num : nums) {
            int x = (num - 1) % n;

            nums[x] += n;
        }

        System.out.println(Arrays.toString(nums));

        List<Integer> result = new ArrayList<Integer>();

        for (int i = 0; i < n; i++) {
            if (nums[i] <= n) {
                result.add(i + 1);
            }
        }
        return result;
    }
}
```
### 合并两个有序链表
- 将两个升序链表合并为一个新的 升序 链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。 
```java
package shop.xiaozhi.mergetwo;
public class Solution {
    public static void main(String[] args) {

    }
    public static ListNode mergeTwoLists(ListNode list1, ListNode list2) {
        if (list1 == null) return list2;
        if (list2 == null) return list1;
        ListNode resultNode = new ListNode(0);
        ListNode p = resultNode;
        while (list1 != null && list2 != null) {
            if (list1.val < list2.val) {
                p.next = list1;
                list1 = list1.next;
            } else {
                p.next = list2;
                list2 = list2.next;
            }

            p = p.next;
        }
        if (list1 != null) p.next = list1;
        if (list2 != null) p.next = list2;
        return resultNode.next;

    }
    public static ListNode mergeTwoLists2(ListNode list1, ListNode list2) {
        if(list1 == null) return list2;
        if(list2 == null) return list1;

        if(list1.val < list2.val) {
            list1.next = mergeTwoLists2(list1.next,list2);
            return list1;
        }
        list2.next = mergeTwoLists2(list1,list2.next);
        return list2;

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
### 删除排序链表中的重复元素
- 给定一个已排序的链表的头 head ， 删除所有重复的元素，使每个元素只出现一次 。返回 已排序的链表 。
```java
package shop.xiaozhi.deleteDuplicates;
// 删除排序链表中的重复元素
// 给定一个已排序的链表的头 head ， 删除所有重复的元素，使每个元素只出现一次 。返回 已排序的链表 。
// https://leetcode.cn/problems/remove-duplicates-from-sorted-list/description/
public class Solution {
    public static void main(String[] args) {

    }
    public ListNode deleteDuplicates(ListNode head) {
        if (head == null) {
            return head;
        }
        ListNode currentNode = head;
        while (null != currentNode.next) {
            if (currentNode.next.val == currentNode.val) {
                currentNode.next = currentNode.next.next;
            } else {
                currentNode = currentNode.next;
            }
        }
        return head;
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
### 环形链表
- 给你一个链表的头节点 head ，判断链表中是否有环。
- 如果链表中有某个节点，可以通过连续跟踪 next 指针再次到达，则链表中存在环。 为了表示给定链表中的环，评测系统内部使用整数 pos 来表示链表尾连接到链表中的位置（索引从 0 开始）。注意：pos 不作为参数进行传递 。仅仅是为了标识链表的实际情况。
- 如果链表中存在环 ，则返回 true 。 否则，返回 false 。
```java
package shop.xiaozhi.hasCycle;
//环形链表
//给你一个链表的头节点 head ，判断链表中是否有环。
// 如果链表中有某个节点，可以通过连续跟踪 next 指针再次到达，则链表中存在环。 为了表示给定链表中的环，评测系统内部使用整数 pos 来表示链表尾连接到链表中的位置（索引从 0 开始）。注意：pos 不作为参数进行传递 。仅仅是为了标识链表的实际情况。
// 如果链表中存在环 ，则返回 true 。 否则，返回 false 。
// https://leetcode.cn/problems/linked-list-cycle/description/
public class Solution {
    public static void main(String[] args) {
    }
    public boolean hasCycle(ListNode head) {
        if (head == null) return false;
        ListNode slowPtr = head;
        ListNode fastPtr = head;

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
### 环形链表 II
- 给定一个链表的头节点  head ，返回链表开始入环的第一个节点。 如果链表无环，则返回 null。
- 如果链表中有某个节点，可以通过连续跟踪 next 指针再次到达，则链表中存在环。 为了表示给定链表中的环，评测系统内部使用整数 pos 来表示链表尾连接到链表中的位置（索引从 0 开始）。如果 pos 是 -1，则在该链表中没有环。注意：pos 不作为参数进行传递，仅仅是为了标识链表的实际情况。
- 不允许修改 链表
```java
package shop.xiaozhi.detectCycle;
//  环形链表 II
//给定一个链表的头节点  head ，返回链表开始入环的第一个节点。 如果链表无环，则返回 null。
// 如果链表中有某个节点，可以通过连续跟踪 next 指针再次到达，则链表中存在环。 为了表示给定链表中的环，评测系统内部使用整数 pos 来表示链表尾连接到链表中的位置（索引从 0 开始）。如果 pos 是 -1，则在该链表中没有环。注意：pos 不作为参数进行传递，仅仅是为了标识链表的实际情况
// 不允许修改 链表。
// https://leetcode.cn/problems/linked-list-cycle-ii/description/
public class Solution {
    public static void main(String[] args) {
    }

    public ListNode detectCycle(ListNode head) {
        if (head == null) return null;
        ListNode slowPtr = head;
        ListNode fastPtr = head;
        boolean loopExists = false;
        while (fastPtr.next != null && fastPtr.next.next != null) {
            slowPtr = slowPtr.next;
            fastPtr = fastPtr.next.next;

            if (slowPtr == fastPtr) {
                loopExists = true;
                break;
            }
        }
        if (loopExists) {
            slowPtr = head;
            while (slowPtr != fastPtr) {
                fastPtr = fastPtr.next;
                slowPtr = slowPtr.next;
            }
            // 返回环开始结点
            return slowPtr;
        }
        return null;
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
### 相交链表
- 给你两个单链表的头节点 headA 和 headB ，请你找出并返回两个单链表相交的起始节点。如果两个链表不存在相交节点，返回 null 。
- 题目数据 保证 整个链式结构中不存在环。
- 注意，函数返回结果后，链表必须 保持其原始结构 。
```java
package shop.xiaozhi.intersect;
// 相交链表
// https://leetcode.cn/problems/intersection-of-two-linked-lists/description/
public class Solution {
    public static void main(String[] args) {

    }
    public ListNode getIntersectionNode(ListNode headA, ListNode headB) {
        if (headA == null || headB == null) {
            return null;
        }
        ListNode pA = headA;
        ListNode pB = headB;
        while (pA != pB) {
            pA = pA == null ? headB : pA.next;
            pB = pB == null ? headA : pB.next;
        }
        return pA;
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