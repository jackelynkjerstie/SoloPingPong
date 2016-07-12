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
//    console.log("cursor x is:" + mouseObj.x + "cursor y is:" + mouseObj.y);
}
gameCanvas.addEventListener("mousemove", trackPosition, true);

//Step Three..jkh..place a ball on the canvas
var ball={}; //ball object -- curly brackets
ball = {
    x: 50,
    y: 50,
    r: 10,
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

//Step six...jkh...place paddles top and bottom on canvas

function paddlePosition(TB) {
    this.w = 150;
    this.h = 5;
    
    this.x = W/2 - this.w/2;
    
    if(TB == "top"){
        this.y = 0;
    } else {
        this.y = H - this.h;
    }
}
var paddlesArray = []; //Paddles array
paddlesArray.push(new paddlePosition("top"));
paddlesArray.push(new paddlePosition("bottom"));
//console.log("top paddle y is: " + paddlesArray[0].y);
//console.log("bottom paddle y is: " + paddlesArray[1].y);

function paintPaddles(){
    for(var lp = 0; lp < paddlesArray.length; lp++){
        p = paddlesArray[lp];
        
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(p.x, p.y, p.w, p.h);
        
    }
}
paintPaddles();

//step seven..jkh..detect when the user clicks on the screen

gameCanvas.addEventListener("mousedown", btnClick, true);

function btnClick(evt){
    var mx = evt.pageX;
    var my = evt.pageY;
    
    //user clicked start button
    if (mx >= startBtn.x && mx <= startBtn.x + startBtn.w){
       if (my >= startBtn.y && startBtn.y + startBtn.h){
//           console.log ("start button clicked");
           //delete the start button
           startBtn = {};
           
           //start game
           animloop();
       } 
    }
}

//function for running the whole game animation
var init; //variable to initialize animation
function animloop(){
    init = requestAnimFrame(animloop);
    refreshCanvasFun();
    
}

//step eight ..jkh.. draw everything on canvas over and over again
function refreshCanvasFun(){
    paintCanvas();
    paintScore();
    paintPaddles();
    ball.draw();
    update();
}

function update(){
    //move the paddles, track the mouse
    for (var lp = 0; lp < paddlesArray.length; lp++){
        p = paddlesArray[lp];
        p.x = mouseObj.x - p.w/2;  
    }
    //move the ball
    ball.x += ball.vx;
    ball.y += ball.vy;
    //check for ball paddle collision
    checkCollision();
}

function checkCollision(){
    var pTop = paddlesArray[0];
    var pBot = paddlesArray[1];
    
    if(collides(ball, pTop)){
        collideAction(ball, pTop);
    } else if(collides(ball, pBot)) {
        collideAction(ball, pBot);
    } else {
        //ball goes off top or bottom of screen 
        if(ball.y + ball.r > H){
            //game over 
        }else if(ball.y < 0){
            //game over 
        }//ball hits side
            if(ball.x + ball.r > W){
                ball.vx = -ball.vx;
                ball.x = W - ball.r;
            }else if(ball.x - ball.r < 0){
                ball.vx = -ball.vx;
                ball.x = ball.r;
            }      
        }
    }

var paddleHit; //which paddle was hit 0=top 1=bottom 
function collides(b, p){
    if(b.x + b.r >= p.x && b.x - b.r <= p.x + p.w){
        if(b.y >= (p.y - p.h)&& p.y > 0){
            paddleHit = 0;
            return true;
        }else if(b.y <= p.h && p.y === 0){
            paddleHit = 1;
            return true;
        }else{
            return false;
        }
    }
}

var collisionSound = document.getElementById("collide");
function collideAction(b, p){
//    console.log("sound and then bounce");
    if (collisionSound){
    collisionSound.play();
    }
    //reverse ball y velocity
    ball.vy = -ball.vy;
    //increase score by 1
    points++;
}
    
















