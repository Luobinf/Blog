## @babel/preset-env是什么 ?

@babel/preset-env可以允许你使用最新的 js 语法，而不需要你去处理与目标环境相关的语法转化。举个例子说明一下：假设你现在在源代码中写了箭头函数等新语法，那么对于版本比较新的浏览器来说，浏览器本身就支持了这些新特性，那对于版本比较老的浏览器来说，有可能就不支持了，此时你需要将代码转化成浏览器能够支持的版本，向后进行兼容，即polyfill。同时又提供了一些参数选项，可以让你灵活的进行配置。


## @babel/preset-env比较重要的几个配置参数

Options：targets、useBuiltIns

### targets

该参数是用于描述项目中所需要的一些环境信息。

```JSON
{
   "targets": "> 1%, last 2 versions"
}
```

上述意思是目标环境需要支持到市场份额大于1%的浏览器、最近的两个版本（最终的目标环境结果是这两个条件的并集）

可以根据以下命令查看上述的目标浏览器是什么：

```Shell
npx browserslist
```

### useBuiltIns

useBuiltIns项取值可以是"usage" 、 "entry" 或 false。如果该项不进行设置，则取默认值false。

useBuiltIns这个参数项主要和polyfill的行为有关。

在我们没有配置该参数项或是取值为false的时候，会全部引入到最终的代码里。useBuiltIns取值为"entry"或"usage"的时候，会根据配置的目标环境找出需要的polyfill进行部分引入。

当使用"entry"或"usage"的时候，需要直接引用core-js。@babel/polyfill在7.4.0中已经不推荐使用，建议直接添加core-js，并通过corejs选项设置版本。

```Shell
npm install core-js@3 --save

# or

npm install core-js@2 --save
```

1. useBuiltIns配置成usage时

```JSON
{
  "presets": [
    [
      "@babel/env",
      {
        "useBuiltIns": "usage",
        "corejs": "3.15.2"
      }
    ]
  ]
}
```
例子在babel文档中的babel-demo1

2. useBuiltIns配置成entry时

```JSON
{
  "presets": [
    [
      "@babel/env",
      {
        "useBuiltIns": "entry",
        "corejs": "3.15.2"
      }
    ]
  ]
}
```
当 useBuiltIns 配置成 entry 时，需要你在项目的入口文件中自行导入core.js。
此时可以看到，与useBuiltIns配置成usage时相比，也进行了按需引入，但是与 usage 不同的是，Babel除了会考虑目标环境缺失的API模块，同时考虑我们项目代码里使用到的ES5+特性。而配置成usage时，只有我们使用到的ES5+特性API在目标环境缺失的时候，Babel才会引入core-js的API补齐模块。

例子在babel文档中的babel-demo2

3. useBuiltIns配置成false时，或者该选项不进行配置，则默认会是false

```JSON
{
  "presets": [
    [
      "@babel/env",
      {
        "useBuiltIns": false
      }
    ]
  ]
}
```
此时会将所有的pollyfill进行引入。

例子在babel文档中的babel-demo3。