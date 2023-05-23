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

    // マップを設定
    this.mapW = 64;
    this.mapH = 48;
    this.chipSize = 16; // チップサイズ

    // 土地番号
    this.landIds = {
      plain:    0,
      forest:   1,
      mountain: 2,
      water:    3,
      town:     4,
      castle:   5
    }

    // 乱数用の整数
    this.xors = new GameUtill.Xors(); // 乱数を初期化（戦闘などでつかう

    //---------------------------------------------------
    // 宝物配列
    this.trasureArr = [
      // 呪文！
      'Spell:Heal', 'Spell:Heal', 'Spell:Heal',
      'Spell:Fire','Spell:Fire','Spell:Fire',
      'Spell:Ice','Spell:Ice','Spell:Ice',
      // 鉄鎧
      'IronBody', 'IronArm', 'IronLeg', 'IronHead',
      // 強い装備
      'HeroSword', 'WisdomRing', 'FairyShield'
    ];

    //---------------------------------------------------
    // 敵データ
    this.enemyData = {};

    this.enemyData[this.landIds.plain] = {
      name:  'Goblin',
      rate:  20, // 戦闘発生確率
      image: 0,
      hp:    50,
      at:    10,
      df:    5,
      skill: 'Sword'
    };  
    this.enemyData[this.landIds.forest] = {
      name:  'Elf',
      rate:  10, // 戦闘発生確率
      image: 1,
      hp:    100,
      at:    20,
      df:    10,
      skill: 'Arrow'
    };
    this.enemyData[this.landIds.mountain] = {
        name:  'Roc',
        rate:  5, // 戦闘発生確率
        image: 2,
        hp:    240,
        at:    40,
        df:    30,
        skill: 'Wind'
    };
    this.enemyData['last'] = {
        name:  'Dark King',
        rate:  3, // 戦闘発生確率
        image: 3,
        hp:    999,
        at:    499,
        df:    99,
        skill: 'Death'
    };

  }
}
