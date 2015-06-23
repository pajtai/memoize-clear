'use strict';

var funcs = [];

memoize.clearCache = cleaCache;

module.exports = memoize;

function memoize(func) {
    var stringifyJson = JSON.stringify,
        cache = {};

    var cachedfun = function() {
        var hash = stringifyJson(arguments);
        return (hash in cache) ? cache[hash] : cache[hash] = func.apply(this, arguments);
    };

    cachedfun.__clear = function() {
        cache = {};
    };

    funcs.push(cachedfun);
    return cachedfun;
}

function cleaCache() {
    funcs.forEach(function(func) {
        func.__clear();
    });
};