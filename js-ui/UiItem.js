'use strict';

class UiItem {
  // アイテムの描画
  static draw(gameData, userData) {
    // アイテムリストの作成
    const arr = UtilMisc.getMyItemNames(gameData, userData, false, '  ');
                                      // 有効アイテム取得
    if (arr.length === 0) { return }  // アイテムがないなら終了
    arr.unshift('Item:');             // 先頭に文字列追加

    // 変数の初期化
    const layerId = gameData.layerIds.middle;     // 描画対象
    const context = gameData.canvasArr[layerId].context;  // コンテキスト




  }
}
