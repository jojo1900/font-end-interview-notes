//题目1
let a = {},
    b = '0',
    c = 0
a[b] = "b"
a[c] = "c"

console.log(a[b]);
// 这个和对象的存储方式有关系。对象的属性名不能重复，属性名 字符串和数字是等价的。

//题目2
let a = {}
b = Symbol("1")
c = Symbol("1")
a[b] = "1"
a[c] = "2"

console.log(a[b]);
//symbol是唯一的。

//题目3