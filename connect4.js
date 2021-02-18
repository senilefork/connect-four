/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

var WIDTH = 7;
var HEIGHT = 6;

var currPlayer = 1; // active player: 1 or 2
var board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
  for(let i = 0; i < HEIGHT; i++){
    let innerArr = []
    for(let j = 0; j < WIDTH; j++){
      innerArr.push(null)
    }
    board.push(innerArr);
  }
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
  let htmlBoard = document.getElementById('board')
  // TODO: add comment for this code
  //create HTML row with top id and event listener
  var top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);

  //use loop to add the proper amount of tds to our top row 
  for (var x = 0; x < WIDTH; x++) {
    var headCell = document.createElement("td");
    //add an id of whatever index the current td is on
    headCell.setAttribute("id", x);
    //append td to top row
    top.append(headCell);
  }
  htmlBoard.append(top);

  // TODO: add comment for this code
  //create 6x7 grid of tds using nested loop. this will create a nested array
  for (var y = 0; y < HEIGHT; y++) {
    //set up row
    const row = document.createElement("tr");
    for (var x = 0; x < WIDTH; x++) {
      //set up inner arrays to represent columns
      const cell = document.createElement("td");
      //add an id with y and x values 
      cell.setAttribute("id", `${y}-${x}`);
      //append cell to current row
      row.append(cell);
    }
    //append row to board
    htmlBoard.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  for(let i = board.length-1; i >= 0; i--){
    if(board[i][x] == null)return i;
  }
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  let div = document.createElement('div');
  let td = document.getElementById(`${y}-${x}`);
  if(currPlayer === 1){
  div.classList.add('piece')
  } else {
    div.classList.add('blue-piece')
  }
  td.append(div);
  board[y][x] = currPlayer;
  console.log(td);
}

/** endGame: announce game end */

function endGame(msg) {
  // TODO: pop up alert message
  alert(msg)
  
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  var x = +evt.target.id;
  console.log(x);

  // get next spot in column (if none, ignore click)
  var y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  placeInTable(y, x);

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame
  for(let i = 0; i < board.length; i++){
    if(!board[i].includes(null)){
      endGame();
    }
  }

  // switch players
  // TODO: switch currPlayer 1 <-> 2
  if(currPlayer === 1){
    currPlayer = 2;
  } else {
    currPlayer = 1;
  }
  console.log("player" + currPlayer)
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.

  for (var y = 0; y < HEIGHT; y++) {
    for (var x = 0; x < WIDTH; x++) {
      var horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      var vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      var diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      var diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
