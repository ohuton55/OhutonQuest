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
      if (o !== 1) {return}  // アイテムを所有していないので飛ばす

      const treasure = gameData.treasureArr[i];
      if (treasure === 'IronBody')     {userData.hpMax *= 1.3}
      if (treasure === 'IronArm')      {userData.hpMax *= 1.3}
      if (treasure === 'IronLeg')      {userData.hpMax *= 1.3}
      if (treasure === 'IronHead')     {userData.hpMax *= 1.3}
      if (treasure === 'HeroSword')    {userData.at    *= 2.5}
      if (treasure === 'WisdomRing')   {userData.mpMax *= 2.5}
      if (treasure === 'FairyShield')  {userData.df    *= 2.5}
    });

    // 範囲内に値を収める（小数点は切り捨てる）
    userData.at    = GameUtil.minMax(1, userData.at | 0, 999);
    userData.df    = GameUtil.minMax(1, userData.df | 0, 999);
    userData.hpMax = GameUtil.minMax(1, userData.hpMax | 0, 999);
    userData.mpMax = GameUtil.minMax(1, userData.mpMax | 0, 999);
    userData.hp    = GameUtil.minMax(1, userData.hp, userData.hpMax);
    userData.mp    = GameUtil.minMax(1, userData.mp, userData.mpMax);
  };
  
  //----------------------------------------------------
  // 経験値追加
  static addExp = function(gameData, userData, exp) {
    // 経験値の最小と最大を調整
    userData.exp = GameUtil.minMax(1, userData.exp + exp, 999); // 1～999内

    // 変数の初期化
    const levelUpArr = [
      0,  10,  20,  40,  70, 100, 150, 200, 250, 300,	// レベル 1-10
    350, 400, 450, 500, 600, 700, 800, 900, 999,	// レベル11-19
    ];

    // 該当レベルを探索
    let level;
    levelUpArr.forEach((p, i) => {
      if (userdata.exp >= p) { level = i + 1 }
    });

    // レベルアップ判定
    const isLevelUp = userData.level !== level;  // true or false
    if (isLevelUp) {
      // レベルアップしている
      userData.level = level;   // レベルを更新する
      const isHpMax = userData.hp === userData.hpMax;  // HP 最大値
      const isMpMax = userData.mp === userData.mpMax;  // MP 最大値
      if (isHpMax) { userData.hp = userData.hpMax }    // HP最大値にする
      if (isMpMax) { userData.mp = userData.mpMax }    // MP最大値にする
    }

    // レベルアップしているかを返す
    return isLevelUp;
  };
}
