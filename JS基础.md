## 1.null 和undefined 的区别
  - null是一个空指针，指向的是不存在或者无效的地址或对象，用于引用数据类型

  - undefined表示基本数据类型未初始化的值

  -  两者都是falsy，两者松散相等 null == undefined, null !== undefined

  -  Number(null) => 0； Number(undefined) =>NaN

  -  用作函数参数时，null表示参数不是对象，undefined表示没传参数
  -  void后面跟什么都是undefined。
  -  为什么typeof(null)是 object ，由于历史原因，较早的计算机是32位的，考虑到性能，用最后三位表示数据的类型 000:对象；001:整数；010:浮点数；100：字符串；110:布尔值； 全部为0:null，所以判断为 object

## 2.没有冒泡的事件
- onblur 
- onfocus
- onmouseenter
- onmouseleave

## 3.typeof 和 instanceOf 的区别
- JS的八个内置数据类型：undefined null boolean number string symbol BigInt object ,除object外，其余统称为基本类型。
- 虽然对于函数myFunc来说，typeof(myFunc) =>'function'，但是function并不是JavaScript的内置类型，function只是object的一个子类型。
- typeof操作符返回的是一个内置类型，通过检测低三位返回。
- instanceOf 用来比较一个对象是否是某个构造函数的实例，只能作用于对象，不能作用于基本数据类型;
- instanceof原理： 检测 constructor.prototype是否存在于参数 object的 原型链上。
- instanceof 查找的过程中会遍历object的原型链，直到找到 constructor 的 prototype ,如果查找失败，则会返回false，告诉我们，object 并非是 constructor 的实例。

- Object.prototype.toString.call()

## 4. 对象的属性
 - 对象的属性分为数据属性和访问器属性。
 - 数据属性有四个描述符，：configurable（操作符能否修改）、enumerable（能否枚举）、value、writable（值能不能改变）
 - 访问器属性有四个描述符：configurable（操作符能否修改）、enumerable（能否枚举）、getter(访问属性时调用的方法)、setter（给属性赋值时调用的方法）
 - 查看一个对象的属性：Object.getOwnPropertyDescriptors(o)//Object.getOwnPropertyDescriptor(o,"属性名") 
 - 设置属性：Object.defineProperties(o,....)访问器属性只能这么设置。
 - 一个属性要么为数据属性，要么为访问器属性，不可能既是数据属性又是访问器属性。

## 5. ?? 运算符 ||运算符
- ?? 运算符返回第一个非 undefined非null的，和||区别主要在0、''等falsy的值。

## 6.ES6中对象的增强方法：
- 属性简写
- 计算属性
- 对象解构，可以通过解构来复制对象；
  
## 7.通过工厂模式创建对象：
```javaScript
function createPerson(name,age,sex){
    let o = new Object()
    o.name = name
    o.age = age
    o.sex = sex
    return o
} 
```
无法解决对象的标示问题：
```javaScript
let aPerson = createPerson("xiaoming",10,"male")

console.log(yadong.constructor);//[Function: Object]

```

## 8.通过构造函数创建对象：
```javaScript
function Person(name,age){
    this.name = name
    this.age = age
    this.sayHi = function(){
        console.log("hello"+this.name);
    }
}

let bPerson = new Person('zhangsan',12)
//解决了对象的标示问题，能标明对象属于哪个构造函数
console.log(bPerson.constructor);//[Function: Person]
console.log(bPerson instanceof Person);// true
```
构造函数也是一个普通的函数，能创建对象的关键在于  **new** 操作符
#### 构造函数的问题：
```javaScript
function Person(name,age,likes){
    this.name = name
    this.age = age
    this.likes = likes //引用类型
    this.sayHi = function(){
        console.log("hello,"+this.name);
    }
}

let bPerson1 = new Person('zhangsan',10,[1,2,3])
let bPerson2 = new Person('zhangsan',10,[1,2,3])
console.log(bPerson1.likes === bPerson2.likes);//false
console.log(bPerson1.sayHi === bPerson2.sayHi);//false
```
- 构造函数内的同一个方法(引用类型)，在每一个实例(bPerson1,bPerson2)中都创建了一次，这样占用内存大，没有必要。 
- 解决的办法是，把只需生成一次方法，定义在构造函数外，然后构造函数内的属性指向这个函数，但是当方法变多时，构造函数和方法分开，会很麻烦。
- 所以使用原型模式来解决。
  
