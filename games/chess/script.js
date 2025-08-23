let board = null;
let game = new Chess();
let vsBot = false;

function onDragStart (source, piece) {
  if (game.game_over()) return false;

  // Only allow correct side to move
  if (vsBot && game.turn() === 'b') return false;
}

function makeRandomMove () {
  const possibleMoves = game.moves();
  if (possibleMoves.length === 0) return;

  const randomIdx = Math.floor(Math.random() * possibleMoves.length);
  game.move(possibleMoves[randomIdx]);
  board.position(game.fen());
}

function onDrop (source, target) {
  let move = game.move({ from: source, to: target, promotion: 'q' });

  if (move === null) return 'snapback';
  board.position(game.fen());

  if (vsBot && !game.game_over()) {
    window.setTimeout(makeRandomMove, 250);
  }
}

function initBoard() {
  board = Chessboard('chessboard', {
    draggable: true,
    position: 'start',
    onDragStart: onDragStart,
    onDrop: onDrop
  });
}

document.getElementById('vsPlayer').addEventListener('click', () => {
  vsBot = false;
  game.reset();
  initBoard();
});

document.getElementById('vsBot').addEventListener('click', () => {
  vsBot = true;
  game.reset();
  initBoard();
});

initBoard();
