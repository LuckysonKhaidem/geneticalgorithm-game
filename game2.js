var canvas =document.getElementById("myCanvas");
var context = canvas.getContext("2d");
var distance = 0
var controlSequence = ['L' , 'L', 'R', 'R', 'R' , 'R' , 'U', 'U','U', 'D']
var moveIndex = 0;
var generation = 1;

function drawBall(ball) {

    context.beginPath();
    context.arc(ball.x, ball.y, ball.radius,0, Math.PI*2);
    context.fillStyle = "blue";
    context.fill();
    context.closePath();
}

function drawStartRegion() {
    context.beginPath();
    context.fillStyle = "yellow";
    context.fillRect(0,0,50, canvas.height);
    context.closePath();
}

function drawEndRegion() {
    context.beginPath();
    context.fillStyle = "pink";
    context.fillRect(canvas.width - 50,0, 50, canvas.height);
    context.closePath();
}

function drawPlayer(player) {
    context.beginPath();
    context.fillStyle = "red";
    context.fillRect(player.x , player.y, player.width, player.height);
    context.closePath();

}

function updateBallDirection(ball) {
    if(ball.y - ball.radius + ball.dy <= 0 || ball.y + ball.radius + ball.dy >= canvas.height)
        ball.dy = -ball.dy;

}

function initializeBalls() {
    var balls =[]
    for(var i = 1; i <= 8;i++) {
        var ball = new Ball(i*50  + 80, canvas.height / 2, 10)  
        if(i % 2)
            ball.dy = -ball.dy
        balls.push(ball);
    }
  
    return balls;
}


function movePlayer(player) {

    // if(controller.leftPressed) player.moveX(-5);
    // if(controller.rightPressed) player.moveX(5);
    // if(controller.upPressed) player.moveY(-5);
    // if(controller.downPressed) player.moveY(5);

    var direction = player.getCurrentMove();
    player.moveX(direction[0]);
    player.moveY(direction[1]);
    
}



function checkCollision(ball, player) {
   
    var centerDistance =  Math.sqrt( (ball.x - player.centerX)*(ball.x - player.centerX) + (ball.y - player.centerY) * (ball.y - player.centerY))
    return centerDistance <= (ball.radius + player.width/2 + 1);
            
}

function resetBallsPositions(balls) {
    console.log(balls);
    for(var i = 1; i <= 8;i++) {
       
        balls[i-1].x = i*50  + 80
        balls[i-1].y = canvas.height / 2
        balls[i-1].dy = -10;
        if(i% 2)
            balls[i-1].dy = -balls[i-1].dy

    }
   
}


function calcuateDistanceFromEndRegion(player) {
    var distance =  (canvas.width - 50) - player.x - player.width; 
    return distance;
}
function updateDeadCountDisplay() {
    var displaySpan = document.getElementById("deadCount");
    displaySpan.firstChild.nodeValue = ai.deadCount;

}
function updateGenerationDisplay(generation) {
    var displaySpan = document.getElementById("generation");
    displaySpan.firstChild.nodeValue = generation;
}
function updateBestFitnessDisplay(bestFitness) {
    var displaySpan = document.getElementById("bestFitness");
    displaySpan.firstChild.nodeValue = bestFitness;
}

function draw() 
{
    context.clearRect(0,0,canvas.width, canvas.height);
    drawStartRegion();
    drawEndRegion();
    updateDeadCountDisplay();

    ai.population.forEach(function(player) {    
        if(!player.dead) {
            var distance = calcuateDistanceFromEndRegion(player);
            if(distance <= -5 && !player.done ){
                player.done = true;
                ai.doneCount++;
                console.log("Done count "+ ai.doneCount);
            }
            player.fitness = distance
            if(!player.done)
                movePlayer(player);
            drawPlayer(player);
        }
    });

    balls.forEach(function(ball) {
        drawBall(ball)
        updateBallDirection(ball);
        ai.population.forEach(function(player){
            if(checkCollision(ball,player)) {
                player.dead = true;
                ai.deadCount += 1;
                player.centerX = -1;
                player.centerY = -1;
                player.x = -1;
                player.y = -1;
            }

        });
        
        ball.move();
    })

    if(ai.isGenerationOver()) {

        var bestFitness = ai.findBestFitness();
        generation++;
        updateBestFitnessDisplay(bestFitness);
        updateGenerationDisplay(generation);
        ai.selection();
        // console.log("after selecetion "+ ai.population);
        ai.crossover();
        ai.mutation();
        ai.resetPopulationPositions();
      
        ai.deadCount = 0;
        ai.doneCount = 0;

        resetBallsPositions(balls);
    
       
    }
  
    requestAnimationFrame(draw)

}


var balls = initializeBalls();
var player = new Player(10, canvas.height / 2, 20, 20);
var controller = new Controller();
var ai = new AI();

ai.initializePopulation();
console.log(ai.population);

window.addEventListener("keydown", keyDownHandler, false)
window.addEventListener("keyup", keyUpHandler,false)

function keyDownHandler(e) {
    if(e.keyCode == 37) controller.leftPressed = true;
    else if(e.keyCode == 38) controller.upPressed = true;
    else if(e.keyCode == 39) controller.rightPressed = true;
    else if(e.keyCode == 40) controller.downPressed = true;
}
function keyUpHandler(e) {
    if(e.keyCode == 37) controller.leftPressed = false;
    else if(e.keyCode == 38) controller.upPressed = false;
    else if(e.keyCode == 39) controller.rightPressed = false;
    else if(e.keyCode == 40) controller.downPressed = false;

}



requestAnimationFrame(draw);




