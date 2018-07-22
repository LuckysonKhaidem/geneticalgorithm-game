function Controller() {
    this.leftPressed = false;
    this.rightPressed = false;
    this.downPressed = false;
    this.upPressed = false;
}

Controller.prototype.reset = function() {
    this.leftPressed = false;
    this.rightPressed = false;
    this.downPressed = false;
    this.upPressed = false;
}