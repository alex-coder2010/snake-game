// code start and importations




// Variables (some variables are also declared inside of the logic because they are temporary variables)




const scoreText = document.querySelector("#score");

const resetButton = document.querySelector("#button");

let canvas = document.querySelector("#gameBoard");

let context = canvas.getContext("2d");

let snake = [
                [0, 337, 26, 26],
                [0, 363, 26, 26],
                [0, 389, 26, 26],
                [0, 415, 26, 26],
                [0, 441, 26, 26],
                [0, 467, 26, 26],
                [0, 493, 26, 26],
                [0, 519, 26, 26],
                [0, 545, 26, 26],
                [0, 571, 26, 26],
                [0, 597, 26, 26],
                [0, 623, 26, 26],


                                                ];

let direction = "right";

let gameRunning = true;

let speed = 100;

let globalRandomX;

let globalRandomY;

let possiblePositions = [];

    for(let i = 0; i <= 650; i += 26){  // actually creating the possiblePositions array
        possiblePositions.push(i);
    };

let score = 0;

let gameIsEnabled = true;




// Logic




window.addEventListener("keydown", (event) => {

  if (event.key == "ArrowDown" && direction != "up") {
    direction = "down";
  };

  if (event.key == "ArrowUp"  && direction != "down") {
    direction = "up";
  };

  if (event.key == "ArrowLeft" && direction != "right") {
    direction = "left";
  };

  if (event.key == "ArrowRight" && direction != "left") {
    direction = "right";

  };});





resetButton.addEventListener("click", () => {

    resetButton.style.visibility = "hidden";
    direction = "right";
    snake = [[0, 337, 26, 26],[0, 363, 26, 26],[0, 389, 26, 26],[0, 415, 26, 26],[0, 441, 26, 26],[0, 467, 26, 26]];
    context.beginPath();
    context.fillStyle = "white";
    context.fillRect(0, 0, 648, 648);
    context.stroke();
    score = 0;
    scoreText.textContent = `Score: ${score}`;
    generateFruit();

});




function drawSnake() {

  context.beginPath();
  context.strokeStyle = "white";
  context.fillStyle = "darkgreen";

  for (let i = 0; i <= snake.length; i++) {
    context.fillRect(snake[i][0], snake[i][1], 26, 26);
    context.strokeRect(snake[i][0], snake[i][1], 26, 26);
  };

  context.stroke();

};




function clearTail(){

    context.beginPath();
    context.strokeStyle = "white";
    context.fillStyle = "white";
    context.fillRect(snake[0][0], snake[0][1], snake[0][2], snake[0][3]);
    context.strokeRect(snake[0][0], snake[0][1], snake[0][2], snake[0][3]);
    context.stroke();
    
};




function moveSnake() {

    snake.shift();

    if (direction == "right") {
        snake.push([snake[snake.length - 1][0] + 26, snake[snake.length - 1][1], 26, 26]);
    };

    if (direction == "left") {
        snake.push([snake[snake.length - 1][0] - 26, snake[snake.length - 1][1], 26, 26]);
    };

    if (direction == "up") {
        snake.push([snake[snake.length - 1][0], snake[snake.length - 1][1] - 26, 26, 26]);
    };

    if (direction == "down") {
        snake.push([snake[snake.length - 1][0], snake[snake.length - 1][1] + 26, 26, 26]);
    };

    drawSnake();

};




function gameOver(){

    context.beginPath();
    direction = "right";
    context.font = 'italic 40pt Calibri';
    context.fillStyle = "black";
    context.textAlign = "center";
    context.fillText("GAME OVER!", canvas.width / 2, canvas.height / 2);
    context.stroke();
    resetButton.style.visibility = "visible";

};




function checkCollisions(){


    //big if statement that checks if the head of the snake touches any of the borders


    if(snake[snake.length - 1][0] < -1 || snake[snake.length - 1][0] >= 630 || snake[snake.length - 1][1] < -1 || snake[snake.length - 1][1] >= 630){
        snake = [snake[0][0], snake[0][1]];
        gameOver();
    };


    // check if snake is colliding itself

    //! NOT WORKING


    for(let i = 0; i < snake.length - 1; i++){

        if(snake[snake.length] == snake[i]){
            snake = [snake[0][0], snake[0][1]];
            gameOver();
        };
    };


    // check fruit collision, update score, create new fruit and make snake longer


    console.log("X and Y coordinates of the fruit: " + "(x) " + possiblePositions[globalRandomX] + " ," + " (y) " + possiblePositions[globalRandomY]);
    console.log(`Snake head: ${snake[snake.length - 1]}`);

    if(snake[snake.length - 1][0] == possiblePositions[globalRandomX] && snake[snake.length - 1][1] + 1 == possiblePositions[globalRandomY]){
      console.log("Fruit collided with snake head");
      score ++;
      scoreText.textContent = `Score: ${score}`;
      snake.unshift([snake[0][0] + 26, snake[0][1] + 26, 26, 26])
      generateFruit();

    };

};




function generateCoordinates(){


    // getting random coordinates to spawn the fruit


    let randomX = Math.floor(Math.random() * possiblePositions.length);
    let randomY = Math.floor(Math.random() * possiblePositions.length);

    globalRandomX = randomX;
    globalRandomY = randomY;


    // making sure the fruit does not spawn where the snake is (not working)

    //! NOT WORKING

        
    // let count = 0;

    // do{
      
    //     for(let i = 0; i <= snake.length; i++){
            
    //       if(randomX + randomY == snake[i][0] + snake[i][1]){
    //         count++;
    //         randomX = Math.floor(Math.random() * possiblePositions.length);
    //         randomY = Math.floor(Math.random() * possiblePositions.length);
    //         globalRandomX = randomX;
    //         globalRandomY = randomY;
    //         continue;
    //       }
  
    //       else{
    //         continue;
    //       };
    //     }


    //   }
      
    //   while(count != 0);;

};





function generateFruit(){

    generateCoordinates();

    context.beginPath();
    context.strokeStyle = "white";
    context.fillStyle = "red";
    context.fillRect(possiblePositions[globalRandomX], possiblePositions[globalRandomY], 26, 26);
 // context.arc(possiblePositions[randomX] - 13, possiblePositions[randomY] - 13, 13, 0, 2 * Math.PI);
    context.fill();
    context.stroke();

};



function startGame(){

  generateFruit();

  resetButton.style.visibility = "hidden";

  setInterval(moveSnake, speed);
  setInterval(clearTail, speed);
  setInterval(checkCollisions, speed);

};




// starting game if game is enabled




if(gameIsEnabled){
  startGame()
}


