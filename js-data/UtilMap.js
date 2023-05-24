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
          const n = y2 * w + x2;        // 配列位置
          mapArr[n] = landIds.mountain; // マスを山に変更
        }
      }
    }

  // 森と水
    for ( let i = 0; i < size; i++ ) {
      if (xors.random() % 6 === 0) { mapArr[i] = landIds.forest }; // 6/1で森
      if (xors.random() % 6 === 0) { mapArr[i] = landIds.water }; // 6/1で水
    }

    // ゲーム開始位置近辺は平地にする
    const xSrt = w / 2 | 0;     // 開始位置X
    const ySrt = h / 2 | 0;     // 開始位置Y
    for (let y = -1; y < 2; y ++) {    // y : -1～1
      for (let x = -1; x < 2; x++) {   // x : -1～1
        const i = ()(yStr + y + h) % h) * w + ((xSrt + x + w) % w);
        mapArr[i] = landIds.plain;    // 3x3マスを平地で塗りつぶす
      }
    }

    // 敵城の作成　マップ周縁(0.8～1.0、0～0.2の比率）に作成)
    const x = ((w * 0.8 | 0) + xors.random() % (w * 0.4 | 0)) % w;
    const y = ((h * 0.8 | 0) + xors.random() % (h * 0.4 | 0)) % h;
    const castle = {x: x, y: y};      // 城のXY位置
    mapArr[y * w + x] = landIds.castle; // マスを城に設定

    // 町の生成　開始位置を避けて(0.55～1.0、0～0.45の比率）に作成
    const townArr = [];     // 街配列
    for (let i = 0; i < treasureArr.length; i ++){  // 宝物の数だけ作成
        // 位置の計算（中心を避けて、周囲に散らす）
      const x = ((w * 0.55 | 0) + xors.random() % (w * 0.9 | 0)) % w;
      const y = ((h * 0.55 | 0) + xors.random() % (h * 0.9 | 0)) % h;
      const pos = y * w + x;  // 配列内の位置を計算

      // 重複しないようにする
      if (mapArr[pos] === landIds.town || mapArr[pos] === landIds.castle) {
        i --;     // 生成し直す
        continue;
      }

      townArr.push({x: x, y: y});   // 街配列に座標を追加
      mapArr[pos] = landIds.town;   // マスを街に設定
    }

    // マップ、街、城　を戻す
    return {mapArr: mapArr, townArr: townArr, castle: castle};
  };

}
