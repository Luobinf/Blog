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

