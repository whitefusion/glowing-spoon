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