var l = console.log;

/******************************************************************************
 * let vs const
 *****************************************************************************/
var old = 1;

// Can be re-assigned to different types
old = 'a';

// const
const fixed = 1;
// This will cause an error since const cannot be reassigned
fixed = 2;

// let
let variable = 1;
// Can be re-assigned to different types
variable = 2;

// Scope ----------------------------------------------------
var outerVar = 1;
let outerLet = 1;

function modify1() {
  // These changes will modify the outer variables
  outerVar = 2;
  outerLet = 2;
}

function modify2() {
  // Although these have the same name, they are scoped only to this function and will not
  // modify the outer values
  var outerVar = 2;
  let outerLet = 2;
}

if (1 === 1) {
  // This will change the value of the outer var (actually re-declares it in the outer scope)
  var outerVar = 2;
  // This is only scoped to the IF block and will not change the outer value
  let outerLet = 2;
}

/******************************************************************************
 * Functions
 *****************************************************************************/
function oldFunction(a, b) {
  console.log('here!', arguments, a, b);
  console.log(JSON.stringify(arguments));
  console.log(this);
}

// Arrow functions do NOT have the arguments object
// if we don't set arguments to null, it will print the
// arguments object of the outer "function", which is our script
arguments = null;
const newFunction1 = (a, b) => {
  console.log('here!', arguments, a, b);
  console.log(this);
};

// When using single arguments you can omit the parentheses - also can
// use inline when the function is very simple
const newFunction2 = (a) => console.log(a);

// Avoid using "this" - leads to lots of errors

// In object's methods, avoid arrow functions since this is not bound to the object
this.name = 'Outer';

const obj = {
  name: 'Inner',
  arrow: () => {
    console.log('Arrow:\t\t' + this.name);
    console.log(this);
  },
  traditional() {
    console.log('Traditional:\t' + this.name);
    console.log(this);
  },
};

obj.arrow();
obj.traditional();

/*****************************************************************************
 * Classes
 *****************************************************************************/
 class Sample {
  constructor() {
    this.a = 1;
    this.arrow2 = () => {
      console.log('Arrow 2\t\t', this);
    };
  }
  traditional() {
    console.log('Traditional\t', this);
  }
  arrow1 = () => {
    console.log('Arrow 1\t\t', this);
  };
}

// Omit keys that have the same names
const a = 1;
const b = 2;
const c = { a, b };

/**
 * Destructuring (not destructing!)
 */
const destructure = {
  a: 1,
  b: {
    c: 2,
    d: {
      e: 3,
    },
  },
};

// This pulls the value of 'a' from the object
const { a } = destructure;

// We can go further
const {
  b: { c },
} = destructure;
console.log(c);
console.log(b); // Invalid, b is not defined

const {
  b: { d },
} = destructure;

const {
  b: {
    d: { e },
  },
} = destructure;

// With arrays
const arr = [1, 2, 3];
const [first] = arr;
const [first, second] = arr;
const [, , third] = arr;

const test = 'abc';
const [a] = test;

// To rename the extracted variable
const o1 = { a: 1 };
const o2 = { a: 1 };
const { a: o1_a } = o1;
const { a: o2_a } = o1;

// Go crazy
const crazy = [
  1,
  2,
  {
    a: 1,
    b: ['x', 'y', 'z', 'a'],
  },
];

// Extract 'y' and assign it to a variable called myY
const [
  ,
  ,
  {
    b: [, myY],
  },
] = crazy;
console.log(myY);

// For function arguments
function func({ arg1, arg2, arg3 }) {
  console.log(arguments);
  console.log(arg1, arg2, arg3);
}

func({
  arg1: 1,
  arg2: 2,
  arg3: 3,
});

// Useful for Object.entries
const e = {
  a: 1,
  b: 2,
};

Object.keys(e).forEach((k) => {
  console.log(e[k]);
});

Object.entries(e).forEach(([k, v]) => {
  console.log(v);
});

// Spread operator
const spread = {
  a: 1,
  b: 2,
  c: 3,
  d: 4,
};

const { a, b, ...rest } = spread;

// In Arrays
const spreadArr = [1, 2, 3, 4];
const [f1, f2, ...rest] = spreadArr;
const newArr = ['a', 'b', ...spreadArr];

// Cloning objects
const sheep = {
  a: 1,
  b: 2,
  c: {
    d: 3,
  },
};

const clone = { ...sheep };
clone.a = 'modA';
// Be careful because this modifies the original object!
clone.c.d = 'modD';
console.log(sheep.a, clone.a);
console.log(sheep.c.d, clone.c.d);

