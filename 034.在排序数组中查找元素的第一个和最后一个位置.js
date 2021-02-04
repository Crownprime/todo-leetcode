// 给定一个按照升序排列的整数数组 nums，和一个目标值 target。找出给定目标值在数组中的开始位置和结束位置。
// 如果数组中不存在目标值 target，返回 [-1, -1]。

// 进阶：
// 你可以设计并实现时间复杂度为 O(log n) 的算法解决此问题吗？

// 示例 1：
// 输入：nums = [5,7,7,8,8,10], target = 8
// 输出：[3,4]
// 示例 2：
// 输入：nums = [5,7,7,8,8,10], target = 6
// 输出：[-1,-1]
// 示例 3：
// 输入：nums = [], target = 0
// 输出：[-1,-1]
//  
// 提示：

// 0 <= nums.length <= 105
// -109 <= nums[i] <= 109
// nums 是一个非递减数组
// -109 <= target <= 109

// 链接：https://leetcode-cn.com/problems/find-first-and-last-position-of-element-in-sorted-array

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
// 最暴力的一遍循环方法
var searchRange = function(nums, target) {
    let res = [-1, -1];
    nums.forEach((item, index) => {
        // 循环到数值与目标值相同时触发操作
        if (item === target) {
            // 如果该目标前面没有值（边界情况），则必是开始值
            // 如果目标前面有值，但小于目标值。则必是开始值
            if (undefined === nums[index - 1] || (undefined !== nums[index - 1] && nums[index - 1] < target)) {
                res[0] = index;
            }
            if (undefined === nums[index + 1] || (undefined !== nums[index + 1] && nums[index + 1] > target)) {
                res[1] = index;
            }
        }
    });
    return res;
};

// 虽然循环逻辑变少了，但貌似 for 本身比 forEach 慢
searchRange = function(nums, target) {
    let res = [-1, -1];
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] > target) return res;
        if (nums[i] === target) {
            if (i === 0 || (i > 0 && nums[i - 1] < target)) {
                res[0] = i;
            }
            if (i === nums.length - 1 || (i < nums.length - 1 && nums[i + 1] > target)) {
                res[1] = i;
                return res;
            }
        }
    }
    return res;
}

/**
 * 二分查找
 */
searchRange = function(nums, target) {
    // 其实是找第一个等于 target 的数字和最后一个 target 的数字
    // 第一个相对容易
    // 最后一个需要转化为最靠近 target 的数字然后 -1
    // 进行两次二分查找
    let left = binarySearch(true);
    let right = binarySearch() - 1;

    if (left >= 0 && right <= nums.length && left <= right) {
        return [left, right];
    }
    /**
     * 
     * @param {*} isLeft 
     */
    function binarySearch(isLeft) {
        // 默认为数组长度的原因是，处理 [target] 的情况
        let res = nums.length;
        let left = 0, right = nums.length - 1;
        while (left <= right) {
            let mid = Math.floor((left + right) / 2);
            if (nums[mid] > target || (isLeft && nums[mid] >= target)) {
                right = mid - 1;
                res = mid;
            } else {
                left = mid + 1;
            }
        }
        return res;
    }

    return [-1, -1];
}


console.log(searchRange([5,7,7,8,8,10], 8));
console.log(searchRange([8], 8));