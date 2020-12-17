// 给定一个整数 n，返回 n! 结果尾数中零的数量。
// 说明: 你算法的时间复杂度应为 O(log n) 。
// 输入: 5
// 输出: 1
// 解释: 5! = 120, 尾数中有 1 个零.

/**
 * n 的阶乘拆解就是 1*2*3*....*n，题中要末尾的 0 的个数
 * 只有 * 10 才会在末尾增加一个 0，出现 10 的可能性很多，所以把大数拆解成 2 * 5，判断有几对就是几个 0
 * 在连续自然数中 2 一定比 5 多，所以判断 5 的个数即可
 * @param {number} n
 * @return {number}
 */
var trailingZeroes = function(n) {
    let count = 0;
    // 从大往小循环
    while(n) {
        // 遇到 5 的倍数，计数。并且往下跳 5 个单位
        if (0 === n % 5) {
            let t = n;
            // 如果是 5 的倍数，需要确定里面有几个 5 的因子，例如 25 就是两个 5
            while(0 === t % 5) {
                count++;
                t = t / 5;
            }
            n -= 5;
        } else {
            // 不是 5 的倍数就往下走 1 个单位
            n--;
        }
    }
    return count;
};

/**
 * 解题思想相同，找 5，不过解法更巧妙
 * 1.由于每隔 5 个数就必有一个数可以被 5 整除，所以可以把所有数按 5 个一组分，有a组则至少有a个数是5的倍数，count += a；
 * 2.若 a >= 5，则说明里面有个数还可以被 25 整除，所以要对 a 循环的做除法，count 累加
 */
trailingZeroes = function(n) {
    let count = 0;
    // 从大往小循环
    while(n >= 5) {
        count += n = Math.floor(n / 5);
    }
    return count;
};

console.log(trailingZeroes(5));