// This script finds quiz questions from the page
(() => {
    const questionElement = document.querySelector(".quiz-question");
    if (questionElement) {
        const questionText = questionElement.innerText;
        questionText ? questionText : "No question found";
    } else {
        return "No question found";
    }
})();
