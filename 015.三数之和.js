// 给你一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？请你找出所有满足条件且不重复的三元组。
// 注意：答案中不可以包含重复的三元组。

// 示例：
// 给定数组 nums = [-1, 0, 1, 2, -1, -4]，
// 满足要求的三元组集合为：
// [
//   [-1, 0, 1],
//   [-1, -1, 2]
// ]

// 链接：https://leetcode-cn.com/problems/3sum


/**
 * O(n^3) 三重循环是最容易想到的，但一定超时
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function(nums) {
    let resList = [];
    // 排序保证 i <= j <= k 可以去除一部分重复
    nums.sort((a, b) => a - b);
    for(let i = 0; i < nums.length; i++) {
        // 每重循环要检查该元素和上一个元素是否相同，相同则直接绕过去（排除第一个元素）
        if (i !== 0 && nums[i] === nums[i-1]) {
            continue;
        }
        for (let j = i + 1; j < nums.length; j++) {
            if (j !== i + 1 && nums[j] === nums[j-1]) {
                continue;
            }
            for (let k = j + 1; k < nums.length; k++) {
                if (k !== j + 1 && nums[k] === nums[k-1]) {
                    continue;
                }
                if (nums[i] + nums[j] + nums[k] === 0) {
                    resList.push([nums[i], nums[j], nums[k]]);
                }
            }
        }
    }
    return resList;
};

/**
 * 对上方方法优化
 * 1.当我们选定 i 时，我们要去选择合适的 j，k，并且 j <= k
 * 2.当我们在递增的遍历 j ，去寻找 k 时，我们发现规律：j1 对应的 k1 和继续遍历找到的 j2 对应的 k2 有这种关系，j1 < j2 => k1 > k2
 * 3.所以当我们顺序遍历 j 的时候，可以逆序的去找 k，且当前 k 的起点为上一个被匹配到的 k 的位置
 * 4.这种做法在遍历 j 的时候，同步在缩短 j 和 k 的遍历长度，所以二重循环的复杂度为 n，总计就是 n^2 + nlogn = n^2 快的多
 * 5.这就是双指针
 */
threeSum = function(nums) {
    let resList = [];
    // 排序保证 i <= j <= k 可以去除一部分重复
    nums.sort((a, b) => a - b);
    for(let i = 0; i < nums.length; i++) {
        // 每重循环要检查该元素和上一个元素是否相同，相同则直接绕过去（排除第一个元素）
        if (i !== 0 && nums[i] === nums[i-1]) {
            continue;
        }
        let kEnd = nums.length - 1;
        for (let j = i + 1; j < nums.length; j++) {
            if (j !== i + 1 && nums[j] === nums[j-1]) {
                continue;
            }
            while(nums[i] + nums[j] + nums[kEnd] > 0) {
                kEnd--;
            }
            if (j >= kEnd) break;
            if (nums[i] + nums[j] + nums[kEnd] === 0) {
                resList.push([nums[i], nums[j], nums[kEnd]]);
            }
        }
    }
    return resList;
};

console.log(threeSum([-1,0,1,2,-1,-4]));