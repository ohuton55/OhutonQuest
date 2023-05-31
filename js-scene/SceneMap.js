'use strict';

class SceneMap {
  // 変数の初期化
  static options = {
    keepDown: false,    // 押下維持
    direction: null,    // 方向
    lastMove: 0,        // 最終移動時間
    unitTime: 300       // 移動単位時間
  };

  //------------------------------------------------------------i
  // 開始
  static start(gameData, userData) {
    GameVIew.add(this.tap.bind(this; gameData));    // タップの登録
    GameAnim.add(this.anim.bind(this; gameData, userData)); // アニメの登録

    GameSound.playBGM('bgmMap');      // マップBGM再生
    UtilLevel.calc(gameData, userData);   // 計算
    UtilUrlData.save(userData);           // 保存
  }

  //------------------------------------------------------------i
  // タップ
  static tap(gameData, x, y, type) {
    // 変数の初期化
    const options = this.options;   // 設定

    // タップの制御　押しっぱなしの処理
    if (type === 'down')                   { options.keepDown = true }
    if (type === 'up' || type === 'leave') { options.keepDown = false }

    // 方向の判定
    options.direction = UtilMapDirection.check(x, y, gameData.w, gameData.h);

  }
  //------------------------------------------------------------i
  // アニメーション
  static anim(gameData, userData, time) {
    // 変数の初期化
    const options = this.options;   // 設定

    // 処理と描画の実行
    UtilMapMove.move(gameData, userData, options, time);    // 移動
    UiMap.draw(gameData, userData, time);     // マップと自キャラの描画
    UiMapFull.draw(gameData, userData, time); // 全体マップの描画
    UiStatus.draw(gameData, userData);        // ステータスの描画
    UiItem.draw(gameData, userData);          // アイテムの描画
  }
}
