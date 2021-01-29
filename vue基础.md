## VUE 底层对数组响应式更新的实现

## 组件设置 key 有什么好处，为什么不可以用 Index 作为 key

## 秒杀倒计时组件

## runtime only 版本和 runtime+Compiler 版本的区别
 - runtime only：将template在打包的时候，就已经编译为 render函数，即编译为render函数是离线时做的。生成的代码体积更小，速度更快
 - runtime-compiler：打包后，仍然是template+component的形式，编译时在线将template转换为 render函数