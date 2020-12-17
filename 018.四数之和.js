// 给定一个包含 n 个整数的数组 nums 和一个目标值 target，判断 nums 中是否存在四个元素 a，b，c 和 d ，使得 a + b + c + d 的值与 target 相等？找出所有满足条件且不重复的四元组。

// 注意：
// 答案中不可以包含重复的四元组。

// 示例：
// 给定数组 nums = [1, 0, -1, 0, -2, 2]，和 target = 0。
// 满足要求的四元组集合为：
// [
//   [-1,  0, 0, 1],
//   [-2, -1, 1, 2],
//   [-2,  0, 0, 2]
// ]

// 链接：https://leetcode-cn.com/problems/4sum

/**
 * 排序 + 双指针
 * 和 15、16都类似
 * 这种题的诀窍就是先把多重循环都写出来，然后改最后两重循环为双指针
 * @param {number[]} nums
 * @param {number} target
 * @return {number[][]}
 */
var fourSum = function(nums, target) {
    nums.sort((a, b) => a - b);
    let resList = [];
    for(let i = 0; i < nums.length; i++) {
        if (i !== 0 && nums[i] == nums[i - 1]) {
            continue;
        }
        for(let j = i + 1; j < nums.length; j++) {
            if (j !== i + 1 && nums[j] == nums[j - 1]) {
                continue;
            }
            let x = nums.length - 1;
            for(let k = j + 1; k < nums.length; k++) {
                if (k !== j + 1 && nums[k] == nums[k - 1]) {
                    continue;
                }
                while(nums[i] + nums[j] + nums[k] + nums[x] > target && x > k) {
                    x--;
                }
                if (x <= k) break;
                if (target == nums[i] + nums[j] + nums[k] + nums[x]) {
                    resList.push([nums[i], nums[j], nums[k], nums[x]]);
                }
            }
        }
    }
    return resList;
};

console.log(fourSum([1, 0, -1, 0, -2, 2], 0));