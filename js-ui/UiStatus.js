'use strict';

class UiStatus {
  // ステータスの描画
  static draw(gameData, userData) {
    // ステータス文字列   p:数値元データ　n:揃えたい桁数
    const func = (p, n) => `${p}`.substr(-n);   // 桁数揃え関数
    const level  = func(userData.level, 2)      // レベル
    const exp    = func(userData.exp,   3)      // 経験値
    const hp     = func(userData.hp,    3)
    const mp     = func(userData.mp,    3)
    const hpMax  = userData.hpMax;
    const mpMax  = userData.mpMax;
    const at     = func(userData.at,    3);
    const df     = func(userData.df,    3);

    const text = [  // 描画用文字列配列
      `LV ${level} Exp ${exp}`,
      `HP ${hp} / ${hpMax}`,
      `MP ${mp} / ${mpMax}`,
      `AT ${at} DF ${df}`
    ];

    // 変数の初期化
    const layerId = gameData.layerIds.middle; // 描画対象
    const context = gameData.canvasArr[layerId].context;    // コンテクスト
    const x = gameData.chipSize / 2 | 0;    // x位置
    const y = gameData.chipSize / 2 | 0;    // y位置
    const winSize = UiWin.getWinSize(text.length, text[0].length);
  
    // 描画
    UiWin.drawWin(context, x, y, winSize.w, winSize.h);   // ウィンドウ描画
    text.forEach((t, i) => UiWin.drawWinText(context, x, y, t, i)) // 文字描画I[I]
  }
} 


