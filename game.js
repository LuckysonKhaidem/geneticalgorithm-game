var canvas =document.getElementById("myCanvas");
var context = canvas.getContext("2d");
var score = 0


function Ball(x,y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.dx = 5;
    this.dy = -3;
}

function Bat(x,y,width,height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
}

Bat.prototype.move = function(dx) {
    if(dx < 0 && this.x + dx > 0)
        this.x += dx;
    else if (dx > 0 && this.x + this.width + dx < canvas.width)
        this.x += dx;


}




var leftPressed = false;
var rightPressed = false;

function drawBall(ball) {

    context.beginPath();
    context.arc(ball.x, ball.y, ball.radius,0, Math.PI*2);
    context.fillStyle = "blue";
    context.fill();
    context.closePath();
}

function drawBat(bat ) {
    context.beginPath();
    context.fillStyle = "red";
    context.fillRect(bat.x, bat.y, bat.width, bat.height);
    context.closePath();

}
function updateScoreDisplay() {
    var scoreSpan = document.getElementById("score");
    scoreSpan.firstChild.nodeValue = String(score);
}
function resetBall(ball) {

    ball.x = canvas.width / 2
    ball.y = canvas.height - 100
    ball.dx = 5;
    ball.dy = -3;
    leftPressed = false;
    rightPressed = false;
    score  = 0;
    updateScoreDisplay();
}

function updateBallDirection(ball,bat) {
    if( ball.x + ball.dx + ball.radius > canvas.width || ball.x - ball.radius + ball.dx < 0)
        ball.dx = -ball.dx;
   
 if(ball.y + ball.dy - ball.radius < 0)  //ball.y + ball.dy+ ball.radius > canvas.height
        ball.dy = -ball.dy;

if(ball.y + ball.radius > canvas.height){
    confirm(`Your score is ${score}. Do you want to restart?`);
    resetBall(ball);
    }

    if(ball.y + ball.dy + ball.radius > canvas.height - bat.height && ball.x >= bat.x && ball.x <= bat.x + bat.width){
        score++;   
        updateScoreDisplay();
        ball.dy =  -ball.dy
    }

}


function moveBat(bat) {
    if(leftPressed) bat.move(-10);
    else if(rightPressed) bat.move(10);

}
// var ball  = new Ball(canvas.width / 2, canvas.height - 100,10);
var bat = new  Bat((canvas.width - 75)/ 2, canvas.height - 20, 75, 10);

var balls = [new Ball(canvas.width / 2, canvas.height - 100,10),new Ball(canvas.width / 2 - 30, canvas.height - 20,10),]


function keyDownHandler(e) {
    if(e.keyCode == 37) leftPressed = true;
    else if(e.keyCode == 39) rightPressed =true;
}

function keyUpHandler(e) {
    if(e.keyCode == 37) leftPressed = false;
    else if(e.keyCode == 39) rightPressed =false;
}

window.addEventListener("keydown", keyDownHandler, false);
window.addEventListener("keyup", keyUpHandler, false);


function draw() {
    context.clearRect(0,0,canvas.width, canvas.height);
    drawBat(bat);
    balls.forEach(function(ball){
        drawBall(ball);
        updateBallDirection(ball,bat);
    })

    moveBat(bat);
    balls.forEach(function(ball){
        ball.x += ball.dx;
        ball.y += ball.dy;
    })
    
    requestAnimationFrame(draw)
}

// controls
// var leftButton = document.getElementById("left-button");
// var rightButton = document.getElementById("right-button");

// leftButton.onmousedown = () => {
//     bat.move(-10);
// }
// rightButton.onmousedown= () => {
//     bat.move(10);
// }



requestAnimationFrame(draw)