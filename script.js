// Players Constructor (called when button "Start Game" is pressed)

const playersConstructor = function (name, token) {
    return {name, token};
}

// Sets board as 9 cells with null value.
// Ability to retrieve and reset the board.

const gameBoard = (function () {

    let board = [null,null,null,null,null,null,null,null,null];

    const getBoard = function () {
        return board
    };

    const resetBoard = function() {
        board = [null,null,null,null,null,null,null,null,null];
    }

    return {
        getBoard, resetBoard
    }
})();

// Game flow

const game = (function() {

    let players = [];
    let currentPlayer = 0;
    let currentToken;
    let currentName;

    const setPlayers = function (name1, name2){
        players[0] = playersConstructor(name1, "X");
        players[1] = playersConstructor(name2, "O");
        gameBoard.resetBoard();
        eraseBoard(); 
        currentToken = players[currentPlayer].token;
        currentName = players[currentPlayer].name;
        turn.textContent = "It's " + currentName + "'s turn."
    }

    const playRound = function (cell) {
        currentToken = players[currentPlayer].token;
        currentName = players[currentPlayer].name;
        if (gameBoard.getBoard()[cell] == null) {
            gameBoard.getBoard()[cell] = currentToken;
            printBoard();
            if(checkWin()){
                messages.textContent = "The winner is " + players[currentPlayer].name + "! 🥳"
            } else if (checkDraw()){
                messages.textContent = "It's a draw"
            } else {
                console.log(currentName, gameBoard.getBoard());
                turn.textContent = "It's " + players[1 - currentPlayer].name + "'s turn."
                currentPlayer = 1 - currentPlayer;
                messages.textContent = ""
            } 
        } else {
            messages.textContent = "Chose an empty cell"
        }
    }

    const checkWin = function() {
        const board = gameBoard.getBoard();
        const token = players[currentPlayer].token;

        // Check rows
        if ((board[0] === token && board[1] === token && board[2] === token) || 
            (board[3] === token && board[4] === token && board[5] === token) ||
            (board[6] === token && board[7] === token && board[8] === token) 
        ) {
            return true
        }

        // Check columns
        if ((board[0] === token && board[3] === token && board[6] === token) || 
            (board[1] === token && board[4] === token && board[7] === token) ||
            (board[2] === token && board[5] === token && board[8] === token) 
        ) {
            return true
        }

        // Check diagonals
        if (board[0] === token && board[4] === token && board[8] === token) {
            return true;
        }
        if (board[2] === token && board[4] === token && board[6] === token) {
            return true;
        }

        return false;
    }

    const checkDraw = function() {
       const board = gameBoard.getBoard();

        if(board[0] != null && board[1] != null &&
        board[2] != null && board[3] != null &&
        board[4] != null && board[5] != null &&
        board[6] != null && board[7] != null &&
        board[8] != null) {
            return true
        } else {
            return false
        }
    }

    // DOCUMENT INTERACTIONS

    const form = document.querySelector("form");

    const cells = document.querySelectorAll(".cell");

    const resetBtn = document.querySelector(".reset")

    const messages = document.querySelector(".messages")

    const turn = document.querySelector(".turn")

    form.addEventListener("submit", function(event){
        event.preventDefault();

        let player1 = document.getElementById("player1").value;
        let player2 = document.getElementById("player2").value;

        game.setPlayers(player1, player2)
    })

    cells.forEach(cell => {
        cell.addEventListener("click", function(){
            game.playRound(cell.id);
        })
    })

    const printBoard = function () {
        cells.forEach(cell => {
            cell.textContent = gameBoard.getBoard()[cell.id]
        })
    }

    const eraseBoard = function () {
        cells.forEach(cell => {
            cell.textContent = "";
        })
    }

    resetBtn.addEventListener("click", function(){
        eraseBoard();
        gameBoard.resetBoard();
        messages.textContent = "";
    })

    return {
        setPlayers , playRound
    }
})();

