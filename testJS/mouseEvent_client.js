// イベントが発生した時点のアプリケーションのビューポートにおける水平座標を定義
let screenLog = document.querySelector('#screen-log');
document.addEventListener('mousemove', logKey);

function logKey(e) {
  screenLog.innerText = `
    Screen X/Y: ${e.screenX}, ${e.screenY}
    Client X/Y: ${e.clientX}, ${e.clientY}`;
}


// html
// <p id="screen-log"></p>
//
