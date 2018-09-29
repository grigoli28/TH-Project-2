class Game {
    constructor(highscore) {
        this.highscore = highscore;
        this.over = false;
    }

    static getHighscore() {
        return Number(STORAGE.getItem('snake_highscore'));
    }

    saveHighscore() {
        STORAGE.setItem('snake_highscore', this.highscore);
    }

    start() {
        hidePlayBtn();
        startAnimating(snake.speed);
    }

    stop() {
        if (soundEnabled)
            dead.play();
        this.over = true;
        drawGameOver();
        displayCurrScore();
        updateHighscore();
        displayHighscore();
        showInterface();
    }
}