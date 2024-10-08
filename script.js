// Initialize variables
let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;
let lapCounter = 1;

// Reference DOM elements
const display = document.getElementById('display');
const startPauseBtn = document.getElementById('startPauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsList = document.getElementById('laps');

// Function to format time as MM:SS:MS
function formatTime(ms) {
    let totalSeconds = Math.floor(ms / 1000);
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;
    let milliseconds = Math.floor((ms % 1000) / 10);

    return (
        String(minutes).padStart(2, '0') +
        ':' +
        String(seconds).padStart(2, '0') +
        ':' +
        String(milliseconds).padStart(2, '0')
    );
}

// Function to start the stopwatch
function startTimer() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(function () {
        elapsedTime = Date.now() - startTime;
        display.textContent = formatTime(elapsedTime);
    }, 10);
    isRunning = true;
    startPauseBtn.textContent = 'Pause';
}

// Function to pause the stopwatch
function pauseTimer() {
    clearInterval(timerInterval);
    isRunning = false;
    startPauseBtn.textContent = 'Start';
}

// Function to reset the stopwatch
function resetTimer() {
    clearInterval(timerInterval);
    isRunning = false;
    elapsedTime = 0;
    lapCounter = 1;
    display.textContent = '00:00:00';
    startPauseBtn.textContent = 'Start';
    lapsList.innerHTML = '';
}

// Function to record a lap
function recordLap() {
    if (isRunning) {
        const lapTime = formatTime(elapsedTime);
        const lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${lapCounter}: ${lapTime}`;
        lapsList.appendChild(lapItem);
        lapCounter++;
    }
}

// Event listeners for buttons
startPauseBtn.addEventListener('click', function () {
    if (!isRunning) {
        startTimer();
    } else {
        pauseTimer();
    }
});

resetBtn.addEventListener('click', resetTimer);

lapBtn.addEventListener('click', recordLap);