## 一. 模块化

为什么要模块化？解决命名冲突，提高复用性，利于维护。

**Commom JS：**
  CommonJS规范加载模块是同步的，也就是说，只有加载完成，才能执行后面的操作。AMD规范则是非同步加载模块，允许指定回调函数。
由于Node.js主要用于服务器编程，模块文件一般都已经存在于本地硬盘，所以加载起来比较快，不用考虑非同步加载的方式，所以CommonJS
规范比较适用。但是，如果是浏览器环境，要从服务器端加载模块，这时就必须采用非同步模式，因此浏览器端一般采用AMD规范。

**require命令：**
  require命令的基本功能是，读入并执行一个JavaScript文件，然后返回该模块的exports对象。如果没有发现指定模块，会报错。
  
  模块的缓存：
    第一次加载某个模块时，Node会缓存该模块。以后再加载该模块，就直接从缓存取出该模块的module.exports属性。
  
  模块的加载机制：
    CommonJS模块的加载机制是，输入的是被输出的值的拷贝。也就是说，一旦输出一个值，模块内部的变化就影响不到这个值。
    

**ES Module：**
  ES Module 是原生实现的模块化方案，采用异步加载的方式。并且采用实时绑定的方式，导入导出的值都指向同一个内存地址，所以导入值会跟随导出值变化。
  
## 二. map\reduce等数组方法

map：对数组的每一个元素做一些操作之后返回一个新的数组，不会改变原数组。
reduce：对数组中的每个元素执行一个自定义的累计器，将其结果汇总为单个返回值。例如这种用法：arr.reduce((accumulate,current,index,arr) => accumulate + current,initialValue)

```JS
let arr = [1,2,4]
arr.map(val => val * 2)  //返回 [2,4,8]

//使用reduce模拟map
let res = arr.reduce((accumulate,current) => {
  accumulate.push(current*2)
  return accumulate;
},[])
console.log(res);  //[2,4,8]
```

## 三. 继承

```JS
class Person {
  constructor(name, age) {
      this.name = name
      this.age = age
  }
  run() {
      console.log(`run~~~`)
  }
}

class Man extends Person{
  constructor(name, age, nickname) {
      super(name, age)
      this.nickname = nickname
  }
  travel() {
      console.log(`travel~~~`)
  }
}

var man = new Man('jack', 23, 'blackMan')
        
function Super(name) {
    this.name = name
}
Super.prototype.travel = function () {
    console.log(`travel`)
}
function Sub(name, age) {
    Super.call(this, name)
    this.age = age
}
// Sub.prototype = Super.prototype  1. 如果直接这样赋值进行继承的话，那么修改了Sub.prototype之后，Super.prototype 也会跟着修改，因为这是一个引用关系，两者指向同一个对象。
// Sub.prototype = new Super('jack')  //2. 如果这样做之后，那么Sub.prototype这个原型对象会有父类实例的属性啥的，但是我并不想要父类的属性，只想是一个纯粹的对象，有自己的方法而已。
Sub.prototype = Object.create(Super.prototype) //3. 使用Object.create可以创建一个对象并将这个对象的原型链接到第一个参数。
Sub.prototype.constructor = Sub  //将constructor属性指向正确的位置
Sub.prototype.run = function () {
    confirm.log(`sub~~~~`)
}
var sub = new Sub('jack', 23)

// Polyfill Object.create()——通过polyfill彻底理解。上述的Object.create原理如下
Object.create = function (proto) {
    function F() { }
    F.prototype = proto;
    return new F();
}
function F() {
}
F.prototype = Super.prototype
Sub.prototype = new F()
Sub.prototype.constructor = Sub
```

博客: https://juejin.im/entry/5bbf51015188255c3a2d6965
  