/******************************************************************************
 * Template literals / Template strings
 *****************************************************************************/
 const t1 = `hello world`;
 l(t1);
 const old = 'hello ' + (1 + 2) + ' world';
 l(old);
 const t2 = `hello ${1 + 2} world`;
 const multiline = `
 hi 1
 hi 2
 hi 3
 `;
 
 // Tagged templates
 const uselessFunction = () => {
   return 'something';
 }
 
 const res = uselessFunction`hello world`;
 l(res);
 
 const merger = (pieces, ...values) => {
  const merged = [];
  
  for (let i = 0; i < pieces.length; i++) {
    merged.push(pieces[i]);
    if (values[i]) {
      merged.push(values[i]);  
    }
  } 
  
  return merged.join('');
 }
 
 const name = 'Nico';
 const other = ['Vue', 'Angular'].sort(() => Math.random() - 0.5)[0];
 const res = merger`my name is ${name}, React is better than ${other}`;
 l(res);

 const italicize = (pieces, ...values) => {
  const merged = [];
  
  for (let i = 0; i < pieces.length; i++) {
    merged.push(pieces[i]);
    if (values[i]) {
      merged.push(`<i>${values[i]}</i>`);
    }
  } 
  
  return merged.join('');
}

/*****************************************************************************
 * Promises
 *****************************************************************************/

// Do something that takes a bit
const p = (arg1, arg2, callback) => {
  setTimeout(() => {
    callback('done');
  }, 5000);
};

const p = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('done');
  }, 5000);
});

const p = new Promise((resolve, reject) => {
  try {
    // do something here that could fail
    throw 'oops';

    resolve('success result');
  } catch (e) {
    reject('error result', e);
  }
});

// Make sure to catch errors
p.then(r => {
  console.log(r);
}).catch(e => {
  console.log(e);
});

// Promise body is executed immediately
const p = new Promise((resolve, reject) => {
  console.log('started');

  setTimeout(() => {
    console.log('resolve');
    resolve(true);
  }, 1000);

  console.log('return from promise');
});

// Even if this is never executed, the promise is still resolved
p.then((r) => {
  console.log('success', r);
})
  .catch((e) => {
    console.log('fail', e);
  })
  .finally(() => {
    console.log('done');
  });

// Running multiple promises in parallel
const p1 = new Promise((resolve, reject) => {
  try {
    resolve('success result 1');
  } catch (e) {
    reject('error result 1', e);
  }
});

const p2 = new Promise((resolve, reject) => {
  try {
    resolve('success result 2');
  } catch (e) {
    reject('error result 2', e);
  }
});

// This will expect ALL promises to succeed, if one fails, the whole thing fails
// the first promise to fail is the one that breaks all of it
Promise.all([p1, p2]).then((r) => {
  console.log(r);
});

// Sequencing thens
p1.then((r) => {
  console.log(r);
  return r * 2;
})
  .then((r) => {
    console.log(r);
    return r * 2;
  })
  .then((r) => {
    console.log(r);
    return r * 2;
  })
  .then((r) => {
    console.log(r);
    return r * 2;
  })
  .then((f) => {
    console.log(f);
  });

// Returning promises
const creator = (result) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const res = result * 2;
      console.log(res);
      resolve(res);
    }, 500);
  });
};

const p1 = creator(1)
  .then((r) => {
    return creator(r);
  })
  .then((r) => {
    return creator(r);
  })
  .then((r) => {
    return creator(r);
  });

const p1 = creator(1)
  .then(creator)
  .then(creator)
  .then(creator)
  .then(creator)
  .then(creator)
  .then(creator)
  .then(creator)
  .then(creator);

// Async / await
const p1 = () =>
  new Promise((resolve, reject) => {
    console.log('Created 1');
    setTimeout(() => {
      console.log('Done 1');
      resolve('Done 1!');
    }, 1000);
  });

const p2 = () =>
  new Promise((resolve, reject) => {
    console.log('Created 2');
    setTimeout(() => {
      console.log('Done 2');
      resolve('Done 2!');
    }, 1000);
  });

const f = async () => {
  console.log('Started...');
  const a = await p1();
  const b = await p2();
};

f();



/*****************************************************************************
 * Iterators
 *****************************************************************************/
const arr = ['a', 'b', 'c', 'd'];

// For each does not return anything
const res2 = arr.forEach((letter) => {
  return `letter is ${letter}`;
});

// Map returns some value for each item
const res1 = arr.map((letter) => {
  return `letter is ${letter}`;
});

// Filter out elements that do not match the condition
const res3 = arr.filter((l) => l > 'b');

// Find the first element that matches the condition
const res4 = arr.find((l) => l > 'b');

// Chaining
const res = [1, 2, 3, 4, 5]
  .map((x) => x * 3)
  .filter((x) => x % 2 === 0)
  .map((x) => `${x} is even`);

// Reduce an array
const arr = ['a', 'b', 'c', 'd'];

const reduced = arr.reduce((acc, curr, currIndex, arr) => {
  if (curr % 2 === 0) {
    return [...acc, `${curr} is even`];
  } else {
    return acc;
  }
}, []);

import fetch from 'node-fetch';

fetch('https://jsonplaceholder.typicode.com/posts')
.then(r => r.json())
.then(r => console.log(r));