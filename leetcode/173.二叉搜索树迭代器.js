/*
 * @lc app=leetcode.cn id=173 lang=javascript
 *
 * [173] 二叉搜索树迭代器
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 */
var BSTIterator = function(root) {
    let node = root
    const l = []
    while(node){
        l.push(node.val)
        if(node.left){
            node = node.left
        }else{
            node = node.right
        }
    }
    this.prototype.next = function(){
        return l
    }
};

/**
 * @return {number}
 */
BSTIterator.prototype.next = function() {

};

/**
 * @return {boolean}
 */
BSTIterator.prototype.hasNext = function() {

};

/**
 * Your BSTIterator object will be instantiated and called as such:
 * var obj = new BSTIterator(root)
 * var param_1 = obj.next()
 * var param_2 = obj.hasNext()
 */
// @lc code=end

