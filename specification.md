## Functions

<dl>
<dt><a href="#off">off(event, [fn])</a> ⇒ <code>number</code></dt>
<dd><p>Unsubscribe an event name and all its subscribed functions or unsubscribe an event name
and the function provided only</p>
</dd>
<dt><a href="#on">on(event, fn)</a> ⇒ <code>number</code></dt>
<dd><p>Subscribe a function to be called every time the event name is triggered</p>
</dd>
<dt><a href="#once">once(event, fn)</a> ⇒ <code>number</code></dt>
<dd><p>Subscribe a function to be called only once for when the event name is triggered</p>
</dd>
<dt><a href="#trigger">trigger(event, ...args)</a> ⇒ <code>boolean</code></dt>
<dd><p>Trigger an event name with optional arguments</p>
</dd>
</dl>

<a name="off"></a>

## off(event, [fn]) ⇒ <code>number</code>
Unsubscribe an event name and all its subscribed functions or unsubscribe an event name
and the function provided only

**Kind**: global function  
**Returns**: <code>number</code> - The current number of subscribers for the event name  
**Throws**:

- <code>Error</code> If the event name is not a string data type or the function is not
a function data type (if provided)

**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>string</code> | Event name |
| [fn] | <code>function</code> | Optional function to unsubcribe from the associated event name; otherwise, if not defined, then all functions are unsubscribed. If undefined is passed, then this is considered to be a "defined" argument |

**Example**  
```js
Emitter.on('event-str', () => {
    console.log('triggered event');
});

Emitter.trigger('event-str');
Emitter.off('event-str');
Emitter.trigger('event-str');
```
**Example**  
```js
let clickCount = 0;
function onClickMax10(event) {
    console.log(event);
    clickCount += 1;

    if (clickCount === 10) {
        Emitter.off('sign-in', onClickMax10);
    }
}

Emitter.on('sign-in', onClickMax10);

// trigger the "sign-in" event for when the sign-in button is clicked
document.querySelector('#sign-in').addEventListener('click', (event) => {
    Emitter.trigger('sign-in', event);
});
```
<a name="on"></a>

## on(event, fn) ⇒ <code>number</code>
Subscribe a function to be called every time the event name is triggered

**Kind**: global function  
**Returns**: <code>number</code> - The current number of subscribers for the event name  
**Throws**:

- <code>Error</code> If the event name is not a string data type or the function is not
a function data type

**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>string</code> | Event name |
| fn | <code>function</code> | Function to call when the event name is triggered |

**Example**  
```js
// in app.js
Emitter.on('posts-request', (data) => {
    // prints the response data object
    console.log(data);
});

// in api.js
fetch('/posts')
    .then((data) => {
        // trigger the event name with the response data object
        Emitter.trigger('posts-request', data);
    });
```
<a name="once"></a>

## once(event, fn) ⇒ <code>number</code>
Subscribe a function to be called only once for when the event name is triggered

**Kind**: global function  
**Returns**: <code>number</code> - The current number of subscribers for the event name  
**Throws**:

- <code>Error</code> If the event name is not a string data type or the function is not
a function data type

**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>string</code> | Event name |
| fn | <code>function</code> | Function to call when the event name is triggered |

**Example**  
```js
// the console will only print the event object once
Emitter.once('sign-in', (event) => {
    console.log(event);
});

// trigger the "sign-in" event for when the sign-in button is clicked
document.querySelector('#sign-in').addEventListener('click', (event) => {
    Emitter.trigger('sign-in', event);
});
```
<a name="trigger"></a>

## trigger(event, ...args) ⇒ <code>boolean</code>
Trigger an event name with optional arguments

**Kind**: global function  
**Returns**: <code>boolean</code> - True, the event name has subscribers; otherwise, false  
**Throws**:

- <code>Error</code> If the event name is not a string data type

**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>string</code> | Event name |
| ...args | <code>\*</code> | Zero or more arguments to pass to the subscribed functions |

**Example**  
```js
Emitter.on('event-str', (arg1, arg2) => {
    console.log(arg1, arg2);
});

Emitter.trigger('event-str', 1, 2);
```
