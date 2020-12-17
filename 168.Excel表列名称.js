// 给定一个正整数，返回它在 Excel 表中相对应的列名称。

/**
 * 类似 26 进制，唯一的问题是没有 0，
 * 所以在进位的时候需要做一个判断，如果余数是 0，则除数减 1，并且将余数赋值为 26 即 z
 * @param {number} n
 * @return {string}
 */
var convertToTitle = function(n) {
    if (!n) return false;
    let map = ['Z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    let res = "";
    while(n) {
        let y = n % 26, c = parseInt(n / 26);
        // 余数为 0 的情况要特殊处理
        if (!y) {
            // 改到 z
            y = 26;
            // 除数 -1
            c--;
        }
        res = map[y] + res;
        n = c;
    }
    return res;
};

/**
 * 另一种解法，在每次处理之前 -1。
 * 值：     1 2 3 4 5 6
 * 字母：   A B C D E F
 * 索引：   0 1 2 3 4 5
 * 把值转化成索引来避免处理边界问题，
 * 其实相当于把 A 的代表数字变成了 0，来填补 0 不存在的问题
 */
convertToTitle = function(n) {
    if (!n) return false;
    let res = "";
    while(n) {
        // 关键步骤，不是减除数或者余数，而是直接减 1
        n -= 1;
        // 用数字转 ascii 方法直接转，可以节省 map 的空间
        res = String.fromCharCode(65 + n % 26) + res;
        n = parseInt(n / 26);
    }
    return res;
};

console.log(convertToTitle(701));