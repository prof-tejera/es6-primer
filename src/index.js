const p = new Promise((resolve, reject) => {
  console.log('started');

  setTimeout(() => {
    console.log('resolve');
    resolve(true);
  }, 1000);

  console.log('return from promise');
});

// p.then(r => {
//   console.log(r);
// }).catch(e => {
//   console.log(e);
// });
