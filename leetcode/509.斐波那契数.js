/*
 * @lc app=leetcode.cn id=509 lang=javascript
 *
 * [509] 斐波那契数
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number}
 */
var fib = function(n) {
    let res
    let num1 = 0
    let num2 = 1
    while (n>1){
        res = num1 + num2
        num1 = num2
        num2 = res
        n -= 1
    }
    return res

};
// @lc code=end

