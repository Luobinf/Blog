# HTML文档解析
当浏览器拿到 HTML 文档后，会逐行进行解析，遇到link标签时,会先加载 CSS，等到 CSS 加载完毕后，才会将 DOM 渲染到页面上，但是此时浏览器会继续解析文档，构建 DOM 树，也即 CSS 加载不会阻塞 DOM 树的解析，但是会阻塞 DOM 的渲染。可以做一个实验看看:

为了做如下的测试，先将谷歌浏览器的下载速度调慢点。

1. 打开chrome控制台(按下F12),可以看到下图
[![3ENjZn.md.png](https://s2.ax1x.com/2020/02/19/3ENjZn.md.png)](https://imgchr.com/i/3ENjZn)

2. 接着点击Add按钮
[![3EU8eA.md.png](https://s2.ax1x.com/2020/02/19/3EU8eA.md.png)](https://imgchr.com/i/3EU8eA)

3. 最后点击Add custom profile...按钮添加，可以自定义名字，设置下载速度等，最后点击Add即可。
[![3EUflF.md.png](https://s2.ax1x.com/2020/02/19/3EUflF.md.png)](https://imgchr.com/i/3EUflF)

4. 再回到第一步那里就会多一个网络选项，选择刚才设置的那一个即可。

## css加载到底会不会阻塞DOM树的解析和渲染?
看如下代码:
```javascript
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>css加载不会阻塞DOM树解析，但是会阻塞DOM的渲染</title>
    <script>
        setTimeout(() => {
            let div = document.querySelector('div')
            console.log(div)
        }, 0)
    </script>
    <link href="https://cdn.bootcss.com/bootstrap/4.0.0-alpha.6/css/bootstrap.css" rel="stylesheet">
</head>

<body>
    <div>
        hi
    </div>
</body>

</html>
```

假设: CSS 会阻塞 DOM 解析和渲染。
那么在这个CSS文件还没有加载完成之前，script 标签中就无法获得 div，且页面上在等待 CSS 加载完成之前，一直都是空白的，直到 CSS 加载完成之后，页面才会出现 hi 。

但是实际结果可以看下列动图：

![3EchZT.gif](https://s2.ax1x.com/2020/02/19/3EchZT.gif)

可以看到控制台打印出了 div 元素(该元素已经在DOM树上了)，说明 DOM 已经解析到 div 元素那里了，故 CSS 在加载过程中并不会阻塞 DOM 的解析。但是在页面上 div 元素在 CSS 加载完全后才出现，说明 CSS 会阻塞 DOM 在页面上的渲染。

```javascript
个人觉得，这是浏览器的一种优化机制。因为你加载css的时候，可能会修改下面DOM节点的样式，如果css加载不阻塞DOM树渲染的话，那么当css加载完之后，有可能页面中的DOM节点样式会被改变，那么此时页面又得重新重绘或者回流了，这就造成了一些没有必要的损耗。
```

## CSS 加载会不会阻塞 JS?
 看如下代码
 ```javascript
 <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>css加载不会阻塞DOM树解析，但是会阻塞DOM的渲染</title>
    <link href="https://cdn.bootcss.com/bootstrap/4.0.0-alpha.6/css/bootstrap.css" rel="stylesheet">
</head>

<body>
    <div>
        hi
    </div>
    <script>
        // 在样式表加载之前，脚本都不会执行
        let div = document.querySelector('div')
        let width = window.getComputedStyle(div).width
        console.log(width)
    </script>
</body>

</html>
 ```
![3EWO9e.gif](https://user-gold-cdn.xitu.io/2020/2/19/1705c8f17da931d6?w=1094&h=616&f=gif&s=6231822)

 可以看到，CSS 没有加载完成之前，控制台始终没有打印出 div 元素的宽度，直到 CSS 加载完成后，才打印出 div 元素的宽度，说明 CSS 加载会阻塞 JS。

 ```javascript
 原因是脚本可能希望获取如上述示例所描述的元素宽度和其他与样式相关的属性。
 因此，它必须等待样式被加载。
 ```

 ## 总结
 1. CSS 加载不会阻塞 DOM 的解析，但是会阻塞 DOM 的渲染。
 2. CSS 加载会阻塞 JS。