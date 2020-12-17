// 设计一个支持 push ，pop ，top 操作，并能在常数时间内检索到最小元素的栈。

// push(x) —— 将元素 x 推入栈中。
// pop() —— 删除栈顶的元素。
// top() —— 获取栈顶元素。
// getMin() —— 检索栈中的最小元素。

// 链接：https://leetcode-cn.com/problems/min-stack

/**
 * 维护两个栈，一个是数据栈，一个是辅助的最小值栈
 * 最小值栈的意义为每次 push 数据时，将此时栈中最小值同步入栈；每次 pop 时，辅助的栈也同步 pop
 * 保证当数据 a 在数据栈中时，a 及其下方的数据是固定的，所以最小值也是固定的
 * initialize your data structure here.
 */
var MinStack = function() {
    this.valStock = [];
    this.minStock = [];
};

/** 
 * @param {number} x
 * @return {void}
 */
MinStack.prototype.push = function(x) {
    this.valStock.push(x);
    let min = this.minStock[this.minStock.length - 1];
    this.minStock.push(min < x ? min : x);
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function() {
    this.minStock.pop();
    return this.valStock.pop();
};

/**
 * @return {number}
 */
MinStack.prototype.top = function() {
    return this.valStock[this.valStock.length - 1];
};

/**
 * @return {number}
 */
MinStack.prototype.getMin = function() {
    return this.minStock[this.minStock.length - 1];
};

/**
 * Your MinStack object will be instantiated and called as such:
 * var obj = new MinStack()
 * obj.push(x)
 * obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.getMin()
 */