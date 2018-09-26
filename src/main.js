const APPLE_SCORE = 10;

let saveBtn,
    playBtn,
    userInterface;

let widthInput,
    heightInput,
    levelInput,
    speedInput,
    lengthInput,
    appleInput;

let canvas,
    ctx;

let highScoreEl,
    currScoreEl;

let storage = window.localStorage;

let game;

let snake;

let apples;

let score = 0;



let direction = {
    '38': 'UP', // UP arrow
    '40': 'DOWN', // DOWN arrow
    '39': 'RIGHT', // RIGHT arrow
    '37': 'LEFT', // Left arrow
    '87': 'UP', // W key
    '83': 'DOWN', // S key
    '68': 'RIGHT', // D key
    '65': 'LEFT', // A key
};


window.onload = function() {
    canvas = document.getElementById('snakeGame');
    ctx = canvas.getContext('2d');

    saveBtn = document.getElementById('save');
    playBtn = document.getElementById('play');
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
        playBtn.classList.add('hidden');
        game.start();
    });




};

function preloadGameData() {
    game = new Game();

    snake = new Snake(settings.snakeLength);


    apples = [];
    for (let i = 0; i < settings.appleCount; i++) {
        apples.push(new Apple());
    }

    document.addEventListener('keydown', snakeDirection);
}




function animateGame() {
    draw();
    snake.move();
    if (game.over) return;
    requestAnimationFrame(animateGame);
}


function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    apples.forEach((apple) => {
        apple.draw();
    });
    snake.draw();
}




function snakeDirection(e) {
    snake.setDirection(direction[e.keyCode]);
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