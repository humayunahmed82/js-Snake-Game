const playBoard = document.getElementById("playBoard");
const scoreElement = document.querySelector(".score");
const highScoreElement = document.querySelector(".high-score");
const controls = document.querySelectorAll(".controls div");

let foodX, foodY;
let snakeX = 5,
    snakeY = 10;
let velocityX = 0;
let velocityY = 0;
let snakeBody = [];
let gameOver = false;
let setIntervalID;
let score = 0;

// Getting high score form the local storage
let highScore = localStorage.getItem("high-score") || 0;
highScoreElement.innerText = `Score: ${highScore}`;

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

controls.forEach((key) => {
    key.addEventListener("click", () =>
        changeDirection({ key: key.dataset.key })
    );
});

const initGame = () => {
    if (gameOver) return handleGameOver();

    let htmlMarkup = `<div class="bg-theme-five" style="grid-area: ${foodY} / ${foodX}"></div>`;

    if (snakeX === foodX && snakeY === foodY) {
        changeFoodPosition();
        snakeBody.push(foodX, foodY); // Pushing food position to snake body array
        score++;

        highScore = score >= highScore ? score : highScore;
        localStorage.setItem("high-score", highScore);
        scoreElement.innerText = `Score: ${score}`;
        highScoreElement.innerText = `Score: ${highScore}`;
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
        // Adding a div for each part of the snake;s body
        htmlMarkup += `<div class="bg-theme-six" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;

        // Checking if the snake head hit the body, if so set gameOver to true
        if (
            i !== 0 &&
            snakeBody[0][1] === snakeBody[i][1] &&
            snakeBody[0][0] === snakeBody[i][0]
        ) {
            gameOver = true;
        }
    }
    playBoard.innerHTML = htmlMarkup;
};

changeFoodPosition();
setIntervalID = setInterval(initGame, 150);
document.addEventListener("keydown", changeDirection);
