'use strict';

class UiWin {
  // 変数の初期化
  static marginX = 0;   // マージンX
  static marginY = 5;   // マージンY
  static lineH = 13;    // 行の高さ

  //------------------------------------------------------------
  // ウィンドウ描画 外側から、黒白黒で枠を書く
  static drawWin(context, x, y, w, h) {
    // 外側黒
    context.fillStyle = '#000';
    context.fillRect(x, y, w, h);

    // 枠白
    context.fillStyle = '#fff';
    context.fillRect(x + 1, y + 1, w - 2, h - 2);

    // 内側黒
    context.fillStyle = '#000';
    context.fillRect(x + 2, y + 2, w - 4, h - 4);
  };

  //------------------------------------------------------------
  // ウィンドウサイズ取得　行数と文字数から、必要なウィンドウサイズを取得
  static getWinSize(lineLen, textLen) {
    // 変数の初期化
    const w = this.marginX * 2 + textLen * UiText.fontW;  // 横幅
    const h = this.marginY * 2 + (lineLen - 1) * this.lineH + UiText.fontH; // 高さ
    const lineRect = [];

    // 各行の短形を取得
    for (let i = 0; i < lineLen; i++) {
      lineRect.push({
        x: 3,
        y: this.marginY + i * this.lineH - 2,
        w: w - 6,
        h: this.lineH
      });
    }

    // 横幅、高さ、各行の短形配列を戻す
    return {w: w, h: h, lineRect: lineRect};
  };
  //------------------------------------------------------------
  // ウィンドウ文字描画　１行分描画
  // lineNum - 行番号　Y位置計算につかう
  static drawWinText(context, x, y, text, lineNum) {
    const dX = x + this.marginX;                        // X位置
    const dY = y + this.marginY + lineNum * this.lineH; // Y位置
    UiText.draw(context, text, dX, dY, UiText.fontW, 'white');  // 文字描画
  };
  //------------------------------------------------------------
  // 1行短形の取得　ウィンドウサイズを基に、実際の描画位置を求める
  static getLineRect(x, y, winSize, i) {
    const o = winnSize.lineRect[i];       // ウィンドウサイズから指定
    return {x: x + o.x, y: y + o.y, w: o.w, h: o.h};  // XY位置を調整
  }
}
