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
    let status;
    
    if(word.includes(letter) && word[position] === letter){
        status = 'accurate';
        // if accurate, insert the letter into the position
        playerArray[position] = letter;
    } else if(word.includes(letter) && word[position] !== letter){
        status = 'present';
        player.decreaseLifes();
    } else {
        status = 'inaccurate';
        player.decreaseLifes();
    }
    return status;
  }

  // function that verifies if the round is won or lost
  const isRoundWon = (playerWord, word) => {
    let roundStatus;
    if(player.getPlayerLifes() === 0){
        return roundStatus = false;
    } else if(playerWord.join('').toLowerCase() === word && player.getPlayerLifes() > 0){
        return roundStatus = true;
    }
  }


  return { getCurrentWord, isPlayerAccurate, generatePlayerArray }
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
                <input type="text" maxlength="1" pattern="[A-Za-z]" class="text-box">
            `
        }
    }

    return { removeGameStartForm, appendTextArea }
      
}

// We add our factory functions to our variables
let playerArray;
graphics = GraphicInterface();

// We declare our DOM variables
const gameForm = document.getElementById('begin-game');
const formUserName = document.getElementById('name');
const formGameDifficulty = document.getElementById('difficulty');
const gameScreen = document.getElementById('gamescreen');
const hangmanArea = document.getElementById('hangman-area');
const lettersArea = document.getElementById('letters-area');

gameForm.addEventListener('submit', (e) => {
    e.preventDefault();
    controller = GameController(formUserName.value);
    graphics.removeGameStartForm(gameForm, gameScreen);
    const word = controller.getCurrentWord(Number(formGameDifficulty.value));
    playerArray = controller.generatePlayerArray(word);
    graphics.appendTextArea(word, lettersArea);
});

