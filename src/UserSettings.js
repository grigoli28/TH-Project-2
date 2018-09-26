class UserSettings {
    constructor() {
        this.configure();
    }

    saveToStorage() {
        storage.setItem('user_settings_saved', true);
        storage.setItem('snake_user_settings', JSON.stringify(this));
    }

    isStoraged() {
        return storage.getItem('user_settings_saved');
    }

    getFromStorage() {
        return JSON.parse(storage.getItem('snake_user_settings'));
    }

    import () {
        let { boardWidth, boardHeight, gameLevel, snakeSpeed, snakeLength, appleCount } = this.getFromStorage();
        this.configure(boardWidth, boardHeight, gameLevel, snakeSpeed, snakeLength, appleCount);
    }

    configure(width = MIN_WIDTH, height = MIN_HEIGHT, level = DEFAULT_LEVEL, speed = MIN_SPEED, length = MIN_LENGTH, apples = MIN_APPLES) {
        this.boardWidth = Math.floor(width / 10) * 10;
        this.boardHeight = Math.floor(height / 10) * 10;
        this.gameLevel = level;
        this.snakeSpeed = Math.floor(speed);
        this.snakeLength = Math.floor(length);
        this.appleCount = Math.floor(apples);
    }

    load(func) {
        func(this.boardWidth, this.boardHeight, this.gameLevel, this.snakeSpeed, this.snakeLength, this.appleCount);
    }

/*     loadDefault() {
        if (!this.getFromStorage()) {
            // if no settings are saved in storage, load default settings
            this.configure();
        } else {
            // if settings were previously saved in storage, import them;
            this.import();
        }
    } */
}