const playersConstructor = function (name, token) {
    return {name, token};
}

const gameBoard = (function () {

    let board = [null,null,null,null,null,null,null,null,null];

    const getBoard = board;

    const resetBoard = function() {
        board = [null,null,null,null,null,null,null,null,null];
    }

    return {
        getBoard, resetBoard
    }
})();

const game = (function() {
    let players = []

    const setPlayers = function (name1, name2){
        players[0] = playersConstructor(name1, "X");
        players[1] = playersConstructor(name2, "O");
        console.log(players);
        gameBoard.resetBoard();
        cleanBoard();
    }

    let currentPlayer = 0;

    const playRound = function (cell) {
        let printCurrentPlayer = players[currentPlayer].name;

        if (gameBoard.getBoard[cell] == null) {
            gameBoard.getBoard[cell] = players[currentPlayer].token;
            currentToken = players[currentPlayer].token;
            if(checkWin()){
                console.log("The winner is " + players[currentPlayer].name);
                currentPlayer = 1 - currentPlayer;
            } else if (checkDraw()){
                console.log("It's a draw");
                currentPlayer = 1 - currentPlayer;
            } else {
                console.log(printCurrentPlayer, gameBoard.getBoard);
                currentPlayer = 1 - currentPlayer;
            } 
        } else {
            console.log("Choose an empty cell");
        }
    }

    const checkWin = function() {
        const board = gameBoard.getBoard;
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
       const board = gameBoard.getBoard;

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

    const form = document.querySelector("form");

    form.addEventListener("submit", function(event){
        event.preventDefault();

        let player1 = document.getElementById("player1").value;
        let player2 = document.getElementById("player2").value;

        game.setPlayers(player1, player2)
    })

    const cells = document.querySelectorAll(".cell");

    cells.forEach(cell => {
        cell.addEventListener("click", function(){
            selectedCell = cell.id -1;
            game.playRound(selectedCell);
            cell.textContent = players[1 -currentPlayer].token
        })
    })

    const cleanBoard = function () {
        cells.forEach(cell => {
            cell.textContent = "";
        })
    }

    return {
        setPlayers , playRound
    }
})();

