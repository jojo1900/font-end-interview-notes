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

## 3.typeof 和 instanceOf的区别
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
- 解决的办法时，把只需生成一次方法，定义在构造函数外，然后构造函数内的属性指向这个函数，但是当方法变多时，构造函数和方法分开，会很麻烦。
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