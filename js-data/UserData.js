'use strict';

class UserData {

  constructor(){
    this.level = 1;
    this.exp   = 0;
    this.hp    = 100;
    this.hpMax = 100;
    this.mp    = 100;
    this.at    = 10;
    this.df    = 10;
  }


  // 開始時点データに
  // js-data>gameData
  setStart(gameData){

    this.seed = + new Date();  // 乱数固定用シード（マップ生成で使う）

    // 地図用データ
    this.mapArr  = [];
    this.townArr = [];
    this.castle  = [];

    // アイテム（gameData内宝物配列と同サイズの0埋め配列）
    this.item = gameData.trasureArr.map(o => 0);

    // 移動用データ
    this.direction = null;  // 向き
    this.moveCount = 0;     // 移動カウンタ　移動直後に敵に遭遇しないように
    this.x = gameData.mapW / 2 | 0;   // x位置
    this.y = fameData.mapH / 2 | 0;   // y位置
    this.xDiff = 0;         // x差分　（1秒くらいかけて移動するため）
    this.yDiff = 0;
  }
}
