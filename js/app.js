// Enemies our player must avoid
class Enemy {
    constructor(x, y, speed) {
        // Variables applied to each of our instances go here
        this.x = x;
        this.y = y;
        this.speed = speed;

        // The image/sprite for our enemies, this uses
        // a helper we've provided to easily load images
        this.sprite = 'images/enemy-bug-blue.png';
    }

    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
        this.x += this.speed * dt;

        // if bugs went out of the screen, resetting it to move again
        if (this.x > 909) {
            this.x = -50;
            this.speed = 100 + Math.floor(Math.random() * (500 - 200) + 200);
        }

        if (player.x < this.x + 60 && player.x + 37 > this.x && player.y < this.y + 25 && 30 + player.y > this.y) {
            player.x = 400;
            player.y = 392;
            lives--;
            $("#lives").html("Lives:" + lives);

            if (lives === 0) {
                alert("Game Over");
                location.reload();
            }
        }
    }
    // Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

// Player class
// This class requires an update(), render() and
// a handleInput() method.
class Player extends Enemy {
    constructor(x, y) {
        super();
        this.x = x;
        this.y = y;
        this.sprite = 'images/char-boy.png';
    }

    update() {
        if (this.x < 0) {
            this.x = 0;
        } else if (this.x > 800) {
            this.x = 800;
        } else if (this.y > 392) {
            this.y = 392;
        } else if (this.y < 0) {
            this.x = 400;
            this.y = 392;
            score += 10;
            $("#score").html("Scores:" + score);
        }
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    handleInput(key) {
        switch (key) {
            case "left":
                this.x -= 101;
                break;
            case "right":
                this.x += 101;
                break;
            case "up":
                this.y -= 83;
                break;
            case "down":
                this.y += 83;
                break;
        }
    }
}

class Gem extends Player {
    constructor(x, y) {
        super();
        this.x = x;
        this.y = y;
        this.sprite = 'images/Gem Blue.png';
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    update() {
        if (player.x < this.x + 50 && player.x + 50 > this.x && player.y < this.y + 50 && 50 + player.y > this.y) {
            gem.splice(0, 1);
            score += 50;
            $("#score").html("Scores:" + score);
            gemf();
        }
    }
}

var score = 0;
var lives = 5;

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
let allEnemies = [];
var enemyPosition = [60, 143, 226, 309];
var enemy;

enemyPosition.forEach(function(Y) {
    enemy = new Enemy(-50, Y, 100 + Math.floor(Math.random() * (500 - 200) + 200));
    allEnemies.push(enemy);
});


// Place the player object in a variable called player
let player = new Player(400, 392);

let gem = [];

function gemf() {
    var gems = 1;
    for (var i = 0; i < gems; i++) {
        gem.push(new Gem(Math.floor(Math.random() * 800), Math.floor(Math.random() * (309 - 60) + 60)));
    }
}
gemf();

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