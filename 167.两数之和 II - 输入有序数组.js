// 给定一个已按照升序排列 的有序数组，找到两个数使得它们相加之和等于目标数。
// 函数应该返回这两个下标值 index1 和 index2，其中 index1 必须小于 index2。

// 说明:
// 返回的下标值（index1 和 index2）不是从零开始的。
// 你可以假设每个输入只对应唯一的答案，而且你不可以重复使用相同的元素。

// 链接：https://leetcode-cn.com/problems/two-sum-ii-input-array-is-sorted

/**
 * 因为是有序数组，必然是一大一小相加
 * 设立头尾索引，和与要求值想比较，较小则移动头部索引，较大则移动尾部索引
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(numbers, target) {
    let index1 = 0, index2 = numbers.length - 1;
    while(index1 < index2) {
        if (numbers[index2] + numbers[index1] < target) {
            index1++;
            continue;
        } else if (numbers[index2] + numbers[index1] > target) {
            index2--;
        } else {
            index1++;
            index2++;
            break;
        }
    }
    return [index1, index2];
};

console.log(twoSum([2, 7, 11, 15], 9));