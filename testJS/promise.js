const message = 'Hello, World!';
const promise = new Promise(function(resolve, reject){
  setTimeout(function() {
    // resolve関数で成功したことを通知する
    resolve(message);
  }, 1000);
});

// Promiseの状態や結果を取得する
promise.then(
  function(value) {
    //fulfilled状態のときに実行される関数
    console.log(value); // 'Hello, World!'
  }
).catch(
  function(error) {
    // rejected状態のときに実行される関数
    console.log(error); // エラーが発生した場合に実行される
  }
);
