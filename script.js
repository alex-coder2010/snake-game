// Create gameboard with grid
let canvas = document.getElementById("gameBoard");
let context = canvas.getContext("2d");

// Variables

let snake = [
  [0, 337, 26, 26],
  [0, 337, 53, 26],
  [0, 337, 78, 26],
  [0, 337, 103, 26],
  [0, 337, 130, 26],
];

let direction = "right";

let speed = 200

// Logic

window.addEventListener("keydown", (event) => {
  if (event.key == "ArrowDown") {
    direction = "down";
    console.log(direction);
  }

  if (event.key == "ArrowUp") {
    console.log(direction);
    direction = "up";
  }

  if (event.key == "ArrowLeft") {
    console.log(direction);
    direction = "left";
  }

  if (event.key == "ArrowRight") {
    console.log(direction);
    direction = "right";
  }
});

function drawSnake(snake) {
  context.beginPath();
  context.strokeStyle = "white";
  context.fillStyle = "darkgreen";
  for (let i = 0; i < snake.length; i++) {
    context.fillRect(snake[i][0], snake[i][1], snake[i][2], snake[i][3]);
    context.strokeRect(snake[i][0], snake[i][1], snake[i][2], snake[i][3]);
    context.strokeRect(snake[i][0], snake[i][1], snake[i][2], snake[i][3]);
  }
  context.stroke();
}

function clearTail(){
    context.beginPath();
    context.strokeStyle = "white";
    context.fillStyle = "white";
    context.fillRect(snake[0][0], snake[0][1], snake[0][2], snake[0][3]);
    context.strokeRect(snake[0][0], snake[0][1], snake[0][2], snake[0][3]);
    console.log(snake[0][0], snake[0][1], snake[0][2], snake[0][3])
    for (let i = 0; i < 650; i += 26) {
        context.moveTo(i, 0);
        context.lineTo(i, 650);
        context.moveTo(0, i);
        context.lineTo(650, i);
      }
    context.stroke();
    
}

// function checkCollisions(){
//     if()
// }

function moveSnake() {

    clearTail()
  
    snake.shift();

    if (direction == "right") {
        
        snake.push([snake[snake.length - 1][0], snake[snake.length - 1][1], snake[snake.length - 1][2] + 26, snake[snake.length - 1][3]]);
    }

    if (direction == "left") {
        
        snake.push([snake[snake.length - 1][0], snake[snake.length - 1][1], snake[snake.length - 1][2] - 26, snake[snake.length - 1][3]]);
    }

    if (direction == "up") {
        
        snake.push([snake[snake.length - 1][0], snake[snake.length - 1][1] - 26, snake[snake.length - 1][2], snake[snake.length - 1][3]]);
        console.log(snake)
    }

    if (direction == "down") {
        
        snake.push([snake[snake.length - 1][0], snake[snake.length - 1][1] + 26, snake[snake.length - 1][2], snake[snake.length - 1][3]]);
    }

    drawSnake(snake);
}

setInterval(moveSnake, speed);
setInterval(clearTail, speed);

