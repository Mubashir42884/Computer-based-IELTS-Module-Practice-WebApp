// Timer and button elements
const startButton = document.getElementById('startTimer');
const stopButton = document.getElementById('stopTimer');
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
        stopButton.disabled = false; // Enable stop button
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
                stopButton.disabled = true; // Disable stop button when time is up
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
        stopButton.disabled = true; // Disable stop button
    }
}

// Event Listeners
startButton.addEventListener('click', startTimer);
stopButton.addEventListener('click', stopTimer);

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

// Handle PDF Upload for Answers
answersPdfInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const fileURL = URL.createObjectURL(file);
        answersPdfInput.dataset.fileUrl = fileURL; // Store the file URL
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

// Handle "View Answers" Button Click
viewAnswersButton.addEventListener('click', () => {
    const answersFileUrl = answersPdfInput.dataset.fileUrl;
    if (answersFileUrl) {
        const embedElement = `<embed src="${answersFileUrl}" width="100%" height="100%" type="application/pdf">`;
        pdfViewer.innerHTML = embedElement;
        pdfViewer.style.display = 'block'; // Show the PDF viewer
    } else {
        alert("Please upload an answers PDF first."); // Alert if no file is uploaded
    }
});