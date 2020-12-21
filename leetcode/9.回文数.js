/*
 * @lc app=leetcode.cn id=9 lang=javascript
 *
 * [9] 回文数
 */

// @lc code=start
/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function (x) {
    if (!Number.isInteger(x) || x < 0) {
        return false
    }
    let cur = x
    let y = 0
    while (cur > 0) {
        y = y * 10 + cur % 10
        cur = parseInt(cur / 10)
    }
    return x === y
};
// @lc code=end
