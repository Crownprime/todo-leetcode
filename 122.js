// 给定一个数组，它的第 i 个元素是一支给定股票第 i 天的价格。
// 设计一个算法来计算你所能获取的最大利润。你可以尽可能地完成更多的交易（多次买卖一支股票）。
// 注意：你不能同时参与多笔交易（你必须在再次购买前出售掉之前的股票）。
// 链接：https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-ii
/**
 * 最简单的韭菜思想，股票上坡就买，下坡就卖
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
    let profit = 0;
    let buy = prices[0];
    let last = prices[0];
    for(let i = 1; i < prices.length; i++) {
        // 当初出现下坡
        if (last > prices[i]) {
            // 卖出，累计收益
            profit += (last - buy);
            // 并重新在低点买入
            buy = prices[i];
            last = buy;
        } else {
            // 如果是上涨趋势，则更新最新价格
            last = prices[i];
        }
    }
    // 可能出现最终还在涨的情况，所以要结算一下
    profit += (last - buy);
    return profit;
};

// 动态规划
// 第 i 天结束的时候可能存在未持有股票 a[i][0] 和 持有股票 a[i][1]

// 假设未持有股票，则可能前一天也未持有，或者前一天持有然后今天卖掉了
// 及 a[i][0] = max{a[i-1][0], a[i-1][1] + prices[i]}

// 假设已持有股票，则可能前一天一直持有，或者今天买入的
// 即 a[i][1] = max{a[i-1][0] - prices[i], a[i-1][1]}

// 本质上是一种枚举，把所有可能都列出来，但因为存在依存关系，所以用一个 map 将之前的结果保存下来所以可以减少时间复杂度
maxProfit = function(prices) {
    let map = [[0, -prices[0]]];
    for (let i = 1; i < prices.length; i++) {
        map[i] = [
            Math.max(map[i-1][0], map[i-1][1] + prices[i]),
            Math.max(map[i-1][1], map[i-1][0] - prices[i])
        ]
    }
    return Math.max(map[prices.length - 1][0], map[prices.length - 1][1]);
};

console.log(maxProfit([7,1,5,3,6,4]));
