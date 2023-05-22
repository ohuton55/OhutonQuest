'use strict';

class GameAnim {
  // アニメーション実行用関数　ブラウザ依存を吸収する
  static requetAnim(cb){
    return (
      (cb => window.setTimeout(cb, 1000 / 60))
    )(cb);
  };

  //-------------------------------------------------
  // アニメーション用変数
  static funcUpdate = null;   // 更新実行関数（アニメ更新の度、呼び出される
  static time = {   // 時間オブジェクト
    sum:   0,     　// 合計
    old:   null,    // 旧 Date
    now:   0,       // 新 Date
    diff:  0        // 差分
  };
  static flagStop = false;    // 停止フラグ
  //-------------------------------------------------
  // アニメーションの開始
  static start(){
    this.flagStop = false;         // 停止フラグを偽に
    this.time.old = + new Date();  // 時間 旧を初期化する

    // アニメーションループ
    const anmFnc = () => {
      this.update();
      if (! this.flagStop) { this.requestAnim(anmFnc) } // 再描画で実行
    };
    anmFnc();   // 初回実行
  };

  //-------------------------------------------------
  //アニメーションの停止
  static stop() {
    this.flagStop = true;          // 停止フラグを真に
  };

  //-------------------------------------------------
  // アニメーションの更新
  static update() {
    // 差分時間と経過時間を計算
    const time = this.time;
    time.now = + new Date();   // 時間　新の設定
    
    // ポーズ時を考慮して、1秒以上遅延があるなら、いったん差分を0にする
    if (time.old == null || time.now - time.old >= 1000) {
      time.old = time.now;
    }
    // time.oldがnullなら0を、そうでないなら差分をtime.diffに代入する
    time.diff = time.old == null ? 0 : time.now - time.old;
    time.sum += time.diff;    // 時間の合計
    time.old = time.now;      // 時間 旧を更新

    // 更新実行関数を実行する
    
  }
}
