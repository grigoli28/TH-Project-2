const SCALE = 15;

const MAX_WIDTH = window.innerWidth;
const MAX_HEIGHT = window.innerHeight;
const MAX_SPEED = 50; // ???
const MAX_APPLES = 20;
const MAX_LENGTH = Math.floor(MAX_WIDTH / SCALE / 5); // ???

const MIN_WIDTH = 300;
const MIN_HEIGHT = 300;
const MIN_SPEED = 5; // ???
const MIN_APPLES = 1;
const MIN_LENGTH = 3;
const MIN_LEVEL = 'novice';

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


function loadUserInterface() {
    saveBtn.addEventListener('click', () => {
        if (inputIsValid()) {
            saveConfiguration();
        } else {
            if (confirm('Your Settings Are Invalid! Load Defaults?')) {
                // Load previous settings
                settings.load(loadInBrowser);
            }
        }
    });

    levelInput.addEventListener('input', setSpeedLimits);

    settings = new UserSettings();

    // If settings were previously saved, load them
    if (settings.isStoraged()) {
        settings.import();
        settings.load(loadInBrowser);
    }

    restrictUserInputs();
}


function saveConfiguration() {
    saveSettings();
    hideUI();
    showCanvas();
    setCanvasDimensions(settings.width, settings.height);
    showPlayGameBtn();
}


function saveSettings() {
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
        speedInput.value < MIN_SPEED || speedInput.value > MAX_SPEED ||
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
    speedInput.max = SPEED_BY_LEVEL[settings.level].max;
    speedInput.min = SPEED_BY_LEVEL[settings.level].min;
    speedInput.value = SPEED_BY_LEVEL[settings.level].min;
    console.log(settings.level);
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