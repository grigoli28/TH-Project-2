class UserSettings {
    constructor() {
        this.configure();
    }

    saveToStorage() {
        STORAGE.setItem('user_settings_saved', true);
        STORAGE.setItem('snake_user_settings', JSON.stringify(this));
    }

    isStoraged() {
        return STORAGE.getItem('user_settings_saved');
    }

    getFromStorage() {
        return JSON.parse(STORAGE.getItem('snake_user_settings'));
    }

    import () {
        let { boardWidth, boardHeight, gameLevel, snakeSpeed, snakeLength, appleCount } = this.getFromStorage();
        this.configure(boardWidth, boardHeight, gameLevel, snakeSpeed, snakeLength, appleCount);
    }

    configure(width = MIN_WIDTH, height = MIN_HEIGHT, level = MIN_LEVEL, speed = MIN_SPEED, length = MIN_LENGTH, apples = MIN_APPLES) {
        this.boardWidth = width - (width % SCALE);
        this.boardHeight = height - (height % SCALE);
        this.gameLevel = level;
        this.snakeSpeed = Math.floor(speed);
        this.snakeLength = Math.floor(length);
        this.appleCount = Math.floor(apples);
    }

    load(func) {
        func(this.boardWidth, this.boardHeight, this.gameLevel, this.snakeSpeed, this.snakeLength, this.appleCount);
    }
}