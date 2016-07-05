// RequestAnimFrame: a browser API for getting smooth animations

window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
            return window.setTimeout(callback, 1000 / 60);
        };
})();
//animation will occur at 60 fps if the browser can handle it
window.cancelRequestAnimFrame = (function () {
    return window.cancelAnimationFrame ||
        window.webkitCancelRequestAnimationFrame ||
        window.mozCancelRequestAnimationFrame ||
        window.oCancelRequestAnimationFrame ||
        window.msCancelRequestAnimationFrame ||
        clearTimeout;
})();
//DO NOT TOUCH CODE ABOVE

//console.log('Holla');

//Step 01 ..jkh.. create game canvas and track mouse position
var gameCanvas = document.getElementById("canvas");
//store html5 canvas tag into a JS variable

var ctx = gameCanvas.getContext("2d"); //create context 2D
var W = window.innerWidth;
var H = window.innerHeight;

var mouseObj = {};
//curly brackets for objects

//console.log(W);
//console.log(H);
//sets width and height of canvas to the browser size

gameCanvas.width = W;
gameCanvas.height = H;

//Step Two..jkh..Clear page canvas by covering it with black
function paintCanvas() {
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, W, H);
}
paintCanvas();

//mouse movement x,y
function trackPosition(evt) {
    mouseObj.x = evt.pageX;
    mouseObj.y = evt.pageY;
    console.log("cursor x is:" + mouseObj.x + "cursor y is:" + mouseObj.y);
}
gameCanvas.addEventListener("mousemove", trackPosition, true);

//Step Three..jkh..place a ball on the canvas
var ball={}; //ball object -- curly brackets
ball = {
    x: 50,
    y: 50,
    r: 15,
    c: "#ffffff",
    vx: 4, //velocity x
    vy: 8, //velocity y
    
    draw: function(){
        ctx.beginPath();
        ctx.fillStyle = this.c;
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
        ctx.fill();
    }
}
ball.draw(); //calls the ball function creates the ball

//Step Four..jkh..Place a start button on the canvas
var startBtn ={}; //start button object
startBtn = {
    w: 100,
    h: 50,
    x: W / 2 - 50,
    y: H / 2 - 25,
    
    draw: function(){
        ctx.strokeStyle = "#FFFFFF";
        ctx.lineWidth = "2";
        ctx.strokeRect(this.x, this.y, this.w, this.h);
        
        ctx.font = "18px Arial, sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "#FFFFFF";
        ctx.fillText("Start", W / 2, H / 2);
    }
}
startBtn.draw();

//Step Five..jkh..placing score and points on canvas
var points = 0; // game points
function paintScore(){
    ctx.fillStyle = "#ffffff";
    ctx.font = "18px Arial, sans-serif";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText("Score: " + points, 20, 20);
    
}
paintScore();















