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

    stop() {
        this.over = true;
        dead.play();
        drawGameOver();
        showInterface();
        displayCurrScore();
    }
}