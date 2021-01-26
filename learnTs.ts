//接口首字母约定为I，P要大写
interface IPerson{
    //只读属性，在对象初始化时必须赋值，切后续不再更改
    readonly id :number,
    // 确定属性，实现中必须存在
    name:string,
    // 可选属性，可以有可以没有
    age?:number,
    // 任意属性，类型必须涵盖接口中出现的所有类型
    [propName:string]:string|number
}

let pp:IPerson = {
    id:1,
    name:"pp",
    age:24,
    sex:'female',
    likes:'aa'
}

console.log(pp);
