//Promise是异步编程的解决方法，用来解决回调地狱的问题。
//Promise是怎么解决的？采用then可以进行链式调用。

//采用Promise A+ 规范
//注意Promise A+ 规范说了： 
//then方法必须返回一个promise
//promise2 = promise1.then(onFulfilled, onRejected);
//promise2.then(() => {}, () => {})
// 如果onFulfilled或onRejected返回一个值x, 运行 Promise Resolution Procedure [[Resolve]](promise2, x),
//也即运行promise2成功的回调函数，即then的第一个参数

//但是onFulfilled或onRejected返回一个值x是一个Promise，则：
// 1.如果x是请求状态(pending),promise必须保持pending直到xfulfilled或rejected
// 2.如果x是完成态(fulfilled)，用相同的值完成fulfill promise
// 3.如果x是拒绝态(rejected)，用相同的原因reject promise
class Promise2 {
    constructor(fn) {
        this.state = 'pending'
        this.succeed = null
        this.fail = null
        this.callbacks = []
        if(typeof fn !== 'function') {
            throw new Error('只接收函数')
        }
        fn(this.resolve.bind(this),this.reject.bind(this))
    }
    resolve(result) {
        if(this.state !== 'pending') return //成功或失败函数调用不能超过一次
        this.state = 'fulfilled'
        nextTick(() => {
            this.callbacks.forEach(handle => {
                if(typeof handle[0] === 'function') {
                    let x
                    try {
                        x = handle[0].call(undefined,result)
                    } catch(e) {
                        return handle[2].reject(x)
                    }
                    handle[2].resolveWith(x)
                }
            })
        })  //事实上这里是有问题的，应该是微任务
    }
    reject(reason) {
        if(this.state !== 'pending') return
        this.state = 'rejected'
        nextTick(() => {
            this.callbacks.forEach(handle => {
                if(typeof handle[1] === 'function') {
                    let x
                    try {
                        x = handle[1].call(undefined,reason)
                    } catch(e) {
                        return handle[2].reject(x)
                    }
                    handle[2].resolveWith(x)
                }
            })
        })
    }
    then(success,fail) {
        const handle = []
        if(typeof success === 'function') {
            handle[0] = success
        }
        if(typeof fail === 'function') {
            handle[1] = fail
        }
        handle[2] =  new Promise2(() => {})
        this.callbacks.push(handle)  //可能会多次调用Promise.then()
        return handle[2]
    }
    resolveWith(x) {
        if(this === x) {
            return this.reject(new TypeError())
        }
        if(x instanceof Promise2) {
            x.then((result) => {
                this.resolve(result)
            }, (reason) => {
                this.reject(reason)
            })
        }
        if(x instanceof Object) {
            let then
            try{
                then = x.then
            }catch(e) {
                this.reject(e)
            }
            if(then instanceof Function) {
                try{
                    then.call(x, (y) => {this.resolveWith(y)}, (r) => {this.reject(r)})
                } catch(e) {
                    this.reject(e)
                }                
            } else {
                this.resolve(x)
            }
        } else {
            this.resolve(x)
        }
    }
}

//nextTick兼容浏览器和node，看vue中的nextTick是如何实现的
//new MutationObserver() 创建并返回一个新的 MutationObserver 它会在指定的DOM发生变化时被调用,属于微任务，优先级比setimmediate还高。
function nextTick(fn) {
    if(process !== undefined && typeof process.nextTick === 'function') {
        return process.nextTick(fn)
    } else {
        var counter = 1
        var observer = new MutationObserver(fn)
        var textNode = document.createTextNode(String(counter))
    
        observer.observe(textNode,{
            characterData: true
        })
    
        counter += 1
        textNode.data = String(counter)
    }
}

//注意process.nextTick只能在node.js上使用, 属于微任务;setImmediate也是node.js中才有的,属于宏任务
module.exports = Promise2
