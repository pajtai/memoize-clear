'use strict';

var memoize = require('./index'),
    chai = require('chai'),
    sinon = require('sinon'),
    should = chai.should(),
    sinonChai = require("sinon-chai");

chai.should();
chai.use(sinonChai);

describe('memoize', function() {

    it('original function should only be called once', function() {
        var original = sinon.spy(function() { return 42;}),
            cached = memoize(original);

        cached().should.equal(42);
        cached().should.equal(42);
        original.should.have.been.calledOnce;
    });

    it('should be able to clear the cache for one function', function() {
        var db = 2,
            func = memoize(function() { return db;});

        func().should.equal(2);
        db = 4;
        func.__clear();
        func().should.equal(4);
    });

    it('should be able to clear the cache for all functions', function() {
        var db1 = 1, db2 = 2, db3 = 3,
            f1 = memoize(function() { return db1; }),
            f2 = memoize(function() { return db2; }),
            f3 = memoize(function() { return db3; });

        f1().should.equal(1);
        f1().should.equal(1);
        f2().should.equal(2);
        f2().should.equal(2);
        f3().should.equal(3);
        f3().should.equal(3);

        memoize.clearCache();
        db1 = 100;
        db2 = 200;
        db3 = 300;

        f1().should.equal(100);
        f2().should.equal(200);
        f3().should.equal(300);
    });

    it('can clear the cache of just one function if function is passed to memoize.clearCache', function() {
        var db1 = 1, db2 = 2, db3 = 3,
            functionToMemoize = function() {
                return db3;
            },
            f1 = memoize(function() { return db1; }),
            f2 = memoize(function() { return db2; }),
            f3 = memoize(functionToMemoize);

        f1().should.equal(1);
        f1().should.equal(1);
        f2().should.equal(2);
        f2().should.equal(2);
        f3().should.equal(3);
        f3().should.equal(3);

        memoize.clearCache(f3);

        db1 = 100;
        db2 = 200;
        db3 = 300;

        f1().should.equal(1);
        f2().should.equal(2);
        f3().should.equal(300);
    });
});