const canvas = document.querySelector('.myCanvas');
const ctx = canvas.getContext('2d');
document.addEventListener('mousemove', mouseMoveHandler, false);

let x = canvas.width / 2;
let y = canvas.height - 30;

let dx = 2;
let dy = -2;
let ballRadius = 5;
let paddleHeight = 10;
let paddleWidth = 75;
let paddleX = canvas.width - paddleWidth;

let rigthPressed = false;
let leftPresssed = false;

let brickRowCount = 3;
let brickColumnCount = 5;
let brickWidth = 40;
let brickHeight = 10;
let brickPadding = 2;
let brickOffsetTop = 10;
let brickOffsetLeft = 50;

let bricks = [];

for (let c = 0; c < brickColumnCount; c++) {
  bricks[c] = [];
  for (let r = 0; r < brickRowCount; r++) {
    bricks[c][r] = { x: 0, y: 0, status: 1 };
  }
}
let score = 0;
let lives = 3;

function drawLives() {
  ctx.font = '13px, Arial';
  ctx.fillStyle = 'white';
  ctx.fillText('Lives :' + lives, canvas.width - 40, 10);
}

function mouseMoveHandler(event) {
  let relativeX = event.clientX - canvas.offsetLeft;
  if (relativeX > 0 && relativeX < canvas.width) {
    paddleX = relativeX - paddleWidth / 2;
  }
}

function collisionDetection() {
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      let b = bricks[c][r];
      if (b.status == 1) {
        if (
          x > b.x &&
          x < b.x + brickWidth &&
          y > b.y &&
          y < b.y + brickHeight
        ) {
          dy = -dy;
          b.status = 0;
          score++;
          if (score == brickRowCount * brickColumnCount) {
            alert(`🎉Winner! 👌😊🎉 you are score is : ${score}`);
            document.location.reload();
          }
        }
      }
    }
  }
}

function drawScore() {
  ctx.font = '10px Arial';
  ctx.fillStyle = 'white';
  ctx.fillText('score :' + score, 8, 10);
}

function drawBricks() {
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      if (bricks[c][r].status == 1) {
        let brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
        let brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fillStyle = 'green';
        ctx.fill();
        ctx.closePath();
      } else {
        ctx.fillStyle = 'brown';
        ctx.fill();
      }
    }
  }
}

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);

function keyDownHandler(event) {
  if (event.keyCode == 39) {
    rigthPressed = true;
  } else if (event.keyCode == 37) {
    leftPresssed = true;
  }
}

function keyUpHandler(event) {
  if (event.keyCode == 39) {
    rigthPressed = false;
  } else if (event.keyCode == 37) {
    leftPresssed = false;
  }
}

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = 'red';
  ctx.fill();
  ctx.closePath();
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = 'blue';
  ctx.fill();
  ctx.closePath();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  drawPaddle();
  drawBricks();
  collisionDetection();
  drawScore();
  drawLives();
  y += dy;
  x += dx;

  if (y + dy < ballRadius) {
    dy = -dy;
  } else if (y + dy > canvas.height - ballRadius) {
    if (x > paddleX && x < paddleX + paddleWidth) {
      dy = -dy;
    } else {
      lives--;
      if (!lives) {
        alert(`😓game over your score is ${score}`);
        document.location.reload();
      } else {
        x = canvas.width / 2;
        y = canvas.height - 30;
        dx = 2;
        dy = -2;
        paddleX = (canvas.width - paddleWidth) / 2;
      }
      // clearInterval(interval);
    }
  }
  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    dx = -dx;
  }
  if (rigthPressed && paddleX < canvas.width - paddleWidth) {
    paddleX += 2;
  } else if (leftPresssed && paddleX > 0) {
    paddleX -= 2;
  }
  x += dx;
  y += dy;
  requestAnimationFrame(draw);
}
// setInterval(draw, 10);
draw();
