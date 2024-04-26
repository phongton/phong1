const GAMEBOARD_WIDTH = 1200;
const GAMEBOARD_HEIGHT = 600;
const GAMEBOARD_OBSTACLES = 5;
const GAMEBOARD_DIAMOND = 5;

const ORIENTATION_LEFT = "left";
const ORIENTATION_RIGHT = "right";
const ORIENTATION_UP = "up";
const ORIENTATION_DOWN = "down";

const AUTO_WIDTH = 120; //3400
const AUTO_HEIGHT = 60; //1500

const BARRIER_WIDTH = 60; //512
const BARRIER_HEIGHT = 60; //512
const DIAMOND_WIDTH = 60; //512
const DIAMOND_HEIGHT = 60; //512


const DEFAULT_AUTO_X_POSITION = 0;
const DEFAULT_AUTO_Y_POSITION = 60;
const DEFAULT_AUTO_ORIENTATION = ORIENTATION_RIGHT;

const DEFAULT_AUTO_SPEED = 30;
let totalBarrier = [];
let totalDiamond = []
let barrier = undefined;
let diamond = undefined;
let point = 0
let Car = function () {
  this.height = AUTO_HEIGHT;
  this.width = AUTO_WIDTH;
  this.xPosition = DEFAULT_AUTO_X_POSITION;
  this.yPosition = DEFAULT_AUTO_Y_POSITION;
  this.orientation = DEFAULT_AUTO_ORIENTATION;
  this.speed = DEFAULT_AUTO_SPEED;
  this.buildImage = function () {
    this.image = this.orientation + '.png';
  }
  this.buildImage();
  this.move = function () {
    switch (this.orientation) {
      case ORIENTATION_LEFT:
        this.xPosition -= this.speed;
        break;
      case ORIENTATION_UP:
        this.yPosition -= this.speed;
        break;
      case ORIENTATION_RIGHT:
        this.xPosition += this.speed;
        break;
      case ORIENTATION_DOWN:
        this.yPosition += this.speed;
        break;
    }
    this.buildImage();
  }
  this.show = function (ctx) {
    let image = new Image();
    let xPosition = this.xPosition;
    let yPosition = this.yPosition;
    image.onload = function () {
      ctx.drawImage(image, xPosition, yPosition, AUTO_WIDTH, AUTO_HEIGHT);
    };
    image.src = './img.png/' + this.image;
  }

}
let Barrier = function () {
  this.height = BARRIER_HEIGHT;
  this.width = BARRIER_WIDTH;
  this.xPosition = 0;
  this.yPosition = 0;
  this.show = function (ctx) {
    let image = new Image();
    let xPosition = this.xPosition;
    let yPosition = this.yPosition;
    image.onload = function () {
      ctx.drawImage(image, xPosition, yPosition, BARRIER_WIDTH, BARRIER_HEIGHT);
    };
    image.src = './vacham/vacham.png';
  }
}

function createBarrier() {
  let ctx = document.getElementById('gameCanvas').getContext('2d');
  barrier = new Barrier();
  barrier.xPosition = (Math.floor(Math.random() * (GAMEBOARD_WIDTH / BARRIER_WIDTH - 4)) + 2) * BARRIER_WIDTH;
  barrier.yPosition = (Math.floor(Math.random() * (GAMEBOARD_HEIGHT / BARRIER_HEIGHT - 4)) + 2) * BARRIER_HEIGHT;
  barrier.show(ctx);
  totalBarrier.push(barrier);
}

let Diamond = function () {
  this.height = DIAMOND_HEIGHT;
  this.width = DIAMOND_WIDTH;
  this.xPosition = 0;
  this.yPosition = 0;
  this.show = function (ctx) {
    let image = new Image();
    let xPosition = this.xPosition;
    let yPosition = this.yPosition;
    image.onload = function () {
      ctx.drawImage(image, xPosition, yPosition, DIAMOND_WIDTH, DIAMOND_HEIGHT);
    };
    image.src = './thuong/thuong.png';
  }
};

function createDiamond() {
  let ctx = document.getElementById('gameCanvas').getContext('2d');
  diamond = new Diamond();
  diamond.xPosition = (Math.floor(Math.random() * (GAMEBOARD_WIDTH / BARRIER_WIDTH - 4)) + 2) * BARRIER_WIDTH;
  diamond.yPosition = (Math.floor(Math.random() * (GAMEBOARD_HEIGHT / BARRIER_HEIGHT - 4)) + 2) * BARRIER_HEIGHT;
  diamond.show(ctx);
  totalDiamond.push(diamond);
}

function isCrash(obj, arr) {
  for (let i = 0; i < arr.length; i++) {
    if ((arr[i].xPosition <= obj.xPosition + obj.width)
      && (arr[i].xPosition + arr[i].height >= obj.xPosition)
      && (arr[i].yPosition <= obj.yPosition + obj.height)
      && (arr[i].yPosition + arr[i].height >= obj.yPosition)
    ) {
      return i
    }
  }
  return -1
}

function GameBoard() {
  totalBarrier = [];
  totalDiamond = []
  this.car = new Car();
  this.ctx = undefined;
  this.start = function () {
    this.ctx = document.getElementById('gameCanvas').getContext('2d');
    this.car.show(this.ctx);
    for (let i = 0; i < GAMEBOARD_OBSTACLES; i++) {
      createBarrier()
    }
    for (let i = 0; i < GAMEBOARD_DIAMOND; i++) {
      createDiamond()
    }
  };
  this.render = function () {
    this.ctx.clearRect(0, 0, GAMEBOARD_WIDTH, GAMEBOARD_HEIGHT);
    for (let i = 0; i < totalBarrier.length; i++) {
      totalBarrier[i].show(this.ctx)
    }
    for (let i = 0; i < totalDiamond.length; i++) {
      totalDiamond[i].show(this.ctx)
    }
    this.car.show(this.ctx);
  };
  this.moveCar = function (event) {
    let orientation = '';
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
    if (isCrash(this.car, totalBarrier) !== -1 || totalDiamond.length === 0) {
      alert('Trò chơi kết thúc : ' + point)
    } else {
      if (isCrash(this.car, totalDiamond) !== -1) {
        point++;
        totalDiamond.splice(isCrash(this.car, totalDiamond), 1);
      }
      if (orientation) {
        if (this.car.orientation !== orientation) {
          this.car.orientation = orientation;
        } else {
          this.car.move();
        }
        this.render();
      }
      this.render()

    }
    document.getElementById('result').innerHTML = 'Điểm số: ' + point;
    if (point === 5) {
      document.getElementById('conText').innerHTML ='Chúc mừng bạn đã chiến thắng !<3';
    }
  }
}
let gameBoard = new GameBoard();
gameBoard.start()
