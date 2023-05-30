'use strict';

class UtilMisc {
  // 有効アイテム名前配列の取得（呪文が複数ある場合はレベル違いになる）
  static getByItemNames(gameData, userData, onlySpell, padHead) {
    const arr = [];   // 結果配列
    const spell = {}; // 呪文レベル計算用オブジェクト

    // 所有アイテムを探索して文字列配列を作る
    userData.item.forEach((x, i) => {
      if (! x) { return }   // 無効は飛ばす

      let name = gameData.treasureArr[i]; // 名前
      let isSpell = !! name.match(/Spell:/);  // 呪文か否か

      if (! isSpell && onlySpell) { return }  // 呪文のみ取得で、非呪文なら飛ばす

      if (isSpell) {
        // 呪文である
        if (! spell[name]) {
            spell[name] = 1;    // その呪文で1つめ
        } else {
            spell[name] ++;     // その呪文で2つめ以上
        }
        name += spell[name]     // 呪文の場合は呪文レベルを加える
      }

      arr.push(padHead + name); // 先頭埋め文字列を追加して配列に格納
    });
    return arr;
  }
}
