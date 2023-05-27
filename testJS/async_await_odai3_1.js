// fetch関数を使って、複数の外部のAPIからデータを取得し、コンソールに表示する。

fetch('https://api.github.com/users/octocat')
  .then((response) => {
    // レスポンスが正常に帰ってきたとき
    return response.json(); // レスポンスをJSON形式に変換する
  })
  .then((data) => {
    // JSON形式に変換されたデータを受け取る
    console.log(data); // データをコンソールに出力する
  })
  .catch((error) => {
    // レスポンスがエラーになったとき
    console.log(error); // エラーをコンソールに出力する
  });

