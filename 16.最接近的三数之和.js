// 给定一个包括 n 个整数的数组 nums 和 一个目标值 target。找出 nums 中的三个整数，使得它们的和与 target 最接近。返回这三个数的和。假定每组输入只存在唯一答案。

// 示例：
// 输入：nums = [-1,2,1,-4], target = 1
// 输出：2
// 解释：与 target 最接近的和是 2 (-1 + 2 + 1 = 2) 。

// 链接：https://leetcode-cn.com/problems/3sum-closest

/**
 * 三重循环改造
 * 先排序，然后确定 i 值，j，k 双指针
 * 不过与 15 不同的是，这次 j，k几乎并列移动
 * 假设 t = nums[i] + nums[j] + nums[k]
 * 1.t < target，则 j++
 * 2.t > target，则 k--
 * 在这同时不断判断大小，注意初始值
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var threeSumClosest = function(nums, target) {
    nums.sort((a, b) => a - b);
    let res = null;
    for(let i = 0; i < nums.length; i++) {
        let j = i + 1;
        let k = nums.length - 1;
        while(j < k) {
            let _t = nums[i] + nums[j] + nums[k];
            if (Math.abs(target - _t) < Math.abs(target - res) || res === null) {
                res = _t;
            }
            if (_t == target) {
                return _t;
            } else if (_t < target) {
                j++;
            } else {
                k--;
            }
        }
    }
    return res;
};

console.log(threeSumClosest([1,2,4,8,16,32,64,128], 82));