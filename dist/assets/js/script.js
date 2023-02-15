const playBoard = document.getElementById("playBoard");

let foodX, foodY;
let snakeX = 5,
    snakeY = 10;
let velocityX = 0;
let velocityY = 0;
let snakeBody = [];
let gameOver = false;
let setIntervalID;

const changeFoodPosition = () => {
    // Passing a Random 0- 30 Value as Food Position
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
};

const handleGameOver = () => {
    // Clearing the timer and reloading the page on game over
    clearInterval(setIntervalID);
    alert("Game Over Press OK to Replay...");
    location.reload();
};

const changeDirection = (event) => {
    if (event.key === "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    } else if (event.key === "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    } else if (event.key === "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    } else if (event.key === "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
    initGame();
};

const initGame = () => {
    if (gameOver) return handleGameOver();

    let htmlMarkup = `<div class="bg-theme-five" style="grid-area: ${foodY} / ${foodX}"></div>`;

    if (snakeX === foodX && snakeY === foodY) {
        changeFoodPosition();
        snakeBody.push(foodX, foodY); // Pushing food position to snake body array
        console.log(snakeBody);
    }

    for (let i = snakeBody.length - 1; i > 0; i--) {
        // Shifting forward the values of the elements in the snake body by one
        snakeBody[i] = snakeBody[i - 1];
    }

    snakeBody[0] = [snakeX, snakeY]; // Setting first element of snake body to current snake position

    // Updating the snake's Position based on the current velocity
    snakeX += velocityX;
    snakeY += velocityY;

    if (snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
        gameOver = true;
    }

    for (let i = 0; i < snakeBody.length; i++) {
        htmlMarkup += `<div class="bg-theme-six" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;
    }
    playBoard.innerHTML = htmlMarkup;
};

changeFoodPosition();
setIntervalID = setInterval(initGame, 150);
document.addEventListener("keydown", changeDirection);
