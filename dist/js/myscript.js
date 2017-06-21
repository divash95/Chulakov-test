
var nav__toggleLine = document.querySelector('.nav__toggle-line');
var nav__toggle = document.querySelector('.nav__toggle');
var nav__menu = document.querySelector('.nav__menu');

//При наведении на ссылку добавляет/убирает модификатор hover
nav__menu.onmouseover = function(event) {
  var target = event.target;
  if (event.target.classList[0] != 'nav__link') return;
  target.classList.toggle('nav__link_hover');
  target.parentNode.classList.toggle('nav__item_hover');
}

nav__menu.onmouseout = function(event) {
  var target = event.target;
  if (event.target.classList[0] != 'nav__link') return;
  target.classList.toggle('nav__link_hover');
  target.parentNode.classList.toggle('nav__item_hover');
}

// При клике снимает модификатор с прошлой активной ссылки
// и присваивает новой
nav__menu.onclick = function(event) {
    var target = event.target;
    var old = document.querySelector('.nav__link_active');
    old.classList.toggle('nav__link_active');
  	old.parentNode.classList.toggle('nav__item_active');
    target.classList.toggle('nav__link_active');
  	target.parentNode.classList.toggle('nav__item_active');
  	return false;
 }

// переключает модификаторы на меню и иконке меню
function NavHandler(){
	nav__toggleLine.classList.toggle('nav__toggle-line_active');
	nav__menu.classList.toggle('nav__menu_hidden');
}

nav__toggle.addEventListener('click', NavHandler);

// обработчик изменения экрана
if (matchMedia) {
  var mq = window.matchMedia("(min-width: 960px)");
  mq.addListener(Media);
  Media(mq);
}

//Скрывает меню и выводит иконку меню
function Media(mq) {
	var menu_hidden = nav__menu.classList.contains('nav__menu_hidden');
  	if (menu_hidden && mq.matches) {
  		nav__menu.classList.toggle('nav__menu_hidden');
  	} else 
  		if (! mq.matches)
  		{
	    	nav__menu.classList.toggle('nav__menu_hidden');
    	}
}
var btn = document.querySelector('.content__btn');
// При нажатии кнопки запускает валидацию.
btn.addEventListener('click', Validation_wrap);

// Переключает модификатор кнопки, если данные корректны.
function Validation_wrap(){
	if (Validation() && ! btn.classList.contains('btn_blue'))
		btn.classList.toggle('btn_blue');
}

//Валидация данных
function Validation(){
	var flag = true;
	var id1 = document.querySelector('.card__input_key_id1'); 
	var id2 = document.querySelector('.card__input_key_id2'); 
	var id3 = document.querySelector('.card__input_key_id3'); 
	var id4 = document.querySelector('.card__input_key_id4');
	var ids = [id1,id2,id3,id4];
	var name = document.querySelector('.card__holder');
	var cvvF = document.querySelector('.card__input_cvvf');
	var cvvB = document.querySelector('.card__input_cvvb');
	var wasWrong;

	//Проверка номера карты и добавление модификатора wrong,
	//если данные некорректны(и модификатор еще не добавлен)
	for (i = 0; i < 4; i++) {
		wasWrong = ids[i].classList.contains('card__input_wrong');
		if (! Id(ids[i].value)){
			if(! wasWrong)
				ids[i].classList.toggle('card__input_wrong');
			flag = false;
		}
		else {
			if(wasWrong){
				ids[i].classList.toggle('card__input_wrong');
			}	
		}
	}

	//Проверка поля для держателя карты
	wasWrong = name.classList.contains('card__input_wrong');
	if( (!Latin(name.value)) || (name.value.length < 4))
	{
		if(! wasWrong)
			name.classList.toggle('card__input_wrong');
		flag = false;
	}else
		if (wasWrong)
		{
			name.classList.toggle('card__input_wrong');
		}

	//Проверка кода CVV
	wasWrongF = cvvF.classList.contains('card__input_wrong');
	wasWrongB = cvvB.classList.contains('card__input_wrong');
	if (! CVV(cvvF.value) && ! CVV (cvvB.value) )
	{
		if(! wasWrongF)
			{
				cvvB.classList.toggle('card__input_wrong');
				cvvF.classList.toggle('card__input_wrong');
			}
		flag = false;
	}
	else
	{
		if (wasWrongF)
		{
			cvvB.classList.toggle('card__input_wrong');
			cvvF.classList.toggle('card__input_wrong');
		}
	}

	return (flag);
}

//четырехзначное число
function Id(str){
	var s = /^\d{4}$/;
	return ((str.search(s)) == 0);
}

//трехзначное число
function CVV(str){
	var s = /^\d{3}$/;
	return ((str.search(s)) == 0);
}

//Латинские буквы с пробелами
function Latin(str) {
   var s = /^[a-z/\s/A-Z]+$/;
   return ((str.search(s)) == 0);
}