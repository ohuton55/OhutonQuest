'use strict';

class UtilLevel {
  // 能力値計算
  static calc = function(gameData, userData) {
    // 基本地の計算
    userData.at       = 15   + (userData.level - 1) * 5;    // 攻撃力
    userData.df       = 15   + (userData.level - 1) * 5;    // 防御力
    userData.hpMax    = 15   + (userData.level - 1) * 25;    // 最大HP
    userData.mpMax    = 15   + (userData.level - 1) * 25;    // 最大MP
    
    // アイテムの効果を適用
    userData.item.forEach((o, i) => {



    });
  };
  
  // 経験値追加
  static addExp = function(gameData, userData, exp) {
    
  };
}
