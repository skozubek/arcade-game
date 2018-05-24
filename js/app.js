// Enemies our player must avoid
//var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    //this.sprite = 'images/enemy-bug.png';
//};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
//Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
//};

// Draw the enemy on the screen, required method for game
//Enemy.prototype.render = function() {
//    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
//};

//Enemy in ES6 code
class Enemy {
  constructor(x = 100, y = 100, step = 1){
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.setRandomStep();
  }
  update(dt){
    this.x = this.x + this.step;
    //once enemy leaves canvas set new random step and position
    if (this.x > 450){
    //set random step
    this.setRandomStep();
    this.setRandomOffsetX();
    this.setRandomRow()
    }
  }

  setRandomStep() {
    this.step = Math.random() * gameLevel + 1;
  }

  setRandomOffsetX() {
    this.x = Math.random() * -500;
  }

  setRandomRow() {
    this.y = 60 + 85 * Math.floor(Math.random() * 3);
    console.log(this.y);
  }

  render(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

class Player {
  constructor(x = 200, y = 405) {
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
  }

  update(dt) {

  }

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

  handleInput(key) {
    const horizontalMove = 100;
    const verticalMove = 85;
    const borderLeft = 100;
    const borderRight = 300;
    const borderDown = 320;
    const borderUp = 0;

    //handle move up (check if up canvas border reached)
    if (key == 'up' && this.y >= borderUp) {
      this.y -= verticalMove;
    }
    //handle move down (check if down canvas border reached)
    if (key == 'down' && this.y <= borderDown) {
      this.y += verticalMove;
    }
    //handle move left (check left canvas border reached)
    if (key == 'left' && this.x >= borderLeft) {
      this.x -= horizontalMove;
    }
    //handle move right (check right canvas border reached)
    if (key == 'right' && this.x <= borderRight) {
      this.x += horizontalMove;
    }
    console.log(this.x+","+this.y)
  }
}
//Game level - enemies speed factor
let gameLevel = 4;
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

let enemy1 = new Enemy(-100, 60, 2);
let enemy2 = new Enemy(-500, 145, 3);
let enemy3 = new Enemy(-200, 230, 4);

let allEnemies=[enemy1, enemy2, enemy3];

let player = new Player();

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
