/*
 * @lc app=leetcode.cn id=350 lang=javascript
 *
 * [350] 两个数组的交集 II
 */

// @lc code=start
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersect = function(nums1, nums2) {
    let res = []
    nums2.forEach(num=>{
        let i = nums1.indexOf(num)
        if(i>-1){
            res.push(num)
            nums1[i] = ''
        }
    })
    return res
};
intersect([1,2,2,1],[2,2])

// @lc code=end

