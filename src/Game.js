class Game {
    constructor(highscore = 0) {
        this.highscore = highscore;
    }

    get highscore() {
        return this._highscore;
    }

    set highscore(score) {
        if (!isNaN(score) && score > 0 && score > this.highscore) {
            this._highscore = score;
        }
    }

    start() {
        // animateGame();
        startAnimating(10);
    }

    stop() {
        showInterface();
        this.over = true;
        drawGameOver();
        displayCurrScore();
    }
}