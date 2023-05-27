// 関数を引数に渡すとき
// 関数名だけを書く方法
plus_async(sayHey);

// 無名関数を使う方法
plus_async(funcion() {
  const value = await new Promise(function(resolve, reject) {
    setTimeout(function() {
      // resolve巻数で成功したことを通知する
      resolve(msg);  
    }, 2000);
  });
  // Promise obj がfulfilled状態になったらvalueに値がはいる
  console.log(value);
});

// アロー関数を使う
plus_async(async () => {
  const value = await new Promise(function(resolve, reject) {
    setTimeout(function() {
      resolve(msg);
    }, 2000);
  });
  console.log(value);
})
