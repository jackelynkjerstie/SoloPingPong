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
    r: 5,
    c: "#ffffff",
    vx: 8, //velocity x
    vy: 4, //velocity y
    
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
    y: H / 2 - 150,
    
    draw: function(){
        ctx.strokeStyle = "#FFFFFF";
        ctx.lineWidth = "2";
        ctx.strokeRect(this.x, this.y, this.w, this.h);
        
        ctx.font = "18px Arial, sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "#FFFFFF";
        ctx.fillText("Start", W / 2, H / 2 - 125);
    }
}
startBtn.draw();

var instructions = {};
instructions = {
    draw: function(){
        ctx.font = "18px Arial, sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "#FFFFFF";
        ctx.fillText("Move the paddles to bounce the ball.", W/2, H/2);
    }
    
}
instructions.draw();

//Step Five..jkh..placing score and points on canvas
var points = 0; // game points
function paintScore(){
    ctx.fillStyle = "#ffffff";
    ctx.font = "18px Arial, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.fillText("Score: " + points, W/2, 20);
    
}
paintScore();

//Step six...jkh...place paddles top and bottom on canvas
var paddleHeight = 150;
function paddlePosition(TB) {
    this.h = paddleHeight;
    this.w = 5;
    
    this.x = H/2 - this.h/2;
    
    if(TB == "top"){
        this.x = 0;
    } else {
        this.x = W - this.w;
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
        if(lp == 0){
            ctx.fillStyle = "#FE5F55";
            ctx.fillRect(p.x, p.y, p.w, paddleHeight);

        }else{
            ctx.fillStyle = "#9381FF";
            ctx.fillRect(p.x, p.y, p.w, paddleHeight);

        }
       
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
       if (my >= startBtn.y && my <= startBtn.y + startBtn.h){
//           console.log ("start button clicked");
           //delete the start button
           startBtn = {};
           
           //start game
           animloop();
       } 
    }
if (flagGameOver == 1){
   if (mx >= restartBtn.x && mx <= restartBtn.x + restartBtn.w){
       if (my >= restartBtn.y && restartBtn.y + restartBtn.h){
           //reset my game
           points = 0;
           ball.x = 50; //reset ball location when game is restarted
           ball.y = 50;
           ball.vx = 8;
           ball.vy = 4;
           
           flagGameOver = 0;
           //start game
           animloop();
          
       } 
    }        
}    
}

//function for running the whole game animation
var init; //variable to initialize animation
function animloop(){
    init = requestAnimFrame(animloop);
    refreshCanvasFun(); //used to make the canvas update and work
    
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
        p.y = mouseObj.y - p.h/2;  
    }
    paddlePosition();
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
        if(ball.x + ball.r > W){
            //game over 
            gameOver();
        }else if(ball.x < 0){
            //game over
            gameOver();
        }//ball hits side
            if(ball.y + ball.r > H){
                ball.vy = -ball.vy;
                ball.y = H - ball.r;
            }else if(ball.y - ball.r < 0){
                ball.vy = -ball.vy;
                ball.y = ball.r;
            }      
        }
    //sparkles
    if (flagCollision == 1){
        for(var k = 0; k < particleCount; k++){
            particles.push(new createParticles(particlePos.x, particlePos.y, particleDir));
        }
    }
    //emit particles 
    emitParticles();
    //reset of flag collision 
    flagCollision = 0;
    }

function createParticles(x, y, d) {
    this.x = x || 0;
    this.y = y || 0;
    
    this.radius = 2;
    
    this.vy = -1.5 + Math.random()*3;
    this.vx = d * Math.random()*1.5;
}

function emitParticles(){
    for(var j = 0; j < particles.length; j++){
        par = particles[j];
        
        ctx.beginPath();
        ctx.fillStyle = 'rgb(' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ')';
        // I read this about random color generation http://www.paulirish.com/2009/random-hex-color-code-snippets/
        if(par.radius > 0){
            ctx.arc(par.x, par.y, par.radius, 0, Math.PI*2, false); // makes particle
        }
        ctx.fill();
        
        par.x += par.vx;
        par.y += par.vy;
        
        //reduce particle size
        par.radius = Math.max(par.radius - 0.05, 0.0);
    }
}


var paddleHit; //which paddle was hit 0=top 1=bottom 
function collides(b, p){
    if(b.y + b.r >= p.y && b.y - b.r <= p.y + p.h){
        if(b.x >= (p.x - p.w)&& p.x > 0){
            paddleHit = 0;
            return true;
        }else if(b.x <= p.w && p.x === 0){
            paddleHit = 1;
            return true;
        }else{
            return false;
        }
    }
}

var collisionSound = document.getElementById("collide");
function collideAction(b, p){
   
//    console.log("sound and then bounce"); //used to make sure the function is being called
    if (collisionSound){
    collisionSound.play();
    }
    
    //reverse ball y velocity
    ball.vx = -ball.vx;
    
    //Sparkles
    if(paddleHit == 0){
       //ball hit top paddle 
        ball.x = p.x - p.w;
        particlePos.x = ball.x + ball.r;
        particleDir = -1;
        
    }else if(paddleHit == 1){
       //ball hit bottom paddle 
        ball.x = p.x + ball.r;
        particlePos.x = ball.x - ball.r + 5;
        particleDir = 1;
    }
    
    //increase score by 1
    points++;
    
    increaseSpd();
    
    //sparkles
    particlePos.y = ball.y;
    
    flagCollision = 1;
    
}

var flagCollision = 0; //when ball collides with paddle for particles
var particles = []; // array for particles 
var particlePos = {}; //object to contain the position of collision
var particleDir = 1; // va to control the direction of the particles
var particleCount = 20; // number of particles


function increaseSpd(){
//increase ball speed when after every four points
    if (points % 4 === 0){
        if(Math.abs(ball.vx) < 15){
    
        ball.vx += (ball.vx < 0) ? -1 : 1;
        ball.vy += (ball.vy < 0) ? -2 : 2;
       
        }
        if (paddleHeight > 40){
            paddleHeight = paddleHeight - 5;
    
        }
    }
}




//Function for when the ball goes off the screen.
var flagGameOver = 0;
function gameOver() {
//    console.log('game is over'); //used to check that function is being called correctly
    //Display Final Score
    ctx.fillStyle = '#ffffff';
    ctx.font = '20px Arial, san-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText("Game Over - You Scored: " + points + " points!", W/2, H/2 + 25);
   
    //Stop the animation and game  
    cancelRequestAnimFrame(init);
    
    //Display replay button
    restartBtn.draw();
    
    //set the game over flag
    flagGameOver = 1;
    
}

var restartBtn ={}; //restart button object
restartBtn = {
    w: 100,
    h: 50,
    x: W / 2 - 50,
    y: H / 2 - 50,
    
    draw: function(){
        ctx.strokeStyle = "#FFFFFF";
        ctx.lineWidth = "2";
        ctx.strokeRect(this.x, this.y, this.w, this.h);
        
        ctx.font = "18px Arial, sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "#FFFFFF";
        ctx.fillText("Replay?", W / 2, H / 2 - 25);
    }
}


    
















