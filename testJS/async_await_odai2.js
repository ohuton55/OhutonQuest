//Promise.all関数を使って、複数のPromiseオブジェクトを並行して処理し、結果を配列として受け取る

// 非同期処理を定義
const wait = (seconds) => {
  return new Promise((resolve, reject) => {
    // 指定した秒数だけ待つ
    setTimeout(() => {
      // resolve関数で成功したことを通知する
      resolve(seconds);
    }, seconds * 1000);
  });
};

// Promise.all関数で複数の非同期処理を並行して実行する
Promise.all([wait(1), wait(2)])
  .then((results) => {
    // すべての非同期処理が成功したとき
    console.log(results);  // 結果の配列 [1, 2]
  })
  .catch((error) => {
    // いずれかの非同期処理が失敗したとき
    console.log(error);   // エラーは発生しない
  });
