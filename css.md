## 盒子水平垂直居中的五大方案
- 答题技巧 ：在我之前的项目中，这样的需求很常见，我当时是。。怎么做的，不过后来随着。。技术兴起，我发现这种也可以实现，比之前的方案有什么优点，后来还在社区看到。。。这种方案，虽然不常见，但是也可以实现
- 答题技巧：我在项目中，主要用的是。。。，因为。。。，同时，我看了。。开源框架的源码，他们用的也是这种方法，，

1. 定位：


## BFC
### 块级格式化上下文
###  触发：
- 1. 绝对定位元素 position : absolute,fixed
- 2. 浮动元素 float 不为 none的
- 3. display 为 inline-block、table-cells、flex
- 4. overflow 除了 visible 以外的值 (hidden、auto、scroll)
### 作用：
- 清除浮动
- 防止外边距折叠
- 阻止元素被浮动元素覆盖

### CSS 优先级
1. !important > 行内style > id选择器 > 类选择器 属性选择器 伪类 > 元素选择器 伪元素

## CSS盒模型
- 标准盒子模型
- IE盒模型()
- 弹性伸缩盒模型(flex)
- 通过 box-sizing: border-box：width height 指 盒子大小 / content-box：width height只指content内容宽高。有时候不太方便。content+padding+border+margin。
- 