## 9.构造函数 new 操作符执行了哪些操作？
1. 隐式的创建一个对象o。
2. 将对象o的[[prototype]]特性赋值为构造函数的prototype属性
3. this指向当前对象o
4. 执行构造函数内的代码
5. 如果构造函数return一个非空对象，则返回该对象，否则return对象o
   
## 10. 原型模式
- 每个构造函数都会有一个<font color="red">prototype</font>属性，称为<font color="red">原型</font>，该属性是一个对象，存的是constructor(一个指向构造函数本身的指针)和能够被实例对象共享的属性方法。
- 每个实例对象，有一个[[prototype]]指针，指向的是原型对象的prototype属性(原型)。浏览器环境中，可以通过__proto__来访问[[prototype]]
- 实例对象和构造函数没有直接联系，和构造函数的原型有直接联系
```javaScript
function Person(name,age,likes){
    Person.prototype.name = name
    Person.prototype.age = age
    Person.prototype.likes = likes
    Person.prototype.sayHi = function(){
        console.log("hello,"+this.name);
    }
}

let bPerson1 = new Person('zhangsan',10,[1,2,3])
let bPerson2 = new Person('zhangsan',10,[1,2,3])

console.log(Person.prototype.isPrototypeOf(bPerson1));//true
console.log(Object.getPrototypeOf(bPerson1));
// Person {
//     name: 'zhangsan',
//     age: 10,
//     likes: [ 1, 2, 3 ],
//     sayHi: [Function]
//   }

```
- Object.setPrototypeOf() 不要用这种方法，严重影响性能。可以用Object.create(Person)来创建一个新对象。
 ### 10.2 原型层级
 - 先搜索实例，再搜索原型对象。
 - 如果再实例对象上增加一个属性，就会遮蔽对原型对象的访问，设置为null也会遮蔽访问，可以实用delete操作符删除这个属性，恢复对原型对象的访问。
 - 判断 属性在实例对象上：<font color = "orange">o.hasOwnProperty(keyName)</font>
 - 判断 属性在实例和原型对象上：keyName <font color = "orange">in</font> o. 
 - for in =》<font color = "orange">可迭代的</font>  <font color = "orange">实例+原型</font> 属性  迭代无序
```javaScript
function Person(name,age,likes){
    Person.prototype.name = name
    Person.prototype.age = age
    Person.prototype.likes = likes
    Person.prototype.sayHi = function(){
        console.log("hello,"+this.name);
    }
}

Object.defineProperty(Person.prototype,'constructor',{
    enumerable:false,
    value:Person
})

let person1 = new Person('11',11,[11])
for (const key in person1) {
    const element = person1[key];
    console.log(key,element);
};
person1.selfp2 = "p2"
person1.selfp3 = "p3"
person1.selfp1 = "p1"
person1.selfp4 = "p4"
//定义一个不可枚举的属性
Object.defineProperty(person1,"selfp5",{
    enumerable:false,
    value:"not_enumerable"
})


console.log(Object.keys(person1)); //获取所有可枚举的实例（自身）属性，[ 'selfp2', 'selfp3', 'selfp1', 'selfp4' ]

console.log(Object.getOwnPropertyNames(person1));//同上，可不可枚举都返回。
console.log(person1.hasOwnProperty('selfp1')); //判断实例对象上有没有这个属性。

****

```

### 10.3 原型模式的问题：
1. 弱化了向构造函数传参的能力
2. 属性的值，是引用类型时，一个实例的改变会影响另一个实例的改变。

## 11.继承

### 11.1 原型链
- 原型链可以实现对象之间的继承

