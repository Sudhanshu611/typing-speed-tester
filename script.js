import { sentence } from './sentence.js';

// Display Elements
const timerHTML = document.querySelector('.timer');

let interval = null;

 const displayUnits = {
    timeleft: 30,
    wpm: 0,
    cpm: 0,
    accuracy:0,
    mistakes:0,
    inputLength: 0
}

const wpmHTML = document.querySelector('.wpm');
const cpmHTML = document.querySelector('.cpm');
const accuracyHTML = document.querySelector('.accuracy');
const mistakesHTML = document.querySelector('.mistakes');

// Quote Area
const sentenceArea = document.querySelector('.js-quote-area');

// Text Area
const textInput = document.querySelector('.js-text-area');

let arr = sentence.split('').map((letter) => {
    return `<span class="sentence-chars">${letter}</span>`
});

sentenceArea.innerHTML = arr.join('');
textInput.disabled = true;
let isTestRunning = false;

function calc(userInput){
    if (displayUnits.timeleft > 0){
    const timetaken = (30 - displayUnits.timeleft)/60;
    displayUnits.wpm = Math.floor(userInput / 5 / timetaken);
    displayUnits.cpm = Math.floor(userInput / timetaken);
    displayUnits.accuracy = Math.floor(((userInput - displayUnits.mistakes) / sentence.length) * 100);
}
}

function startTest(){
    isTestRunning = true;
    interval = setInterval(updateTimer, 1000);
    textInput.disabled = false;
    textInput.focus();
}

function disabler(){
    clearInterval(interval);
    textInput.disabled = true;
    isTestRunning = false;
    updateUi();
    document.querySelector('.start-btn button').innerText='Restart';
    document.querySelector('.start-btn button').addEventListener('click', ()=>{
        window.location.href = window.location.href;
        location.reload();
    });
}

function updateTimer(){
    timerHTML.innerHTML = `Timer: ${String(Math.floor(displayUnits.timeleft/60)).padStart(2,'0')}:${String(displayUnits.timeleft%60).padStart(2,'0')}`;
    displayUnits.timeleft--;
    if (displayUnits.timeleft < 0){
        clearInterval(interval);
    }
    calc(displayUnits.inputLength, (30 - displayUnits.timeleft));
    updateUi();
    if (displayUnits.inputLength === arr.length || displayUnits.timeleft < 0) {
        disabler();
    }
}

function updateUi(){
    wpmHTML.innerHTML = `WPM: ${displayUnits.wpm}`;
    cpmHTML.innerHTML = `CPM: ${displayUnits.cpm}`;
    accuracyHTML.innerHTML = `Accuracy: ${displayUnits.accuracy}%`;
    mistakesHTML.innerHTML = `Mistakes: ${String(displayUnits.mistakes).padStart(2, '0')}`;
}

textInput.addEventListener('input', () => {
    if (displayUnits.inputLength === arr.length) disabler();

    let userInput = textInput.value.split('');

    displayUnits.inputLength = userInput.length;
    const letterSpans = Array.from(document.querySelectorAll('.sentence-chars'));
    letterSpans.forEach((letter, index) =>{
        if (letter.innerText === userInput[index]){
            letter.classList.add('pass');
        }
        else if(userInput[index] == null){
            if (letter.classList.contains('pass')){
                letter.classList.remove('pass');
            }
            else if(letter.classList.contains('fail')){
                letter.classList.remove('fail');
            }
        }
        // not letter.innerText !== userInput[index] because its true for every letter in sentence that has not been typed
        else if (!letter.classList.contains('fail')){
            displayUnits.mistakes += 1;
            letter.classList.add('fail');
        }
    });
});


document.querySelector('.start-btn').addEventListener('click',startTest);
