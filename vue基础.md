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

## 虚拟DOM
- 用 JS的数据结构 来描述 DOM元素
- tag（标签） data（事件、样式等）  children text(children 和 text 只会有一个) elem（vnode关联到的到真实的DOM） parent 、 key 

## 虚拟DOM的好处：
- 操作真实DOM的开销很大，使用虚拟DOM，节点发生改变后不会马上操作真实DOM进行更新，而是通过diff算法比较，找出节点的最小变化，再操作真实DOM进行更新。提高性能减少开销。
## vue中的diff算法
-  时间复杂度：O(n)
-  只在同层之间比较
-  判断是否是同一个节点sameNode：key相同,tag相同，inputType相同。如果是sameNode，会直接复用旧节点的elm（虚拟DOM到真实DOM的映射）。
-  比较新旧两个节点，如果oldNode === newNode(并不是调用sameNode函数) 那么return true
-  不然，会直接复用这个节点的elm，然后进行以下比较：如果新的有children，旧的没有children，那么清空旧的text，并生成新的节点的children；如果新的没有children，旧的有children，那么销毁旧的children，生成新的text，如果都是text，那么比较是否相同...；如果都是有children，那么updateChildren：这样递归下去。
-  updateChildren:
1. 对于新旧children，各创建一个头指针，一个尾指针
2. 首先头和头比较是不是同一个节点，是的话指针移动
3. 如果不是，尾和尾比较
4. 如果还不是，那么头和尾比较
5. 如果还不是，那么尾和头比较
6. 如果都不是，那么 拿到新节点的key，判断是否在旧children里，
> 1. 如果在，再判断是否是同一个节点，如果是，那么更新位置。
> 2. 如果否，那么说明是一个新节点，生成一个新的node，插入到合适位置。

## v-for 为什么要用key
- 根据 diff 原理，设置了key之后，可以根据key判断 节点是否改变，未改变的话 则直接复用之前的节点，只需要移动。不需要操作DOM，节省开销，提升性能。
- 不然的话，vue会默认以index作为key，key和tag一样，那么会复用这个节点，比如由于text值不同，会修改节点的值，然后操作一次DOM，开销很大。
- 而且，在删除操作时，会造成误删除：Vue在更新vnode时，tag一样data一样时对node进行复用，如果你想删除第一个，不加key的话，那么vue经过比较，会删除掉最后一个。同理:key="index"也不行.更新前后的key都需要是唯一的。

## 组件渲染的流程

## 组件中的Data为什么是一个函数
- 为了防止两个实例的data互相干扰。
- 组件是一个构造函数，调用组件时都会创建一个该组件的实例，如果data是一个对象，那么相当于，data定义中 构造函数的prototype上，会被所有的实例共用；如果data是一个函数，那么相当于构成了一个闭包，data(){return __} 返回的data都是独立的。

## vue 事件绑定的原理
1. 原生DOM的绑定 @click = ""
2. 组件事件的绑定 @click = ""（组件的自定义事件，单独处理，使用发布订阅模式，$on） ;@click.native = "" （绑定到原生，会绑定到原生上）

## v-model 的实现原理（手写）
- 组件的 v-model 是 value属性和 input 事件的语法糖。

## v-html 会导致的问题
原理：innerHtml
1. xss攻击。内容不可信，其中可能有script标签，或者拿去用户的cookie等信息
2. 会替换掉标签内部的子元素。

## Vue父子组件生命周期调用顺序
1. 生成： 父 beforeCreate => 父 created => 父 beforeMounted => 子 beforeCreate => 子 created => 子 beforeMounted =>...递归孙子...=> 子 mounted => 父 mounted
2. 更新：父 beforeUpdate => 子 beforeUpdate => 子 updated => 父 updated
3. 销毁：同上

## 组件间的通信方法：（必问）
1. 父子间通信： 父=》子 props。子=》父： 子绑定$on $emit(手写)(发布订阅)
2. $parent $children来改变
3. 在父组件中提供数据，子组件进行消费：provide inject（写插件必备）
4. 通过Ref获取组件实例
5. event bus 跨组件通信 ，基于 $on $emit，相当于创建一个专门用于通信的组件
6. Vuex进行状态管理

## Vue mixin 抽离相同逻辑
- mergeOptions：合并字段


## 为什么使用异步组件
1. 组件很大时，打包结果会很大。使用异步组件可以减少打包结果。
2. 异步组件把组件定义变成函数，可以使用import语法，webpack打包时可以实现文件分割加载。

## 作用域插槽
1. 普通插槽：渲染父组件时，渲染插槽，渲染成虚拟节点，保存起来，当子组件初始化时，通过插槽属性将插槽替换。作用域是在父组件里。
2. 作用域插槽：因为渲染位置是在子组件，作用域是在子组件里。

##  keep-alive
- 作用：缓存，只缓存slot的第一个组件
- 属性：include[] exclude[]
- 生命周期：activated（激活），deactivated
- 实现原理：LRU算法(手写)

## vue 常见的性能优化
### 编码优化
1. 不要将所有数据都放到data中，因为data中的数据都会进行Observe()，会收集相应的watcher，开销很大。不需要响应式的数据可以不放在return{}里。
2. v-for 中，根据事件冒泡的原理，使用事件代理
3. 单页面应用 使用 keep-alive组件，减少组件的重新渲染。
4. 拆分组件，提高复用性，增加代码的可维护性，组件的粒度越小，每次重新渲染的就越少
5. v-if 和 v-show 的正确使用
6. key保证唯一
7. 响应式数据尽量不要太深，尽量扁平化；如果数据只是初始化时用来渲染，可以使用 object.freeze，不再加getter和setter。
8. 合理使用路由懒加载和异步组件
9. 数据持久化时，要加防抖节流

### Vue 加载性能优化
1. 第三方模块按需导入
2. 长列表优化：只加载可视区域附近（三屏），然后根据滚动条，动态加载数据 vue-virtual-scroll
3. 图片懒加载 vue-lazyload 

### 用户体验
- app-skeleton 骨架屏
- all-shell app壳
- pwa 渐进式web应用（离线缓存）

### SEO 优化
- 预渲染插件
- 服务端渲染 SSR

### 打包优化
- cdn拆分模块
- 多线程打包 happypack
- splitChunks 抽离公共文件
- sourceMap 生成

### 缓存、压缩
- 客户端缓存 服务端缓存
- 服务端gzip压缩

## Vue 3.0 的优化
1. TS 编写
2. composition API 解决的问题：mixin的缺陷，更有条理，高耦合性
3. proxy，初始化时不需要递归data
4. vdom diff算法 ， 只渲染动态数据的部分

## hash路由 和 history 路由
- onhashchange(#)
- history.pushState(h5.api) 可能导致的问题

## vue-router的 导航守卫
- 完整的导航解析流程：


## vuex的工作原理

## mutation和action的区别

## transition组件

## patch函数做了什么

## 权限校验（按钮级校验、路由校验）

## vue-lazyLoader的原理，手写伪代码

## vue.set的原理

## vue compail 的过程




