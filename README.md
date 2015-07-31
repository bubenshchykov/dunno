Dunno gets user context for tracking client errors.

Dunno will help if you
- dunno what happend with a user at some point
- dunno what actions he did, where clicked, on which page
- dunno if he had JS errors 10 seconds ago

Dunno will help you to reproduce and fix.

```<script src="dunno.js"></script>``` or ```npm install dunno``` for browserify.

```js
dunno.start({
  limit: 10, // number of last user actions to track
  urlcheck: 100 // interval to spot url changes in ms
});

dunno.tell(); // gives a string which you can post to LogEntries, MixPanel, anywhere

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
