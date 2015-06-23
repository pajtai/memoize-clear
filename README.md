# memoize clear [![Build Status](https://travis-ci.org/pajtai/memoize-clear.png?branch=master)](https://travis-ci.org/pajtai/memoize-clear)

memoize-clear is a standard memoization utility with the exception that the cache can be cleared for one function or all
memoized functions:

    npm install --save memoize-clear
    
memoization functionality from https://github.com/addyosmani/memoize.js
    
## api

To memoize a function, `require('memoize-clear')`, and used the returned function to curry:

```javascript
var memoize = require('memoize-clear'),
    memoized = memoize(function() { ... });
```

To clear the cache of one function, call `.__clear()` on that memoized function.
To clear the cache for all functions call `.cleaCache()` on memoize itself.

```javascript
var memoize = require('memoize'),
    storehouse = 1,
    memoized1 = memoize(function() { return storehouse; }),
    memoized2 = memoize(function() { return 2 * storehouse; });
    
memoized1(); // 1
memoized2(); // 2

storehouse = 3;

memoized1();    // 1

memoized1.__clear();

memoized1()     // 3
memoized2()     // 2

memoize.clearCache();

storehouse = 4;

memoized1()     // 4
memoized2()     // 8
```
