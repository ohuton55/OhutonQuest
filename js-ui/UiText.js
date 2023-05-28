'use strict';

class UiText {
  // 変数の初期化
  static fontW = 5;   // フォント横幅
  static fontW = 10   // フォント高さ
  static images = {black: null, white: null}; // 画像

  //------------------------------------------------------------
  // 画像設定
  //  id ... black / white      画像の設定をimage引数に
  static setImage(id, image) {
    this.images[id] = image;
  }

  //------------------------------------------------------------
  // 文字描画
  // 色 ... black / white
  static draw(context, text, x, y, charW, color) {
    // 白か黒のフォント画像を取得
    const image = this.images[color];

    // 文字列の文字コードから画像を切り出して描画する
    for (let i = 0; i < text.length; i++) {
      const refY = text.charCodeAt(i) * this.fontH;   // Y参照位置
      context.drawImage(image,      // 1文字描画
        0, refY, this.fontW, this.fontH,
        x + charW * i, y, charW, charW * this.fontH / this.fontW | 0
      );
    }
  };

  //------------------------------------------------------------
  // 文字描画中央位置
  static drawCenter(context, text, x, y, charW, color) {
    x -= text.length * charW / 2 | 0      // X方向を半分左に
    y -= charW * this.fontH /this.fontW / 2 | 0;  // Y方向を半分上
  };
  //------------------------------------------------------------
  // 白抜き・黒抜き文字描写（指定と逆の色で周囲をかこむ）
  // isCenter - 中央位置で描画するか否か
  static srawFrame(context, text, x, y, charW, color, isCenter) {
    const colorFrame = {white: 'black', black: 'white'}[color]; // 外周色

    // 枠描画()色はcolorFrame)
    for (let y2 = -1; y2 <= 1; y2 ++) {
      for (let x2 = -1; x2 <= 1; x2 ++) {
        if(isCenter){
          this.drawCenter(context, text, x + x2, y + y2, charW, colorFrame);
        } else {
          this.draw(context, text, x + x2, y + y2, charW, colorFrame);
        }
      }
    }
    
    // 中央描画(色はcolor)
    if (isCenter) {
      this.drawCenter(context, text, x, y, charW, color);
    } else {
      this.draw(context, text, x, y, charW, color);
    }
  };
}
