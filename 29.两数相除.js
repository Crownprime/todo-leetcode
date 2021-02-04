// 给定两个整数，被除数 dividend 和除数 divisor。将两数相除，要求不使用乘法、除法和 mod 运算符。
// 返回被除数 dividend 除以除数 divisor 得到的商。
// 整数除法的结果应当截去（truncate）其小数部分，例如：truncate(8.345) = 8 以及 truncate(-2.7335) = -2

// 示例 1:
// 输入: dividend = 10, divisor = 3
// 输出: 3
// 解释: 10/3 = truncate(3.33333..) = truncate(3) = 3
// 示例 2:
// 输入: dividend = 7, divisor = -3
// 输出: -2
// 解释: 7/-3 = truncate(-2.33333..) = -2

// 提示：
// 被除数和除数均为 32 位有符号整数。
// 除数不为 0。
// 假设我们的环境只能存储 32 位有符号整数，其数值范围是 [−231,  231 − 1]。本题中，如果除法结果溢出，则返回 231 − 1。

// 链接：https://leetcode-cn.com/problems/divide-two-integers

/**
 * 当作减法来计算，循环减去，会超时
 * @param {number} dividend
 * @param {number} divisor
 * @return {number}
 */
var divide = function(dividend, divisor) {
    let count = 0;
    let sign = 1;
    if ((dividend < 0 && divisor > 0) || (dividend > 0 && divisor < 0)) {
        sign = -1;
    }
    dividend = Math.abs(dividend);
    divisor = Math.abs(divisor);
    while(dividend >= divisor) {
        dividend -= divisor;
        count += sign;
    }
    if (count > Math.pow(2, 31) - 1) return Math.pow(2, 31) - 1;
    if (count < -Math.pow(2, 31)) return -Math.pow(2, 31);
    return count;
};

/**
 * 根据上述思路做优化：
 * 用减法模拟除法，假设dividend=10，divisor=3，则 10 - 3 = 7 > 3，7 - 3 = 4 > 3 一直减下去，这种循环导致的超时
 * 估如果我们加速除数的滚动 10 - 3*2^0 = 7 > 3，10 - 3*2^1 = 4 > 3， 10 - 3*2^2 = -2 < 3 就可以较快的得出结果
 * 那么为什么乘的一个幂底数要用2而不用其他数字，原因是2相当于二进制向左移动一位，可以排除乘法的使用而且运行开销极小
 */
divide = function(dividend, divisor) {
    // 首先把符号拎出来，这样我们就不要在对符号进行处理
    let sign = 1;
    if ((dividend < 0 && divisor > 0) || (dividend > 0 && divisor < 0)) {
        sign = -1;
    }
    dividend = Math.abs(dividend);
    divisor = Math.abs(divisor);
    // 这里把被除数小于等于除数的情况直接排除，因为会影响到指数计算：
    // divisor * 2^0 = divisor，所以最小是从 divisor 开始做减法
    if (dividend < divisor) return 0;
    if (dividend == divisor) return sign;
    let p = divisor;
    let count = 0;
    // 使用 divisor * 2^count 可以快速让我们逼近被除数，减少循环次数
    while(dividend > p) {
        console.log(p);
        // 由于是正数，若移动到 63 位上会转变成负数，所以要做在想右正移动 0 位，保证是正的
        let temp = p << 1 >>> 0;
        if (temp > dividend) {
            // 已经找到了那个阈值，可以退出指数型的循环
            dividend -= p;
            break;
        } else if (temp == dividend) {
            dividend = 0;
            count++;
            break;
        } else {
            p = temp;
            count++;
        }
    }
    let countx = 0;
    // 回归减法循环
    while(dividend >= divisor) {
        dividend -= divisor;
        countx++;
    }
    // 别忘记处理符号的问题
    let res = (Math.pow(2, count) + countx) * sign;
    // 处理边界值问题
    if (res > Math.pow(2, 31) - 1) return Math.pow(2, 31) - 1;
    if (res < -Math.pow(2, 31)) return -Math.pow(2, 31);
    return res;
};

console.log(divide(1, 1));