
## call
 - 以指定的this来调用函数。
## apply
- 以指定的this来调用函数（同call）。且其余参数用[]传递
- 
## bind
- 返回一个新的函数(),新函数调用时会调用原来的函数，且this为bind()指定的第一个参数的值。如果为null、undefined，this指定为window。
- 可以指定参数的值
## this
1. window

```Javascript
function fn(a,b){
    this.xxx = 3
    console.log(a,b,this);
}

fn(1,2)
console.log(xxx); //此时this是window ,因为是window.fn(1,2)
const obj = {m:0}
fn.call(obj,1,2) //指定this为obj
fn.apply(obj,[1,2]) // 指定this为obj，且参数以[]传递
fn.bind(obj,1,2) //这样并没有调用函数
fn.bind(obj,1,2)(3,4) //这样才调用了函数，且传入了四个参数1，2，3，4，优先匹配到前两个
```