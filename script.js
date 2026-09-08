let controller;
let graphics;

const createPlayer = name => {
    const name = name;
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

    return { name,  decreaseLifes, increasePlayerWins, resetPlayerLifes, getPlayerLifes }
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

    return filteredWords[Math.floor(Math.random() * words.length)];
  };

  // function that controls the gameflow
  const gameflow = (word, letter, position) => {
    let accurate;
    let present;
    let inaccurate;

    // this shouldnt be declared here because it would get reset after every play
    let playerWord = new Array(word.length);
    let isRoundWon;
    

    if(word.includes(letter) && word[position] === letter){
        accurate = true;
        present = false;
        inaccurate = false;
        // if accurate, insert the letter into the position
        playerWord[position] = letter;
    } else if(word.includes(letter) && word[position] !== letter){
        present = true;
        accurate = false;
        inaccurate = false;
        player.decreaseLifes();
    } else if(!word.includes(letter) && word[position] !== letter){
        inaccurate = true;
        accurate = false;
        present = false;
        player.decreaseLifes();
    }

    // I'll make another function for this
    if(playerWord.length === word.length && player.getPlayerLifes() > 0){
        return isRoundWon = true;
    } else if (player.getPlayerLifes() === 0){
        return isRoundWon = false;
    }
  }



  return { getCurrentWord, }
};

const GraphicInterface = () => {
      
}t 