/**
 * 
 * @param {需要深拷贝的目标} target 
 */
//注意window对象也有环，window.self = window.self.self =window; 正则表达式也是一个对象，它的原型最终指向的是Objec.prototype
// {name: 'jack',info: {age: 23,address: 'HZ'}}
//function fn() {}
// {name: 'jack', self: {name: 'jack',....}}

let cache = []
function deepClone(target) {
    if(target instanceof Object) {
        let cachedResult = findCache(target)
        if(cachedResult) {
            // console.log('有缓存')
            return cachedResult
        } else {
            // console.log('没有缓存')
            let result
            if(target instanceof Array) {
                result = new Array()
            } else if( target instanceof Function) {
                result = function () {
                    return target.apply(this,arguments)
                }
            } else if(target instanceof RegExp) {
                result = new RegExp(target.source,target.flags)
            } else if(target instanceof Date) {
                result = new Date(target)
            } else {
                result = new Object()
            }
            cache.push([target,result]) //将整个目标和结果放到缓存数组中
            // console.log('缓存',cache)
            for(let val in target) {
                if(target.hasOwnProperty(val)) {
                    result[val] = target[val] instanceof Object ? deepClone(target[val]) : target[val]
                }
            }
            return result
        }
    }
    return target
}

function findCache(target) {
    for(let i = 0; i < cache.length; i++) {
        if(cache[i][0] === target) {
            return cache[i][1]
        }
    }
    return undefined
}

//最后可以考虑将上述代码封装
module.exports = deepClone