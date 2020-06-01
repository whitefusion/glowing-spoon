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
            timeout = setTimeout(function(){
                func.apply(context, args)
            }, threshold)
        }
    }
}

function debounce(func, delay) {
    var timeout;

    return function(e) {
        clearTimeout(timeout);
        var context = this;
        var args = arguments;
        timeout = setTimeout(function(){
            func.apply(context, args);
        }, delay);
    }
}

// arr 建立了对key的强引用，不会被回收
let key = new Array(5*1024*1024);
const arr = [[key, 1]];
key = null;
console.log( 'arr: ', arr);

// wm建立了对key的弱引用，会被回收
const wm = new WeakMap();
let akey = new Array(5);
wm.set(akey, 1);
console.log(wm.get(akey));
akey = null;
console.log(wm.get(akey))

// 普通拷贝
function isObj(obj) {
    return (typeof obj === 'object' || typeof obj === 'function') &&
        obj !== null;
}

// this deep cannot handle circle reference, which causes maximum call stack error.
function deepCopy(obj) {
    let tempObj = Array.isArray(obj) ? [] : {};
    for(let key in obj) {
        tempObj[key] = isObj(obj[key]) ? deepCopy(obj) : obj[key];
    }
    return tempObj;
}

// use weakmap to solve circle reference problem
function deepCopy(obj, hash=new WeakMap()) {
    if (hash.has(obj)) return hash.get(obj);
    let cloneObj = Array.isArray(obj) ? [] : {};
    hash.set(obj, cloneObj);
    for (let key in obj) {
        cloneObj[key] = isObj(obj[key]) ? deepCopy(obj[key]) : obj[key];
    }

    return cloneObj;
}


const o = {
    arr: [111, 222],
    obj: { key: 'duixiang' },
    a: () => { console.log('function'); },
    date: new Date(),
    reg: /正则/ig
}
const parsed = JSON.parse(JSON.stringify(o))
console.log('parsed: ', parsed);

// 结构化深拷贝，解决date， reg等类型的深拷贝//
function isObject(value) {
    const type = typeof valueof
    return value !== null && (type === 'object' || type === 'function');
}

function deepClone(obj, hash = new WeakMap()) {
    if (null === obj || 'object' !== typeof obj) return obj;
    let cloneObj;
    let Constructor = obj.constructor;
    console.log(1, Constructor);
    switch(Constructor) {
        case RegExp:
            cloneObj = new Constructor(obj);
            break;
        case Date:
            cloneObj = new Constructor(obj.getTime());
            break;
        default:
            if (hash.has(obj)) return hash.get(obj);
            cloneObj = new Constructor();
            hash.set(obj, cloneObj);
            console.log(2, hash.get(obj));
    }

    for(let key in obj) {
        cloneObj[key] = isObj(obj[key]) ? deepClone(obj[key], hash) : obj[key];
    }

    return cloneObj;
}
