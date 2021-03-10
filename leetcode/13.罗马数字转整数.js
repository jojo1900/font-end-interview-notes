/*
 * @lc app=leetcode.cn id=13 lang=javascript
 *
 * [13] 罗马数字转整数
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
var romanToInt = function(s) {
    const m = {
        "I":1,
        "V":5,
        "X":10,
        "L":50,
        "C":100,
        "D":500,
        "M":1000,
    }
    let len = s.length
    let res = 0
    for (let index = 0; index < len; index++) {
        const element = s[index];
        let val = m[element]
        if(element === "C" && index +1 < len){
            if (s[index + 1] ==="D" || s[index + 1]==="M") val = -100
        }
        if(element === "X" && index +1 < len){
            if (s[index + 1] ==="L" || s[index + 1]==="C") val = -10
        }
        if(element === "I" && index +1 < len){
            if (s[index + 1] ==="V" || s[index + 1]==="X") val = -1
        }
        res += val
    }
    return res
};
// @lc code=end

