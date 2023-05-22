'use strict';

class GameImage {
  // 変数の初期化
  static images = {};   // 読み込んだ画像

  // 読み込み
  static load(id, url) {
    const image = this.images[id] = new Image();
    return new Promise((resolve, reject) => {     // プロミスを戻す
      image.onload = () => resolve('load image: ' + id);   // 読み込み後に処理
      image.src = url;         // URLを指定して読み込み開始
    });
  };
}
