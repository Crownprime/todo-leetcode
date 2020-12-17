// 给定一个非空整数数组，除了某个元素只出现一次以外，其余每个元素均出现两次。找出那个只出现了一次的元素。
// 说明：你的算法应该具有线性时间复杂度。 你可以不使用额外空间来实现吗？
// 链接：https://leetcode-cn.com/problems/single-number

/**
 * 最简易的方法，遍历数组，申请额外空间 list，若 list 中无该数字则 push，否则删除，最终留着的项就是只出现一次的
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function(nums) {
    let list = [];
    for(let i = 0; i < nums.length; i++) {
        if (-1 == list.indexOf(nums[i])) {
            list.push(nums[i]);
        } else {
            list.splice(list.indexOf(nums[i]), 1);
        }
    }
    return list[0];
};


/**
 * 位运算
 * a ^ 0 = a
 * a ^ a = 0
 * a ^ b ^ a = a ^ a ^ b = 0 ^ b = b
 * @param {number[]} nums
 * @return {number}
 */
singleNumber = function(nums) {
    let res = 0;
    nums.forEach(item => res ^= item);
    return res;
};

console.log(singleNumber([4,1,2,1,2]));