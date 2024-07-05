// script.js
let timer;
let isRunning = false;
let startTime;
let elapsedTime = 0;
let countdownTime;
let isTimerSet = false;

const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const setTimerBtn = document.getElementById('setTimerBtn');
const hoursInput = document.getElementById('hours');
const minutesInput = document.getElementById('minutes');
const secondsInput = document.getElementById('seconds');

startStopBtn.addEventListener('click', () => {
    if (isRunning) {
        clearInterval(timer);
        startStopBtn.textContent = 'Start';
    } else {
        if (isTimerSet) {
            countdownTime = (parseInt(hoursInput.value || 0) * 3600000) +
                            (parseInt(minutesInput.value || 0) * 60000) +
                            (parseInt(secondsInput.value || 0) * 1000);
            startTime = Date.now() + countdownTime;
            timer = setInterval(updateCountdown, 1000);
        } else {
            startTime = Date.now() - elapsedTime;
            timer = setInterval(updateStopwatch, 1000);
        }
        startStopBtn.textContent = 'Stop';
    }
    isRunning = !isRunning;
});

resetBtn.addEventListener('click', () => {
    clearInterval(timer);
    isRunning = false;
    elapsedTime = 0;
    display.textContent = '00:00:00';
    startStopBtn.textContent = 'Start';
    isTimerSet = false;
});

setTimerBtn.addEventListener('click', () => {
    isTimerSet = true;
    display.textContent = `${pad(hoursInput.value || 0)}:${pad(minutesInput.value || 0)}:${pad(secondsInput.value || 0)}`;
});

function updateStopwatch() {
    elapsedTime = Date.now() - startTime;
    const hours = Math.floor(elapsedTime / 3600000);
    const minutes = Math.floor((elapsedTime % 3600000) / 60000);
    const seconds = Math.floor((elapsedTime % 60000) / 1000);
    display.textContent = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

function updateCountdown() {
    const remainingTime = startTime - Date.now();
    if (remainingTime <= 0) {
        clearInterval(timer);
        display.textContent = '00:00:00';
        alert('Time is up!');
        isRunning = false;
        startStopBtn.textContent = 'Start';
    } else {
        const hours = Math.floor(remainingTime / 3600000);
        const minutes = Math.floor((remainingTime % 3600000) / 60000);
        const seconds = Math.floor((remainingTime % 60000) / 1000);
        display.textContent = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
    }
}

function pad(number) {
    return number < 10 ? '0' + number : number;
}
