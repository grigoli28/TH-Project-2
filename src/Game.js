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
        dead.play();
        showInterface();
        drawGameOver();
        displayCurrScore();
        this.over = true;
    }
}