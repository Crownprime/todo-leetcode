// 给定一个链表，删除链表的倒数第 n 个节点，并且返回链表的头结点。

// 示例：
// 给定一个链表: 1->2->3->4->5, 和 n = 2.
// 当删除了倒数第二个节点后，链表变为 1->2->3->5.

// 链接：https://leetcode-cn.com/problems/remove-nth-node-from-end-of-list

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * 用一个数组将链表结构储存下来，寻找第 list.length - 1 - n 个节点
 * 这种情况需要占用较大的空间
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function(head, n) {
    let p = head, list = [];
    if (!p) return head;
    while(p) {
        list.push(p);
        p = p.next;
    }
    // 特别要注意当 n 等于链表长度时表示要删除头节点
    // 这个时候只要返回头节点的下一个节点即可
    if (list.length - 1 - n < 0) return head.next;
    // 寻找要删除节点的上一个节点
    let last = list[list.length - 1 - n];
    // 寻找要删除的节点的下一个节点
    let next = list[list.length - 1 - n + 2];
    // 如果要删除的节点是最后一个节点，可能不存在下一个节点
    next = next ? next : null;
    last.next = next;
    return head;
};

// 快慢指针
// 设定指针 p, q，q比p慢n个节点，同时移动当p到终点时，q就找到了要删除的指针
removeNthFromEnd = function(head, n) {
    if (!head) return head;
    // 设置虚拟头节点
    // 主要考虑到可能删除头节点的情况方便处理
    let root = { next: head };
    // 希望 q 能指向要删除节点的前一个节点，所以 di = n + 1
    let p = root, q = root, di = n + 1;
    while(p) {
        p = p.next;
        if (!di) {
            q = q.next;
        } else {
            di--;
        }
    }
    let dlNode = q.next;
    let nxNode = dlNode ? dlNode.next : null;
    q.next = nxNode;
    return root.next;
};