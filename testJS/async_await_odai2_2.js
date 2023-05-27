// Promise.race関数を使って、複数の非同期処理のうち最も早く終わったものだけを取得する。

const wait = (seconds) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(seconds);  // 成功したことを通知する
    }, seconds * 1000);
  });
};

// Promise.race関数を使う
Promise.race([wait(1), wait(2)])
  .then((results) => {
  // すべての非同期処理が成功したとき、早く終わったものだけを取得
    console.log(results);
})
  .catch((error) => {
    // いずれかの非同期処理が失敗したら
    console.log(error);
  });
