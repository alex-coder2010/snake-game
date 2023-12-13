// Code start and importations. (If there's any.)




  //* ("There are no importations!")




// Variables. (Some variables are also declared inside of the logic because they are temporary variables.)




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

                                                    ];

    let direction = "right";

    let gameRunning = true;

    let speed = 100;

    let globalRandomX;

    let globalRandomY;

    let possiblePositions = [];

        for(let i = 0; i <= 650; i += 26){  

            //* Filling up the possiblePositions array. (Which was originally declared as an empty array.)
            possiblePositions.push(i);

        };

    let score = 0;

    let gameIsEnabled = true;




// Logic.




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

        gameIsEnabled = true;
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

      for (let i = 0; i < snake.length; i++) {

        //todo (3)(1) -- SOLVE THE ERROR ABOVE -- (Criticity, Optional)

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
            //* Moves snake to the right if the direction is right

        };

        if (direction == "left") {

            snake.push([snake[snake.length - 1][0] - 26, snake[snake.length - 1][1], 26, 26]);
            //* Moves snake to the left if the direction is left

        };

        if (direction == "up") {

            snake.push([snake[snake.length - 1][0], snake[snake.length - 1][1] - 26, 26, 26]);
            //* Moves snake to the top if the direction is up

        };

        if (direction == "down") {

            snake.push([snake[snake.length - 1][0], snake[snake.length - 1][1] + 26, 26, 26]);
            //* Moves snake to the bottom if the direction is down

        };

        drawSnake();

    };




    function gameOver(){

        snake.unshift([snake[0][0] + 26, snake[0][1] + 26, 26, 26]);
        drawSnake();
        context.beginPath();
        direction = "right";
        context.font = 'italic 40pt Calibri';
        context.fillStyle = "black";
        context.textAlign = "center";
        context.fillText("GAME OVER!", canvas.width / 2, canvas.height / 2);
        context.stroke();
        resetButton.style.visibility = "visible";
        gameIsEnabled = false;

    };




    function checkCollisions(){


        //* Big if statement that checks if the head of the snake touches any of the borders.


        if(snake[snake.length - 1][0] < -1 || snake[snake.length - 1][0] >= 630 || snake[snake.length - 1][1] < -1 || snake[snake.length - 1][1] >= 630){

            snake = [snake[0][0], snake[0][1]];
            gameOver();

        };

         for(let i = 0; i < snake.length - 1; i++){

             if(snake[snake.length - 1][0] === snake[i][0] && snake[snake.length - 1][1] === snake[i][1]){

                 snake = [snake[0][0], snake[0][1]];
                 gameOver();

             };
         };


        //* Check fruit collision, update score, create new fruit and make snake longer.


        if(snake[snake.length - 1][0] == possiblePositions[globalRandomX] && snake[snake.length - 1][1] + 1 == possiblePositions[globalRandomY]){

          score ++;
          scoreText.textContent = `Score: ${score}`;
          snake.unshift([snake[0][0] + 26, snake[0][1] + 26, 26, 26]);
          generateFruit();

        };

    };




    function generateCoordinates(){


        //* Getting random coordinates which will be used in generateFruit function to draw the fruit on the canvas.


        let randomX = Math.floor(Math.random() * possiblePositions.length);
        let randomY = Math.floor(Math.random() * possiblePositions.length);

        globalRandomX = randomX;
        globalRandomY = randomY;


        // making sure the fruit does not spawn on top of the snake 

              for(let i = 0; i < snake.length; i++){
                
                if(randomX == snake[i][0] || randomY == snake[i][1]){

                  randomX = Math.floor(Math.random() * possiblePositions.length);
                  randomY = Math.floor(Math.random() * possiblePositions.length);
                  globalRandomX = randomX;
                  globalRandomY = randomY;
                  continue;

                }
              }
        };




    function generateFruit(){

        generateCoordinates();

        context.beginPath();
        context.strokeStyle = "white";
        context.fillStyle = "red";
        context.fillRect(possiblePositions[globalRandomX], possiblePositions[globalRandomY], 25, 25);

        //todo (2) ("Make the fruit a circle")

        context.fill();
        context.stroke();

    };




    function startGame(){

      resetButton.style.visibility = "hidden";

      generateFruit();

      setInterval(moveSnake, speed);
      setInterval(clearTail, speed);
      setInterval(checkCollisions, speed);

    };




// Starting game. (Only if gameIsEnabled)




    if(gameIsEnabled){

      startGame();

    };
  




// Code and program notes left by Alex, (The developer of this project).



    
    // F.A.Q. and "To Do"  -----------------------------------


        //? F.A.Q.


            //? -- QUESTION  --  What do "Critical" and "Optional" mean inside of this code?

                //* Critical = ("Program functionality is halted because of this error")

                //* Optional = ("It gives a console error, but it doesn't affect the program. (It would be good practice to solve them anyway)")

            //? -- QUESTION -- What is this project?

                //* This project is a snake game program, this project, together with the source code, is open source.

                //* You can feel free to complete any of the "TO DO" tasks right below to keep the code afloat, if you decide to do so, and find a solution to any of the "TO DO", feel free to start a pull request on Github, I will look your solution and see if it's ok to implement inside of the source code. (I will notice if you try to place malicious scripts. Please refrain from doing so!)

                //* Even though the code is opensource. I do require attribution if featured on your channel or blog post. (or any other public thing)

                //! You do NOT have the right to claim this code as your own, if featured, it requires the correct attribution (look end of the code for more details about copyright) 


        // TO DO


            //* If you have any suggestions, start a pull request with the edited code that has your "TO DO" task/s suggestion/s


            //todo -- TO DO (1)-- ("Add sounds when eating fruit and when dying. (Location: no location") -- Suggested by ("Alex, the "Creator")

            //todo -- TO DO (2) -- ("Make the fruit a circle instead of a square, (Location: Line 335)") -- Suggested by ("Alex, the "Creator")

            //todo -- TO DO (3)-- ("Check "Errors to fix". (Location: right below)") -- Suggested by ("Alex, the "Creator")


    // Errors to fix  -------------------------------------  




        //todo -- TO DO -- ("Fix all errors in the program, (0, Critical) (0, Optional")

            //* Well, there are no known bugs inside of the game, the program, is bug free!




// -- FOOTER  ---------------------------------------




    //* Developed by: Alex, 




    // WHERE TO FIND ME

      //* MY GITHUB CHANNEL: (https://github.com/user-name-user)
      //* MY YOUTUBE CHANNEL: (https://youtube.com/@Alex...............)
      //* MY CODEPEN CHANNEL: (https://codepen.io/coder2010_)




    // COPYRIGHT


      console.log("© 2023 Alex Zambaiti, attribution is required for public use\nMy youtube channel: https://youtube.com/@Alex...............\nMy Codepen channel: https://codepen.io/coder2010_\nMy Github Channel: https://github.com/user-name-user")


      //* Attribution and credits required for public use

      //* ex: (in Youtube video description and inside of the video: ("This code was developed by Alex, this is the link to his project on github / the link to his project on github is in the video description ... "))

      //* Attribution and credits not required for private use

      //* To be honest, there will not be any legal consequenceS if you do not put attribution and credits, (i.e. Break the copyright agreement), but they are greatly appreciated, this way people that see this code on your channel will know that I am the one that actually created it. I will request to take the video down if you pretend this code is yours, be honest!.




    // Code created by: Alex.  
    // Project name: Snake Game.
    // Project started on: Sunday 10/12/2023.
    // Project completed on: Wednesday 13/12/2023. 




// -------------------------------------
