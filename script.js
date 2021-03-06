const gameBoard = (() => {
    // board contains data representation of board
    // board takes input to update data representation
    // board updates when data is updated
    const board = ["", "", "", "", "", "", "", "", ""];

    const takeInput = (index, input) => {
        board.splice(index , 1, input);
        updateDisplay(parseInt(index),input);
    }

    const updateDisplay = (index,input) => {
        const cell = document.querySelectorAll(".cell");
        cell.forEach((element)=>{
            if (parseInt(element.id) === index) {
                element.textContent = input;
            }
        });
    }


    return {
        takeInput,
        updateDisplay,
        board
        
    };
})();

const player = (name, choice,score) => {
    const isTurn = false;
    score = 0;
    return {
        name,
        choice,
        isTurn,
        score
    }
}

const game = (() => {

    const players = [];
    const initializePlayers = (playerOne,playerTwo)=>{
        const firstPlayer = playerOne;
        const secondPlayer = playerTwo
        players.push(firstPlayer,secondPlayer);
    }
    const addScore = (value)=>{
        const xScore = document.querySelector(".x-score");
        const oScore = document.querySelector(".o-score");
        if (value == 1) {
            players[0].score += 1;
            xScore.textContent = `Score: ${players[0].score}`;
        } 
        if (value == 2) {
            players[1].score += 1;
            oScore.textContent = `Score: ${players[1].score}`;
        }
    }
    const popupShow = (value) =>{
        const popup = document.querySelector(".player-win-popup");
        if (value===1) {
            popup.classList.add("show");
            popup.textContent = "Player X Wins!"
        }
        if (value===2) {
            popup.classList.add("show");
            popup.textContent = "Player O Wins!";
        }
        addScore(value);
    }
    const horizontalChecker = (board)=>{
        const rows = {
            first: board.slice(0,3),
            second: board.slice(3,6),
            third: board.slice(6,9)
        }
        if (rows.first.every(xChecker)|| rows.second.every(xChecker) ||rows.third.every(xChecker) ) {
            popupShow(1);
        }
        else if( rows.first.every(oChecker)|| rows.second.every(oChecker)||rows.third.every(oChecker)){
            popupShow(2);
        }

        function xChecker(value) {
            return value === "x";
        }
        function oChecker(value) {
            return value === "o";
        }
    }

    const verticalChecker = (board)=>{
        const columns = {
            first: board.filter((cValue,index)=>{
                return index === 0 || index == 3 || index === 6 ? true: false;
            }),
            second: board.filter((cValue,index)=>{
                return index === 1 || index == 4 || index === 7 ? true: false;
            }),
            third: board.filter((cValue,index)=>{
                return index === 2 || index == 5 || index === 8 ? true: false;

            })
        }

        if (columns.first.every(xChecker)|| columns.second.every(xChecker) ||columns.third.every(xChecker) ) {
            popupShow(1);

        }
        else if( columns.first.every(oChecker)|| columns.second.every(oChecker)||columns.third.every(oChecker)){
            popupShow(2);

        }

        function xChecker(value) {
            return value === "x";
        }
        function oChecker(value) {
            return value === "o";
        }

    }

    const diagonalChecker = (board)=>{
        const diagonal = {
            first: board.filter((cValue,index)=>{
                return index === 2 || index == 4 || index === 6 ? true: false;
            }),
            second: board.filter((cValue,index)=>{
                return index === 0 || index == 4 || index === 8 ? true: false;
            })
        }
        if (diagonal.first.every(xChecker) || diagonal.second.every(xChecker)) {
            popupShow(1);

        }
        else if(diagonal.first.every(oChecker) || diagonal.second.every(oChecker)){
            popupShow(2);


        }
        function xChecker(value) {
            return value === "x";
        }
        function oChecker(value) {
            return value === "o";
        }
    }

    const winChecker = (board)=>{
        horizontalChecker(board);
        verticalChecker(board);
        diagonalChecker(board);
    }
    
    const playGame = (takeInput,board)=>{
        const cell = document.querySelectorAll(".cell");
        cell.forEach((element)=>{
            element.addEventListener('click',(e)=>{
                if ((e.target.textContent)==="") {
                    if (!players[0].isTurn) {
                        takeInput(element.id,players[0].choice)
                        winChecker(board);
                        players[0].isTurn = !players[0].isTurn
                        players[1].isTurn = !players[1].isTurn
                    }
                    else if (players[1].isTurn) {
                        takeInput(element.id,players[1].choice)
                        winChecker(board);
                        players[0].isTurn = !players[0].isTurn
                        players[1].isTurn = !players[1].isTurn
                    }
                }
            });
        });

    }

    const resetGame = (board) => {
        const resetButton = document.querySelector(".reset-game");
        resetButton.addEventListener('click',()=>{
            board.forEach((cValue,index,arr)=>{
                arr[index] = "";
            })
            const cells = document.querySelectorAll(".cell");
            cells.forEach((cell)=>{
                cell.textContent = ""
            })
            const popup = document.querySelector(".player-win-popup");
            popup.classList.remove("show");

        });
    }

    //intialize players

    return{
        playGame,
        initializePlayers,
        players,
        horizontalChecker,
        verticalChecker,
        resetGame
    }

})();



const first = player("test","x");
const second = player("test2","o");
game.initializePlayers(first,second);
game.playGame(gameBoard.takeInput,gameBoard.board); 
game.resetGame(gameBoard.board);