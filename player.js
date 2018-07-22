function Player(x,y,width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.centerX = x + width / 2;
    this.centerY = y + height / 2;
    this.fitness = 0;
    this.moves = []
    this.moveCount = 0;
    this.unitMoves = []
    this.dead = false;
    this.done = false;

}

Player.prototype.moveX = function(dx) {
    if((dx < 0 && this.x + dx >= 0) || (dx >0 && this.x + this.width + dx <= canvas.width)) {
        
        this.x += dx;
        this.centerX = this.x + this.width / 2;
   
    }   
}

Player.prototype.moveY = function(dy) {
    if((dy <0 && this.y + dy >= 0) || ( dy > 0 && this.y + this.height + dy <= canvas.height)) {
        this.y += dy;
        this.centerY = this.y + this.height / 2;
        
    }
       
}
Player.prototype.getRandomDirection = function() {
        var randomNumber = Math.floor(Math.random()*9)
        switch(randomNumber) {
           case 0:
            return [0, 5];
          case 1:
            return [5, 5];
          case 2:
            return [5, 0];
          case 3:
            return [5, -5];
          case 4:
            return [0, -5];
          case 5:
            return [-5, -5];
          case 6:
            return [-5, 0];
          case 7:
            return [-5, 5];
          case 8:
            return [0, 0];
        }
    }

Player.prototype.randomizeMoves = function(moveSteps) {
    for(var i =0 ; i < moveSteps;i++)
        this.unitMoves.push(this.getRandomDirection())
}

Player.prototype.getCurrentMove = function() {
    return this.moves[this.moveCount++];
}