## 节流
```js
function throttle(func, threshold) {
    var timeout;
    var start = new Date();
    var threshold = threshold || 200;

    return function() {
        var context = this;
        var args = arguments;
        var curr = new Date() - 0;
        
        clearTimeout(timeout);
        if (curr - start >= threshold) {
            func.apply(context, args);
            start = curr;
        } else {
            timeout = setTimeout(function() {
                func.apply(context, args)
            }, threshold)
        }
    }
}
```
## 防抖
```js
function debounce(func, delay) {
    var timeout;

    return function(e) {
        clearTimeout(timeout);
        var context = this;
        var args = arguments;
        timeout = setTimeout(function() {
            func.apply(context, args);
        }, delay);
    }
}
```

## apply vs bind vs call

```js
Function.call(obj,[param1[,param2[,…[,paramN]]]])
```
- 调用的必须是函数，接受任意个参数
- 会马上执行

```js
Function.apply(obj[,argArray])
```
- 第二个参数是数组
- 会马上执行

```js
Function.bind(thisArg[, arg1[, arg2[, ...]]])
```
- 返回的是函数，不会马上执行

三者作用都是改变执行上下文

## [输入url发生了什么？](https://zhuanlan.zhihu.com/p/80551769)

### url解析
- 地址解析
- HSTS
- 浏览器检查缓存

### DNS查询
- 浏览器缓存
- 操作系统缓存
操作系统有自己DNS缓存，在这之前，会向检查域名是否存在本地的hosts文件，没有则向DNS服务器发送查询请求

3. 路由器缓存

4. ISP DNS缓存
客户端电脑上设置的首选DNS服务器，他们在大多数情况下都会有缓存。

__根域名服务器查询__
所有没有缓存，本地DNS会将请求转发到互联网上的根域。

需要注意的点
1. 递归方式： 一路查下去中间不返回，最终结果才返回信息
2. 迭代方式，本地DNS服务器到根域名服务器查询的方式
3. 什么是DNS劫持
4. 前端dns-prefetch优化

### TCP连接
1. 应用层： 发送http请求
2. 传输层： tcp传输报文
3. 网络层： ip协议查询mac地址
4. 链路层：以太网协议 

### 服务器处理请求 
1. HTTPD
2. 处理请求
3. 重定向
4. URL重写

### 浏览器接受响应

### 渲染页面 
1. html解析
- 解码
- 预解析
- 符号化
- 构建树

2. css解析
3. 渲染树
4. 布局与绘制
5. 合并渲染层
6. 回流与重绘

### Javascript编译执行
1. 词法分析
2. 预编译
3. 执行 

## 执行栈
js代码执行的时候会将不同的变量存于内存中的不同位置：堆和栈中加以区分。其中，堆里存放着一些对象。而栈中存放着一些基础类型变量以及对象的指针。但是执行栈与这个栈的意义有些不同。

当调用一个方法的时候，js会生成一个与这个方法对应的执行环境，叫执行上下文。这个执行环境中存在着这个方法的私有作用域，上层作用域的指向，方法的参数，这个作用域中定义的变量以及这个作用域的this对象。而当一系列方法被依次调用的时候，因为js是单线程的，同一时间只能执行一个方法，于是这些方法被排队在一个单独的地方，叫执行栈。

当一个脚本第一次执行的时候，js会解析这段代码，并将其中的同步代码按照执行顺序加入执行栈中，然后从头开始执行。如果当前执行的是一个方法，那么js会向执行栈中添加这个方法的执行环境，然后进入这个执行环境继续执行其中的代码。当这个执行环境中的代码执行完毕并返回结果后，js会退出这个执行环境并把这个执行环境销毁，回到上一个方法的执行环境。。直到执行栈中代码全部执行完毕。

## 事件队列
js一大特点是非阻塞，关键在于时间队列。

js引擎遇到一个异步事件后不会一直等待返回结果，而会将事件挂起，继续执行栈中其他任务。当一个异步事件返回结果后，js会将这个事件加入与当前执行栈不同的另一个队列，这就是事件队列。放入事件队列不会立刻执行其回调，而是等待当前执行栈中的所有任务都执行完毕，主线程处于闲置状态时，主线程会去查找事件队列是否有任务。如果有，那么主线程会从中取出排在第一位的事件，并把这个事件对应的回调放入执行栈中，然后执行其中的同步代码，如此反复，这样就形成了一个无线的循环。这就是事件循环。


## macro task and micro task
异步任务之间并不相同，执行优先级有区别。不同异步任务被分为两类：微任务和宏任务。

宏任务：
- setInterval()
- setTimeout()

微任务：
- new Promise()
- new MutationObserver()

在事件循环中，异步事件返回结果后会被放到一个任务队列中。然而根据这个异步事件的类型，这个事件实际上会被对应的宏任务队列或者微任务队列中去。并且在当前执行栈为空的时候，主线程会查看微任务队列是否有事件存在。如果不存在，那么再去宏任务队列中取出一个事件并把对应的回调加入当前执行栈；如果存在，则会依次执行队列中事件对应的回调，直至微任务队列为空，然后去宏任务队列中取出最前面的一个事件，把对应的回调加入当前执行栈，如此反复，进入循环。

只需记住当前执行栈执行完毕时立刻先处理所有微任务队列中的事件，然后再去宏任务中取出事件。同一事件循环中，微任务永远在宏任务之前执行。

``` js
setTimeout(function() {
    console.log(1);
})

new Promise(function(resolve, reject) {
    console.log(2);
    resolve(3);
}).then(function(val) {
    console.log(val);
})
```

结果为 2，3，1

