// 编写一个程序，找到两个单链表相交的起始节点。

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * 假设链表a比较长为 la，链表b比较短为 lb
 * 1. a,b的指针pa，pb 同时前移直至pb到达链表尾部，此时的 pa 到达 lb 的位置
 * 2. 让 pb = headA，继续前移直至pa到达尾部，此时 pb 的位置为 la - lb
 * 3. 让 pa = headB，由于 a，b后半部分为公共的，所以长短差就集中在前面非公共区域，
 * pb 已经移动了 la - lb ，已经抹平了差距，此时 pa，pb同时移动，若 a,b 有交集则 pa，pb必然相遇
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
var getIntersectionNode = function(headA, headB) {
    if (!headA || !headB) return null;
    let pa = headA, pb = headB;
    while(pa && pb) {
        pa = pa.next;
        pb = pb.next;
    }
    !pa && (pa = headB);
    !pb && (pb = headA);
    while(pa && pb) {
        pa = pa.next;
        pb = pb.next;
    }
    !pa && (pa = headB);
    !pb && (pb = headA);
    while(pa && pb) {
        if (pa == pb) {
            return pa;
        }
        pa = pa.next;
        pb = pb.next;
    }
    return null;
};

let a = {
    val: 8
}
let b = {
    val: 1,
    next: {
        val: 8,
        next: a
    }
}

console.log(getIntersectionNode(a, b));