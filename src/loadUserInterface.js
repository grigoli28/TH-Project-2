const SCALE = 10;

const MAX_WIDTH = Math.floor(window.innerWidth / 10) * 10;
const MAX_HEIGHT = Math.floor(window.innerHeight / 10) * 10;
const MAX_SPEED = 3;
const MAX_APPLES = 20;
const MAX_LENGTH = MAX_WIDTH / SCALE / 4;

const MIN_WIDTH = 300;
const MIN_HEIGHT = 300;
const MIN_SPEED = 1;
const MIN_APPLES = 1;
const MIN_LENGTH = 3;

const DEFAULT_LEVEL = 'novice';


let settings;

let timeout = null;

userInterface.addEventListener('input', () => {
    clearTimeout(timeout);
    timeout = setTimeout(saveSettings, 1000);
}, false);


function loadUserInterface() {
    saveBtn.addEventListener('click', () => {
        if (inputIsValid()) {
            displayCanvas();
        } else {
            alert('Your settings Invalid! Please Enter Valid Settings!');
        }
    });

    settings = new UserSettings();

    restrictUserInputs();

    if (settings.isStoraged()) {
        settings.import();
        settings.load(loadInBrowser);
    }
}


function displayCanvas() {
    saveSettings();
    userInterface.classList.add('hidden');
    canvas.width = widthInput.value;
    canvas.height = heightInput.value;
    canvas.classList.remove('hidden');
    playBtn.classList.remove('hidden');
}


function saveSettings() {
    if (!inputIsValid()) {
        alert('Your settings Invalid! Please Enter Valid Settings!');
    } else {
        settings.configure(
            widthInput.value,
            heightInput.value,
            levelInput.value,
            speedInput.value,
            lengthInput.value,
            appleInput.value
        );
    }
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


function loadInBrowser(width, height, level, speed, length, apples) {
    widthInput.value = width > MAX_WIDTH ? MAX_WIDTH : width;
    heightInput.value = height > MAX_HEIGHT ? MAX_HEIGHT : height;
    document.getElementById(`${level}`).selected = true;
    speedInput.value = speed;
    lengthInput.value = length;
    appleInput.value = apples;
}


function showInterface() {
    setTimeout(() => {
        canvas.classList.add('hidden');
        userInterface.classList.remove('hidden');
    }, 1500);
}