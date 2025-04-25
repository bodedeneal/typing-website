const quoteDisplayElement = document.getElementById('quote-display');
const quoteInputElement = document.getElementById('quote-input');
const timerElement = document.getElementById('timer');
const accuracyElement = document.getElementById('accuracy');
const restartButton = document.getElementById('restart-btn');

const quotes = [
    "The quick brown fox jumps over the lazy dog.",
    "Typing tests improve your speed and accuracy.",
    "Practice makes perfect!",
    "Stay focused and keep typing.",
    "Programming is thinking, not typing."
];

let startTime;
let timerInterval;
let currentQuote = '';

function getRandomQuote() {
    return quotes[Math.floor(Math.random() * quotes.length)];
}

function renderNewQuote() {
    currentQuote = getRandomQuote();
    quoteDisplayElement.innerHTML = '';
    currentQuote.split('').forEach(char => {
        const span = document.createElement('span');
        span.innerText = char;
        quoteDisplayElement.appendChild(span);
    });
    quoteInputElement.value = null;
    startTimer();
}

function startTimer() {
    clearInterval(timerInterval);
    startTime = new Date();
    timerInterval = setInterval(() => {
        timerElement.innerText = Math.floor((new Date() - startTime) / 1000);
    }, 1000);
}

function calculateAccuracy() {
    const input = quoteInputElement.value;
    const quoteChars = currentQuote.split('');
    const inputChars = input.split('');
    let correct = 0;

    quoteChars.forEach((char, index) => {
        if (char === inputChars[index]) correct++;
    });

    accuracyElement.innerText = inputChars.length > 0 
        ? Math.floor((correct / inputChars.length) * 100) + '%' 
        : '100%';
}

quoteInputElement.addEventListener('input', () => {
    const arrayQuote = quoteDisplayElement.querySelectorAll('span');
    const arrayValue = quoteInputElement.value.split('');

    let correct = true;
    arrayQuote.forEach((charSpan, index) => {
        const char = arrayValue[index];
        if (char == null) {
            charSpan.classList.remove('correct');
            charSpan.classList.remove('incorrect');
            correct = false;
        } else if (char === charSpan.innerText) {
            charSpan.classList.add('correct');
            charSpan.classList.remove('incorrect');
        } else {
            charSpan.classList.remove('correct');
            charSpan.classList.add('incorrect');
            correct = false;
        }
    });

    if (correct && arrayValue.length === arrayQuote.length) {
        clearInterval(timerInterval);
    }

    calculateAccuracy();
});

restartButton.addEventListener('click', () => {
    renderNewQuote();
    timerElement.innerText = '0';
    accuracyElement.innerText = '100%';
});

renderNewQuote();
