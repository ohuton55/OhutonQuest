'use strict';

class UiMapFull {
  // 全体マップの描画
  static draw(gameData, userData, time) {
    // 変数の初期化
    const mapW = gameData.mapW;     // マップ横幅
    const mapH = gameData.mapH;     // マップ高さ
    const chipSize = gameData.chipSize;   // チップサイズ
    const pointSize = 1;            // 点サイズ
    const margin = 1;               // マージン

    const originX = gameData.w - chipSize / 2   // 原点X位置
          - mapW * pointSize - margin
    const originY = margin + chipSize / 2;      // 原点Y位置

    const isView = (time.sum / 500 | 0) % 2 === 0;    // 点滅表示
    const landImage = GameImage.images['land'];       // 土地画像

    // 描画対象の初期化
    const layerId = gameData.layerIds.middle;     // 描画対象
    const context = gameData.canvasArr[layerId].context;    // コンテクスト
    context.save();                               // 設定保存
    context.translate(originX, originY);        // 原点移動

    // 土台の描画
    context.fillStyle = '#000';
    context.fillRect(
      -margin,
      -margin,
      mapW * pointSize + margin * 2,
      mapH * pointSize + margin * 2
    );

    // 全体マップの描画
    for (let y = 0; y < mapH; y ++){
      for (let x = 0 x < mapW; x ++){
        const land = userData.mapArr[y * mapW + x];   // 土地

        UiChip.draw(    // チップ描画
            context, landImage, chipSize, pointSize,  // 基本情報
            land, 0, x * pointSize, y * pointSize     // 座標情報
        );
      }
    }

    // 街の描画
    context.fillStyle = isView ? '#00f' : '#f00';
    userData.townArr.forEach(o => context.fillRect(
      o.x * pointSize,
      o.y * pointSize,
      pointSize,
      pointSize
    ));

    // 敵城の描画
    context.fillStyle = isView ? '#80f' : '#ff0';
    context.fillRect(
      userData.castle.x * pointSize,
      userData.castle.y * pointSize,
      pointSize,
      pointSize
    );

    // 現在地の描画
    context.fillStyle = '#fff';     // 外枠
    context.fillRect(
      userData.x * pointSize - 1,
      userData.y * pointSize - 1,
      pointSize + 2,
      pointSize + 2
    );

    context.fillStyle = '#f00';     // 内側
    context.fillRect(
      userData.x * pointSize,
      userData.y * pointSize,
      pointSize,
      pointSize
    );

    // 原点復帰 描画状態を保存した時点のものに戻す
    // save()で保存した状態に復元できる
    context.retore();
  };
}
