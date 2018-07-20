et modal = document.querySelector(".start-game");
let overlay = document.querySelector(".overlay");
let gameover = document.querySelector(".game-over");
let winnerModal = document.querySelector(".winner");


// start Game
function startGame(){
    modal.classList.add("hide");
    overlay.classList.add("hide");
}


// to run when player loses all lives
function gameOver() {
    overlay.classList.add("show");
    gameover.classList.add("show");
}

//reset game
function resetGame() {

    window.location.reload(true);
}

// when player gets to water and wins game
function gameWon() {
    overlay.classList.add("show");
    winnerModal.classList.add("show");

}

// Randomise Speed
function speedRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}


// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speedRandom(1, 5);
    this.height = 85;
    this.width = 50;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if(this.x > 600) {
        this.x = -100;
    } else {
        this.x += 100 * this.speed * dt;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y) {
    this.image = 'images/char-boy.png';
    this.x = x;
    this.y = y;
    this.height = 85;
    this.width = 50;
};


Player.prototype.update = function(dt) {
    return this.y;
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.image), this.x, this.y);
};

Player.prototype.handleInput = function(keyCode) {
    switch(keyCode) {
        case "up":
            if(this.y < 85) {
                gameWon();
            }
            else {
                this.y -= 85;
            }
        break;
        case "down":
            if(this.y < 390) {
                this.y += 85;
            }
        break;
        case "right":
            if(this.x < 400 ) {
                this.x += 100;
            }
        break;
        case "left":
            if(this.x > 0) {
                this.x -= 100;
            }
        break;
    }
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player



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