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