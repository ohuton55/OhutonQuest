function hide(e) {
  e.currentTarget.style.visibility = 'hidden';
  console.log(e.currentTarget);
  // この関数がイベントハンドラーとして渡されるときは、 this === e.currentTarget

}

var ps = document.getElementsByTagName('p');

for(var i = 0; i < ps.length; i++){
  // consoleに出力 print the clicked <p> element
  ps[i].addEventListener('click', hide, false);
}

// console　に出力<body>
document.body.addEventListener('click', hide, false);

// 周辺をクリックすると文字が消えるよ！
