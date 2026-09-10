let controller;
let graphics;

const createPlayer = name => {
    const playerName = name;
    let playerLifes = 6;
    let playerWins = 0;
    
    // decrease the player lifes each time they fail to choose the correct word
    const decreaseLifes = () => { playerLifes--; };
    
    // increase the player wins each time they win
    const increasePlayerWins = () => { playerWins++; };

    // reset the player lifes each time the game restarts
    const resetPlayerLifes = () => { playerLifes = 6; };

    // return the amount of lifes the player has
    const getPlayerLifes = () => { return playerLifes; }

    return { playerName, decreaseLifes, increasePlayerWins, resetPlayerLifes, getPlayerLifes }
}

const GameController = (name) => {
    // create the player each time a new game is created
    const player = createPlayer(name);

    const words = [
        // short words (3-4 letters)
        "cat",  "sun",  "dog",  "run",  "box",
        "key",  "map",  "top",  "cup",  "fix",
        "jam",  "owl",  "pen",  "sky",  "tea",
        "web",  "arm",  "bag",  "cold", "door",
        "echo", "fish", "gold", "hand", "idea",
        "jump", "kite", "lamp", "mind", "nest",
        "open", "page", "quiz", "rain", "ship",

        // medium words (5-7 letters)
        "apple",  "bridge", "candle", "danger", "effort",
        "flower", "garden", "health", "island", "jacket",
        "kernel", "ladder", "market", "nature", "orange",
        "pencil", "quiet",  "rocket", "silver", "travel",
        "unique", "valley", "window", "yellow", "zebra",
        "basket", "camera", "dinner", "engine", "forest",
        "guitar", "hunter", "insect", "junior", "planet",

        // long words (8+ letters)
        "adventure", "beautiful", "chocolate", "dangerous",
        "elephant",  "fantastic", "generator", "happiness",
        "important", "knowledge", "landscape", "mountain",
        "necessary", "obstacle",  "painting",  "question",
        "remember",  "sandwich",  "telescope", "umbrella",
        "vacation",  "wonderful", "xylophone", "yesterday",
        "algorithm", "butterfly", "celebrate", "different",
        "education", "framework",
    ];

  // a random selector to get the word based on the difficulty chosen by the player.
  const getCurrentWord = (difficulty) => {
    let filteredWords;
    if(difficulty === 1){
        filteredWords = words.filter(letters => letters.length <= 4);
    } else if(difficulty === 2){
        filteredWords = words.filter(letters => letters.length > 4 && letters.length <= 7);
    } else {
        filteredWords = words.filter(letters => letters.length >= 8);
    }

    return filteredWords[Math.floor(Math.random() * filteredWords.length)];
  };

  // array that stores the player's correct guesses
  const generatePlayerArray = (word) => {
    let playerWord = new Array(word.length);
    return playerWord;
  }

  // function that decides the players accuracy 
  const isPlayerAccurate = (word, letter, position, playerArray) => {
    // this variable will allow us to paint the text boxes
    let status;
    let lowerCaseLetter = letter.toLowerCase();
    if(word.includes(lowerCaseLetter) && word[position] === lowerCaseLetter){
        status = 'accurate';
        // if accurate, insert the letter into the position
        playerArray[position] = lowerCaseLetter;
        console.log(player.getPlayerLifes());
    } else if(word.includes(lowerCaseLetter) && word[position] !== lowerCaseLetter){
        status = 'present';
        player.decreaseLifes();
        console.log(player.getPlayerLifes());
    } else {
        status = 'inaccurate';
        player.decreaseLifes();
        console.log(player.getPlayerLifes());
    }
    // remove this console logs once the final version is published
    console.log(word);
    console.log(status);
    return { status };
  }

  // function that verifies if the round is won or lost
  const gameStatusChecker = (playerWord, word) => {
    let isRoundWon;
    if(player.getPlayerLifes() === 0){
        alert('game lost');
        isRoundWon = false;
    } else if(playerWord.join('').toLowerCase() === word && player.getPlayerLifes() > 0){
        alert('game won');
        isRoundWon = true;
    }
    return { isRoundWon };
  }


  return { getCurrentWord, isPlayerAccurate, generatePlayerArray, gameStatusChecker }
};

