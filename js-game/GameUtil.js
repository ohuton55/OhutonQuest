'use strict';

class GameUtil {

  // 変数の初期化
  static ua = {};
  static {
    this.ua.pc = ! window.navigator.userAgent   // PCか田舎のフラグ
      .match(/iphone|ipod|ipad|android|windows Phone/i);
  }

  //------------------------------------------------------------
  // 短形内か判定する
  // cX, cY - check X, chck Y
  // x, y, w, h - 短形領域だよ
  // rct - x, y, w, h のプロパティを持つ短形
  static inRect(cX, cY, x, y, w, h) {
    return x <= cX && cX < x + w && y <= cY && cY < y + h;
  }
  static inRectObj(cX, cY, {x, y, w, h}) {
    return this.inRect(cX, cY, x, y, w, h);
  }

  //------------------------------------------------------------
  // 最小～最大の範囲にnを収める
  static minMax(min, n, max) {
    return Math.max(min, Math.min(n, max));
  }

  //------------------------------------------------------------
  // Xorshift
  //  new GameUtil.Xors(n); として使うよ！
  static Xors = function(n) {
    let x, y, z, w;

    // シード
    this.seed = n => {
      x = 123456789; y = 362436069; z = 521288629; x = 88675123;
      if (typeof n === 'number') {w = n}
    }
    this.seed(n); // 初回実行

    // ランダム
    this.random = () => {
      const t = x ^ (x << 11);
      x = y; y = z; z = w;
      return w = (w ^(w>>19))^(t^(t>>8));
    }
  ;}
}


