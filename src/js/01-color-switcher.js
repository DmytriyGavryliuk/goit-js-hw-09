
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const startButton = document.querySelector('button[data-start]');
const stopButton = document.querySelector('button[data-stop]');
const bodyColor = document.querySelector(`body`);
stopButton.setAttribute(`disabled`, ``);

let timerId;
function timer() {
    timerId = setTimeout(onBodyColor, 1000);
}


startButton.addEventListener('click', onBodyColor);
stopButton.addEventListener(`click`, onStopColorChange);

function onBodyColor() {
    bodyColor.style.backgroundColor = getRandomHexColor();  
    startButton.setAttribute(`disabled`, ``);
    stopButton.removeAttribute(`disabled`)
    timer();
}

function onStopColorChange() {
    clearTimeout(timerId);
    stopButton.setAttribute(`disabled`, ``);
    if (startButton.hasAttribute(`disabled`)) {
        startButton.removeAttribute(`disabled`)
    } else return
}


