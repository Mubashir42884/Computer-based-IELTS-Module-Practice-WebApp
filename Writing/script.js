// Timer and button elements
const startButton = document.getElementById('startTimer');
const stopButton = document.getElementById('stopTimer');
const reloadButton = document.getElementById('reloadTimer');
const task1Button = document.getElementById('task1Button');
const task2Button = document.getElementById('task2Button');
const timerDisplay = document.getElementById('timer');
const textInput = document.getElementById('textInput');
const wordCountDisplay = document.getElementById('wordCount');

let timer;
let time = 0; // Default time in seconds
let timerRunning = false;

// Initialize the textInput as disabled
textInput.disabled = true;

// Function to set timer for Task 1 (20 mins) and Task 2 (40 mins)
function setTaskTime(taskTime) {
    time = taskTime; // Set time in seconds (20 mins = 1200, 40 mins = 2400)
    startButton.disabled = false; // Enable start button
    stopButton.disabled = true; // Disable stop button until timer starts
    updateDisplay(); // Show the updated time on display
}

// Update Timer Display
function updateDisplay() {
    const hours = Math.floor(time / 3600).toString().padStart(2, '0');
    const minutes = Math.floor((time % 3600) / 60).toString().padStart(2, '0');
    const seconds = (time % 60).toString().padStart(2, '0');
    timerDisplay.textContent = `${hours}:${minutes}:${seconds}`;
}

// Event Listeners for Task Buttons
task1Button.addEventListener('click', () => setTaskTime(1200)); // 20 mins
task2Button.addEventListener('click', () => setTaskTime(2400)); // 40 mins

// Start the timer
function startTimer() {
    if (!timerRunning) {
        timerRunning = true;
        textInput.disabled = false;
        stopButton.disabled = false; // Enable stop button
        startButton.disabled = true; // Disable start button while running
        clearInterval(timer);
        timer = setInterval(() => {
            if (time <= 0) {
                clearInterval(timer);
                timerRunning = false; 
                textInput.disabled = true; // Disable text input when time is up
                stopButton.disabled = true; // Disable stop button
                startButton.disabled = true; // Disable start button
            } else {
                time--;
                updateDisplay(); // Update the display
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
        startButton.disabled = false; // Allow start button to resume
    }
}

// Reload the entire page
function reloadTimer() {
    location.reload(); // Reload the current page
}

// Event Listeners
startButton.addEventListener('click', startTimer);
stopButton.addEventListener('click', stopTimer);
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




