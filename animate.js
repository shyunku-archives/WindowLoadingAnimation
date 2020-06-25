let canvasObject;
let canvasWrapper;

let cw, ch;
let ctxt;

const FPS = 144;
const circles = [];
const REVOLVE_RADIUS = 50;

$(()=>{
    canvasWrapper = $('#canvas_wrapper');
    canvasObject = document.getElementById('animation_canvas');
    canvasObject.width = canvasWrapper.width();
    canvasObject.height = canvasWrapper.height();
    cw = canvasObject.width;
    ch = canvasObject.height;
    ctxt = canvasObject.getContext("2d");

    $(window).resize(function(){
        onDisplayChange();
    });

    initialize();

    let delay = parseInt(1000/FPS);
    setInterval(function(){
        eraseAll();
        drawAll();
        update();
    }, delay);
});

function drawAll(){
    drawCircles();
    //drawNotes();
}

function update(){
    circles.forEach(function(el, ind, obj){
        //update speed
        let yOffset = Math.max(0, Math.sin(el.angle)) + 0.15;
        el.speed = yOffset / 11;
        //apply movements
        el.angle += el.speed;

        while(el.angle > Math.PI * 6){
            el.angle -= Math.PI * 5.7;
        }
    });
}

function initialize(){
    for(let i=0;i<5;i++){
        circles.push({
            radius: 5.5,
            speed: 0,
            angle: Math.PI + i * Math.PI / 6,
        });
    }
}

function drawNotes(){
    ctxt.font = "15px Consolas";
    ctxt.fillStyle = "red";
    circles.forEach(function(el, ind, obj){
        let value = el.angle;

        ctxt.fillText(
            value.toFixed(2)+"", 
            cw/2 + Math.cos(el.angle) * REVOLVE_RADIUS,
            ch/2 + Math.sin(el.angle) * REVOLVE_RADIUS - 10
        );
    });
}

function drawCircles(){
    circles.forEach(function(el, ind, obj){
        drawCircle(el);
    });
}

function drawCircle(c){
    if(c.angle > Math.PI * 4.5){
        return;
    }
    ctxt.fillStyle = "#BBB";
    ctxt.beginPath();
    ctxt.arc(
        cw/2 + Math.cos(c.angle) * REVOLVE_RADIUS, 
        ch/2 + Math.sin(c.angle) * REVOLVE_RADIUS,
        c.radius,
        0,
        2 * Math.PI
    );
    ctxt.fill();
}

function eraseAll(){
    ctxt.fillStyle = "black";
    ctxt.fillRect(0, 0, cw, ch);
}

function onDisplayChange(){
    cavnasObject.width = canvasWrapper.width();
    canvasObject.height = canvasWrapper.height();
    cw = canvasObject.width;
    ch = canvasObject.height;
}