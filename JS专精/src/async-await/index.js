//async await是promise的语法糖
//以一种同步的方式去写代码,如果await后面的代码不是Promise实例，则会进行包装
//await左边和后面的代码是异步的，await右边的代码是同步的，类似于Promise中的入参函数
// async function fn() {
//     console.log(1)
//     const result = await console.log(2)
//     console.log(3)
// }

// fn()

// let a = 0
// let test = async () => {
//     a = a + await 10
//     console.log(a)
// }
// test()
// console.log(++a)

//事件循环题目：涉及到Promise、async await

//script start
//async1 start
//async2
//promise1
//promise2
//script end

//setImmediate
//async1 end
//promise3
//setTimeout0
//setTimeout3
async function async1() {
    console.log('async1 start')
    await async2()  //注意await左边部分的代码和await下面部分的代码是异步的，二await右边部分的代码是同步的，类似于new Promise的入参
    console.log('async1 end') //2.2在浏览器环境下是放入微任务队列中，node.js中是放在宏任务队列中
}
async function async2() {
    console.log('async2')
}
console.log('script start')
setTimeout(function () {
    console.log('setTimeout0')
}, 0)  //1.1放进宏任务队列中
setTimeout(function () {
    console.log('setTimeout3')
}, 3) //1.2放进宏任务队列中
setImmediate(() => console.log('setImmediate')); //node.js环境才有，放入宏任务队列中
process.nextTick(() => console.log('nextTick'));  //node.js中才有这个API，微任务
async1();
new Promise(function (resolve) {
    console.log('promise1')
    resolve();
    console.log('promise2')  //立即执行
}).then(function () {
    console.log('promise3')  //2.3 Promise.then 微任务队列中
})
console.log('script end')

