// Timer and button elements
const startButton = document.getElementById('startTimer');
const pauseButton = document.getElementById('stopTimer');
const timerDisplay = document.getElementById('timer');
const reloadBtn = document.getElementById('reloadBtn');


// Timer functionality
let timer;
let time = 3600; // 1 hour in seconds
let timerRunning = false;

// Start the timer
function startTimer() {
    if (!timerRunning) {
        timerRunning = true;
        pauseButton.disabled = false; // Enable stop button
        clearInterval(timer); // Clear any existing timer

        // Update the display immediately when starting
        const updateDisplay = () => {
            const hours = Math.floor(time / 3600).toString().padStart(2, '0');
            const minutes = Math.floor((time % 3600) / 60).toString().padStart(2, '0');
            const seconds = (time % 60).toString().padStart(2, '0');
            timerDisplay.textContent = `Time: ${hours}:${minutes}:${seconds}`;
        };

        timer = setInterval(() => {
            if (time <= 0) {
                clearInterval(timer);
                timerRunning = false; // Timer stops running
                pauseButton.disabled = true; // Disable stop button when time is up
            } else {
                time--; // Decrement time
                updateDisplay(); // Update the display
            }
        }, 1000);

        updateDisplay(); // Initial display when starting
    }
}

// Stop the timer
function stopTimer() {
    if (timerRunning) {
        clearInterval(timer); // Stop the timer
        timerRunning = false; // Timer is not running anymore
        pauseButton.disabled = true; // Disable stop button
    }
}

// Event Listeners
startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', stopTimer);

// Function to reload the entire page
function reloadTimer() {
    location.reload(); // Reload the current page
}

// Reload button functionality
const reloadButton = document.getElementById('reloadTimer');
reloadButton.addEventListener('click', reloadTimer);

// Element references
const readingTestBtn = document.getElementById('readingTestBtn');
const fileUploadSection = document.getElementById('fileUploadSection');
const questionPdfInput = document.getElementById('pdfUploadQuestion');
const answersPdfInput = document.getElementById('pdfUploadAnswers');
const viewQuestionButton = document.getElementById('viewQuestionButton');
const viewAnswersButton = document.getElementById('viewAnswersButton');
const pdfViewer = document.getElementById('pdfViewer');


// Handle PDF Upload for Question
questionPdfInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const fileURL = URL.createObjectURL(file);
        questionPdfInput.dataset.fileUrl = fileURL; // Store the file URL
    }
});


// Handle "View Question" Button Click
viewQuestionButton.addEventListener('click', () => {
    const questionFileUrl = questionPdfInput.dataset.fileUrl;
    if (questionFileUrl) {
        const embedElement = `<embed src="${questionFileUrl}" width="100%" height="100%" type="application/pdf">`;
        pdfViewer.innerHTML = embedElement;
        pdfViewer.style.display = 'block'; // Show the PDF viewer
    } else {
        alert("Please upload a question PDF first."); // Alert if no file is uploaded
    }
});


//-----------------------AUDIO UPLOAD & CONTROLS

const audioUpload = document.getElementById('audioUpload');
const playButton = document.getElementById('playButton');
const pausedButton = document.getElementById('pauseButton');
const stopButton = document.getElementById('stopButton');
const restartButton = document.getElementById('restartButton');
const progressBar = document.getElementById('progressBar');
const currentTimeElement = document.getElementById('currentTime');
const durationTimeElement = document.getElementById('durationTime');

let audio = new Audio();
let audioDuration = 0;
let isPaused = false;

// Handle Audio Upload
audioUpload.addEventListener('change', function (event) {
    const file = event.target.files[0];
    if (file) {
        const fileURL = URL.createObjectURL(file);
        audio.src = fileURL;

        audio.onloadedmetadata = function () {
            audioDuration = Math.floor(audio.duration);
            durationTimeElement.textContent = formatTime(audioDuration);
            playButton.disabled = false;
            pausedButton.disabled = false;
            stopButton.disabled = false;
            restartButton.disabled = false;
        };
    }
});

// Play Button
playButton.addEventListener('click', function () {
    if (isPaused) {
        audio.play();
        isPaused = false;
    } else {
        audio.play();
    }
});

// Pause Button
pausedButton.addEventListener('click', function () {
    audio.pause();
    isPaused = true;
});

// Restart Button
restartButton.addEventListener('click', function () {
    audio.currentTime = 0;
    audio.play();
    isPaused = false;
});

// Stop Button
stopButton.addEventListener('click', function () {
    audio.pause();
    audio.currentTime = 0;
    isPaused = false;
});

// Update Progress Bar and Timer
audio.addEventListener('timeupdate', function () {
    const currentTime = Math.floor(audio.currentTime);
    currentTimeElement.textContent = formatTime(currentTime);
    updateProgressBar(currentTime, audioDuration);
});

// Reset progress bar and timer when audio ends
audio.addEventListener('ended', function () {
    audio.currentTime = 0;
    currentTimeElement.textContent = '0:00';
    progressBar.style.width = '0%';
    isPaused = false;
});

// Helper function to format time
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

// Update progress bar width
function updateProgressBar(currentTime, duration) {
    const percentage = (currentTime / duration) * 100;
    progressBar.style.width = `${percentage}%`;
}


// Score Calculation

const correctButtons = document.querySelectorAll('.correct-btn');
const wrongButtons = document.querySelectorAll('.wrong-btn');
const solveBoxes = document.querySelectorAll('.solve-box'); // Select all solve boxes
const scoreDisplay = document.getElementById('scoreDisplay');

let score = 0;
const totalInputs = 40;

// Add event listeners to all correct buttons
correctButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        // Mark this button as clicked and prevent multiple score increments
        if (!button.classList.contains('clicked')) {
            button.classList.add('clicked');
            wrongButtons[index].classList.remove('clicked'); // Unmark the wrong button if it was clicked
            solveBoxes[index].disabled = true; // Disable the solve box if the answer is correct
            solveBoxes[index].hidden = true; // Hide the solve box if the answer is correct
            score++;
            updateScore();
        }
    });
});

// Add event listeners to all wrong buttons
wrongButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        // Mark this button as clicked and decrement the score if previously marked as correct
        if (!button.classList.contains('clicked')) {
            button.classList.add('clicked');
            correctButtons[index].classList.remove('clicked'); // Unmark the correct button if it was clicked
            if (score > 0 && correctButtons[index].classList.contains('clicked')) {
                score--;
            }
            solveBoxes[index].disabled = false; // Enable the solve box if the answer is wrong
            solveBoxes[index].hidden = false; // Unhide the solve box if the answer is wrong
            updateScore();
        }
    });
});

// Update the score display
function updateScore() {
    scoreDisplay.textContent = `Score: ${score}/${totalInputs}`;
}