```javaScript
function Super(){
    this.superProperty = true
}
Super.prototype.getSuperValue = function(){
    return this.superProperty
}
function Sub(){
    this.subProperty = false
}
Sub.prototype = new Super()
//增加或复写属性需要在原型链建立之后  Sub.prototype = new Super() 
Sub.prototype.getSubVal = function(){
    return this.subProperty
}
//复写父类的方法
Sub.prototype.getSuperValue = function(){
    return false
}
let instance = new Sub()
console.log(instance.getSuperValue());

console.log(instance instanceof Sub);//true instance 是 Sub的实例
console.log(instance instanceof Super);
console.log(instance instanceof Object);

console.log(Sub.prototype.isPrototypeOf(instance)); //true,Sub是 instance的原型

//对象子面量重写prototype会导致原型链破坏，需要手动__proto__指定他的原型对象
Sub.prototype = {
    getSubVal(){
        return this.subProperty
    },
    someOtherMethod(){ 
        return false;
    }
}
```
- 原型链的问题：
  1. 对于引用类型的属性，会造成实例之间的共享，一个改变另一个也改变
  2. 子类型在实例化时，不能向构造函数传参

### 11.4盗用构造函数
    在子对象的构造函数中，通过call/apply改变this，调用父对象的构造函数

### 11.5组合继承（盗用构造函数+原型链）
- 弥补了原型链和盗用构造函数的不足，是JavaScript中使用最多的继承模式。
```Javascript
function Super(name){
    this.name = name;
    this.colors = ["red","blue"]  
}
Super.prototype.sayName = function(){
    console.log(this.name);
}

function Sub(name,age){
    Super.call(this,name);
    this.age = age
}

Sub.prototype = new Super()
Sub.prototype.sayAge = function(){
    console.log(this.age);
}
 let instance1 = new Sub('yadong',11)
 instance1.colors.push("black")
 console.log(instance1.colors);//[ 'red', 'blue', 'black' ]

 let instance2 = new Sub('yun',22)
 instance2.colors.push("orange")
 console.log(instance2.colors);//[ 'red', 'blue', 'orange' ]

```
## 11.5 原型式继承
- 在原有对象的基础上创建一个新的对象。
```Javascript
//对传入的对象执行一次浅复制
function object(o){
    function F(){}
    F.prototype = o
    return new F()
}

let person = {
    name:'1',
    friends:["a","b","c"]
}

let person1 = object(person)
person1.friends.push('d')
console.log(person1.friends);
```
- 相当于Object.create()
- 适用于不需要单独创建构造函数，但是需要对象之间信息共享的场合。并且，引用类型的值会共享的。


## 11.6 寄生式继承
- 创建，增强，返回

## 11.7寄生式组合继承
- 组合继承的效率问题：组合式继承会<font color="red">调用两次</font>Super的构造函数，同时会导致，在Sub的prototype和实例instance中，age、name<font color="red">属性有两个</font>。
- 通过寄生式组合继承 来解决。
```Javascript
//对传入对象进行一次浅复制，然后返回
function object(o){
    function F(){}
    F.prototype = o
    return new F()
}
//寄生方式继承
function inheritPrototype(subType, superType){
    let prototype = object(superType.prototype)//创建
    prototype.constructor = subType//增强
    subType.prototype = prototype//赋值
}

function Super(name){
    this.name = name;
    this.colors = ["red","blue"]
}
Super.prototype.sayName = function(){
    console.log(this.name);
}

function Sub(name,age){
    Super.call(this,name);
    this.age = age
}

// Sub.prototype = new Super()，不再用这种方式
inheritPrototype(Sub,Super)
Sub.prototype.sayAge = function(){
    console.log(this.age);
}
```

## 12 类
### 12.1 类的定义
```Javascript
//类声明
class Person{

}
//类表达式
let Person = class {

}
```
- 类受块级作用域限制
- 没有变量提升
- 

## 13 客户端存储
### 13.1 cookie 
- cookie 由服务端在response中，set-cookie字段，设置cookie的值，cookie保存在浏览器，每次向服务器发送请求时，会带上cookie字段
- cookie 有大小限制、大约为4kb，有数量限制、每个域的cookie数量有限、可以设置过期时间、设置为负数时自动失效。名称和值都必须经过URL编码；可以设置域和路径，；有一个secure字段，设置后，只在https协议下才会携带cookie。

