const message = 'Hello, World!';

// asyncキーワードで非同期処理を行う関数を定義する
async function sayHello() {
  // await キーワードでpromiseオブジェクトの結果をまつ
  const value = await new Promise(function(resolve, reject){
    setTimeout(function() {
      // resolve関数で成功したことを通知する
      resolve(message);
    }, 1000);
  });
  // Promiseオブジェクトがfulfilled状態になったら、valueに値がはいる
  console.log(value); //'Hello, World!'
}

// 関数を呼び出す
sayHello();
