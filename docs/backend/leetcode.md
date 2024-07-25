# leetcode
## 认识复杂度和简单排序算法

### 常数时间的操作
- 一个操作如果和样本的数量没有关系，每次都是固定时间内完成的操作，叫作常数操作。
- 时间复杂度在一个算法流程中，常数操作数量的一个指标。常数O（读作big O）来表示，具体来说先要对一个算法流程非常熟悉，然后去写出这个算法流程中发生了多少常数操作，进而总结出常数操作数量的表过式。
- 在表过式中只要高阶项，不要低阶项，要不要高阶项的系数，剩下的部分如果为f(N),那么时间复杂度为O(f(N));
- 评价一个算法流程的好坏，先看时间复杂度的指标，然后再分析不同数据样本下的实际运行时间，也就是“常数项时间”。

# leetcode
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

