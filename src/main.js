const APPLE_SCORE = 10;

const STORAGE = window.localStorage;

let saveBtn, playBtn, soundBtn, userInterface;

let widthInput, heightInput, levelInput,
    speedInput, lengthInput, appleInput;

let canvas,
    ctx;

let highScoreEl,
    currScoreEl;

let game, snake, appleArr, score;

let directionKeyMap = {
    '38': 'UP', // arrow
    '40': 'DOWN', // arrow
    '39': 'RIGHT', // arrow
    '37': 'LEFT', // arrow
    '87': 'UP', // W key
    '83': 'DOWN', // S key
    '68': 'RIGHT', // D key
    '65': 'LEFT', // A key
};


let appleImg = new Image();
appleImg.src = 'img/apple.png';

let dead = new Audio();
let eat = new Audio();

dead.src = 'audio/dead.mp3';
eat.src = 'audio/eat.mp3';

let soundEnabled = true;

let fpsInterval, now, then, elapsed;

let stopAnimID;


window.onload = function() {
    // Give body max visible height, so we can display canvas in the center of screen
    document.body.style.height = `${window.innerHeight}px`;

    canvas = document.getElementById('snakeGame');
    ctx = canvas.getContext('2d');

    saveBtn = document.getElementById('save');
    playBtn = document.getElementById('play');

    soundBtn = document.getElementById('sound-control');

    userInterface = document.getElementById('userInterface');

    widthInput = document.getElementById('boardWidth');
    heightInput = document.getElementById('boardHeight');
    levelInput = document.getElementById('gameLevel');
    speedInput = document.getElementById('snakeSpeed');
    lengthInput = document.getElementById('snakeLength');
    appleInput = document.getElementById('appleCount');

    highScoreEl = document.getElementById('highScore');
    currScoreEl = document.getElementById('myScore');

    loadUserInterface();

    saveBtn.addEventListener('click', preloadGameData);

    playBtn.addEventListener('click', () => {
        game.start();
    });


    soundBtn.addEventListener('click', soundControl);
};


function preloadGameData() {
    score = 0;

    game = new Game(Game.getHighscore());

    snake = new Snake(settings.length, settings.speed);

    appleArr = new AppleArray(settings.apples);

    document.addEventListener('keydown', setSnakeDirection);
}


// Enables us to control frame per second (Snake speed)
function startAnimating(fps) {
    fpsInterval = 1000 / fps;
    then = window.performance.now();
    animateGame();
}


function animateGame(timeFrame) {
    stopAnimID = requestAnimationFrame(animateGame);

    now = timeFrame;
    elapsed = now - then;

    if (elapsed > fpsInterval) {
        draw();
        snake.move();

        then = now - (elapsed % fpsInterval);
    }
    if (game.over) {
        cancelAnimationFrame(stopAnimID);
    }
}


function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    appleArr.draw();
    snake.draw();
}


function setSnakeDirection(e) {
    snake.setDirection(directionKeyMap[e.keyCode]);
}


function drawGameOver() {
    ctx.font = '48px serif';
    ctx.textAlign = 'center';
    ctx.fillStyle = 'red';
    ctx.fillText('GAME OVER', canvas.width / 2, canvas.height / 2);
    ctx.strokeText('GAME OVER', canvas.width / 2, canvas.height / 2);
}


function displayCurrScore() {
    currScoreEl.textContent = score;
}


function displayHighscore() {
    if (Game.getHighscore() > 0)
        highScoreEl.textContent = Game.getHighscore();
}


function hidePlayBtn() {
    playBtn.classList.add('hidden');
}


function updateHighscore() {
    if (score > game.highscore) {
        game.highscore = score;
        game.saveHighscore();
    }
}


function soundControl({ target }) {
    soundEnabled = !soundEnabled;
    target.classList.toggle('sound-on');
    target.classList.toggle('sound-off');
    console.log(soundEnabled);
}