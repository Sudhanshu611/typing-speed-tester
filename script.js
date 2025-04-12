// Display Elements
const timerHTML = document.querySelector('.timer');
const wpmHTML = document.querySelector('.wpm');
const cpmHTML = document.querySelector('.cpm');
const accuracyHTML = document.querySelector('.accuracy');
const mistakesHTML = document.querySelector('.mistakes');

// Quote Area
const quoteArea = document.querySelector('.js-quote-area');

// Text Area
const textInput = document.querySelector('.js-text-area');


// https://random-word-api.herokuapp.com/word
let quoteWord = [];
let quoteSentence = []
async function quoteGenerator(){

    const response = await fetch('https://random-word-api.herokuapp.com/word');
    const data = await response.json();
    return data[0];
}

async function getQuote() {
    const promises = [];
    for (let i = 0; i < 20; i++){
        promises.push(quoteGenerator());
    }

    quoteWord = await Promise.all(promises);
    quoteSentence = quoteWord.join(' ');
    quoteWord = quoteSentence.split('').map((letter) => {
        return '<span class="">' + letter + '</span>'
    });
    quoteSentence = quoteWord.join('');
    console.log(quoteWord);
    quoteArea.innerHTML = quoteSentence;
}


getQuote();
