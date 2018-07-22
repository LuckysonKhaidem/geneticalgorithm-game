function Ball(x,y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.dy = -10;
}


Ball.prototype.move = function() {
    this.y += this.dy;
    this.leftY = this.y - this.radius;

}