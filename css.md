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

### 渲染规则
* 子元素水平横向排列，垂直方向起点为顶部。
* 子元素只会计算横向样式空间，（padding， margin，border），垂直方向不会计算
* 在垂直方向上，子元素会以不同形式来对齐
* 能把在一行上的框都完全包含进去的一个矩形区域，被称作行框。行框的宽度是由包含块（containing box）和其中的浮动来决定。
* IFC中的“line box”一般左右边贴紧其包含块，但float元素会优先排列。
* IFC中的“line box”高度由css行高计算规则来确定，同个IFC下的多个line box高度可能会不同。
* 当inline-level boxes的总宽度少于包含他们的line box时，其水平渲染规则由text-align属性值来决定
* 当一个inline box超过父元素的宽度时，他会被分割成多个boxes，这些boxes分布在多个line box中。如果子元素未设置强制换行，inline-box 不可被分割，会溢出父元素。

### IFC应用
* 水平居中： 当一个块要在环境水平居中时，设置其为inline-block则会在外层产生IFC，通过text-align则可以使其水平居中
* 垂直居中：创建一个IFC，用其中一个元素撑开父元素高度，然后设置其vertical-align：middle，其他行内元素则可以在此父元素下 垂直居中。

## FFC
Flex formatting context

### 生成条件
父元素设置display：flex或者inline-flex

### 渲染规则
http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html

### FFC的应用
1. 自动撑开页面高度，底栏总是出现在页面的底部
```html

<style>
.wrap{
    display:flex;
    padding:0;
    margin:0;
    min-height:100vh;
    flex-direction:column;
}
.main{
    flex-grow:1;
}
</style>
<body class="wrap">
    <header style="line-height:50px;background:red;color:#fff;text-align:center">头部</header>
    <main class="main">内容</main>
    <footer style="line-height:50px;background:#eeeeee;color:#333;text-align:center">底栏</footer>
</body>
```

### 经典的圣杯布局
```html
<style>
.wrap {
    display: flex;
    padding: 0;
    margin: 0;
    min-height: 100vh;
    flex-direction: column;
}
header,
footer {
    flex: 0 0 50px;
}

.content {
    display: flex;
    flex: 1
}

.main {
    flex: 1;
}
.nav,
.ads{
    flex: 0 0 100px;
    background:green;
}
.nav{
    order:-1;
    background:yellow;
}
</style>
<body class="wrap">
    <header style="line-height:50px;background:red;color:#fff;text-align:center">头部</header>
    <div class="content">
        <main class="main">内容区</main>
        <nav class="nav">侧边导航</nav>
        <aside class="ads">侧边栏</aside>
    </div>
    <footer style="line-height:50px;background:#eeeeee;color:#333;text-align:center">底栏</footer>
</body>
```

## 元素居中

### 使用margin进行固定长度的偏移
使用margin进行高度偏移时 需要知道父元素和子元素的宽高

- 水平方向 ： margin： auto
- 垂直方向 ： margin-top进行下移 

### 使用绝对定位进行偏移

首先要将父元素设置 position: relative ， 子元素 position：absolute，然后使用left， top实现居中。

这种方法需要明确子元素的尺寸。

### 使用绝对定位并margin自适应进行居中
父元素position：relative，子元素position：absolute， left/top/bottom/right： 0， 然后margin： auto
这种居中方式是流体自适应居中，不需要知道父子元素的具体尺寸。

### 使用table-cell进行居中 
将父元素display：table-cell， 此时可以使用vertical-align：middle对内部子元素进行垂直居中 ， 之后子元素：margin： 0 auto实现水平居中

### 弹性盒子
display：flex， xy-center


