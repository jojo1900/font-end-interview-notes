/*
 * @lc app=leetcode.cn id=678 lang=javascript
 *
 * [678] 有效的括号字符串
 */

// @lc code=start
/**
 * @param {string} s
 * @return {boolean}
 */
var checkValidString = function (s) {
    let stackStar = []
    let stack = []
    for (let i = 0; i < s.length; i++) {
        const element = s[i];
        switch (element) {
            case "(":
                stack.push(i)
                break;
            case "*":
                stackStar.push(i)
                break;
            case ")":
                if (stack.length > 0) {
                    stack.pop()
                } else if (stackStar.length > 0) {
                    stackStar.pop()
                } else {
                    return false
                }
                break
            default:
                return false
        }
    }
    //需要考虑“*”和“（” 的顺序问题
    while (stack.length > 0) {
        if (stack[stack.length - 1] < stackStar[stackStar.length - 1]) {
            stack.pop()
            stackStar.pop()
        } else {
            return false
        }
    }
    return true

};
let s = "(((((*(()((((*((**(((()()*)()()()*((((**)())*)*)))))))(())(()))())((*()()(((()((()*(())*(()**)()(())"

console.log(checkValidString(s))
// @lc code=end