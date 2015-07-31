Got weird user complaint but can't find the problem?

![Dunno?](/dunno.jpeg?raw=true)

Dunno?
==
- dunno what actions user did, where clicked, on which page?
- dunno where he was 5 sec ago? maybe JS errors 10 sec ago?
- dunno the root cause?

Dunno helps you to reproduce and fix reported user problems.

Usage
==
```<script src="dunno.js"></script>```
or ```npm install dunno``` for browserify.

```js
dunno.start({
  limit: 10, // number of last user actions to track
  urlcheck: 100 // interval to spot url changes in ms
});

window.onerror = function() {
  var reproSteps = dunno.tell();
  console.log(reproSteps);
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

Here you go.
