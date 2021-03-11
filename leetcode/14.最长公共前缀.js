/*
 * @lc app=leetcode.cn id=14 lang=javascript
 *
 * [14] 最长公共前缀
 */

// @lc code=start
/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function (strs) {
    let len = strs.length
    if (len === 0 ) return ""
    if (len === 1) return strs[0]
    let res = strs[0]
    for (let index = 1; index < strs.length; index++) {
    
        const element = strs[index];
        let lMin = Math.min(res.length, element.length)
        for (let j = lMin; j > -1 ; j--) {
            res = res.slice(0,j)
            if (res.slice(0,j) == element.slice(0,j)) {
                break
            }
        }
    }
    return res
};
console.log(longestCommonPrefix([]));
// @lc code=end