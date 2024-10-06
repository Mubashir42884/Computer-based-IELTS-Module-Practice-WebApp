// Timer and button elements
const startButton = document.getElementById('startTimer');
const stopButton = document.getElementById('stopTimer');
const timerDisplay = document.getElementById('timer');
const textInput = document.getElementById('textInput');
const wordCountDisplay = document.getElementById('wordCount');

let timer;
let time = 3600; // 1 hour in seconds
let timerRunning = false; 

// Initialize the textInput as disabled
textInput.disabled = true;

// Start the timer
function startTimer() {
    if (!timerRunning) {
        timerRunning = true;
        textInput.disabled = false; // Enable text input when timer is running
        clearInterval(timer);
        timer = setInterval(() => {
            if (time <= 0) {
                clearInterval(timer);
                textInput.disabled = true; // Disable text input when time is up
                stopButton.disabled = true;
            } else {
                time--;
                const hours = Math.floor(time / 3600).toString().padStart(2, '0');
                const minutes = Math.floor((time % 3600) / 60).toString().padStart(2, '0');
                const seconds = (time % 60).toString().padStart(2, '0');
                timerDisplay.textContent = `${hours}:${minutes}:${seconds}`;
            }
        }, 1000);
    }
}

// Stop the timer
function stopTimer() {
    if (timerRunning) {
        clearInterval(timer);
        timerRunning = false;
        textInput.disabled = true; // Disable text input when timer is stopped
    }
}

// Function to reload the entire page
function reloadTimer() {
    location.reload(); // Reload the current page
}

// Reload button functionality
const reloadButton = document.getElementById('reloadTimer');
reloadButton.addEventListener('click', reloadTimer);




// Word count functionality
textInput.addEventListener('input', () => {
    const text = textInput.value.trim();
    const words = text.split(' ').filter(word => word.length > 0);
    wordCountDisplay.textContent = `Word Count: ${words.length}`;
});

// Start button functionality
startButton.addEventListener('click', () => {
    startTimer();
    startButton.disabled = true;  
    stopButton.disabled = false; 
});

// Stop button functionality
stopButton.addEventListener('click', () => {
    stopTimer();
    stopButton.disabled = true;  
    startButton.disabled = false;
});

// Dark/Light mode toggle functionality
const toggleButton = document.getElementById('toggleMode');
const container = document.querySelector('.container');

toggleButton.addEventListener('click', () => {
    container.classList.toggle('light-mode');

    if (container.classList.contains('light-mode')) {
        toggleButton.textContent = '🌙'; 
    } else {
        toggleButton.textContent = '☀️';
    }
});




