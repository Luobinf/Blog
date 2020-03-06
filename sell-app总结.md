## Header组件

## Tab切换
首页 Tab 切换有一个底部1px问题，需要解决。即在CSS代码中写了1px，但是实际在iphone6/7/8上显示的却是2px，在iphone 6plus/7plus/8plus 却是3px，如何解决？原因是什么？

为了说明原因我们先要搞清楚什么是dpr(devicePixelRatio)即设备像素比，设备像素比 = 设备像素 ：设备独立像素

设备像素也称为物理像素，是显示器的最小物理单位。

设备独立像素独立于设备，与设备无关，通常我们说的电脑的分辨率为 1960 * 1440，指的就是设备
独立像素，也称为逻辑分辨率。

为了搞清楚原因，我们还需要知道什么是CSS像素？

CSS像素用于度量网页上的内容。在一般情况下(当页面缩放比为1时)，一个CSS像素对应一个设备独立像素。


假设dpr为2的屏幕，在页面缩放比为1下，你写了border:1px solid red;那么就对应一个设备独立像素，2个设备物理像素，这就是让你在屏幕上看起来比较宽的原因。在dpr为3的设备上，看起来更粗。

如何解决，既然在不同dpr的设备上显示的大小不同，只要在dpr > 1的设备上，将大小进行缩放就可以解决了。以下是解决边框的一种方案，即通过媒体查询的不同来进行不同的缩放。

```CSS
/* 解决移动端 border 1px问题 */
/* 还要加一行meta标签 */
 <meta name="viewport" content="width=device-width,initial-scale=1.0
      minimum-scale=1.0,maximum-scale=1.0,user-scalable=no">
@media (-webkit-device-pixel-ratio: 1.5),(min-device-pixel-ratio: 1.5) {
  .border-1px {
    &::after {
      -webkit-transform: scaleY(0.7);
      transform: scaleY(0.7);
    }
  }
}

@media (-webkit-device-pixel-ratio: 2),(min-device-pixel-ratio: 2) {
  .border-1px {
    &::after {
      -webkit-transform: scaleY(0.5);
      transform: scaleY(0.5);
    }
  }

}

@media (-webkit-device-pixel-ratio: 3),(min-device-pixel-ratio: 3) {
  .border-1px {
    &::after {
      -webkit-transform: scaleY(0.3);
      transform: scaleY(0.3);
    }
  }
}
```
还可以使用 box-shadow、border-image等方法，但是这些方法对于想要做border-radius的情况无能为力。

## 使用sass中的@mixin混入来提高代码的可复用性，避免大段的CSS样式代码重复。
具体可查看sass的官方文档。


## Header组件中点击的弹出层中的底部粘滞效果即 CSS Strickey Footer
即如何实现弹出层的关闭按钮始终显示在底部，即使页面内容高于设备高度时，也在底部。

这种情况可以使用 flex 布局来解决。给内容设置 flex: 1,即当页面内容高度过小时，则自动将剩余的空间分配给它，页面内容过高时，底部关闭按钮自然而然的就在底部。


## Goods组件
# 如何实现左右两栏联动效果，思路是什么?
使用better-scroll库

## 如何实现Chrome 10px字体大小。
chrome设置字体大小，当字体小于12px时候都以12px来显示，这时候可以使用CSS3的scale()缩放来解决。
```CSS
font-size:12px;
-webkit-transform:scale(0.84);
/* 10px */

/* 或者先放大再缩小 */
font-size:20px;
-webkit-transform:scale(0.5);
```
移动端的话基本都支持10px的字体大小。


