// 判断一个 9x9 的数独是否有效。只需要根据以下规则，验证已经填入的数字是否有效即可。

// 数字 1-9 在每一行只能出现一次。
// 数字 1-9 在每一列只能出现一次。
// 数字 1-9 在每一个以粗实线分隔的 3x3 宫内只能出现一次。

// 示例 1:
// 输入:
// [
//   ["5","3",".",".","7",".",".",".","."],
//   ["6",".",".","1","9","5",".",".","."],
//   [".","9","8",".",".",".",".","6","."],
//   ["8",".",".",".","6",".",".",".","3"],
//   ["4",".",".","8",".","3",".",".","1"],
//   ["7",".",".",".","2",".",".",".","6"],
//   [".","6",".",".",".",".","2","8","."],
//   [".",".",".","4","1","9",".",".","5"],
//   [".",".",".",".","8",".",".","7","9"]
// ]
// 输出: true
// 示例 2:
// 输入:
// [
//   ["8","3",".",".","7",".",".",".","."],
//   ["6",".",".","1","9","5",".",".","."],
//   [".","9","8",".",".",".",".","6","."],
//   ["8",".",".",".","6",".",".",".","3"],
//   ["4",".",".","8",".","3",".",".","1"],
//   ["7",".",".",".","2",".",".",".","6"],
//   [".","6",".",".",".",".","2","8","."],
//   [".",".",".","4","1","9",".",".","5"],
//   [".",".",".",".","8",".",".","7","9"]
// ]
// 输出: false
// 解释: 除了第一行的第一个数字从 5 改为 8 以外，空格内其他数字均与 示例1 相同。
//      但由于位于左上角的 3x3 宫内有两个 8 存在, 因此这个数独是无效的。
// 说明:

// 一个有效的数独（部分已被填充）不一定是可解的。
// 只需要根据以上规则，验证已经填入的数字是否有效即可。
// 给定数独序列只包含数字 1-9 和字符 '.' 。
// 给定数独永远是 9x9 形式的。

// 链接：https://leetcode-cn.com/problems/valid-sudoku

/**
 * @param {character[][]} board
 * @return {boolean}
 */
// 硬核遍历
var isValidSudoku = function(board) {

    for (let i = 0; i < board.length; i++) {
        if (!isDouble(board[i])) {
            return false;
        }
        // 纵向
        let columnList = new Array(9).fill(0).map((item, index) => {
            return board[index][i];
        });
        if (!isDouble(columnList)) {
            return false;
        }
        // 方阵
        let j = Math.floor(i / 3) * 3;
        let k = (i % 3) * 3;
        let blockList = new Array(9).fill(0).map((item, index) => {
            let jj = Math.floor( index / 3);
            let kk = (index % 3);
            return board[j + jj][k + kk];
        });
        if (!isDouble(blockList)) {
            return false;
        }
    }
    return true;

    function isDouble(list) {
        let hash = {};
        for (let i = 0; i < list.length; i++) {
            if (hash[list[i]]) {
                return false;
            }
            if ('.' !== list[i]) {
                hash[list[i]] = true;
            }
        }
        return true;
    }
};

/**
 * 如果把三种校验记为三个数组
 * row = [第0行的哈希表, 第1行的哈希表, .....]
 * column = [第1列的哈希表, ...]
 * block = [第1个块的哈希表, ...]
 * 只需遍历一次
 */
isValidSudoku = function(board) {
    let row = [], column = [], block = [];
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            let val = board[i][j];
            if (!isDouble(row, i, val)) return false;
            if (!isDouble(column, j, val)) return false;
            if (!isDouble(block, Math.floor(i / 3) * 3 + Math.floor(j / 3), val)) return false;
        }
    }
    return true;

    function isDouble(list, index, key) {
        if (!list[index]) {
            list[index] = {
                [key]: true
            };
        } else {
            if (list[index][key] && '.' !== key) {
                return false;
            } else {
                list[index][key] = true;
            }
        }
        return true;
    }
}

const board = [
    ["5","3",".",".","7",".",".",".","."],
    ["6",".",".","1","9","5",".",".","."],
    [".","9","8",".",".",".",".","6","."],
    ["8",".",".",".","6",".",".",".","3"],
    ["4",".",".","8",".","3",".",".","1"],
    ["7",".",".",".","2",".",".",".","6"],
    [".","6",".",".",".",".","2","8","."],
    [".",".",".","4","1","9",".",".","5"],
    [".",".",".",".","8",".",".","7","9"]
  ];
console.log(isValidSudoku(board));