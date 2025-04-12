import { sentence } from './sentence.js';

// Display Elements
const timerHTML = document.querySelector('.timer');

 const displayUnits = {
    wpm: 0,
    cpm: 0,
    accuracy:0,
    mistakes:0
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

textInput.addEventListener('input', () => {
    let userInput = textInput.value.split('');
    document.querySelectorAll('.sentence-chars').forEach((letter, index) =>{
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
            letter.classList.add('fail');
        }
    });
});