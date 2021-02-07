// 给定一个数组 candidates 和一个目标数 target ，找出 candidates 中所有可以使数字和为 target 的组合。
// candidates 中的每个数字在每个组合中只能使用一次。

// 说明：
// 所有数字（包括目标数）都是正整数。
// 解集不能包含重复的组合。 
// 示例 1:

// 输入: candidates = [10,1,2,7,6,1,5], target = 8,
// 所求解集为:
// [
//   [1, 7],
//   [1, 2, 5],
//   [2, 6],
//   [1, 1, 6]
// ]
// 示例 2:

// 输入: candidates = [2,5,2,1,2], target = 5,
// 所求解集为:
// [
//   [1,2,2],
//   [5]
// ]

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/combination-sum-ii
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
// 比较笨的办法就是遍历
// 难点是如何排除重复的部分
var combinationSum2 = function(candidates, target) {
    if (!candidates.length) return [];
    candidates.sort((a, b) => a - b);
    let res = [], queue = [];
    candidates.forEach((val, idx) => {
        // 初始化的队列中填入单个的值和对应的索引
        // 如果出现重复的值可以直接去掉，但保留最低的索引的值
        // 原因 a, a, b 的情况下
        // index = 0 的 a 可以遍历到 a,a\a,a,b\a,b
        // index = 1 的 a 可以遍历到 a,b
        // 是存在包含关系的，可以去除
        if (candidates[idx] === candidates[idx - 1]) return;

        queue.push({
            list: [val],
            idx
        });
    });

    while(queue.length) {
        let _tg = queue.shift();
        let _tgSum = listSum(_tg.list);
        if (_tgSum === target) {
            res.push(_tg.list);
        } else if (_tgSum < target) {
            for (let i = _tg.idx + 1; i < candidates.length; i++) {
                let _res = [[..._tg.list, candidates[i]]];
                let j = 0;
                // 这里是去重的关键
                // 假设存在 [a] 和需要匹配的数组 [b, b, b, c]
                // 那么这轮就会压入队列 [a, b] * 3，所以我们需要删除其中2个
                // 其中第一个会继续延伸出 [a, b, b] [a, b, b]
                // 第二个会延伸出 [a, b, b]
                // 而第三个则不会在重复，但似乎无论删除哪一个都会存在丢失的情况
                // 由于我们先做了排序，重复的必然连续，所以当我们遇到连续的情况，就一口气把连续的全部遍历完，并且把索引记做最后一个重复数
                // 如上例子，直接把 [a, b] [a, b, b] [a, b, b, b] 都遍历出来，idx记为最后一个b的idx，这样当下轮遍历就不会再和b拼接，而直接和c对比
                while(candidates[i] === candidates[i + 1]) {
                    _res.push([..._res[j], candidates[i]]);
                    i++;
                    j++;
                }
                _res.forEach(item => {
                    queue.push({
                        list: [...item],
                        idx:i
                    });
                });
            }
        }
    }

    return res;

    function listSum(list) {
        let sum = 0;
        list.forEach(val => sum += val);
        return sum;
    }
};

console.log(combinationSum2([2,5,2,1,2], 5));
debugger