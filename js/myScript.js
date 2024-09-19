const boardElement = document.getElementById('board');
const messageElement = document.getElementById('message');
let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'x';
let isComputerPlaying = false;

function createBoard() {
    boardElement.innerHTML = '';
    board.forEach((cell, index) => {
        const cellElement = document.createElement('div');
        cellElement.classList.add('cell');
        if (cell) {
            cellElement.classList.add(cell);
            cellElement.textContent = cell.toUpperCase();
        }
        cellElement.addEventListener('click', () => handleCellClick(index));
        boardElement.appendChild(cellElement);
    });
}

function handleCellClick(index) {
    if (board[index] || messageElement.textContent) return;

    board[index] = currentPlayer;
    createBoard();

    if (checkWinner(currentPlayer)) {
        messageElement.textContent = isComputerPlaying ? ' You Won!' : `${currentPlayer.toUpperCase()} Wins!`;
        return;
    }

    if (board.every(cell => cell)) {
        messageElement.textContent = 'It\'s a draw!';
        return;
    }

    currentPlayer = currentPlayer === 'x' ? 'o' : 'x';

    if (isComputerPlaying && currentPlayer === 'o') {
        computerMove();
    }
}

function computerMove() {
    const emptyCells = board.map((cell, index) => cell ? null : index).filter(index => index !== null);
    const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    if (randomIndex !== undefined) {
        board[randomIndex] = 'o';
        createBoard();
        if (checkWinner('o')) {
            messageElement.textContent = 'You lost!';
        } else {
            currentPlayer = 'x';
        }
    }
}

function checkWinner(player) {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    return winningCombinations.some(combination => {
        return combination.every(index => board[index] === player);
    });
}

// Start a new game
function startGame(isVsComputer) {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'x';
    isComputerPlaying = isVsComputer;
    messageElement.textContent = '';
    createBoard();
}

// Example of starting a game against the computer
startGame(true);