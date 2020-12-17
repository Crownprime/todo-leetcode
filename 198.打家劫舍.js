// 你是一个专业的小偷，计划偷窃沿街的房屋。每间房内都藏有一定的现金，影响你偷窃的唯一制约因素就是相邻的房屋装有相互连通的防盗系统，如果两间相邻的房屋在同一晚上被小偷闯入，系统会自动报警。
// 给定一个代表每个房屋存放金额的非负整数数组，计算你 不触动警报装置的情况下 ，一夜之内能够偷窃到的最高金额。

// 示例 1：
// 输入：[1,2,3,1]
// 输出：4
// 解释：偷窃 1 号房屋 (金额 = 1) ，然后偷窃 3 号房屋 (金额 = 3)。
//      偷窃到的最高金额 = 1 + 3 = 4 。

// 示例 2：
// 输入：[2,7,9,3,1]
// 输出：12
// 解释：偷窃 1 号房屋 (金额 = 2), 偷窃 3 号房屋 (金额 = 9)，接着偷窃 5 号房屋 (金额 = 1)。
//      偷窃到的最高金额 = 2 + 9 + 1 = 12 。

// 链接：https://leetcode-cn.com/problems/house-robber

/**
 * 假设 a[i] 为到达房屋 i 时，累计偷窃钱最多的金额，则
 * 1. 偷了 i，则不能偷 i - 1，金额为 a[i-2] + nums[i]
 * 2. 不偷 i，则可以偷 i - 1，金额为 a[i-1]
 * 动态转移方程 a[i] = max{ a[i-2] + nums[i], a[i-1] }
 * @param {number[]} nums
 * @return {number}
 */
var rob = function(nums) {
    // 由于转移方程涉及到后两项，所以至少列举两项，因此可以把一些特殊情况排除
    if (!nums.length) return 0;
    if (nums.length <= 1) return nums[0];
    map = [nums[0], Math.max(nums[0], nums[1])];
    for (let i = 2; i < nums.length; i++) {
        map[i] = Math.max(map[i - 1], map[i - 2] + nums[i]);
    }
    return map[nums.length - 1];
};

// 原理于上面一样，用滚动数组优化内存使用，由于结果只依赖前两项的推导，所以存两项即可
rob = function(nums) {
    if (!nums.length) return 0;
    if (nums.length <= 1) return nums[0];
    let map1 = nums[0], map2 = Math.max(nums[0], nums[1]);
    for (let i = 2; i < nums.length; i++) {
        let temp = map2;
        map2 = Math.max(temp, map1 + nums[i]);
        map1 = temp;
    }
    return map2;
};

console.log(rob([2,7,9,3,1]));