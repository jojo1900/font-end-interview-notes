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
  3.  