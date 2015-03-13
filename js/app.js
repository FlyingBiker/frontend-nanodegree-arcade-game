// Enemies our player must avoid
var Enemy = function(locy) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = -101;
    if(locy === 0) {
        this.y = 63;
    }
    else {
        this.y = 63 + locy * 83;
    }
    this.speed = this.howFast();

    return this;
};

//Randomly generate enemy speed
//Found this at http://www.javascriptkit.com/javatutors/randomnum.shtml
Enemy.prototype.howFast = function() {
    var speed = Math.floor(Math.random()*150 + 250);
    return speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    this.x += (this.speed * dt);

    // Restarts bug when it moves off the canvas
    if(this.x > 500){
        this.x = -101;
        this.speed = this.howFast();

        var loc = Math.floor(Math.random()*3);
        if(loc === 0){
            this.y = 63;
        }
        else if(loc === 1){
            this.y = 146;
        }
        else {
            this.y = 229;
        }
    }

    // Reset player if collision with enemy
    if(player.x < this.x + 65 && player.x + 50 > this.x && player.y < this.y + 60 && player.y + 60 > this.y){
        player.x = 201;
        player.y = 405;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(locx, locy){
    this.sprite = 'images/char-boy.png';
    this.x = locx;
    this.y = locy;

    this.moveX = 0;
    this.moveY = 0;

    return this;
};

// Move player based on inputs
Player.prototype.update = function() {

    this.x += this.moveX;
    this.y += this.moveY;

    //Prevents player from moving off the canvas
    if(this.x > 401){
        this.x = 401;
    }
    else if(this.x < 1){
        this.x = 1;
    }
    else if(this.y > 405){
        this.y = 405;
    }
    else if(this.y < 1){
        player.x = 201;
        player.y = 405;
    }

    this.moveX = 0;
    this.moveY = 0;
};

// Draw the player
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Check if up, down, left or right arrows keys were pressed
Player.prototype.handleInput = function(move) {

    if(move === "up"){
        this.moveY = -83;
    }
    else if(move === "down"){
        this.moveY = 83;
    }
    else if(move === "right"){
        this.moveX = 100;
    }
    else if(move === "left"){
        this.moveX = -100;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [];

for(var enemyId = 0; enemyId < 3; enemyId++) {
    allEnemies.push(new Enemy(enemyId));
}

var player = new Player(201, 405);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
