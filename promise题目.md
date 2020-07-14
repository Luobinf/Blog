在项目中，经常会遇到多个相互依赖的异步请求。如有a,b,c三个ajax请求，b需要依赖a返回的数据，c又需要a和b请求返回的数据。如果采用请求嵌套请求的方式自然是不可取的。导致代码难以维护，如何请求很多。会出现很多问题
采用Promise来解决回调地狱的问题

```JS
function fetchData1() {
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            let data = {
                name: 'jack'
            }
            resolve(data)
        }, 3000)
    })
}

function fetchData2(data) {
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            console.log('第一次请求返回的数据给第二次请求')
            resolve('第二次请求')
        }, 5000)
    })
}


fetchData1().then(res => {
    console.log(res)
    return fetchData2(res)
}).then(res => {
    console.log('res: ' + res)
    //.....可以一直处理下去
})
```

```JS
//实现一个元素先红色两秒在黄色一秒再绿色三秒，不断循环

function red() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve('红灯亮')
        }, 2000)
    })
}

function yellow() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve('黄色亮')
        }, 1000)
    })
}

function green() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve('绿灯亮')
        }, 3000)
    })
}
    
(
    function start() {
        red().then(res => {
            console.log(res)
            return yellow()
        }).then(res => {
            console.log(res)
            return green()
        }).then(res => {
            console.log(res)
            start()
        })
    }
)()

```

// Promise.all()方法用于将多个Promise实例，包装成一个新的Promise实例。如何实现?
// 1. Promise.all()方法只有等到p1\p2\p3的状态全部变为fulfilled时，p的状态才是fulfilled，
//此时p1、p2、p3的返回值组成一个数组，传递给p的回调函数。

//2. 只要p1、p2、p3之中有一个被rejected，p的状态就变成rejected，此时第一个被reject的实例的返回值，会传递给p的回调函数。

```JS
var p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(101)
    }, 2000);
})

var p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(10)
    }, 1000);
})
```

```JS
//[10,20, 30]
//[p1, p2, p3]
Promise.myAll = function (promises) {
    let p = new Promise((resolve, reject) => {
        let result = []
        var record = 0
        if (!Array.isArray(promises)) {
            return reject(`参数必须是一个数组`)
        }
        for (let i = 0; i < promises.length; i++) {
            Promise.resolve(promises[i]).then(res => {
                // result.push(res)
                record++  //注意这句话是由 result.length === promises.length改变的，用result.length会有问题，因为有可能是异步会出现result[2] = 10,这就导致了此时result的length就为2了。
                result[i] = res   //注意这一步为什么要变成这样，因为有可能Promise实例是异步的，例如定时器，这样的话定时器长的就会放在result数组的后面，导致顺序不对，故要这样做。
                if (record === promises.length) {
                    resolve(result)
                }
            }, reason => {
                reject(reason)   //注意当Promise.resolve()的参数是一个Promise实例时，那么Promise.resolve将不做任何修改，原封不动的返回这个实例。
            })
        }
    })
    return p
}
```

```JS
Promise.myAll([p1, p2]).then(result => {
    console.log(result)
}).catch(res => {
    console.log(res)
})
```

