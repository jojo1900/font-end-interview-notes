## VUE 底层对数组响应式更新的实现

## 组件设置 key 有什么好处，为什么不可以用 Index 作为 key

## 秒杀倒计时组件

## runtime only 版本和 runtime+Compiler 版本的区别
 - runtime only：将template在打包的时候，就已经编译为 render函数，即编译为render函数是离线时做的。生成的代码体积更小，速度更快
 - runtime-compiler：打包后，仍然是template+component的形式，编译时在线将template转换为 render函数

## MVVM的理解
- M层：前端的静态数据，从接口拿来的数据和自己定义的数据
- V层：视图层，DOM元素构成的页面
- ViewModel：框架，充当M和V之间的桥梁，改变数据不需要手动去更新视图。VM层会自动绑定数据和对应的视图，数据更新时，DOM会自动更新，DOM元素的改变也能使数据发生改变。

## 响应式数据的原理
- Object.defineProperty()
> 1. new Vue()
> 2. initState()
> 3. initData()
> 4. observe(data) ,增加__ob__属性。
> 4. 如果没有ob属性，即没有被observe，则new Observer()
> 5. 对于对象，调用walk()。对于数组，调用observeArray()
> 6. 对于对象类型而言，进行 defineReactive()
> 7. 对于对象类型而言，递归的对该对象的数据，用Object.defineProperty() 重新设置 get 和 set 方法。拦截对属性的访问和修改操作。
> 8. 对于 get 而言，在访问时调用dep.depend()进行 依赖的收集，收集到subs[]里
> 9. 对 set 而言，在属性修改时 通知依赖该属性的watcher，调用dep.notify()进行派发更新。

## 如何检测数组的变化
> 对于数组而言，Vue 重写了 Array.prototype的几个 方法（'push','pop','shift',
'unshift','splice','sort','reverse'）。数组调用这几个方法时，也会调用dep.notify()进行派发更新。如果是数组新增内容（push,unshieft,splice），那么对新增的数据重新observe()。
> 对于数组内的每一项，同样会递归的进行Observe。

## 为何Vue异步渲染
> 过程:
1. dep.notify()
2. 对subs[]里的每一个watcher执行update()
3. update调用queueWatcher()方法。把要更新的watcher添加到队列中，watcher会进行去重，防止添加多次。
4. 调用nextTick()，在下一个tick中刷新watcher队列，watcher.run()执行对页面/数据的重新渲染。
> 原因：多个watcher先存起来，然后一起更新，提高执行效率。（类似节流）

## Vue nextTick的实现原理：
1. 


## computed 计算属性的特点
> 通过 lazy（标志是计算属性） 和dirty字段（） 实现了缓存的机制，只有该属性依赖的属性发生改变时，才会发生计算。

## watch的deep:true的实现
> watch的实现是：初始化时调用initWatch，然后会 new 一个用户定义的Watcher（user=true），之后会把这个watcher存到相应属性的依赖中subs[]，当对象发生变化时会通知数据进行更新。

### userWatch 比 渲染watcher先执行

## vue的生命周期

## ajax请求放在哪个生命周期比较好
- created（拿不到真实的DOM元素） 
- mounted，可以操作DOM元素。
  
## 什么时候使用befroeDestroy
- 在页面中使用了 $on 方法 时，需要解绑事件。
- 清除定时器
- 解绑原生的DOM操作

## Vue的模版编译原理(template-->render())
1. template -> AST(抽象语法树)
2. 对AST优化
3. 将AST生成代码

## v-if 和 v-show 的区别
1. v-if 如果条件不成立，不会渲染当前指令所在节点的DOM元素，开销大
2. v-show 只是切换当前DOM的显示或者隐藏(display:none)，适合经常改变的元素。
3. 实现原理：
    > 编译时 对 v-if 和v-show 指令生成的render不一样。
    > 对 v-show编译时，只会生成一个 show的指令，并不会影响DOM
## v-for 和 v-if 为什么不能连用
- 在 Vue2中，v-for的优先级更好，会先执行，对每一个item都会生成一个v-if，性能太差。可以上下级来用。

## VNode 描述 DOM元素。
- tag data children  key parent ...
