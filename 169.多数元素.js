// 给定一个大小为 n 的数组，找到其中的多数元素。多数元素是指在数组中出现次数大于 ⌊ n/2 ⌋ 的元素。
// 你可以假设数组是非空的，并且给定的数组总是存在多数元素。
// 链接：https://leetcode-cn.com/problems/majority-element

/**
 * 遍历一遍，用哈希表计数，时间复杂度为 n，空间复杂度为 n
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function(nums) {
    let hashMap = {}, max = [0];
    nums.forEach(item => {
        if (hashMap[item]) {
            hashMap[item]++;
        } else {
            hashMap[item] = 1;
        }
    });
    for (key in hashMap) {
        if (hashMap[key] > max[0]) {
            max[0] = hashMap[key];
            max[1] = key;
        }
    }
    return max[1];
};

/**
 * 还可以排序，顺序数组下标为 n/2 的必然是众数
 */
majorityElement = function(nums) {
    return nums.sort()[parseInt(nums.length / 2)];
};

/**
 * Boyer-Moore 投票算法
 * 非常灵性的算法，把众数计为 1，非众数计为 -1，那么数组和必然是大于 0 的
 * 当我们关心众数的时候，设定为 a，其实其他非众数我们不太关心他具体是什么数字，所以完全可以视为一种数字 b，
 * 若只有两种数字a，b 这种算法就变得容易懂
 * 贴一个具体的解释：
 * 1.如果候选人不是maj 则 maj,会和其他非候选人一起反对 会反对候选人,所以候选人一定会下台(maj==0时发生换届选举)
 * 2.如果候选人是maj , 则maj 会支持自己，其他候选人会反对，同样因为maj 票数超过一半，所以maj 一定会成功当选
 */
majorityElement = function(nums) {
    let mj = null, count = 0;
    for(let i = 0; i < nums.length; i++) {
        if (!count) {
            mj = nums[i];
        }
        count += (mj == nums[i]) ? 1 : -1;
    }
    return mj;
};

console.log(majorityElement([2,2,1,1,1,2,2]));