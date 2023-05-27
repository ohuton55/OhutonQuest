'use strict';

class GameCanvas {
  
  // キャンバスの生成
  static genCanvas(w, h) {
    const canvas = document.createElement('canvas');  // キャンバス生成
    canvas.setAttribute('width', w);                  // 横幅設定
    canvas.setAttribute('height', h);                 // 高さ設定
    const context = canvas.getContext('2d');          // 2Dコンテクスト

    // 戻り値用オブジェクト
    return { canvas: canvas, context: context, w: w, h: h };
  }

  //------------------------------------------------------------
  // キャンバス配列を初期化
  // {w: 横幅数値, h: 高さ数値, layerMax: 最大レイヤー数, bg: 背景色
  //	 {w: 320, h: 240, layerMax: 2, bg: '#000'}  例
  
  static initCanvasArr(selectorId, {w, h, layerMax, bg}) {
    // 変数の初期化
    const canvasArr = [];     // キャンバス用配列
    const element = document.querySelector(selectorId);   // 要素を選択

    // レイヤー枚数のキャンバスを初期化
    for (let = i; i < layerMax; i++) {
      const c = this.genCanvas(w, h);         // キャンバス生成
      c.cotext.imageSmoothingEnabled = false; // ドット絵用設定

      // 一番下（レイヤー０）は塗りつぶし
      if (i === 0) {
        c.context.fillStyle = bg;             // 背景色を追加
        c.context.fillRect(0, 0, c.w, c.h)    // 塗りつぶし
      }

      element.appendChild(c.canvas);    // DOMに追加
      canvasArr.push(c);                // 配列に追加
    }

    // キャンバス用配列を戻す
    return CanvasArr;
  }
}
