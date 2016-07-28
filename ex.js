// var app = (function () {
  'use strict';

  function add(a, b) {
    return a + b;
  }

  function addf(a) {
    return function (b) {
      return add(a, b);
    }
  }

  function liftf(f) {
    return function (a) {
      return function (b) {
        return f(a,b);
      }
    }
  }

  function curry(fn, a) {
    return function (b) {
      return fn(a, b);
    }
  }

  function inc(x) {
    return add(x, 1);
  }

  function incf(x) {
    return addf(1)(x);
  }

  function incc(x) {
    return curry(add, 1)(x);
  }

  function sub(a, b) {
    return a - b;
  }

  function mul(a, b) {
    return a * b;
  }

  function identityf(val) {
    return function() {
      return val;
    }
  }

//   return {
//     add,
//     addf,
//     sub,
//     mul,
//     identityf
//   }
// })();
