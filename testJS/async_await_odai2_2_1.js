const wait = (seconds) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(seconds);
    }, seconds * 1000);
  })
};

Promise.race([wait(1), wait(2)])
  .then((results) => {
    console.log(results);
  })
  .catch((error) => {
    console.log(error);
  });
