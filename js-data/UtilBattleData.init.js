'use strict';

class UtilBattleData {
	//値初期化
	static init(gameData, userData, options) {
		//敵設定の初期化
		const enemy = Object.assign({}, gameData.enemyData[options.type]);
		options.type = enemy;
		
		//レベル決定
		if(options.type === 'last') {
			//最終戦闘
			enemy.level = 1;
		} else {
			//通常戦闘
			const rate = GameUtil.minMax(1, userData.level / 2 | 0, 5);	//1~5倍
			enemy.level = 1 + gameData.xors.random() % rate;
		}
		
		//値決定（レベルで0.5刻み
		enemy.hp = enemy.hp * (0.5 + enemy.level / 2) | 0; //HP
		enemy.hpMax = enemy.hp;							//最大限HP
		enemy.at = enemy.at * (0.5 + enemy.level / 2) | 0; //攻撃力
		enemy.df = enemy.df * (0.5 + enemy.level / 2) | 0; //防御力
	};
}