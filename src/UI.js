const SCALE = 20;

const MAX_WIDTH = window.innerWidth;
const MAX_HEIGHT = window.innerHeight;
const MAX_SPEED = 3; // ???
const MAX_APPLES = 20;
const MAX_LENGTH = Math.floor(MAX_WIDTH / SCALE / 5); // ???

const MIN_WIDTH = 400;
const MIN_HEIGHT = 400;
const MIN_SPEED = 1; // ???
const MIN_APPLES = 1;
const MIN_LENGTH = 3;
const MIN_LEVEL = 'novice';

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

    settings = new UserSettings();

    restrictUserInputs();

    // If settings were previously saved, load them
    if (settings.isStoraged()) {
        settings.import();
        settings.load(loadInBrowser);
    }
}


function saveConfiguration() {
    saveSettings();
    hideUI();
    showCanvas();
    setCanvasDimensions(settings.boardWidth, settings.boardHeight);
    showPlayGameBtn();
}


function saveSettings() {
    // Save settings from inputs
    settings.configure(
        widthInput.value,
        heightInput.value,
        levelInput.value,
        speedInput.value,
        lengthInput.value
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
    speedInput.max = MAX_SPEED;
    lengthInput.max = MAX_LENGTH;
    appleInput.max = MAX_APPLES;

    widthInput.min = MIN_WIDTH;
    heightInput.min = MIN_HEIGHT;
    speedInput.min = MIN_SPEED;
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