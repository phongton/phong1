const GAMEBOARD_WIDTH = 500;
const GAMEBOARD_HEIGHT = 500;
const ORIENTATION_LEFT = "left";
const ORIENTATION_RIGHT = "right";
const ORIENTATION_UP = "up";
const ORIENTATION_DOWN = "down";
const CAR_WIDTH = 59;
const CAR_HEIGHT = 86;
const DEFAULT_CAR_X_POSITION = 100;
const DEFAULT_CAR_Y_POSITION = 100;
const DEFAULT_CAR_ORIENTATON = ORIENTATION_UP
const DEFAULT_CAR_SPEED = 20;

class Car {
  constructor() {
    this.width = CAR_WIDTH;
    this.height = CAR_HEIGHT
    this.xPosition = DEFAULT_CAR_X_POSITION;
    this.yPosition = DEFAULT_CAR_Y_POSITION;
    this.orientation = DEFAULT_CAR_ORIENTATON;
    this.speed = DEFAULT_CAR_SPEED;
    this.step = 1;

  }

  buildImage() {
    this.image = this.orientation + this.step + ".png";

  }



  Move() {
    switch (this.orientation) {
      case ORIENTATION_DOWN:
        this.yPosition += this.speed;
        break;
      case ORIENTATION_UP:
        this.yPosition -= this.speed;
        break;
      case ORIENTATION_LEFT:
        this.xPosition += this.speed;
        break;
      case ORIENTATION_RIGHT:
        this.xPosition -= this.speed;
        break;
    }
    this.buildImage();
    if (this.step === 2) {
      this.step = 1;
    } else {
      this.step = 2;
    }
  }

  Show(ctx) {
    let image = new Image();
    let xPosition = this.xPosition;
    let yPosition = this.yPosition;
    image.onload = function () {
      ctx.drawImage(image, xPosition, yPosition,AUTO_WIDTH,AUTO_HEIGHT)
    }
    image.src = '/img.png/' + this.image;

  }

}

class GameBoard {
  car = new Car();
  ctx = undefined;

  Start() {
    this.ctx = document.getElementById("map").getContext("2d");
    this.car.show(this.ctx)
  }

  Render() {
    this.ctx.clearRect(0, 0, GAMEBOARD_WIDTH, GAMEBOARD_HEIGHT);
    this.car.Show(this.ctx);
  }


  MoveCar(event) {
    let orientation = 0;
    switch (event.which) {
      case 37:
        orientation = ORIENTATION_LEFT;
        break;
      case 38:
        orientation = ORIENTATION_UP;
        break;
      case 39:
        orientation = ORIENTATION_RIGHT;
        break;
      case 40:
        orientation = ORIENTATION_DOWN;
        break;

    }
    if (orientation) {
      if (this.car.orientation !== orientation) {
        this.car.orientation = orientation;
      } else {
        this.car.Move();
      }
      this.Render();
    }
  }
}

let gameBoard = new GameBoard();
gameBoard.Start();


