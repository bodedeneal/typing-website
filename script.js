const quoteDisplayElement = document.getElementById('quote-display');
const quoteInputElement = document.getElementById('quote-input');
const timerElement = document.getElementById('timer');
const accuracyElement = document.getElementById('accuracy');
const restartButton = document.getElementById('restart-btn');

const quotes = [
    // Short Quotes
    "Life is short, smile while you still have teeth.",
    "Be yourself; everyone else is already taken.",
    "Simplicity is the ultimate sophistication.",
    "Do more of what makes you happy.",
    "Dream big and dare to fail.",
    "Keep calm and carry on.",
    "Actions speak louder than words.",
    "When nothing goes right, go left.",
    "Stay positive, work hard, make it happen.",
    "Happiness depends upon ourselves.",
    
    // Long Quotes
    "In the middle of every difficulty lies opportunity. — Albert Einstein",
    "Success is not final, failure is not fatal: It is the courage to continue that counts. — Winston Churchill",
    "The future belongs to those who believe in the beauty of their dreams. — Eleanor Roosevelt",
    "Do not go where the path may lead, go instead where there is no path and leave a trail. — Ralph Waldo Emerson",
    "Happiness is not something ready-made. It comes from your own actions. — Dalai Lama",
    "The only limit to our realization of tomorrow will be our doubts of today. — Franklin D. Roosevelt",
    "It does not matter how slowly you go as long as you do not stop. — Confucius",
    "Perseverance is not a long race; it is many short races one after the other. — Walter Elliot",
    "What lies behind us and what lies before us are tiny matters compared to what lies within us. — Ralph Waldo Emerson",
    "Your time is limited, so don't waste it living someone else's life. — Steve Jobs"
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
