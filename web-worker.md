## Background
- Javascript is **single-threaded**: a browser will never run two event handlers at the same time.
- No need to worry about locks, dead-locks or race conditions. 
- Client-side JS functions must not run too long, or it will tie up the event loop and the web browser will be unresponsive to the user input.

## Web workers

### Introduction
Web worker is a workaround for multi-thread programming. </br>
It defines a 'worker' as _parallel threads_ of execution. </br>
Web workers live in a **self-contained** execution enviroment. </br>
It is possible to write long-running functions that do not stall the event loop. </br>
It can only communicate with main thread via __async message__ passing. </br>
No access to Documnet or Window object </br>
If you send message to a closed worker, the message will be discarded silently without raising an error.

### Compositions
There are two pieces to the Web Worker specification. </br>
**Worker object**: this is a worker looks like from the outside, the the thread that creates it. </br>
**WorkerGlobalScope**: this is the _global_ object for a new worker, it is what a woker thread looks like inside.

##### Worker Object
- `Worker()` :  constructor. 
```javascript
var loader = new Worker("utils/loader.js");
```
- `postMessage()`: send data into worker, not restricted to string message
```javascript
loader.postMessage('file.txt');
```
- `onmessage()`: listen on message events from worker thread
```javascript
worker.onmessage = function (e) {
  var message = e.data;
  console.log('url content:' + message);
}
```
- `terminate()`: force a worker thread to stop running

##### Worker Scope
- `postMessage()`: send message outside the worker
- `onmessage()`: listen on message from the outside
- `close()`: allow a worker to terminate itself
- `importScripts()`: load required scripts, usually used at the head of worker
```javascript
importScripts('collections/Set.js', 'collections/Map.js',);
```
  - It is synchronous, it does not return until all scripts loaded and executed.
  - It may cause dependency cycles.

Other properties in `WorkerGlobalScope` :
- properties of the core JS global object, such as `JSON`, `isNaN()` and `Date()`.
- timer methods like `setTimeout()`, `setInterval()` ...
- `location` property that describes the URL that was passed to the `Worker()`: `herf, protocol, host, port, search, hash ... `
- `navigator` : `appVersion, platform, appName ....`
- important client side constructor objects like `XMLHttpRequest()`  ... 

### Example
