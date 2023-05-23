'use strict';

class UtilMap {
  // マップの自動生成
  static gen(gameData, seed) {
    const xors = new GameUtil.Xors(seed);  // 乱数生成オブジェクト
    const landIds = gameData.landIds;       　 // 土地
    const treasureArr = gameData.treasureArr; //  宝物
    const w = gameData.mapW;    // マップ横
    const h = gameData.mapH;    // マップ縦
    const size = w * h;         // マップサイズ
    const mapArr = new Array(size).fill(landIds.plain); // マップ配列　平地埋め

    // 山
    for (let y = 0; y < h; y++){
      for (let x = 0; x < w; x ++){
        if(xors.random() % 60 !== 0) { continue }  // 1/60の確率で山生成開始
        const max = 10 + xorx.random() % 50;      // 山の散布回数
        for (let i = 0; i < max; i++) {         // ランダム移動で山生成
          const x2 = (x + (xors.random() % 7) - 5 + w) % w;   // 移動後X
          const y2 = (y + (xors.random() % 7) - 5 + h) % h;   // 移動後Y
        }
      }
    }
  }
}
