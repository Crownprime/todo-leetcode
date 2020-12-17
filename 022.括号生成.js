// 数字 n 代表生成括号的对数，请你设计一个函数，用于能够生成所有可能的并且 有效的 括号组合。

// 示例：
// 输入：n = 3
// 输出：[
//        "((()))",
//        "(()())",
//        "(())()",
//        "()(())",
//        "()()()"
//      ]

// 链接：https://leetcode-cn.com/problems/generate-parentheses

/**
 * 动态规划
 * n个括号的可能map[n] = (map[i]) + map[j]，其中 i + j = n - 1, i 从 0 到 n - 1遍历
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function(n) {
    let map = [['']];
    for(let i = 1; i <= n; i++) {
        let th = [];
        for (let j = 0; j < i; j++) {
            map[j].forEach(jitem => {
                map[i - j - 1].forEach(kitem => {
                    th.push('(' + jitem + ')' + kitem);
                })
            })
        }
        map.push(th);
    }
    return map[n];
};

/**
 * 回溯法
 * 从空字符串开始枚举所有可能，只是对可能性做一个限制：
 * 1.字符串中的 ( 小于 n 时，才能继续添加 (
 * 2.字符串中的 ) 小于 ( 数量时才能继续添加 )
 * 这两点可以保证得到的字符串中()必然是成对出现，符合要求的
 */
generateParenthesis = function(n) {
    let list = [];
    getGenerateList("", 0, 0);
    return list;
    function getGenerateList(str, open, close) {
        if (str.length == n * 2) {
            list.push(str);
            return;
        }
        if (open < n) {
            getGenerateList(str + '(', open + 1, close);
        }
        if (close < open) {
            getGenerateList(str + ')', open, close + 1);
        }
    }
};

console.log(generateParenthesis(3));