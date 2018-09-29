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
        let { width, height, level, speed, length, apples } = this.getFromStorage();
        this.configure(width, height, level, speed, length, apples);
    }

    configure(width = MIN_WIDTH, height = MIN_HEIGHT, level = MIN_LEVEL, speed = MIN_SPEED, length = MIN_LENGTH, apples = MIN_APPLES) {
        this.width = width - (width % SCALE);
        this.height = height - (height % SCALE);
        this.level = level;
        this.speed = Math.floor(speed);
        this.length = Math.floor(length);
        this.apples = Math.floor(apples);
    }

    load(func) {
        func(this.width, this.height, this.level, this.speed, this.length, this.apples);
    }
}