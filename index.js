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


console.log(Object.keys(person1)); //获取所有可枚举的实例（自身）属性
console.log(Object.getOwnPropertyNames(person1));//同上，可不可枚举都返回。
console.log(person1.hasOwnProperty('selfp1')); //判断实例对象上有没有这个属性。

