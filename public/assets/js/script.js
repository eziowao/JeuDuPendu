const wordsList = ['souris', 'clavier', 'pixel', 'bluetooth', 'javascript', 'ruby', 'bootstrap', 'application', 'python', 'react', 'angular', 'laravel'];
const chosenWord = wordsList[Math.floor(Math.random() * wordsList.length)];

let hiddenWord = '';

for (let i = 0; i < chosenWord.length; i++) {
    hiddenWord += '_';
}

let hiddenWordWithSpaces = hiddenWord.split('').join(' ');

const displayHiddenWord = () => {
    const hiddenWordElement = document.getElementById('hiddenWord');
    hiddenWordElement.textContent = hiddenWordWithSpaces;
};

let trialsLeft = 10;

const hangedImgDisplay = (nb) => {
    const hangedImg = document.querySelector('#hangedImg img');
    hangedImg.src = `./public/assets/img/pendu${nb}.png`;
};

const winImgDisplay = () => {
    const winImg = document.querySelector('#winImg img')
    return winImg
}

const letterClick = (event) => {
    const clickedButton = event.target;
    const letter = clickedButton.textContent;

    let letterFound = false;
    for (let i = 0; i < chosenWord.length; i++) {
        if (chosenWord[i] === letter) {
            hiddenWord = hiddenWord.substring(0, i) + letter + hiddenWord.substring(i + 1);
            letterFound = true;
        }
    }

    hiddenWordWithSpaces = hiddenWord.split('').join(' ');
    displayHiddenWord();

    clickedButton.disabled = true;

    const hangedImg = document.querySelector('#hangedImg');
    const winImg = document.querySelector('#winImg');

    if (!letterFound) {
        trialsLeft--;
        displayTrialsLeft();
        hangedImgDisplay(10 - trialsLeft);
        if (trialsLeft === 0) {
            disableAllLetterButtons();
            displayResultMessage("lose");
            showReplayButton();
        }
    } else {
        if (hiddenWord === chosenWord) {
            disableAllLetterButtons();
            displayResultMessage("win");
            hangedImg.remove()
            winImgDisplay();
            winImg.classList.remove('hidden')
            showReplayButton();
        }
    }
};

const displayTrialsLeft = () => {
    const trialsLeftElement = document.getElementById('trialsLeft');
    trialsLeftElement.textContent = `Chances restantes : ${trialsLeft}`;
};

const disableAllLetterButtons = () => {
    const letterButtons = document.querySelectorAll('#alphabet button');
    letterButtons.forEach(button => {
        button.disabled = true;
    });
};

const displayResultMessage = (result) => {
    const messageElement = document.getElementById('resultMessage');
    if (result === "win") {
        messageElement.textContent = "Bien vu t'as trouve le mot !";
    } else if (result === "lose") {
        messageElement.textContent = "Oups, t'as perdu ";
    }
};

const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

const displayAlphabet = () => {
    const alphabetContainer = document.getElementById('alphabet');

    alphabetContainer.innerHTML = '';

    alphabet.forEach((letter) => {
        const letterElement = document.createElement('button');
        letterElement.textContent = letter;
        letterElement.addEventListener('click', letterClick);

        if (hiddenWord.includes(letter)) {
            letterElement.disabled = true;
        }
        alphabetContainer.appendChild(letterElement);
    });
};

displayAlphabet();
displayHiddenWord();
displayTrialsLeft();

const replayButton = document.getElementById('replay-button');

const showReplayButton = () => {
    replayButton.classList.remove('hidden');
};

replayButton.addEventListener('click', () => {
    location.reload();
});