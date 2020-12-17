// 给定一个字符串，验证它是否是回文串，只考虑字母和数字字符，可以忽略字母的大小写。
// 说明：本题中，我们将空字符串定义为有效的回文串。

/**
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function(s) {
    if (!s) return true;
    // 全转小写
    let str = s.toLowerCase();
    // 把数字和小写字母以外的都排除
    str = str.replace(/[^a-z0-9]/g, "");
    let n = 0;
    // 头尾循环比较
    while(n < str.length - 1 - n) {
        if (str[n] != str[str.length - 1 - n]) {
            return false;
        }
        n++;
    }
    return true;
};