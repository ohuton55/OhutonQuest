//async関数を返す関数を定義し、その関数を呼び出してPromiseオブジェクトを生成する
const msg = 'Hey, World!';

// 引数の関数にasyncキーワードを加えて、非同期処理ができるようにする
function plus_async(func) {
  return async func;
}

function sayHey() {
  const value = await new Promise(function(resolve, reject) {
    setTimeout(function() {
      // resolve関数で成功したことを通知する
      resolve(msg);
    }, 2000);
  });
  // Promise obj がfulfilled状態になったらvalueに値がはいる
  console.log(value);
}

plus_async(sayHey());
