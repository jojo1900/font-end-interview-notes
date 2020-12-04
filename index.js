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
