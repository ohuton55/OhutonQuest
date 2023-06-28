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
				context.moveTo(rect.w - margin, margin); //右上
				context.lineTo(centerX - lineW, centerY - lineW);	//中央左上
				context.lineTo(margin,	rect.h - margin); //左下
				context.lineTo(centerX + lineW, centerY + lineW);	//中央みぎした
			}
			context.fill();
		} else if(options.actionType === 'Heal') {
			//回復　（光の柱

			const step = 15;
			context.globalAlpha = 0.9;

			//描画
			for(let i = 0; i < step; i++) {
				const w rate * (rext.w / step) * 1; //横幅
				const x = i * rect.w / step - w / 2;	//X位置
				context.fillRect(x, 0, w, rect.h);	//短形描画
			}			
		} else {
			//火、　氷、　死（輪を描画
			
			const step = 25;
			context.lineWidth = 4;
			
			//描画
			for(let i = 0; i < step; i++) {
				//アニメが進行すると、描画する半径の種類が増える
				if(i >= rate * step) { continue }
			
        const radius = (centerX + centerY / 2) * i / step;

        //描画
        context.beginPath();
        //円弧描画
        context.arc(centerX, centerY, radius, 0, Math.PI * 2, false);
        context.stroke(); //パスとじる
      }
		}
    //終了
		context.restore();
    const isEnd = timeDiff >= timeLen; //終了判定
    return isEnd;
	}
}
