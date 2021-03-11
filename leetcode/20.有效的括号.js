/*
 * @lc app=leetcode.cn id=20 lang=javascript
 *
 * [20] 有效的括号
 */

// @lc code=start
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
    if (s.length % 2 === 1) return false
    let flag = true
    let stack = []
    for (let i = 0; i < s.length; i++) {
        const element = s[i];
        if (element === "(" || element === "[" || element === "{") {
            stack.push(element)
        } else {
            let pops = stack.pop()
            if (element === ")") {
                if (pops !== "(") return false
            } else if (element === "]") {
                if (pops !== "[") return false
            } else if (element === "}") {
                if (pops !== "{") return false
            } else {
                return false
            }
        }
    }
    if (stack.length !== 0) return false

    return true

};

// @lc code=end