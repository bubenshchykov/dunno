Got weird user complaint but can't find the problem?

![Dunno?](/dunno.jpeg?raw=true)

Dunno?
==
- dunno what user did, where clicked, on which pages?
- dunno where he was 5 sec ago? maybe JS errors 10 sec ago?
- dunno the root cause?

Dunno gives you a clear steps to reproduce.

Usage
==
```<script src="dunno.js"></script>``` or
```npm install dunno``` for browserify.

```js
dunno.start(); // opts {limit: 10, urlcheck: 100}

window.onerror = function() {
  console.log(dunno.tell());
};
```

User jumps between pages, does weird stuff, gets an error - you get repro steps.

```
url: /logout
error: Uncaught ReferenceError: invoiceState is not defined
url: /sets/55b941e794a73c03008db78c ~
click: <a cl="set-tab ">ZZ</a> ~
url: /games ~
click: <a cl="app-logo icn-app-logo">Create</a> ~
click: <body>Ooops, something bad</body> ~
url: /sets/55b941e794a73c03008db78c/55bbd7c2461ab603007d1648a ~
error: Uncaught TypeError: saveInvoice is not a function
away ~
```

Just post ```dunno.tell()``` to LogEntries or whatever you use. Now you know!