### 13.2 session
1. 用户输入账号密码登录，服务端查找用户数据，作为一个session，然后服务端把session保存下来（redis、内存、普通数据库）。
2. 服务端返回给response，其中set-cookie:sessionID
3. 每次请求，携带着cookie，内容是sessionID，根据sessionID去session库中取得用户信息。
4. 接口处理和返回。

### 13.2.1 session方案的问题
- 需要服务端存储会话数据，当服务端是集群时，由于负载均衡，session不一定存在于这台服务器上，就无法拿到，
- 解决的方法时：1 session集中存储，集中查询。2.设置负载均衡，来自相同IP的请求发送到同一台服务器处理，但是这样负载均衡就没有用了。

### 13.3 token
1. 用户输入账号密码，在服务端校验。
2. 成功后生成一个token，内容为token的配置和用户的登录信息。
3. 把token set到浏览器的cookie里（或者storage里），每次请求都会携带token。
4. 接口校验token，执行接口。

### 13.4 token和session的不同
1. 服务端不需要存储token。

### 13.5 token的设置 JWT（JSON Web Token）
- 把token分为三段，头部、负载和校验，以“.”分隔。校验是对前面两段加密得到的校验码，防止token篡改。
- 根据有效时间的长短，分为Access token 和 Refresh token。Access token时效较短、Refresh token 时效长。登录后，先得到一个Refresh token，根据Refresh token 签发一个 Access token，用来请求接口， Access token过期后，用 Refresh token 再签发一个新的 Access token 。 Refresh token也过期的话，重新登录。

## 14 ES6模块
 -  看完了，不想记。
### 14.1 

## 15 闭包详解


## 16 垃圾回收详解
> ### 16.1 内存空间
>  - 代码空间：存放可执行代码
>  - 栈空间（调用栈）：空间小。存放执行上下文（变量环境+词法环境）。存放变量和简单数据类型的变量（number、boolean）
>  - 堆空间：空间大。存放引用类型和（String、symbol、Object、bigInt）。
> ### 16.2 栈空间的回收：
>  - 栈空间通过ESP指针下移，即可把之前的内存标记为无用内存，可以被新的覆盖。
> ### 16.3 堆空间的垃圾回收。
> - 垃圾回收有两个问题，回收后的内存不连续（内存碎片）以及回收时导致的性能问题。
> - 堆空间分为两部分，新空间和老空间。
> - 新空间容量较小，新生成的不太大的变量首先存储在新空间内。新空间又分成了两部分，对象空间和空闲空间。当对象空间变满时，则进行一次标记，在调用栈中有使用的对象，会被复制到闲置空间中，没有被引用的删除。然后对象空间和空闲空间调换顺序。完成一次垃圾清除。经过两次垃圾清除还存活的对象，移动到老空间（对象晋升）。
> - 老空间的容量较大，存放从新空间移动来的对象，以及一些比较大的对象会直接进入老空间。老空间执行的也是标记-清除-整理的过程。一次全面标记会导致主线程停顿，所以标记分为多次（增量标记算法），和JS代码交替执行，最后统一清除，然后针对内存碎片问题，进行整理，把存有的内存收到一起，然后对边界外的空间进行清除。

