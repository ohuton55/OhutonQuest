'use strict';

class UiBattleBase {
	//戦闘基本描画
	static draw(gameData, options, time) {
		// 初期化
		const chipSize = gameData.chipSize;
		const rect = options.enemyRect;	// 敵短形
		
		// 描画の初期化
		const layerId = gameData.layerIds.middle;
		const context = gameData.canvasArr[layerId].context;
		context.save();
		context.translate(rect.x, rect.y);	//原点移動
		UiWin.drawWin(context, 0, 0, rect.w, rect.h);	//ウィンドウ描画
		
		//自damage演出
		if (options.state == 'enemy') {
			context.globalAlpha = 0.5;
			context.fillStyle = '#f00';
			context.fillRect(0, 0, rect.w, rect.h); //敵短形ないを塗りつぶし
			context.globalAlpha = 1;
		}
		
		//敵ステータスの描画
		const enemy = options.enemyData;
		const text = `&{enemy.name} Lv ${enemy.level}`
			+ ` HP ${enemy.hp} / ${enemy.hpMax}`
			+ ` AT ${enemy.at} DF ${enemy.df}`;
		UiText.drawCenter(context, text, rect.w / 2 | 0, 12, 5, 'white');
		
		//文字列描画
		
		//揺れ演出（キャラを揺らす
		let moveX = 0;
		let moveY = 0;
		if (options.state !== 'menu' && options.actionType !== 'Heal') {
			moveX = ((time.sum / 50 | 0) * 17 % 4) - 2;
			moveY = ((time.sum / 50 | 0) * 31 % 4) - 2;
		}
		
		//キャラ描画の初期化
		const refX = enemy.image;	//キャラ参照位置X
		const refY = 1;
		const charaImage = GameImage.images['chara'];
		const drawSize = chipSize * 9;
		const drawX = ((rect.w - drawSize) / 2 | 0) + moveX;
		const drawY = ((rect.h - drawSize) / 2 | 0) + moveY;
		
		//キャラの描画
		UiChip.draw(
			context, charaImage, chipSize, drawSize,
			refX, refY, drawX, drawY
		);
		
		//原点復帰 saveした時の状態に戻す
		context.restore();
	}
}
