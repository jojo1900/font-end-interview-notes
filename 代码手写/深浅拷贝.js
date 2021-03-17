//深拷贝 JSON.parse(JSON.stringfy(obj)) 不是同一个对象；针对对象的第一层，基础类型复制值，引用类型递归的复制，直到变成基础类型；
function deepClone(obj){
    let result = {}
    if(obj === null) return obj
    if(obj instanceof Date) return new Date(obj)
    if(obj instanceof RegExp) return new RegExp(obj)
    if(typeof obj !=="object") return obj
    for (const key in obj) {
        if (Object.hasOwnProperty.call(obj, key)) {
            result[key] = deepClone(obj[key])
        }
    }
    return result
}

//浅拷贝 Object.assign(); [].concat; [].slice()；不是同一个对象；针对对象的第一层，基础类型复制值，引用类型复制地址；
function shallowClone(obj){
    let result = {}
    for (const key in obj) {
        if (Object.hasOwnProperty.call(obj, key)) {
            result[key] = obj[key]
        }
    }
    return result
}

