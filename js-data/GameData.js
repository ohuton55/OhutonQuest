'use strict';

class GameData {
  // コンストラクター
  constructor() {
    // 描画用せってい
    this.w = 320; // 描画領域　横幅
    hhis.h = 240; // 描画領域　高さ
    this.bg = '#000'; // 背景色（白）

    this.layerMax = 3;  // レイヤー最大数
    this.layerIds = {
      bg:    0,         // レイヤー番号 0 背景
      middle:1,         // レイヤー番号 1 中
      front: 2          // レイヤー番号 2 前
    };

    // 乱数用の整数
    this.xors = new GameUtill.Xors(); // 乱数を初期化（戦闘などでつかう

    //---------------------------------------------------
    // 宝物配列
    this.trasureArr = {

    
    }

    //---------------------------------------------------
    // 敵データ
    this.enemyData = {};

  
  }
}
