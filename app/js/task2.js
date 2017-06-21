   var can, ctx, ptCount, colSel, countBtn, colorBtn;
   var drawLine = {}; //Функция для прорисовки линии
   var count; //Число точек, с которыми связываем 
   var colors = ['#000', '#6C4040', '#40406C', '#269C9B', '#9B269C']
//Инициализация
function $(id){
    return document.getElementById(id);
}
function init(){
        can = $('can');
        colSel = $('color-select');
        ptCount = $('points-count');
        countBtn = $('count-btn');
        colorBtn = $('color-btn');

        can.width = 500;
        can.height = 300;

        ctx = can.getContext('2d');
        ctx.fillStyle = "#000";
        ctx.strokeStyle = "#000";
        ctx.lineWidth = 2;

        drawLine = drawLineAnimate;

        can.addEventListener("click", mouseClick);
        countBtn.addEventListener("click", countChange);
        colorBtn.addEventListener("click", colorChange);
}


class Point{
    constructor(x1, y1) {
        this.x = x1;
        this.y = y1;
    }
   static x(){
     return this.x;
   }   
   static y()
   {
    return this.y;
   }
    draw(){
        ctx.fillRect(this.x, this.y, 2, 2);
    }
}

//Массив точек
class PointList{
    constructor(l){
        this.list = [];
        this.count = l;//Число точек, с которыми связываем
    }
    static count(){
        return this.count;
    }
    //Добавляем точку в конец массива и рисуем линии.
    pushDraw(point){
        var len = this.list.length;
        
        // если массив пуст, то рисует точку
        if(len === 0)
        {
            point.draw();
            this.list.push(point);
        }
        /* Если массив не пуст, но размер меньше count.
        Рисуем линию от последней точки в массиве до текущей*/
        else if (len < this.count)
        {
            point.draw();
            drawLine(this.list[len - 1], point);
            this.list.push(point);
        }
        /*Рисуем линии от всех точек массива до текущей
        Убираем первую точку в массиве и ставим на ее место текущую
        */
        else{
            point.draw();
            for(let p of this.list)
            {
                drawLine(p, point);
            }
            this.list.shift();
            this.list.push(point);
        }
    }
}

//Линия между двумя точками
function drawLineSimple(p1, p2){
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.stroke();
}




function animate(draw, duration) {
    var start = performance.now();
    requestAnimationFrame(function animate(time) {
        var timePassed = time - start;
        if (timePassed > duration) 
            timePassed = duration;
        draw(timePassed);
        if (timePassed < duration){
            requestAnimationFrame(animate);
        }
    });
}

function drawLineAnimate(p1,p2){
    var duration = 1000;
    let dx = (p2.x - p1.x) / duration;
    let dy = (p2.y - p1.y) / duration;
    animate(function(timePassed){
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        let x = timePassed * dx + p1.x;
        let y = timePassed * dy + p1.y; 
        ctx.lineTo(x, y);
        ctx.stroke(); 
    }, duration);
}



//Массив точек с count = 2
var pointList = new PointList(2);

//При нажатии на холст вызывает функцию pushDraw
function mouseClick(e){
    mouseX = e.clientX - can.offsetLeft;
    mouseY = e.clientY - can.offsetTop;
    let p = new Point(mouseX, mouseY);
    pointList.pushDraw(p);

};

//Меняет count, при этом обнуляет массив и очищает холст
function countChange(e){
    var x = ptCount.value;
    if( x > 0 && x < 100)
    {
        ctx.clearRect(0, 0, can.width, can.height);
        pointList = new PointList(x);
    }
    else ptCount.value = pointList.count;
}

//Меняет цвет
function colorChange(e){
    var c = colSel.value;
    ctx.fillStyle = colors[c - 1];
    ctx.strokeStyle = colors[c - 1];
}