'use strict';

class SceneEvent {
	// 変数の初期化
	static options = {};
	
	//--------------------------------------------------------
	//  かいし
	static start(gameData, userData, options) {
		this.options = options;
		// たっぷとアニメを登録
		GameView.add(this.tap.bind(this, gameData, userData));
		GameAnim.add(this.anim.bind(this, gameData));
		
		if (options.town) { GameSound.play('seTown')} // 到着
		if (options.win) { GameSound.playBGM('bgmWin')} //勝利
		if (options.lose) { GameSound.playBGM('bgmLose')}
		if (options.winLast) { GameSound.playBGM('bgmFin')}
	}
	//--------------------------------------------------------
	//たっぷ
	static tap(gameData, userData, x, y, type) {
		// 初期化
		const options = this.options;
		
		if(type === 'down'){
			const w = gameData.w;
			const h = gameData.h;
			
			// 描画対象の初期化
			if (options.battle) {
				SceneBattle.start(gameData, userData, options.battleType);	// 戦闘開始
			} else if (options.win || options.lose) {
				SceneMap.start(gameData, userData);
			} else if (options.winLast) {
				SceneTitle.start(gameDta, userData);
			} else {
				SceneMap.start(gameData, userData);
			}
		}
	}	
	//--------------------------------------------------------
	//アニメーション
	static anim(gameData){
		const options = this.options;
		const w = gameData.w;
		const h = gameData.h;
		const chipSize = gameData.chipSize;
		
		const layerId = gameData.layerIds.front; // 描画対象
		const context = gameData.canvasArr[layerId].context;
		context.clearRect(0, 0, w, h); //描画領域をクリア
		
		//背景描画
		context.fillStyle = '#000'; //黒背景
		let backY = 0; //背景Y位置
		if (options.town || options.battle) {
			// 街到着と戦闘開始
			backY = h * 0.1 | 0	//背景Y位置の変更
		}
		context.fillRect(0, backY, w, h - backY * 2); //塗りつぶす
		
		//描画よう関数（ずらしつつ最大3行に描画する
		let y = h * 0.3 | 0;	//Y位置
		const draw = function(txt, fontW) {
			UiText.drawCenter(context, txt, w / 2, y, fontW, 'white');	// 中央描画
			y += h * 0.2 | 0;	//Y位置移動
		};
	
	//--------------------------------------------------------
	//文字の描画（イベントの種類ごとに変える）
	if(options.town) {
		//街到達
		draw('Town', 20);
		if (options.heal){
			draw('Get healed up your HP!', 10);
		}
		if (options.item !== undefined) {
			draw(`Get a "${gameData.treasureArr[options.item]}"!`, 10);
		}
	}
	if (options.battle) {
		draw('Battle!!', 20);
		draw(gameData.enemyData[options.battleType].name + 'appeared.', 15);
		if (options.battleType === 'last') {
			draw('This is a last battle!!', 10);
		}
	}
	if (options.win) {
		y = h * 0.4 | 0;
		draw('You Win!!!!', 30);
		if (options.levelUp) {
			draw('Level Up!', 15);
		}
	}
	if (options.lose){
		y = h * 0.4 | 0;
		draw('You Lose...', 30);
		if (options.levelUp) {
			draw('Level Up!', 15);
		}
	}
	if (options.winLast) {
		draw('You won the last battle!', 10);
		draw('You saved the kingdom!', 10);
		
		const charaImage = GameImage.images['chara'];
		const charaSize = chipSize * 4;
		
		UiChip.draw(
			context, charaImage, chipSize, charaSize,
			0, 0, (w - charaSize) / 2, y - chipSize * 1.5
		);
	}
	
  };
  }