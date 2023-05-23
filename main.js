'use strict'; //厳格モードにする

//読み込み後に開始する
//document.addEventListener('DOMContentLoaded', function() {
  alert("addEventListner");
  // 変数
  const gameData = new GameData();        // ゲームデータ
  const userData = new UserData();        // ユーザーデータ
  userData.serStart(gameData);            // 開始時点データに

  //----------------------------------------------------
  // 初期化する
  //const id = '#app';
  //gameData.canvasArr = GameCanvas.initCanvasArr(id, gameData); // canvasArrの初期化
  //GameView.init(id, gameData);   // 表示の初期

  //----------------------------------------------------
  // リソース
  const promiseArr = [];

  // 画像の読み込み
  promiseArr.push(GameImage.load('land ',     'image/land.png'));








  // リソース読み込み後に開始する
  Promise.all(promiseArr).then(arg => {



    // ゲーム開始
    GameAnim.Start();     // アニメーション開始
    alert("GameStart");
  });
//});
