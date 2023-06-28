'use strict';

class UtilBattleMenu {
	//メニュー初期化
	static init(gameData, userData, options){
		//有効アイテム名前配列の取得
		options.menuArr = UtilMisc.getMyItemNames(gameData, userData, true, '>');
		options.menuArr.unshift('>Sword'); //先頭に剣追加
	}
	
	//--------------------------------------------------------
	//メニュー描画
	static draw(gameData, options) {
		//変数の初期化
		const h = gameData.h;
		const chipsize = gameData.chipSize;
		
		//メニュー用サイズと位置の初期化
		const winSize = UiWin.getWinSize(options.menuArr.length, 13);
		winSize.x = chipSize / 2;	//X位置
		winSize.y = h - winSize.h - chipSize / 2;	//Y位置
		options.menuWinSize = winSize;	//格納
		
		//ウィンドウ描画
		const layerId = gameData.layerIds.middle;
		const context = gameData.canvasArr[layerId].context;
		
		UiWin.drawWin(context, winSize.x, winSize.y, winSize.w, winSize.h);
		
		//進行がselectなら選択位置を描画
		if(options.state === 'state'){
			//選択位置描画
			const rect = UiWin.getLineRect(winSize.x, winSize.y, winSize, options.selectMenu);	//行短形
			context.fillStyle = '#888';	//灰色
			context.fillRect(rect.x, rect.y, rect.w, rect.h);	//選択描画
		}
		
		//メニュー描画
		options.menuArr.forEach(
		(t, i) => UiWin.drawWinText(context, winSize.x, winSize.y, t, i));	//文字描画
	}
	//--------------------------------------------------------
	//メニューたっぷ判定
	static tap(gameData, userData, options, x, y){
		if(options.state === 'menu'){
			//メニュー選択判定			
			let select = -1;	//選択項目
			const winSize = options.menuWinSize;
			winSize.lineRect.foeEach((o, i) => {
				//各行の短形内をたっぷしているか判定
				const rect = UiWin.getLineRect(winSize.x, winSize.y, winSize, i);
				if(GameUtil.inRectObj(x, y, rect)) { select = i }	//選択項目
			});
			
			//選択しているか判定
		if (select != -1) {
			//メニューを選択している
			
			//設定の更新
			options.state = 'select';
			options.selectMenu = select;	// 設定項目をセット
			
			//メニューの取り出し
			const match = options.menuArr[select]
				.replace(/>|.*:/g, '')	//項目取り出し
				.match(/([A-z]+)(\d*)/); //英字と数を分離してmatch配列へ
				options.actionType = match[1];	//選択行動
				options.actionLevel = match[2];	//呪文レベル
				
				options.selectTime = GameAnim.time.sum; //選択時間
				
				UiBattleData.calc(gameData, userData, options, 'user');	//自計算
				
				//効果音を鳴らす
				GameSound.play(options.actionType === 'Heal' ? 'seHeal' : 'seAt');
		}	
		}
	}
}