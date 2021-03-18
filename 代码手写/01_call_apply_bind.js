function fn(a,b){
    this.x = 3
    console.log(a,b,this);
}

fn(1,2)
const obj = {m:0}
fn.call(obj,1,2)
fn.apply(obj,[1,2])
//手写call
//使用时都是fn.call，所以call内部的this，就是fn，
//要以指定的obj为this执行fn，则用 obj调用一个函数即可，这个函数和fn也就是call内部的this是同一个
//同时需要处理obj 为null或未定义的情况，以及删除obj定义的临时函数。
Function.prototype.call = function call(obj, ...args){
    if(obj === undefined || obj === null){
        obj = window
    }
    //保证新增的属性唯一，防止覆盖其他属性
    let tempFn = Symbol("tempFn")
    obj[tempFn] = this
    let result = obj.tempFn(...args)
    delete obj[tempFn]
    return result
}
// 手写apply
function getGlobalObject(){
    return this;
}
Function.prototype.apply = function apply(thisArg, argsArray){ // `apply` 方法的 `length` 属性是 `2`。
    // 1.如果 `IsCallable(func)` 是 `false`, 则抛出一个 `TypeError` 异常。
    if(typeof this !== 'function'){
        throw new TypeError(this + ' is not a function');
    }

    // 2.如果 argArray 是 null 或 undefined, 则
    // 返回提供 thisArg 作为 this 值并以空参数列表调用 func 的 [[Call]] 内部方法的结果。
    if(typeof argsArray === 'undefined' || argsArray === null){
        argsArray = [];
    }
    
    // 3.如果 Type(argArray) 不是 Object, 则抛出一个 TypeError 异常 .
    if(argsArray !== new Object(argsArray)){
        throw new TypeError('CreateListFromArrayLike called on non-object');
    }

    if(typeof thisArg === 'undefined' || thisArg === null){
        // 在外面传入的 thisArg 值会修改并成为 this 值。
        // ES3: thisArg 是 undefined 或 null 时它会被替换成全局对象 浏览器里是window
        thisArg = getGlobalObject();
    }

    // ES3: 所有其他值会被应用 ToObject 并将结果作为 this 值，这是第三版引入的更改。
    thisArg = new Object(thisArg);
    //这里有一个潜在的问题是，__fn会覆盖原来的__fn,可以用symbol来做，或者new Date().getTime
    var __fn = '__fn';
    thisArg[__fn] = this;
    // 9.提供 thisArg 作为 this 值并以 argList 作为参数列表，调用 func 的 [[Call]] 内部方法，返回结果
    var result = thisArg[__fn](...argsArray);
    delete thisArg[__fn];
    return result;
};


Function.prototype.bind = function(obj,...args){
    return (...args2)=>{
        return  this.call(obj,...args,...args2)
    }
}
