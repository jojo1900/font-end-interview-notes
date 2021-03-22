/*
 * @lc app=leetcode.cn id=141 lang=javascript
 *
 * [141] 环形链表
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {boolean}
 */
var hasCycle = function (head) {
    if (head === null || head.next === null) return false
    let slow = head
    let quick = head.next
    try {
        while (slow.next !== null && quick.next.next !== null) {
            if (slow.val !== quick.val) {
                slow = slow.next
                quick = quick.next.next
            } else return true
        }
    } catch (error) {
        return false
    }

    return false
};
// @lc code=end