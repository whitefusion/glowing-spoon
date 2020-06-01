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


