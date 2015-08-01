Got weird user complaint but can't reproduce?

![Dunno?](/dunno.jpeg?raw=true)

Dunno?
==
- dunno what user did, where he clicked, on which pages?
- dunno where he was 5 sec ago? maybe JS errors 10 sec ago?
- dunno the root cause?

Do know!
==
Add dunno.js to the page, or require for browserify
```
npm install dunno
var dunno = require('dunno');
```

Start tracking asap

```js
dunno.start(); // opts {limit: 10, urlcheck: 100}

window.onerror = function() {
  console.log(dunno.tell());
};
```

User jumps between pages, does weird stuff, gets an error. Dunno tells you repro-steps.

```
error: Uncaught ReferenceError: invoiceState is not defined
url: /sets/55b941e794a73c03008db78c ~
click: <a cl="set-tab hidden"></a> ~
click: <a cl="set-tab ">Coco</a> ~
url: /games ~
click: <div id="set-header">Create</a> ~
url: /sets/55b941e794a73c03008db78c/55bbd7c2461ab603007d1648a ~
error: Uncaught TypeError: saveInvoice is not a function
away ~
url: /all?cachereset=100023402
```

Just post ```dunno.tell()``` to LogEntries or whatever you use. Now you know!