const GraphicInterface = () => {
    // function that removes the game start form
    const removeGameStartForm = (form, screen) => {
        form.classList.add('invisible');
        screen.classList.remove('invisible');
    }

    // function that appends textarea boxes according to the length of the word
    const appendTextArea = (word, area) => {
        for(let i = 0; i < word.length; i++){
            area.innerHTML += 
            `
                <input type="text" maxlength="1" pattern="[A-Za-z]" id="box-${i}" class="text-box">
            `
        }
    }

    // graphical function that blocks the boxes if another box has input
    const blockEmptyBoxes = boxes => {
        const textAreaArray = Array.from(boxes);
        const isOneBoxFilled = textAreaArray.some(box => box.value !== '' && !box.classList.contains('accurate'));
        textAreaArray.forEach(box => {
            box.disabled = isOneBoxFilled && box.value === '';
        });
    }

    // this function adds the class to the respective text box where the player guessed
    const addStatusToBoxes = (status, position) => {
        const box = document.getElementById(`box-${position}`);
        if(box.classList.contains('inaccurate')){
            box.classList.remove('inaccurate');
            box.classList.add(status);
        } else if(box.classList.contains('present')){
            box.classList.remove('present');
            box.classList.add(status);
        }
        box.classList.add(status);
        box.readOnly = status === 'accurate';
    }

    // this function removes the status class when the player presses backspace
    const removeStatusBoxes = box => {
        if(box.classList.contains('inaccurate') || box.classList.contains('present')){
            box.classList.remove('inaccurate');
            box.classList.remove('present');
        }
    }

    // this function gets the player guess from the GUI
    const getPlayerGuess = boxes => {
        const position = Array.from(boxes).findIndex(box => box.value !== '' && !box.classList.contains('accurate'));
        const letter = boxes[position].value;
        return { letter, position };
    }

    
    return { removeGameStartForm, appendTextArea, blockEmptyBoxes, getPlayerGuess, addStatusToBoxes, removeStatusBoxes }
      
}

// We add our factory functions to our variables
graphics = GraphicInterface();

// We declare our DOM variables
const gameForm = document.getElementById('begin-game');
const formUserName = document.getElementById('name');
const formGameDifficulty = document.getElementById('difficulty');
const gameScreen = document.getElementById('gamescreen');
const hangmanArea = document.getElementById('hangman-area');
const lettersArea = document.getElementById('letters-area');
const checkAnswerBtn = document.getElementById('check-answer');

// Global variables that we will need, because we need them to be accesible (at least for now).
let word;
let playerArray;

gameForm.addEventListener('submit', (e) => {
    e.preventDefault();
    controller = GameController(formUserName.value);
    graphics.removeGameStartForm(gameForm, gameScreen);
    word = controller.getCurrentWord(Number(formGameDifficulty.value));
    playerArray = controller.generatePlayerArray(word);
    graphics.appendTextArea(word, lettersArea);
});

lettersArea.addEventListener('input', (event) => {
    const textAreaNode = lettersArea.querySelectorAll('.text-box');
    if(event.target.classList.contains('text-box')){
        graphics.blockEmptyBoxes(textAreaNode);
    }
});

lettersArea.addEventListener('keydown', (event) => {
    if(event.target.classList.contains('text-box') && event.key === 'Backspace'){
        graphics.removeStatusBoxes(event.target);
    } 
})

checkAnswerBtn.addEventListener('click', () => {
    const textAreaNode = lettersArea.querySelectorAll('.text-box');
    const playerGuess = graphics.getPlayerGuess(textAreaNode);

    // Avoids the player from sending nothing to the game controller
    if(playerGuess.letter === ''){
        return;
    }

    const playerAccuracy = controller.isPlayerAccurate(word, playerGuess.letter, playerGuess.position, playerArray);
    graphics.addStatusToBoxes(playerAccuracy.status, playerGuess.position);
    graphics.blockEmptyBoxes(textAreaNode);
    const isGameWon = controller.gameStatusChecker(playerArray, word);
    if(isGameWon.isRoundWon === false){
        console.log('game lost');
    }
});

