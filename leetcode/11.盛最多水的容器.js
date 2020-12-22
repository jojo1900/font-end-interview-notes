/*
 * @lc app=leetcode.cn id=11 lang=javascript
 *
 * [11] 盛最多水的容器
 */

// @lc code=start
/**
 * @param {number[]} height
 * @return {number}
 */
//双指针法
var maxArea = function (height) {
    if (height.length === 0) {
        return
    }
    let left = 0
    let right = height.length - 1
    let result = 0
    while (left < right) {
        let h = Math.min(height[left], height[right])
        let w = right - left
        result = Math.max(result, h * w)
        //只有小的那个变化，结果才有变大的可能性
        if (height[left] < height[right]) {
            left += 1
        } else {
            right -= 1
        }
    }
    return result
};
// @lc code=end
