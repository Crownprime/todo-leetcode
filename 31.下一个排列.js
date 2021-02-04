// 实现获取 下一个排列 的函数，算法需要将给定数字序列重新排列成字典序中下一个更大的排列。
// 如果不存在下一个更大的排列，则将数字重新排列成最小的排列（即升序排列）。
// 必须 原地 修改，只允许使用额外常数空间。

// 示例 1：
// 输入：nums = [1,2,3]
// 输出：[1,3,2]
// 示例 2：
// 输入：nums = [3,2,1]
// 输出：[1,2,3]
// 示例 3：
// 输入：nums = [1,1,5]
// 输出：[1,5,1]
// 示例 4：
// 输入：nums = [1]
// 输出：[1]

// 提示：
// 1 <= nums.length <= 100
// 0 <= nums[i] <= 100

// 链接：https://leetcode-cn.com/problems/next-permutation

/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
// 题目要求非常诡异，接近于找规律.......
// 步骤就是从后向前遍历，找到第一个 i，符合nums[i] < nums[i + 1]，记作left
// 如果 left = -1，表示不存在这种前后关系，表明数组是顺序第减的，只需要最后做个排序就行了
// 如果找到符合的 left，再从后往前找找到第一个 j，满足 nums[j] > nums[left]，记作 right
// 交换 left 和 right 的位置，并且把位置靠前的那个被交换的元素以后的元素做升序排序
var nextPermutation = function(nums) {
    if (nums.length < 2) return nums;
    
    let left = -1;
    let right = nums.length - 1;
    for (let i = nums.length - 2; i >= 0; i--) {
        if (nums[i] < nums[i + 1]) {
            left = i;
            break;
        }
    }
    if (left >= 0) {
        for (let i = nums.length - 1; i > left; i--) {
            if (nums[i] > nums[left]) {
                right = i;
                break;
            }
        }
        let temp = nums[left];
        nums[left] = nums[right];
        nums[right] = temp;
    }
    let arr = nums.splice(left + 1, nums.length - 1 - left);
    nums.push(...arr.sort((a, b) => a - b));

    return nums;
};

console.log(nextPermutation([1,2,3]))