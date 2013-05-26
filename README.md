Autoroute
=================

Autoroute loads your express routes automatically.

Let say that you have files, that end with `*Api`, e.g. `testApi.js`, that defines an express route:
```javascript
module.exports = function(app) {
  app.get('/test', function() {
    // output something
  });
};
```
Now you want to require all files that ends with `*Api`.

```javascript
require('/somepath1/test1Api')(app);
require('/somepath2/test2Api')(app);
require('/somepath3/test3Api')(app);
// and so on
```
We can make this process much easier with autoroute!

Install autoroute with:
```shell
npm install autoroute --save
```
Just use the autoroute function and define glob file patterns.

```javascript
var autoroute = require('autoroute');

autoroute([
  './**/*Api.js', //First parameter is an array of glob file patterns
  './**/*Page.js'
], app); // Second parameter is the express server
```











