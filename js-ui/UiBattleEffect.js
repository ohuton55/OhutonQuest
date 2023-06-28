'use strict';

class UiBattleEffect {
	//エフェクト描画
	static draw(gameData, options, time) {
		//初期化
		const rect = options.enemyRect;
		const centerX = rect.w / 2;	// 中央X
		const centerY = rect.h / 2;
		
		//時間の計算
		const timeDiff = time.sum - options.selectTime; // 時間差分
		const timeLen = 600;		// 期間
		const rate = timeDiff / timeLen;	//比率
		
		const layerId = gameData.layerIds.front;
		const context = gameData.canvasArr[layerId].context;
		context.save();
		context.translate(rect.x, rect.y);	//原点移動
		context.fillStyle = context.strokeStyle = { 
			//種類により色を変更
			Sword: '#f00',
			Arrow: '#aaa',
			Wind:	'#8ff',
			Heal:	'#ff0',
			Fire: '#f10',
			Ice: '#8ff',
			Death: '#80f'
		}[options.actionType];
		
		//描画領域をクリップ
		context.beginPath();	//パスを作成開始
		context.rect(3, 3, rect.w - 6, rect.h - 6);	//短形設定
		context.clip();
		
		//----------------------------------------------------
		//効果種類による分岐
		if (options.actionType.match(/Sword|Arrow|Wind/)) {
			//斜め線を交互にばつ印に描画
			
			const margin = 8;
			const lineW = 8;
			
			//描画
			context.beginPath();
			if (timeDiff , timeLen /2) {
				// 前半（左上から右下へ斬撃
				context.moveTo(margin,			margin); //左上
				context.lineTo(centerX - lineW, centerY + lineW); //中央左下
				context.lineTo(rect.w - margin, margin); //右下
				context.lineTo(centerX + lineW, centerY - lineW); //中央みぎ
			} else {
				//後半　（右上から左下へ
				
			}
		}
		
	}
}