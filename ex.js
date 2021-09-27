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

  var inc = addf(1);


  var incl = liftf(add)(1);

  var incc = curry(add, 1);
  
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

  function twice(fn) {
    return function(x) {
      return fn(x,x);
    }
  }

  var doubl = twice(add);
  var square = twice(mul);

  function reverse(fn) {
    return function(b,a) {
      return fn(a,b);
    }
  }

  function composeu(f, g) {
    return function (x) {
      return g(f(x));
    }
  }

  function composeb(f, g) {
    return function (a,b,c) {
      return g(f(a,b),c);
    }
  }

  function limit(fn, i) {
    return function (a, b) {
      if(i <= 0) {
        return;
      }

      i -= 1;
      return fn(a, b);
    }
  }

  function from(x) {
    return function () {
      x += 1;
      return x - 1;
    }
  }

  function to(fn, stop) {
    return function () {
      var x = fn();
      if(x >= stop) {
        return;
      }

      return x;
    }
  }

  function fromTo(a, b) {
    return to(from(a), b);
  }

  function element(arr, gen) {
    if(!gen) {
      gen = fromTo(0, arr.length);
    }
    return function () {
      var index = gen();
      if(index === undefined) { return; }
      return arr[index];
    }
  }

  function collect(gen, arr) {
    return function () {
      var index = gen();
      if(index !== undefined) {
        arr.push(index);
      }
      return index;
    }
  }

  function filter(gen, predicate) {
    return function () {
      var value = gen();
      while (value !== undefined && !predicate(value)) {
        value = gen();
      }

      return value;
    }
  }

  function concat(gen, genTwo) {
    return function() {
       var value = gen();
       if(value === undefined) {
        value = genTwo();
       }

       return value;
    }
  }

  function gensymf(prefix) {
    var gen = from(1);
    return function () {
      return prefix + gen();
    }
  }



  function fibonaccif(a, b) {
   function fibonacci(n) {
      if(n < 0) { return; }
      if(n === 0) { return a }
      if(n === 1) { return b;}
      return fibonacci(n - 1) + fibonacci(n - 2);
    }
    var i = -1;
    return function () {
      i += 1;
      return fibonacci(i);
    }
  }

  function counter(current) {
    return {
      up: function() { 
        current += 1; 
        return current;
      },
      down: function() { 
        current -= 1; 
        return current;
      }
    }
  }

  function revocable(fn) {
    return {
      invoke: function (a,b) { return fn(a,b);},
      revoke: function() { fn = function() {};}
    }
  }

  function m(value, source) {
    return {
      value: value,
      source: (typeof source === 'string')
        ? source
        : String(value)
    };
  }

  function addm(m1, m2) {
    return m (
      m1.value + m2.value,
      '(' + m1.source + '+' + m2.source + ')'
    );
  }

  function liftm(fn, operator) {
    return function (a, b) {
      if(typeof a === 'number') {
        a = m(a);
      }
      if(typeof b === 'number') {
        b = m(b);
      }
      return m(
        fn(a.value, b.value),
        '(' + a.source + operator + b.source + ')'
      );
    };
  }

  function exp(arr) {
    return (Array.isArray(arr))
      ? arr[0] (
        exp(arr[1]),
        exp(arr[2])
      )
      : arr;
  }
    var acc;

  function addg(first) {
    // console.log(value);
    function more(next) {
      if(next === undefined) {
        return first;
      }
      first += next;
      return more;
    }

    if(first !== undefined) {
      return more;
    }
  }


  function liftg(fn) {
    return function (first) {
      function more(next) {
        if(next === undefined) {
          return first;
        }

        first = fn(first, next);
        return more;
      }

      if(first !== undefined) {
        return more;
      }
    }
  }

  function arrayg(first) {
    var arr = [];
    function more(next) {
      if(next === undefined) {
        return arr;
      }

      arr.push(next);
      return more;
    }

    return more(first);
  }


  function continuize(fn) {
    return function (cb, value) {
      cb(fn(value));
    }
  }

  function vector() {
    var array = [];

    return {
      get: function get(i) {
        return array[i];
      },
      store: function store(i, v) {
        array[i] = v;
      },
      append: function append(v) {
        array.push(v);
      }
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
