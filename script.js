let randomNumberValue = Math.floor(Math.random()*100 + 1);

const inputData = document.querySelector(".field");
const submitButtons = document.querySelector(".submit");
const guesses = document.querySelector(".guessess");
const lastResult = document.querySelector(".lastResult");
const lowHi = document.querySelector(".lowerHi");
const showResult = document.querySelector(".result");

const paragraph = document.createElement("p");

let previousGuess = [];
let numOfGuess = 1;
let playGame = true;

if(playGame){
    submitButtons.addEventListener("click", e => {
        e.preventDefault();
        const input = inputData.value;
        validateGuess(input);
    });
}

function validateGuess (guess) {
    if(isNaN(guess)) {
        alert("Please enter a valid number !");
    } else if (guess < 1) {
        alert("Please enetr a number more than 1 !");
    } else if (guess > 100) {
        alert ("Please enter a number less than 100 !");
    } else {
        previousGuess.push(guess);
        if (numOfGuess === 11) {
            displayGuess(guess);
            displayMessage (`Game over. Random number was ${randomNumberValue}`);
            endGame();
        } else {
            displayGuess(guess);
            checkGuess(guess);
        }
    }
}

function checkGuess(guess) {
    if (guess === randomNumberValue) {
        displayMessage(
            `Congratulations! You guessed the number in ${numOfGuess} guesses!`
            );
            endGame();
    } else if (guess < randomNumberValue) {
        displayMessage("Guessed number is tooooo low !");
    } else if (guess > randomNumberValue) {
        displayMessage("Guessed number is tooooo high !");
    
    }
}
function displayMessage (message){
    lowHi.innerHTML = `${message}`;
}
function displayGuess(guess) {
    inputData.value = "";
    guesses.innerHTML += `${guess} `;
    numOfGuess++;
    lastResult.innerHTML = `${11-numOfGuess}`;
    lastResult.innerHTML = lastResult.innerHTML < "0" ? 0 : lastResult.innerHTML;
}

function endGame() {
    inputData.value = "";
    inputData.setAttribute("disabled", "disabled");
    inputData.style.cursor = "no-drop";
    document.getElementById("submit").disabled = true;
    submitButtons.style.cursor = "no-drop";
    paragraph.classList.add("button");
    paragraph.innerHTML = `<button class="newGame">Start New Game</button>`;
    playGame = false;
    showResult.appendChild(paragraph);
    newGame();
}

function newGame() {
    const newGame = document.querySelector(".newGame");
    newGame.addEventListener("click", () => {
        randomNumberValue = Math.floor(Math.random() * 100 + 1);
        inputData.value = "";
        inputData.removeAttribute("disabled", "disabled");
        inputData.style.cursor = "default";
        document.getElementById("submit").disabled = false;
        submitButtons.style.cursor = "pointer";
        previousGuess = [];
        numOfGuess = 1;
        playGame = true;
        lastResult.innerHTML = `${11 - numOfGuess}`;
        guesses.innerHTML = "";
        lowHi.innerHTML ="";
        showResult.removeChild(paragraph);
    });
}
