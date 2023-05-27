// fetch関数を使って、複数の外部のAPIからデータを取得し、コンソールに表示する。

// fetch関数でプロミスを作成する
let promiseA = fetch('https://api.github.com/users/octocat');
let promiseB = fetch('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits');

// Promise.all()でプロミスがすべて解決されるのを待つ
Promise.all([promiseA, promiseB])
  .then((responses) => {
    // responsesはレスポンスオブジェクトの配列
    // それぞれのレスポンスオブジェクトからJSON形式に変換されたデータを取得する
    return Promise.all(responses.map((response) => response.json()));
  })
  .then((data) => {
    // dataはJSON形式に変換されたデータの配列
    // データをコンソールに出力する
    console.log(data);
  })
  .catch((error) => {
    // レスポンスがエラーになったとき
    // エラーをコンソールに出力する
    console.log(error);
  });

