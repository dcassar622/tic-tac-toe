/*
	===============================
	GLOBAL variables initialisation
	===============================
*/

let boardArray = Array(9).fill('');

const gameArea = document.getElementById('game-board');
const winnerArea = document.getElementById('winner-area');
let squares = document.getElementsByClassName('square');
const playerArea = document.getElementById('player-info');

let playComputer = false;
let currSymbol = 'X';
let playCount = 1;
let gameOver = false;
let player1;
let player2;

/*
	=====================
	BUTTON initialisation
	=====================
*/
const playHumanBtn = document.getElementById('play-btn');
playHumanBtn.addEventListener('click', () => {
    playComputer = false;
    document.getElementById('player2-name').value = '';
    showPlayerSection();
})

const playComputerBtn = document.getElementById('computer-play-btn');
playComputerBtn.addEventListener('click', () => {
    playComputer = true;
    document.getElementById('player2-name').value = 'Computer';
    console.log(playComputer);
    showPlayerSection();
})

const startBtn = document.getElementById('start-btn');
startBtn.addEventListener('click', startGame)

const restartBtn = document.getElementById('restart-btn');
restartBtn.addEventListener('click', restartGame)

/*
	================
	GAMEPLAY Section
	================
*/

function showPlayerSection() {
    playerArea.className = '';
}

function hidePlayerSection() {
    playerArea.className = 'hidden';
}

// Gets Player(s) Name(s) and sets up board
function startGame() {
    winnerArea.innerHTML = ``;
    clearBoard();
    getPlayerNames();
    hidePlayerSection();
    activateBoard();
}

function getPlayerNames() {
    if (playComputer === false) {
        player1 = document.getElementById('player1-name').value;
        player2 = document.getElementById('player2-name').value;
    }

    else if (playComputer === true) {
        player1 = document.getElementById('player1-name').value;
        player2 = 'Computer';
        document.getElementById('player2-name').value = 'Computer';
    }
   
}

function activateBoard() { 
    // Allows board CSS animation once it's activated
    document.getElementById('game-board').className = 'active';
    // Add event listener to game area 
    playCount = 1;
    gameOver = false;
    gameArea.addEventListener('click', (event) => {
        if (event.target.innerHTML === '') {
            updateBoardArray(event.target.dataset.key);
            markSquarePlayer(event.target);
            if (!gameOver && playComputer) {
                console.log('playing computer round');
                playComputerRound();
            }
        }
    });
}

// Updates data array with relevant choice and symbol
function updateBoardArray(position) {
    boardArray[position] = currSymbol;
    playCount++;
}


// Set player's chosen square on board to chosen symbol
function markSquarePlayer(square) {
    square.innerHTML = currSymbol;
    checkIfWin();
}

// Set computer's chosen square on board to chosen symbol
function markSquareComputer(square) {
    squares[square].innerHTML = currSymbol;
    checkIfWin();
}

// toggles the player/symbol turn
function switchPlayerTurn(symbol) {
    if (symbol === 'X') {
        currSymbol = 'O'
    }
    else if (symbol === 'O') {
        currSymbol = 'X'
    }
}

// Algorithm that checks if there's been a win, or draw if max amount of moves reached without a win
function checkIfWin() {

    if ((playCount>=5) && 
       ((boardArray[0] === boardArray[1] && boardArray[0] === boardArray[2] && boardArray[0] !=='') ||
        (boardArray[3] === boardArray[4] && boardArray[3] === boardArray[5] && boardArray[3] !=='') ||
        (boardArray[6] === boardArray[7] && boardArray[6] === boardArray[8] && boardArray[6] !=='') ||
        (boardArray[0] === boardArray[4] && boardArray[0] === boardArray[8] && boardArray[0] !=='') ||
        (boardArray[2] === boardArray[4] && boardArray[2] === boardArray[6] && boardArray[2] !=='') ||
        (boardArray[0] === boardArray[3] && boardArray[0] === boardArray[6] && boardArray[0] !=='') ||
        (boardArray[1] === boardArray[4] && boardArray[1] === boardArray[7] && boardArray[1] !=='') ||
        (boardArray[2] === boardArray[5] && boardArray[2] === boardArray[8] && boardArray[2] !==''))) 
        {
            if (currSymbol === 'X') {
                console.log('player wins');
                winnerArea.innerHTML = `${player1} Wins!`;
                gameOver = true;
            }
            else if (currSymbol === 'O') {
                console.log('computer wins');
                winnerArea.innerHTML = `${player2} Wins!`;
            }
        }

    else if (playCount > 9) {
        winnerArea.innerHTML = `It's a Draw!`;
    }

    switchPlayerTurn(currSymbol);
}

//clears data, display and resets global variables
function restartGame() {
    document.getElementById('game-board').className = 'active';
    clearBoard();

    currSymbol = 'X';
    playCount = 1;

    document.getElementById('player1-name').value = '';
    document.getElementById('player2-name').value = '';
    winnerArea.innerHTML = ``;
}

// Chooses a random number for the computer, checks that the chosen position is available, and updates data and board
function playComputerRound() {
    let computerChoice = Math.floor(Math.random() * Math.floor(8));

    if (boardArray[computerChoice] === '') {
        updateBoardArray(computerChoice);
        markSquareComputer(computerChoice);
    }
    else {
        playComputerRound();
    }
}

function clearBoard() {
    boardArray = Array(9).fill('');
    for (var i=0; i<squares.length; i++) {
        squares[i].innerHTML = '';
    }
}
  
    

  
