"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
//TODO these should be determined dynamically
const correctAnswersList = ['alabama', 'alaska', 'arizona', 'arkansas', 'california', 'colorado', 'connecticut', 'delaware', 'florida', 'georgia', 'hawaii', 'idaho', 'illinois', 'indiana', 'iowa', 'kansas', 'kentucky', 'louisiana', 'maine', 'maryland', 'massachusetts',
    'michigan', 'minnesota', 'mississippi', 'missouri', 'montana', 'nebraska', 'nevada', 'new hampshire', 'new jersey', 'new mexico', 'new york', 'north carolina', 'north dakota', 'ohio', 'oklahoma', 'oregon', 'pennsylvania', 'rhode island', 'south carolina', 'south dakota',
    'tennessee', 'texas', 'utah', 'vermont', 'virginia', 'washington', 'west virginia', 'wisconsin', 'wyoming'];
const sortElements = (selector) => {
    var _a;
    let sortFlag = true;
    while (sortFlag) {
        let i, sortMe = false;
        sortFlag = false;
        let elementItems = document.querySelectorAll(selector);
        for (i = 0; i < elementItems.length - 1; i++) {
            sortMe = false;
            if (elementItems[i].innerText.toLowerCase() > elementItems[i + 1].innerText.toLowerCase()) {
                sortMe = true;
                break;
            }
        }
        if (sortMe) {
            (_a = elementItems[i].parentNode) === null || _a === void 0 ? void 0 : _a.insertBefore(elementItems[i + 1], elementItems[i]);
            sortFlag = true;
        }
    }
};
const validateListing = () => {
    var _a;
    const currentQuizResults = Array.from(document.querySelectorAll('.quiz-results li'));
    const newQuizResult = document.createElement('li');
    newQuizResult.innerText = myInput.value;
    const totalCorrect = document.querySelector('.quiz-total-correct');
    if (currentQuizResults.find((li) => { var _a; return (((_a = li.textContent) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === newQuizResult.innerText.toLowerCase()); })) {
        newQuizResult.classList.add('quiz-invalid');
    }
    else if (correctAnswersList.includes(newQuizResult.innerText.toLowerCase())) {
        newQuizResult.classList.add('quiz-correct');
        if (totalCorrect && totalCorrect.textContent)
            totalCorrect.textContent = totalCorrect.textContent + 1;
    }
    else {
        newQuizResult.classList.add('quiz-incorrect');
    }
    (_a = document.querySelector('.quiz-results ol')) === null || _a === void 0 ? void 0 : _a.appendChild(newQuizResult);
    myInput.value = "";
};
const revealListing = () => {
    var _a;
    const currentQuizResults = Array.from(document.querySelectorAll('.quiz-results li'));
    let missingAnswers;
    if (currentQuizResults.length !== 0) {
        missingAnswers = correctAnswersList.filter((correct) => {
            return currentQuizResults.find(current => {
                return correct.toLowerCase() !== current.innerText.toLowerCase();
            });
        });
    }
    else {
        missingAnswers = correctAnswersList;
    }
    for (let answer of missingAnswers) {
        const newQuizResult = document.createElement('li');
        newQuizResult.innerText = answer;
        document.querySelector('.quiz-results ol').appendChild(newQuizResult);
    }
    (_a = document.querySelector('.quiz-results ol')) === null || _a === void 0 ? void 0 : _a.classList.toggle('list-order-reversed');
    sortElements('.quiz-results li');
    myInput.value = "";
    myInput.disabled = true;
    forfeitButton.disabled = true;
};
const resetQuiz = () => {
    const currentQuizResults = Array.from(document.querySelectorAll('.quiz-results li'));
    for (let quizResultItem of currentQuizResults) {
        quizResultItem.remove();
    }
    myInput.value = "";
    myInput.disabled = false;
    forfeitButton.disabled = false;
};
axios_1.default.get("https://api.quotable.io/random?tags=famous-quotes").then(res => {
    document.querySelector(".quote-content").textContent = res.data.content;
    document.querySelector(".quote-author").textContent = res.data.author;
});
// Events handlers
const myInput = document.querySelector(".quiz-listing input");
myInput.addEventListener("keyup", ({ key }) => {
    if (key === "Enter")
        validateListing();
});
const forfeitButton = document.querySelector(".quiz-forfeit-button");
forfeitButton.addEventListener("click", revealListing);
const restartButton = document.querySelector(".quiz-restart-button");
restartButton.addEventListener("click", resetQuiz);
