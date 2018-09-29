const SCALE = 15;

const MAX_WIDTH = window.innerWidth;
const MAX_HEIGHT = window.innerHeight;
const MAX_APPLES = 20;
const MAX_LENGTH = Math.floor(MAX_WIDTH / SCALE / 5);

const MIN_WIDTH = 350;
const MIN_HEIGHT = 350;
const MIN_APPLES = 1;
const MIN_LENGTH = 3;

const DEFAULT = {
    width: 450,
    height: 450,
    level: 'novice',
    speed: 10,
    length: 3,
    apples: 1
};

const SPEED_BY_LEVEL = {
    'novice': {
        min: 5,
        max: 15
    },
    'intermediate': {
        min: 16,
        max: 25
    },
    'hard': {
        min: 25,
        max: 50
    }
};

let settings;

let highScore;

function loadUserInterface() {
    saveBtn.addEventListener('click', () => {
        if (inputIsValid()) {
            saveConfiguration();
        } else {
            if (confirm('Your Settings Are Invalid! Load Defaults?')) {
                // Load previous settings
                settings.defaults();
                settings.load(loadInBrowser);
            }
        }
    });

    displayHighscore();

    levelInput.addEventListener('input', setSpeedLimits, true);

    settings = new UserSettings();

    // If settings were previously saved, load them
    if (settings.isStoraged()) {
        settings.import();
        settings.load(loadInBrowser);
    }

    restrictUserInputs();
}


function saveConfiguration() {
    configureAndSave();
    hideUI();
    showCanvas();
    setCanvasDimensions(settings.width, settings.height);
    showPlayGameBtn();
}


function configureAndSave() {
    // Save settings from inputs
    settings.configure(
        widthInput.value,
        heightInput.value,
        levelInput.value,
        speedInput.value,
        lengthInput.value,
        appleInput.value
    );
    settings.saveToStorage();
}


function inputIsValid() {
    if (widthInput.value < MIN_WIDTH || widthInput.value > MAX_WIDTH ||
        heightInput.value < MIN_HEIGHT || heightInput.value > MAX_HEIGHT ||
        speedInput.value < SPEED_BY_LEVEL[settings.level].min || speedInput.value > SPEED_BY_LEVEL[settings.level].max ||
        lengthInput.value < MIN_LENGTH || lengthInput.value > MAX_LENGTH ||
        appleInput.value < MIN_APPLES || appleInput.value > MAX_APPLES) {
        return false;
    }
    return true;
}


function restrictUserInputs() {
    widthInput.max = MAX_WIDTH;
    heightInput.max = MAX_HEIGHT;
    speedInput.max = SPEED_BY_LEVEL[settings.level].max;
    lengthInput.max = MAX_LENGTH;
    appleInput.max = MAX_APPLES;

    widthInput.min = MIN_WIDTH;
    heightInput.min = MIN_HEIGHT;
    speedInput.min = SPEED_BY_LEVEL[settings.level].min;
    lengthInput.min = MIN_LENGTH;
    appleInput.min = MIN_APPLES;
}


// Callback function that gets settings as parameters
function loadInBrowser(width, height, level, speed, length, apples) {
    widthInput.value = width;
    heightInput.value = height;
    document.getElementById(`${level}`).selected = true;
    speedInput.value = speed;
    lengthInput.value = length;
    appleInput.value = apples;
}


function setSpeedLimits() {
    settings.configure(
        widthInput.value,
        heightInput.value,
        levelInput.value,
        speedInput.value,
        lengthInput.value,
        appleInput.value
    );
    speedInput.max = SPEED_BY_LEVEL[settings.level].max;
    speedInput.min = SPEED_BY_LEVEL[settings.level].min;
    speedInput.value = SPEED_BY_LEVEL[settings.level].min;
}


function showPlayGameBtn() {
    playBtn.classList.remove('hidden');
}


function hideUI() {
    userInterface.classList.add('hidden');
}


function showCanvas() {
    canvas.classList.remove('hidden');
}


function setCanvasDimensions(width, height) {
    canvas.width = width;
    canvas.height = height;
}


function showInterface() {
    setTimeout(() => {
        canvas.classList.add('hidden');
        userInterface.classList.remove('hidden');
    }, 1500);
}