// Promise.allSettled関数を使って、複数の非同期処理のすべての結果（成功か失敗か）を取得する。
const sayMsg = (seconds, msg) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(msg);
    }, seconds * 1000);
  })
};

Promise.allSettled([sayMsg(1, "Hey, World!"), sayMsg(2, "Fine?")])
  .then((results) => {
    console.log(results);
  })
  .catch((error) => {
    console.log(error);
  });
