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

  //randomize the step size of the enemy per frame
  //speed up all the enemies by increasing gameLevel
  setRandomStep() {
    this.step = Math.random() * gameLevel + 1;
  }

  //randomize the point enemy will start movin
  setRandomOffsetX() {
    this.x = Math.random() * -500;
  }

  //randomize the row on which the enemy will be moving
  setRandomRow() {
    this.y = 60 + 85 * Math.floor(Math.random() * 3);
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
    //move up and down step sizes
    this.horizontalMove = 100;
    this.verticalMove = 85;
  }

  update(dt) {
    this.checkWin();
  }

  //Check if player successfuly crossed the board
  checkWin() {
    if(this.y < 0){
    score += 10;
    this.startOver();
    }
    //Check if it is GameOver
    if (score === winningScore) {
      modalText.innerText = 'You won!';
      modal.classList.toggle("opened");
      resetGame();
    }
  }

  //Put player at the starting position
  startOver() {
    this.x = 200;
    this.y = 405;
  }

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

 //Functions moving player up, down, right and left
  moveUp(){
    if (this.y >= 0) {
      this.y -= this.verticalMove;
    }
  }

  moveDown(){
    if (this.y <= 320) {
      this.y += this.verticalMove;
    }
  }

  moveRight(){
    if (this.x <= 300) {
      this.x += this.horizontalMove;
    }
  }

  moveLeft(){
    if (this.x >= 0) {
      this.x -= this.horizontalMove;
    }
  }

  handleInput(key) {

    //handle move up (check if up canvas border reached)
    if (key == 'up'){
      this.moveUp();
    }
    //handle move down (check if down canvas border reached)
    if (key == 'down'){
      this.moveDown();
    }

    //handle move left (check left canvas border reached)
    if (key == 'left') {
      this.moveLeft();
    }
    //handle move right (check right canvas border reached)
    if (key == 'right') {
      this.moveRight();
    }
  }
}

//Reset Game
function resetGame(){
   score = 0;
   player.startOver();
 }

//Game level - enemies speed factor
const gameLevel = 5;
//Points to win - number of points to win the game
const winningScore = 100;
//Game score
let score = 0;

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


// Get the modal
const modal = document.getElementById('myModal');
// Get the modal text
const modalText = document.getElementById('modal-text');
// Get the <span> element that closes the modal
const close = document.getElementsByClassName("close")[0];
// Get the play again button element
const play = document.querySelector('.button');

// When the user clicks on <close> (x), close the modal
close.addEventListener("click", function() {
  modal.classList.toggle("opened");
});

play.addEventListener("click", function() {
  modal.classList.toggle("opened");
});

// When the user clicks anywhere outside of the modal, close it
window.addEventListener("click", function(event) {
  if (event.target === modal) {
    modal.classList.toggle("opened");
  }
});
