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
    let reverse = 0
    let cur = x
    while(cur>0){
        reverse = reverse * 10 + cur % 10
        cur = Math.floor(cur /10) 
    }
    return reverse === x
};
// @lc code=end
