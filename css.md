## 清除浮动的方法

### 问题描述
```html
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
      .topDiv { 
        width: 500px; 
        border: 2px solid black;
      }
      .floatDiv { 
        width: 100px; 
        height: 100px; 
        border: 2px dotted red; 
        color: red; 
        margin: 4px; 
        float: left;
      }
      .bottomDiv { 
        width: 500px; 
        height: 100px; 
        margin: 5px 0; 
        border: 2px dotted black;
      }
      .textDiv { 
        color: blue; 
        border: 2px solid blue;
      }
    </style>
  </head>
  <body>
    <div class="topDiv">
      <div class="floatDiv">float left</div>
      <div class="textDiv">
        本文介绍了四种清除浮动的方法，并尝试解释其原理。在理解了各种清除浮动的原理之后，你会发现，很多清除浮动的方法本质上其实是一样的。掌握这些原理，相信你可以根据场景和需求，灵活运用原则发展出不同的清除浮动的方法，而不再死记或拘泥于文中提到的方法。
      </div>
    </div>
    <div class="bottomDiv">
      解决第一个问题，需要清除 .textDiv 周围的浮动，而解决第二个问题，因为父元素的兄弟元素位置只受父元素位置的影响，就需要一种方法将父级元素的高度撑起来，将浮动元素包裹在其中，避免浮动元素影响父元素外部的元素排列。
    </div>
  </body>
  </html>
```

1.  首先我们可能希望文字在浮动元素下方
2.  浮动元素排版超出了父级元素，如果没有文本高度支撑，父元素高度塌缩为0
3.  影响了兄弟元素的排版，因为其脱离了文档流

- 解决第一个问题： 需要清楚文字周围浮动
- 解决第二个问题： 因为父元素的兄弟元素位置只受父元素位置影响，需要一种方法将父元素高度撑起来

### Solution

1. clear
设置clear为left， 但是如果textDiv在前面 那么父元素的高度不会撑起来。

2. 在父元素末尾添加一个块级元素并clear: both

3. 利用伪元素
在父级元素topDiv上加一个类叫clearFix。
```css
.clearfix::after {
  content: '';
  height: 0;
  display: block;
  clear: both;
}
```

4. 使用overflow
在topDiv上加 overflow: auto，清楚原理为BFC（Block formatting context），块格式化上下文。

## BFC

块级格式化上下文是CSS可视化渲染的一部分，他是一块区域，规定了内部块盒子的渲染方式，以及浮动相互之间的影响关系。

### BFC特点：

1. 内部块级元素会在垂直方向上一个一个放置。
2. 块级元素垂直方向的距离由margin决定同一个BFC的两个相邻块级元素的margin会发生重叠。
3. 对于从左往右的格式化，每个元素的左边缘与包含块的左边缘相接触。即使包含块中的元素存在浮动也是如此，除非其中元素在生成一个BFC。
4. BFC的区域不会与浮动元素重叠。
5. BFC是一个隔离的独立容器，容器里面的子元素和外面的元素互不影响。
6. 计算BFC容器的高度时， 浮动元素也参与计算。

### 触发条件：
* 根元素
* float不是none
* position不是static或者relative
* display值是inline-block、inline-flex、flex、flow-root、table-caption、table-cell
* overflow的值不是visible

### BFC应用
1. 清除浮动
可以用clear：both来清除浮动，也可以根据BFC的渲染规则第6点来清除浮动，解决高度坍塌问题。

2. 解决上下margin边距问题
利用BFC渲染规则第2点（属于同一个BFC的两个相邻块级元素的margin会发生重叠），
那么不属于同一个BFC的两个相邻块级元素的margin就不会发生重叠

3. 实现自适应两栏布局
自适应两栏布局，是一个主内容区域和一个侧边栏区域组成，两个区域的宽度都可以随窗口大小自适应。
```html
<style>
    .main{
        background: red;
        height:500px;
        overflow: auto;
    }
    .sider {
        float: left;
        width: 20%;
        height:300px;
        background: blue;
    }
</style>
<body>
    <div class="sider">我是侧边栏</div>
    <div class="main">我是主体内容</div>
<body>
```

## IFC
Inline Formatting Context

### 产生条件
块级元素中仅包含内联级别元素， 注意当IFC中由块级元素插入时，会产生两个匿名块将父元素分割开来，产生两个IFC。
