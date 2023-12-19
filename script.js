// Code start and importations. (If there's any.)




  //* ("There are no importations!")




// Variables. (Some variables are also declared inside of the logic because they are temporary variables.)




    const scoreText = document.querySelector("#score");

    const resetButton = document.querySelector("#button");

    let canvas = document.querySelector("#gameBoard");

    let context = canvas.getContext("2d");

    let snake = [

                    [0, 250, 25, 25],
                    [25, 250, 25, 25],
                    [50, 250, 25, 25],
                    [75, 250, 25, 25],
                    [100, 250, 25, 25],
                    [125, 250, 25, 25],

                                                    ];

    let direction = "right";

    let gameRunning = true;

    let speed = 100;

    let globalRandomX;

    let globalRandomY;

    let possiblePositions = [];

        for(let i = 0; i <= 650; i += 25){  

            //* Filling up the possiblePositions array. (Which was originally declared as an empty array.)
            possiblePositions.push(i);

        };

    let score = 0;

    let gameIsEnabled = true;




// Logic.




    window.addEventListener("keydown", (event) => {

      if (event.key == "ArrowDown" && direction != "up") {

        direction = "down";

        moveSnake()

      };

      if (event.key == "ArrowUp"  && direction != "down") {

        direction = "up";
        
        moveSnake()

      };

      if (event.key == "ArrowLeft" && direction != "right") {

        direction = "left";
        
        moveSnake()

      };

      if (event.key == "ArrowRight" && direction != "left") {

        direction = "right";
        
        moveSnake()

      };});




    resetButton.addEventListener("click", () => {

        gameIsEnabled = true;
        resetButton.style.visibility = "hidden";
        context.beginPath();
        context.fillStyle = "white"
        context.fillRect(0, 0, 650, 650)
        context.stroke();
        direction = "right";
        snake = [[0, 250, 25, 25],[25, 250, 25, 25],[50, 250, 25, 25],[75, 250, 25, 25],[100, 250, 25, 25],[125, 250, 25, 25]];
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

        context.fillRect(snake[i][0], snake[i][1], 25, 25);
        context.strokeRect(snake[i][0], snake[i][1], 25, 25);

      };

      context.stroke();

      clearTail()

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

            snake.push([snake[snake.length - 1][0] + 25, snake[snake.length - 1][1], 25, 25]);
            //* Moves snake to the right if the direction is right

        };

        if (direction == "left") {

            snake.push([snake[snake.length - 1][0] - 25, snake[snake.length - 1][1], 25, 25]);
            //* Moves snake to the left if the direction is left

        };

        if (direction == "up") {

            snake.push([snake[snake.length - 1][0], snake[snake.length - 1][1] - 25, 25, 25]);
            //* Moves snake to the top if the direction is up

        };

        if (direction == "down") {

            snake.push([snake[snake.length - 1][0], snake[snake.length - 1][1] + 25, 25, 25]);
            //* Moves snake to the bottom if the direction is down

        };

        checkCollisions()

        drawSnake();

    };




    function gameOver(){

        snake.unshift([snake[0][0] + 25, snake[0][1] + 25, 25, 25]);
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


        if(snake[snake.length - 1][0] < -1 || snake[snake.length - 1][0] >= 650 || snake[snake.length - 1][1] < -1 || snake[snake.length - 1][1] >= 650){

            gameOver();

        };

         for(let i = 0; i < snake.length - 1; i++){

             if(snake[snake.length - 1][0] === snake[i][0] && snake[snake.length - 1][1] === snake[i][1]){

                 snake = [snake[0][0], snake[0][1]];
                 gameOver();

             };
         };


        //* Check fruit collision, update score, create new fruit and make snake longer.


        if(snake[snake.length - 1][0] == possiblePositions[globalRandomX] && snake[snake.length - 1][1] == possiblePositions[globalRandomY]){

          score ++;
          scoreText.textContent = `Score: ${score}`;
          snake.unshift([snake[0][0] + 25, snake[0][1] + 25, 25, 25]);
          generateFruit();

        };

    };




    function generateCoordinates(){


        //* Getting random coordinates which will be used in generateFruit function to draw the fruit on the canvas.


        let randomX = Math.floor(Math.random() * possiblePositions.length);
        let randomY = Math.floor(Math.random() * possiblePositions.length);

        globalRandomX = randomX;
        globalRandomY = randomY;


        //! ERROR -- (Criticity, Critical)

        //! EXPLANATION -- ("The code works fine. But for some reason the coordinates are not right. This error makes the fruit spawn on top of the snake, resulting in a bug. This error halts the correct execution of the program. hence, needing to be fixed with extreme priority!")

        //todo FIX ERROR ABOVE (Criticity, Critical)

        //! making sure the fruit does not spawn on top of the snake 

              //! for(let i = 0; i < snake.length; i++){

              //!   for(let i = 0; i < snake.length; i++){
              //!     console.log(`snake at index ${i}, x:  ${snake[i][0]},  randomX:  ${possiblePositions[randomX]}`)
              //!     console.log(`snake at index ${i}, y:  ${snake[i][1]},  randomY:  ${possiblePositions[randomY]}`)
              //!   }


                
              //!   if(randomX == snake[i][0] && randomY == snake[i][1]){

              //!     randomX = Math.floor(Math.random() * possiblePositions.length);
              //!     randomY = Math.floor(Math.random() * possiblePositions.length);

              //!     globalRandomX = randomX;
              //!     globalRandomY = randomY;

              //!     continue;

              //!   }
              //! }
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

                //* Even though the code is opensource, this product is protected by the Apache License 2.0. (For more information check the section "LICENSE AND COPYRIGHT", at the bottom of this file)


        // TO DO


            //* If you have any suggestions, start a pull request with the edited code that has your "TO DO" task/s suggestion/s


            //todo -- TO DO (1)-- ("Add sounds when eating fruit and when dying. (Location: no location") -- Suggested by ("Alex, the "Creator")

            //todo -- TO DO (2) -- ("Make the fruit a circle instead of a square, (Location: Line 335)") -- Suggested by ("Alex, the "Creator")

            //todo -- TO DO (3)-- ("Check "Errors to fix". (Location: right below)") -- Suggested by ("Alex, the "Creator")


    // Errors to fix  -------------------------------------  




        //todo -- TO DO -- ("Fix all errors in the program, (1, Critical) (0, Optional")

            //! ERROR (1) (Criticity, Critical)

                //! LINE: ("274")
                //! EXPLANATION: ("The code works fine. But for some reason the coordinates are not right. This error makes the fruit spawn on top of the snake, resulting in a bug. This error halts the correct execution of the program. hence, needing to be fixed with extreme priority!")




// -- FOOTER  ---------------------------------------




    //* Developed by: Alex, 




    // WHERE TO FIND ME

      //* MY GITHUB CHANNEL: (https://github.com/user-name-user)
      //* MY YOUTUBE CHANNEL: (https://youtube.com/@Alex...............)
      //* MY CODEPEN CHANNEL: (https://codepen.io/coder2010_)




    // LICENSE AND COPYRIGHT


      console.log("© 2023 Alex Zambaiti, this project is protected by the Apache license 2.0. (For more information check the bottom of the javascript file or check the Apache website to see all the license and agreements of this license).\nMy youtube channel: https://youtube.com/@Alex...............\nMy Codepen channel: https://codepen.io/coder2010_\nMy Github Channel: https://github.com/user-name-user")


      // Project protected by the Apache License 2.0


         //                               Apache License
         //                         Version 2.0, January 2004
         //                      http://www.apache.org/licenses/
      
         // TERMS AND CONDITIONS FOR USE, REPRODUCTION, AND DISTRIBUTION
      
         // 1. Definitions.
      
         //    "License" shall mean the terms and conditions for use, reproduction,
         //    and distribution as defined by Sections 1 through 9 of this document.
      
         //    "Licensor" shall mean the copyright owner or entity authorized by
         //    the copyright owner that is granting the License.
      
         //    "Legal Entity" shall mean the union of the acting entity and all
         //    other entities that control, are controlled by, or are under common
         //    control with that entity. For the purposes of this definition,
         //    "control" means (i) the power, direct or indirect, to cause the
         //    direction or management of such entity, whether by contract or
         //    otherwise, or (ii) ownership of fifty percent (50%) or more of the
         //    outstanding shares, or (iii) beneficial ownership of such entity.
      
         //    "You" (or "Your") shall mean an individual or Legal Entity
         //    exercising permissions granted by this License.
      
         //    "Source" form shall mean the preferred form for making modifications,
         //    including but not limited to software source code, documentation
         //    source, and configuration files.
      
         //    "Object" form shall mean any form resulting from mechanical
         //    transformation or translation of a Source form, including but
         //    not limited to compiled object code, generated documentation,
         //    and conversions to other media types.
      
         //    "Work" shall mean the work of authorship, whether in Source or
         //    Object form, made available under the License, as indicated by a
         //    copyright notice that is included in or attached to the work
         //    (an example is provided in the Appendix below).
      
         //    "Derivative Works" shall mean any work, whether in Source or Object
         //    form, that is based on (or derived from) the Work and for which the
         //    editorial revisions, annotations, elaborations, or other modifications
         //    represent, as a whole, an original work of authorship. For the purposes
         //    of this License, Derivative Works shall not include works that remain
         //    separable from, or merely link (or bind by name) to the interfaces of,
         //    the Work and Derivative Works thereof.
      
         //    "Contribution" shall mean any work of authorship, including
         //    the original version of the Work and any modifications or additions
         //    to that Work or Derivative Works thereof, that is intentionally
         //    submitted to Licensor for inclusion in the Work by the copyright owner
         //    or by an individual or Legal Entity authorized to submit on behalf of
         //    the copyright owner. For the purposes of this definition, "submitted"
         //    means any form of electronic, verbal, or written communication sent
         //    to the Licensor or its representatives, including but not limited to
         //    communication on electronic mailing lists, source code control systems,
         //    and issue tracking systems that are managed by, or on behalf of, the
         //    Licensor for the purpose of discussing and improving the Work, but
         //    excluding communication that is conspicuously marked or otherwise
         //    designated in writing by the copyright owner as "Not a Contribution."
      
         //    "Contributor" shall mean Licensor and any individual or Legal Entity
         //    on behalf of whom a Contribution has been received by Licensor and
         //    subsequently incorporated within the Work.
      
         // 2. Grant of Copyright License. Subject to the terms and conditions of
         //    this License, each Contributor hereby grants to You a perpetual,
         //    worldwide, non-exclusive, no-charge, royalty-free, irrevocable
         //    copyright license to reproduce, prepare Derivative Works of,
         //    publicly display, publicly perform, sublicense, and distribute the
         //    Work and such Derivative Works in Source or Object form.
      
         // 3. Grant of Patent License. Subject to the terms and conditions of
         //    this License, each Contributor hereby grants to You a perpetual,
         //    worldwide, non-exclusive, no-charge, royalty-free, irrevocable
         //    (except as stated in this section) patent license to make, have made,
         //    use, offer to sell, sell, import, and otherwise transfer the Work,
         //    where such license applies only to those patent claims licensable
         //    by such Contributor that are necessarily infringed by their
         //    Contribution(s) alone or by combination of their Contribution(s)
         //    with the Work to which such Contribution(s) was submitted. If You
         //    institute patent litigation against any entity (including a
         //    cross-claim or counterclaim in a lawsuit) alleging that the Work
         //    or a Contribution incorporated within the Work constitutes direct
         //    or contributory patent infringement, then any patent licenses
         //    granted to You under this License for that Work shall terminate
         //    as of the date such litigation is filed.
      
         // 4. Redistribution. You may reproduce and distribute copies of the
         //    Work or Derivative Works thereof in any medium, with or without
         //    modifications, and in Source or Object form, provided that You
         //    meet the following conditions:
      
         //    (a) You must give any other recipients of the Work or
         //        Derivative Works a copy of this License; and
      
         //    (b) You must cause any modified files to carry prominent notices
         //        stating that You changed the files; and
      
         //    (c) You must retain, in the Source form of any Derivative Works
         //        that You distribute, all copyright, patent, trademark, and
         //        attribution notices from the Source form of the Work,
         //        excluding those notices that do not pertain to any part of
         //        the Derivative Works; and
      
         //    (d) If the Work includes a "NOTICE" text file as part of its
         //        distribution, then any Derivative Works that You distribute must
         //        include a readable copy of the attribution notices contained
         //        within such NOTICE file, excluding those notices that do not
         //        pertain to any part of the Derivative Works, in at least one
         //        of the following places: within a NOTICE text file distributed
         //        as part of the Derivative Works; within the Source form or
         //        documentation, if provided along with the Derivative Works; or,
         //        within a display generated by the Derivative Works, if and
         //        wherever such third-party notices normally appear. The contents
         //        of the NOTICE file are for informational purposes only and
         //        do not modify the License. You may add Your own attribution
         //        notices within Derivative Works that You distribute, alongside
         //        or as an addendum to the NOTICE text from the Work, provided
         //        that such additional attribution notices cannot be construed
         //        as modifying the License.
      
         //    You may add Your own copyright statement to Your modifications and
         //    may provide additional or different license terms and conditions
         //    for use, reproduction, or distribution of Your modifications, or
         //    for any such Derivative Works as a whole, provided Your use,
         //    reproduction, and distribution of the Work otherwise complies with
         //    the conditions stated in this License.
      
         // 5. Submission of Contributions. Unless You explicitly state otherwise,
         //    any Contribution intentionally submitted for inclusion in the Work
         //    by You to the Licensor shall be under the terms and conditions of
         //    this License, without any additional terms or conditions.
         //    Notwithstanding the above, nothing herein shall supersede or modify
         //    the terms of any separate license agreement you may have executed
         //    with Licensor regarding such Contributions.
      
         // 6. Trademarks. This License does not grant permission to use the trade
         //    names, trademarks, service marks, or product names of the Licensor,
         //    except as required for reasonable and customary use in describing the
         //    origin of the Work and reproducing the content of the NOTICE file.
      
         // 7. Disclaimer of Warranty. Unless required by applicable law or
         //    agreed to in writing, Licensor provides the Work (and each
         //    Contributor provides its Contributions) on an "AS IS" BASIS,
         //    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
         //    implied, including, without limitation, any warranties or conditions
         //    of TITLE, NON-INFRINGEMENT, MERCHANTABILITY, or FITNESS FOR A
         //    PARTICULAR PURPOSE. You are solely responsible for determining the
         //    appropriateness of using or redistributing the Work and assume any
         //    risks associated with Your exercise of permissions under this License.
      
         // 8. Limitation of Liability. In no event and under no legal theory,
         //    whether in tort (including negligence), contract, or otherwise,
         //    unless required by applicable law (such as deliberate and grossly
         //    negligent acts) or agreed to in writing, shall any Contributor be
         //    liable to You for damages, including any direct, indirect, special,
         //    incidental, or consequential damages of any character arising as a
         //    result of this License or out of the use or inability to use the
         //    Work (including but not limited to damages for loss of goodwill,
         //    work stoppage, computer failure or malfunction, or any and all
         //    other commercial damages or losses), even if such Contributor
         //    has been advised of the possibility of such damages.
      
         // 9. Accepting Warranty or Additional Liability. While redistributing
         //    the Work or Derivative Works thereof, You may choose to offer,
         //    and charge a fee for, acceptance of support, warranty, indemnity,
         //    or other liability obligations and/or rights consistent with this
         //    License. However, in accepting such obligations, You may act only
         //    on Your own behalf and on Your sole responsibility, not on behalf
         //    of any other Contributor, and only if You agree to indemnify,
         //    defend, and hold each Contributor harmless for any liability
         //    incurred by, or claims asserted against, such Contributor by reason
         //    of your accepting any such warranty or additional liability.
      
         // END OF TERMS AND CONDITIONS
      
         // Copyright 2023 Alex Zambaiti
      
         // Licensed under the Apache License, Version 2.0 (the "License");
         // you may not use this file except in compliance with the License.
         // You may obtain a copy of the License at
      
         //     http://www.apache.org/licenses/LICENSE-2.0
      
         // Unless required by applicable law or agreed to in writing, software
         // distributed under the License is distributed on an "AS IS" BASIS,
         // WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
         // See the License for the specific language governing permissions and
         // limitations under the License.



    // Code created by: Alex.  
    // Project name: Snake Game.
    // Project started on: Sunday 10/12/2023.
    // Project completed on: Wednesday 13/12/2023. 




// -------------------------------------