## 17 V8如何执行一段JS代码
> ### 17.1 编译执行和解释执行
> ![avatar](https://static001.geekbang.org/resource/image/4e/81/4e196603ecb78188e99e963e251b9781.png)
>  - 在编译型语言的编译过程中，编译器首先会依次对源代码进行词法分析、语法分析，生成抽象语法树（AST），然后是优化代码，最后再生成处理器能够理解的机器码。如果编译成功，将会生成一个可执行的文件。但如果编译过程发生了语法或者其他的错误，那么编译器就会抛出异常，最后的二进制文件也不会生成成功。
> - 在解释型语言的解释过程中，同样解释器也会对源代码进行词法分析、语法分析，并生成抽象语法树（AST），不过它会再基于抽象语法树生成字节码，最后再根据字节码来执行程序、输出结果。
> ### 17.2 V8执行JS代码
> ![avatar](https://static001.geekbang.org/resource/image/1a/ae/1af282bdc4036096c03074da53eb84ae.png)
> - 先通过词法分析（分词，将一行行源代码分成一个个token，即不可再分的字符或字符串，）和语法分析（将上一部的token识别为关键字、标识符等，生成AST）生成AST（抽象语法树，Babel和ESLint都是AST的原理）和执行上下文。
> - 解释器将AST生成为字节码，对于非热点代码（以前执行过的），逐行解释执行；对于热点代码，将通过编译器编译为机器码（机器码执行速度快，但是内存占用大），以哈希表的形式存储在堆内存中，以后可以直接执行。
> - 字节码+解释器+编译器 这种技术称之为即时编译技术（JIT）。
> ### 17.3 优化Javascript的关注点（其实没懂）：
>  1. 提升单次脚本的执行速度，避免 JavaScript 的长任务霸占主线程，这样可以使得页面快速响应交互；
>  2. 避免大的内联脚本，因为在解析 HTML 的过程中，解析和编译也会占用主线程；
>  3. 减少 JavaScript 文件的容量，因为更小的文件会提升下载速度，并且占用更低的内存。
> 
### 18 var let const
> ### 18.1 变量提升
> - var 声明提升 初始化提升 赋值不提升（定义前访问 undefined ）
> - let 声明提升 初始化不提示 赋值不提升 （定义前访问，报错，暂时性死区，但其实在内存中以及存在，访问的话V8会报错）
> - function 声明提升 初始化提升 赋值提升 （正常使用函数）
```Javascript
foo()

function foo(){
    console.log(myName); //undefined
    console.log(test1); //报错
    var myName = "geekTime"
    let test1 = 1
    const test2 = 2
    var innerBar = {
        setName:function(newName){
            myName = newName
        },
        getName:function(){
            console.log(test1);
            return myName
        }
    }
    return innerBar
}

 ```
 > - let 块级作用域中的变量保存在词法环境中，var的变量保存在变量环境中。

## 18 消息队列和事件循环


## 19 网络
### 19.1 http 1.0
#### 优化
> 1. 为了支持多种不同类型的数据，引入了：文件类型、压缩方式、编码方式、语言
```JavaScript
//request
accept: text/html
accept-encoding: gzip, deflate, br
accept-Charset: ISO-8859-1,utf-8
accept-language: zh-CN,zh
```
> 2. 引入状态码
> 3. 提供cache机制
> 4. 增加用户代理字段（为了服务器统计客户端的基础信息）
### 19.2 http 1.1
> 1. 增加持久连接。在一个TCP连接上可以传很多个http请求。对同一个域名，默认允许建立6个TCP持久连接。
> 2. 提供虚拟主机的支持。一台物理主机（一个IP地址）== 多个虚拟主机（多个域名）
> 3. 支持动态内容。chunk transfer机制。服务器将数据分为若干个数据小块，每个小块还有上个块的长度，最后用一个0长度的块表明发送数据完成。
> 4. cookie（参见上文）
> 5. 安全机制

#### 缺陷
> 1. 对带宽的利用率不高，因为 ：
>> 1. TCP的慢启动机制。
>> 2. 使用多个TCP连接，之间会竞争，重要的资源无法获得优先权。
>> 3. HTTP的队头阻塞问题（管道化要求响应必须按照请求的顺序。）。  
### 19.3 http 2.0
### 改进                                
> 1. 一个域名只使用一个TCP长连接。
> 2. 多路复用机制。在HTTP层和TCP层引入一个二进制分帧层（浏览器和服务器都有），将一个请求转换为多个带有ID编号的帧，发送给对方，对方接收到后，将ID编号相同的合并在一起，合并成一个完整的请求信息。
> 3. 可以设置请求的优先级。
> 4. 支持服务器推送。（在请求一个资源时，同时要求服务器返回其依赖资源，比如请求index.html,同时要求服务器返回 其依赖的.css和.js文件，不用在JS解析时，重新请求一遍，再等待返回。）
> 5. 头部压缩。对请求头进行压缩。

### 缺陷
> 1. 仍然无法解决TCP的队头阻塞

### 19.4 http 3.0
> 1. 传输层基于UDP，
> 2. UDP的丢包率比较高，底层设备支持不好，所以目前用的比较少，先不看了。
### 19.5 TCP 
> 1. 三次握手：
> 2. 四次挥手:
> 3. 流量控制：
> 4. 拥塞处理：慢启动、拥塞避免、快速重传、快速回复
> 5. 提供可靠的传输
### 19.6 UDP


## 20 浏览器安全
### 20.1 web页面安全
1. 同源策略
   > - 协议、域名、端口 都相同的URL成为同源。
   > - 不同源之间想要互相访问资源或者操作DOM，会受到同源策略的影响。
   > - 同源策略表现为三个层面： DOM层面、数据层面、网络层面
   > 1. DOM层面:不同源的页面不能互相操作DOM（可以通过跨文档消息机制来通信）
   > 2. 数据层面:不同源的页面不能互相访问cookie、indexDB、localStorage等数据
   > 3. 网络层面:同源策略限制了通过 XMLHttpRequest 等方式将站点的数据发送给不同源的站点（通过CORS机制传输）

2. CSP（内容安全策略）
   > - CSP 的核心思想是让服务器决定浏览器能够加载哪些资源，让服务器决定浏览器是否能够执行内联 JavaScript 代码
3. CORS（跨域资源共享）
4. XSS（跨站脚本攻击）
   > - XSS往页面中插入脚本，然后把页面的重要数据（cookie，storage等）发送到黑客服务器。
   > - 存储型XSS攻击：数据库中存储恶意代码（script 标签）,返回给用户。
   > - 反射型XSS攻击：黑客发送URL给用户，用户点击后会执行的恶意脚本
   > - 基于DOM的XSS攻击：路由器劫持、本地恶意软件劫持网络，拦截DOM，然后修改DOM
   ---------
   > - 存储时过滤掉Script标签，或者将Script标签转码后再返回给用户。
   > - 充分利用CSP策略：
   >    1. 限制加载其他域下的资源文件，这样即使黑客插入了一个 JavaScript 文件，这个 JavaScript 文件也是无法被加载的；
   >    2. 禁止向第三方域提交数据，这样用户数据也不会外泄；
   >    3. 禁止执行内联脚本和未授权的脚本；
   >    4. 还提供了上报机制，这样可以帮助我们尽快发现有哪些 XSS 攻击，以便尽快修复问题。
   > - 设置 cookie 的httpOnly属性，httpOnly标记的cookie，只能用于http请求过程中，JS代码无法获取到
5. CSRF攻击：
   > - CSRF攻击是，在用户登录站点A后，点击一个第三方网站的链接，第三方网站可以利用用户的登录状态（cookie），发送一些请求。
   > - 防范：服务端验证请求来源：通过http请求头里的origin（不含路径信息）或referer（含路径信息）。 cookie设置sameSite字段为（strict/Lax），这样的cookie不会被不同源的页面携带。 生成CSRF TOken，不用cookie。
### 20.2 浏览器网络安全
1. 浏览器的渲染进程是运行在安全沙箱中的。
### 20.3 浏览器系统安全
1. https 是在 http层和Tcp层之间加了ssl/Tls（安全层），作用是对传输的数据进行加密和揭秘。加密方法有对称加密和非对称加密两种，对称加密由于密钥是明文传输的，所以仍然可以被黑客利用，非对称加密有公钥和私钥之分，通过公钥加密的内容，只能通过私钥才能解密。非对称加密的性能比较差，耗时长。所以都是采用对称加密和非对称加密配合使用。用非对称加密传输对称加密的密钥，之后的数据传输仍然用对称加密。同时引入数字证书，数字证书有权威机构（CA）发布，数字证书中含有公钥。

## 渲染进程的个数
- 渲染进程的个数：从A打开B（window.opener是A的window对象），若AB属于同一个站点（相同协议、相同根域名），则共用一个渲染进程。若从新标签页单独打开B，则用两个渲染进程
- 浏览上下文：把标签页所包含的内容，诸如 window 对象，历史记录，滚动条位置等信息称为浏览上下文。
- 浏览上下文组：浏览上下文的组合。
- 对于源不同的iframe，用不同的渲染进程，隔离在不同的安全沙箱中。



## http的缓存策略

## setTimeOut和 rAF
- 实现高性能动画，最好用raf。
 ### 渲染进程内的任务调度方案：动态调度策略
 > ![avatar](https://static001.geekbang.org/resource/image/3c/f5/3cc95247daae7f90f0dced017d349af5.png)
 > 同时，连续多次执行高优先级的任务后，会执行一次低优先级的任务。防止低优先级的任务饿死。

## JS元编程
 ### 元编程的三个特点
 - 自省：可以访问自身的属性
 - 自我修改：可以修改自身的属性
 - 拦截：可以拦截外部对其的访问
反射是实现元编程的一个分支。
## 代理和反射 proxy reflect
  ### 代理

  ### Reflect中被拦截的方法
  - get()
  - set()
  - has()
  - defineProperty
  - getOwnPropertyDescriptor
  - deleteProperty()
  - ownKeys()
  - getPrototypeOf()
  - setPrototypeOf()
  - isExtensible()
  - preventExtensions()
  - apply()
  - construct()

  ### 可以实现的一些编程模式（应用）
  - 跟踪属性访问
  - 隐藏属性：代理要访问的对象，如果访问的属性是要被隐藏的，则return undefined
  ```Javascript
        const hidden = ['foo','bar']
        const target = {
            foo:1,
            bar:2,
            baz:3
        }
        const proxy = new Proxy(target,{
            get(target,property){
                if (hidden.indexOf(property)> -1){
                    return undefined
                }else{
                    return Reflect.get(...arguments)
                }
            },
            has(target,property){
                if(hidden.includes(property)){
                    return undefined
                }else{
                    return Reflect.has(...arguments)
                }
            }
        })
        console.log(target.foo); //1
        console.log(proxy.foo); // undefined
        console.log(proxy.bar); // undefined
        console.log(proxy.baz); // 3    

  ```
  - 属性验证：所有的赋值操作都会触发set()捕获器，根据所赋的值决定是否允许赋值。
  - 函数与构造函数的参数验证，通过apply()捕获器，对函数的参数进行审查，可以让函数指接受某种类型的值。
  - 数据绑定与可观察对象    

## vue 数组 支持响应式更新的有哪些、不支持的有哪些，实现的原理是什么。

## 组件生命周期和指令周期的钩子函数执行顺序

## vue provide的使用

## 虚拟DOM 及 diff算法
### 为什么需要虚拟DOM
> 1. 每次操作真实DOM会进行重排重绘等操作，还有可能出现页面强制同步布局、布局抖动等问题，十分影响性能。
> 2. 需要用一个虚拟DOM，在虚拟DOM收集到多次变化后，把最后的结果更新到真实DOM，减少操作DOM的次数。
> 3. 虚拟DOM也能更好的跨平台。要实现SSR（服务端渲染），就需要用到虚拟DOM。
### 虚拟DOM是什么
> 虚拟DOM是，用JS对象抽象出来的真实DOM结构。真实的DOM结构非常复杂。通过JS的计算性能消耗来换取操作真实DOM的消耗。
### DOM的创建和更新
> 1. 创建阶段：首先依据 JSX 和基础数据创建出来虚拟 DOM，它反映了真实的 DOM 树的结构。然后由虚拟 DOM 树创建出真实 DOM 树，真实的 DOM 树生成完后，再触发渲染流水线往屏幕输出页面。
> 2. 更新阶段：数据发生更新后，根据变化后的数据生成一个新的虚拟DOM树，再根据diff算法，找出DOM中更新的地方，然后一次性更新到真实DOM，真实DOM再触发渲染流程。
### vue的diff算法

### 重排

### 重绘

## 浏览器的渲染流程

## PWA是什么
> PWA：渐进式web应用。最终目标是把网页站点变为移动端的app。
> 需要解决三个问题：
> 1. 离线使用
> 2. 消息推送。 和1一起，通过一个浏览器进程Service Worker来代理和缓存请求。
> 3. 安全。要起支持https
> 4. 入口（图标）。通过配置json文件来实现。

## 作用域链和词法作用域
### 作用域
- 作用域是用来存放变量和函数的地方。
- 分为全局作用域：存放this,window,document...gloable(node)。全局作用域在编译时生成
- 函数作用域:在V8运行到函数处 编译时生成。
- 以及ES6的块级作用域。
### 作用域链
- 在使用一个变量时，V8引擎会从作用域中查找相关变量，沿着作用域查找的路径，就是作用域链。
### 词法作用域
- JavaScript的作用域机制采用的是词法作用域，词法作用域是指，作用域是根据代码定义时的位置决定的，与调用顺序无关。所以当代码写出后，经过编译，作用域链就以及确定了。
- 所以说词法作用域是静态的。与静态的词法作用域相对应的是this，this与函数的调用者有关，是动态的。

## JS中的加法
- 有一个为 字符串时，则字符串拼接。

## V8中的ToPrimitive方法
- 获取原始类型的值。首先调用对象的valueOf，如果没有或者返回的不是原始类型，再调用 toString()，如果没有或者返回的不是原始类型，则报错。

## 运行时环境：
  ### 运行时环境包括：
  - 栈空间：栈空间是连续的，通过栈顶指针（存储在esp寄存器中）上下移动来执行，想在栈中分配一块大的空间很难。而且栈空间比较小，函数调用过深会导致栈溢出。函数的临时变量和当前地址存储在栈空间中，执行结束后，栈指针下移，就可以把栈空间回收。
  - 堆空间：堆空间比较大。
  - 全局执行上下文
  - 全局作用域
  - 时间循环系统
  - 
## 几个任务的执行结果
```Javascript
function foo1(){
    foo1()
}
foo1() //报错，栈溢出

function foo2(){
    setTimeout(foo2,0)
}
foo2() //正常执行

function foo3(){
    return  Promise.resolve().then(foo3)
}
foo3()//不会报错，但是页面会卡住。
```
## 详解JS闭包
  ### JS中函数的三大特性：
  1. 函数内部可以定义函数。
  2. 内部函数可以使用外部函数的变量。
  3. 函数可以作为函数的返回值。
  ### V8对函数闭包的实现
  1. 代码的执行包括编译和执行，编译阶段，考虑到性能，V8对JS代码并不是完全编译，采用的是惰性解析。就是指，解析器在解析的过程中，如果遇到函数声明，那么会跳过函数内部的代码，并不会为其生成 AST 和字节码，而仅仅生成顶层代码的 AST 和字节码。
  2. 当执行到一个外部函数时，因为要实现闭包，所以对于其中的内部函数，需要知道内部函数是否饮用了外部函数的变量，并不会完全不解析，采取的是预解析（器），预解析的目的有两个，一是检查代码是否存在语法错误，存在的话会报错。二是检查内部函数是否使用了外部函数的变量，如果有的话，则把这些变量从栈空间移到堆空间，同时生成一个闭包对象指向这些变量。（最后的结果都是堆空间中存在闭包对象，具体是何时把栈空间的对象移到堆空间，具体语言实现不同）。这也解释了，为什么闭包的变量，是外部函数对该变量操作之后的最终结果，而不是该变量声明时的数据。
  3. 这样，当有引用指向这个内部函数时（外部函数返回），堆空间内的闭包对象就不会被垃圾回收。虽然外部函数被销毁了，但是闭包对象仍然存在。







 我不是生活在昨天，不是生活在明天，而是生活在每一个当下的瞬间片刻。
 我的追求应当是每一个瞬间的快乐。让我感到快乐的，不是盛大的狂欢，因为狂欢之后是比狂欢更深刻的空虚。
 让我感到快乐的，是和爱人依偎、和亲人朋友交谈、是学习新东西、是创造的快乐、是传播这份快乐得到的快乐。