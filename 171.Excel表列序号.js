// 给定一个Excel表格中的列名称，返回其相应的列序号。
// 和 168 相逆

/**
 * @param {string} s
 * @return {number}
 */
var titleToNumber = function(s) {
    let ln = s.length - 1;
    let sum = 0;
    s.split("").forEach(item => {
        // 字符转 ascii
        let val = item.charCodeAt() - 64;
        // 26 进制，用指数算是一种投机不用倒序，第几位就是 26 的几次方 * 位置上的数
        sum += val * Math.pow(26, ln);
        ln--;
    });
    return sum;
};

console.log(titleToNumber('ZY'));