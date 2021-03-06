// 升序排列的整数数组 nums 在预先未知的某个点上进行了旋转（例如， [0,1,2,4,5,6,7] 经旋转后可能变为 [4,5,6,7,0,1,2] ）。
// 请你在数组中搜索 target ，如果数组中存在这个目标值，则返回它的索引，否则返回 -1 。

// 示例 1：
// 输入：nums = [4,5,6,7,0,1,2], target = 0
// 输出：4
// 示例 2：
// 输入：nums = [4,5,6,7,0,1,2], target = 3
// 输出：-1
// 示例 3：
// 输入：nums = [1], target = 0
// 输出：-1
//  
// 提示：
// 1 <= nums.length <= 5000
// -10^4 <= nums[i] <= 10^4
// nums 中的每个值都 独一无二
// nums 肯定会在某个点上旋转
// -10^4 <= target <= 10^4

// 链接：https://leetcode-cn.com/problems/search-in-rotated-sorted-array

/**
 * 直接循环匹配
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function(nums, target) {
    for(let i = 0; i < nums.length; i++) {
        if (nums[i] === target) {
            return i;
        }
    }
    return -1;
};

// 面对顺序数组查找，最快的就二分查找，这边的场景接近顺序数组
search = function(nums, target) {
    let left = 0;
    let right = nums.length - 1;
    while(left <= right) {
        let mid = parseInt((left + right)/ 2);
        if (nums[mid] == target) {
            return mid;
        } else if (nums[mid] > nums[left]) {
            if (nums[mid] > target && nums[left] <= target) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        } else {
            if (nums[mid] < target && nums[right] <= target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
    }
};