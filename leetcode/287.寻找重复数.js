/*
 * @lc app=leetcode.cn id=287 lang=javascript
 *
 * [287] 寻找重复数
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
//这题把数组看作是链表，然后找链表中的环，这谁能想得到啊？
//就当复习一下怎么找链表中的环以及环中的入口把。（龟兔赛跑算法）
//慢指针每次走一步，快指针每次走两步，结束之前两者相遇的话，说明有环。
//环的入口：相遇后慢指针放到起点，快慢指针同时走一步，相遇的点就是入口。
var findDuplicate = function(nums) {
    let slow = nums[0]
    let fast =nums[nums[0]] 
    while(slow != fast){
        slow = nums[slow]
        fast = nums[nums[fast]]
    }
    slow = 0 //记得初始化slow
    while(slow != fast){
        slow = nums[slow]
        fast = nums[fast]
    }
    return slow
};
// @lc code=end

// let a =findDuplicate([1,3,4,2,2])
// console.log(a);