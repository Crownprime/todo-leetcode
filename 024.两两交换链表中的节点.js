// 给定一个链表，两两交换其中相邻的节点，并返回交换后的链表。
// 你不能只是单纯的改变节点内部的值，而是需要实际的进行节点交换。
// 示例 1：
// 输入：head = [1,2,3,4]
// 输出：[2,1,4,3]
// 示例 2：
// 输入：head = []
// 输出：[]
// 示例 3：
// 输入：head = [1]
// 输出：[1]

// 链接：https://leetcode-cn.com/problems/swap-nodes-in-pairs

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var swapPairs = function(head) {
    if (!head) return null;
    let root = {
        next: head
    }
    let p = root, q = root.next, z = root.next.next;
    while(q && z) {
        // 0 节点的下一个节点指向第二个节点
        p.next = z;
        // 第一个节点的下一个节点指向第二个节点的下一个节点
        q.next = z.next;
        // 第二个节点的下一个节点指向第一个节点
        z.next = q;

        p = q;
        q = q.next;
        q && (z = q.next);
    }
    return root.next;
};