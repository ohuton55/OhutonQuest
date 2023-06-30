'use strict';

//計算
UtilBattleData.calc =
function(gameData, userData, options, userType) {
	//変数の初期化
	const enemy = options.enemyData;	//敵値
	const user = userData;		//自値
	let at, df, heal, mp, damage	//各種値
	const spell = [0, 1, 3, 6][options.actionLevel]; //呪文値
	
	//ショートカット
	const minMax = GameUtil.minMax;
	const random = gameData.xors.random;
	
	//行動の計算
	if (userType == 'user') {
		//自分の側
		
		//行動種類による値の設定
		const a = options.actionType;	//行動種類
		const n = options.actionLevel;	//呪文レベル
		if ( a === 'Sword') { mp = 0	; at = user.at / 2 | 0; df = enemy.df;}
		if ( a === 'Heal') { mp = 10 * n; heal = n * n * 50;}
		if ( a === 'Fire') { mp = 25 * n; at = spell * 20; df = enemy.df / 2;}
		if (a === 'Ice') { mp = 25 * n; at = spell * 15; df = 1;}
		
		//必要MPに対してMPが足りているか
		if (userData.mp < mp) {
			heal = damage = 0;	//足りていないので効果は0
		} else {
			if (heal) {
				user.hp = minMax(1, user.hp + heal, user.hpMax); //自分を回復
			} else {
				//ダメージ
				damage = (at + random() % at) - (random() % df);
				damage = minMax(1, damage | 0, 999); //範囲内の整数に
				enemy.hp = minMax(0, enemy.hp - damage, 999); //敵ダメージ
			}
			user.mp = minMax(0, user.mp - mp, 999); //自MP消費
		}
		} else if (userType =='enemy') {
			//敵側
			
			//行動種類による値の設定
			const a = options.actionType; //行動種類
			if(a === 'Sword') { at = enemy.at / 2 | 0; df = user.df}
			if(a === 'Arrow') { at = enemy.at / 2 | 0; df = user.df / 4}
			if(a === 'Wind') { at = enemy.at / 2 | 0; df = user.df / 2}
			if(a === 'Death') { at = enemy.at / 2 | 0; df = user.df}
			
			//ダメージ
			damage = (at + random() % at) - (random() % df);
			damage = minMax(1, damage | 0, 999);
			user.hp = minMax(0, user.hp - damage, 999);
	}
	
	//値の格納
	options.numEffectNum = heal || damage;	//数字効果用値格納
	options.numEffectLast = GameAnim.time.sum;	//数字値用最終時間格納
};
