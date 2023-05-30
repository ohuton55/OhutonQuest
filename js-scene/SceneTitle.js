'use strict';

class SceneTitle {
  // 開始
  static start(gameData, userData) { 
  GameView.add(this.tap.bind(this, gameData, userData)); // タップの登録
  GameAnim.add(this.anim.bind(this, gameData));     // アニメの登録
  }
  //------------------------------------------------------------
  // タップ
  static tap(gameData, userData, x, y, type) {
    if (type === 'down') {
      // 保存データの復帰
      UtilUrlData.load(userData);

      // 地図関連の初期化
      const result UtilMap.gen(gameData, userData.seed);    // 自動生成
      userData.mapArr = result.mapArr;    // マップ
      userData.townArr = result.townArr;  // 街
      userData.castle = result.castle;    // 城
      userData.moveCount = 0; // マップ表示直後の戦闘を避ける（歩数

      // シーン移動
      SceneMap.start(gameData, userData); // マップ開始
    } 
  } 
  //------------------------------------------------------------
  // アニメーション
  static anim(gameData, time) {
    // 変数の初期化と画面のクリア
    const w = gameData.w;   // 横幅
    const h = gameData.h;   // 高さ
    const chipSize = gameData.chipSize; // チップサイズ
    const w2 = w /2 ;       // 画面の半分（中央

    const textArr = [       // 文字列配列
      'OhutonQuest',
      'Please Click!',
      'Created by Masakazu Yanai',
      'Sound by Maoudamashii'
    ];
    const isView = Math.floor(time.sum / 200) % 5 >= 2; // 点滅表示（1秒の5/1を2回

    // 描画準備
    const layerId = gameData.layerIds.middle; // 描画対象
    const context = gameData.canvasArr[layerId].context;  // コンテキスト
    context.clearRect(0, 0, w, h);    // 描画領域をクリア

    // 文字の描画
    UiText.drawCenter(    context, textArr[0], w2, h * 0.2, 28, 'white');
    if (isView) {
      UiText.drawCenter(  context, textArr[1], w2, h * 0.6, 10, 'white');
    }
    UiText.drawCenter(    context, textArr[2], w2, h * 0.86, 10, 'white');
    Uitext.drawCenter(    context, textArr[3], w2, h * 0.94, 10, 'white');

    // キャラの描画
    const charaImage = GameImage.images['chara']; // 画像
    const charaY = chipsize * 6.5;    // キャラY位置
    const charaSize = chipSize * 4;   // キャラサイズ

    UiChip.draw(    // チップ描画
        context, charaImage, chipSize, dharaSize,   // 基本情報
        0, 0, chipSize, charaY                      // 座標情報
    );

    UiChip.draw(    // チップ描画
        context, charaImage, chipSize, charaSize,   // 基本情報
        3, 1, w - chipSize * 5, charaY              // 座標情報
    );
  };
}  
