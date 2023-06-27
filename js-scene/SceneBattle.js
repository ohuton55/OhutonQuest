'use strict';

class SceneBattle {
	//初期化
	static options = {
		type: null,		//種類
		state: null,	//進行
		enemyData: {},	//敵値
		actionType: null,	//行動種類
		actionLevel: null,	//行動レベル
		selectMenu: null,	//選択項目
		numEffectNum: null,	//数字効果用値
		numEffectLast: null, //数字値用最終時間
		enemyRectl: {},	//敵短形
		menuWinSize: {},	//メニューのウィンドウサイズ
		menuArr: []		//メニュー配列
	}
	//--------------------------------------------------------
	//開始
	static start(gameData, userData, type) {
		//初期化
		const options = this.options;
		const w = gameData.w;
		const h = gameData.h;
		const chipSize = gameData.chipSize;
		
		options.type = type;	//種類
		options.state = 'menu';	//進行
		options.enemyRect = {	//敵短形
			x: w - chipSize * 13.5,
			y: 0,
			w: chipSize * 13.5,
			h: h
		};
		
		//初期化処理
		UtilbattleData.init(gameData, userData, options); //値
		UtilBattleMenu.init(gameData, userData, options); //メニュー
		GameView.add(this.tap.bind(this, gameData, userData)); //たっぷ登録
		GameAnim.add(this.anim.bind(this, gameData, userData)); //アニメ登録
		// BGM start
		GameSound.playBGM(type === 'last' ? 'bgmBattleLast' : 'bgmBattle');
	}
	//--------------------------------------------------------
	//たっぷ
	static tap(gameData, userData, x, y, type) {
		//変数の初期化
		const options = this.options;	
		
		if (type === 'down'){
			// メニューたっぷ判定
			UtilBattleMenu.tap(gameData, userData, options, x, y);
		}
	}
	//--------------------------------------------------------
	//アニメーション
	static anim(gameData, userData, time) {
		//初期化
		const options = this.options;
		const w = gameData.w;
		const h = gameData.h;
		
		//終了時エフェクト
		if (options.state == 'end'){
			const layerId = gameData.layerIds.front; //描画対象
			const context = gameData.canvasArr[layerId].context; // コンテキスト
			context.globalAlpha = 0.1;	//半透明に
			context.fillStyle = '#000';
			context.fillRect(0, 0, w, h);
			context.globalAlpha = 1;	//透明度を戻す
			return;	// 通常描画は行わない
		}
		
		//画面のクリア
	gameData.canvasArr[gameData.layerIds.middle].context.clearRect(0, 0, w, h);
	gameData.canvasArr[gameData.lererIds.front].context.clearRect(0, 0, w, h);
	
		//演出 - 効果が終わったら次の進行に
		if (options.state.match(/^(select|enemy)&/)){
			//進行がselect,enemyの時
			if (UiBattleEffect.draw(gameData, options, time)) {
				UtilBattleProcess.next(gameData, userData, options);	//次に進行
			}
		}
		
		//描画
		UiBattleNumEffect.draw(gameData, options, time); //数字効果
		UiBattleBase.draw(gameData, options, time); //戦闘基本描画
		UiBattleMenu.draw(gameData, options);	//メニュー画面
		UiStatus.draw(gameData, userData);	//ステータスの描画
	}
}