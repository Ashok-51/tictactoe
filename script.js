const game = document.getElementById("game");
const statusText = document.getElementById("status");
const resultScreen = document.getElementById("result-screen");
const resultMessage = document.getElementById("result-message");
const mainScreen = document.getElementById("main");

let currentPlayer = "X";
let board = Array(9).fill("");
let isGameOver = false;

const winCombos = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

function createBoard() {
  game.innerHTML = "";
  board.forEach((val, i) => {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.index = i;
    cell.textContent = val;
    cell.addEventListener("click", handleMove);
    game.appendChild(cell);
  });
}

function handleMove(e) {
  const index = e.target.dataset.index;
  if (board[index] || isGameOver) return;

  board[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  if (checkWinner()) {
    isGameOver = true;
    statusText.textContent = `Player ${currentPlayer} wins!`;
    showEndScreen(`🎉 Player ${currentPlayer} wins!`);
  } else if (board.every(cell => cell)) {
    isGameOver = true;
    statusText.textContent = "It's a draw!";
    showEndScreen("🤝 It's a draw!");
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function checkWinner() {
  for (let combo of winCombos) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      highlightWinner(combo);
      return true;
    }
  }
  return false;
}

function highlightWinner(combo) {
  combo.forEach(i => {
    game.children[i].classList.add("winner");
  });
}

function showEndScreen(message) {
  resultMessage.textContent = message;
  resultScreen.classList.remove("hidden");
  mainScreen.classList.add("hidden");
}

function newGame() {
  board = Array(9).fill("");
  currentPlayer = "X";
  isGameOver = false;
  resultScreen.classList.add("hidden");
  mainScreen.classList.remove("hidden");
  statusText.textContent = `Player ${currentPlayer}'s turn`;
  createBoard();
}

function resetGame() {
  board = Array(9).fill("");
  currentPlayer = "X";
  isGameOver = false;
  statusText.textContent = `Player ${currentPlayer}'s turn`;
  createBoard();
}

createBoard();
