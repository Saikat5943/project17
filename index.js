const gameCells=document.querySelectorAll('.cell');
const player1=document.querySelector('.player1');
const player2=document.querySelector('.player2');
const restartBtn=document.querySelector('.restartBtn');
const alertBox=document.querySelector('.alertBox');
// making variables
let currentPlayer='X';
let nextPlayer='O';
let playerTurn=currentPlayer;
player1.textContent=`player1: ${currentPlayer}`;
player2.textContent=`player2: ${nextPlayer}`;
//function to start your game
// ()=> this is arrow function
const startGame = () => {
    gameCells.forEach(cell =>{
        cell.addEventListener('click', handleClick);
            // console.log(e.target);
            // if(e.target.textContent === ''){
            //     e.target.textContent=playerTurn;
            //     if(checkWin()){
            //         console.log(`${playerTurn} is a winner!`)
            //     }
            //     // checkWin();
            //     else if(checkTie()){
            //         console.log(`It's a tie`);
            //     }
            //     else{
            //         changePlayerTurn();
            //     }
            //     // changePlayerTurn();
            // }
            //changePlayerTurn();
            //e.target.textContent=playerTurn;
    });
}
const handleClick=(e) =>{
    if(e.target.textContent === ''){
        e.target.textContent = playerTurn;
        if(checkWin()){
            // console.log(`${playerTurn} is a winner!`);
            showAlert(`${playerTurn} is a winner!`);
            disableCells();
        }
        else if(checkTie()){
            // console.log(`It's a tie!`);
            showAlert(`It's a tie!`)
            disableCells();
        }
        else{
            changePlayerTurn();
            showAlert(`Turn for player: ${playerTurn}`);
        }
    }
}
//function to change player's turn
const changePlayerTurn=() => {
    // if(playerTurn === currentPlayer){
    //     playerTurn=nextPlayer;
    // }
    // else{
    //     playerTurn=currentPlayer;
    // }
    //or second process in if and else condition
    playerTurn=playerTurn === currentPlayer ? nextPlayer : currentPlayer;
}
//function to check win
const checkWin=() => {
    //const winningConditions this is array conditions
    const winningCondition=[
        //array objects
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,3,8],
        [0,4,8],
        [2,4,6],

    ];
    for(let i=0;i<winningCondition.length;i++){
        const [pos1,pos2,pos3]=winningCondition[i];
        // console.log(`${pos1} ${pos2} ${pos3}`);
        if(gameCells[pos1].textContent !== '' && 
            gameCells[pos1].textContent === gameCells[pos2].textContent && 
            gameCells[pos2].textContent===gameCells[pos3].textContent){
                return true;
            }
    }
    return false;

}
//function to check for a tie
const checkTie=() =>{
    let emptyCellCount=0;
    gameCells.forEach(cell => {
        if(cell.textContent === ''){
            emptyCellCount++
        }
    });
    return emptyCellCount===0 && !checkWin();
}
//function to disable game-board cells after a win or tie
const disableCells=() =>{
    gameCells.forEach(cell => {
        cell.removeEventListener('click',handleClick);
        cell.classList.add('disabled');
    });
}
//function to restartgame
const restartGame= () => {
    gameCells.forEach(cell => {
        cell.textContent= '';
        cell.classList.remove('disabled');
    });
    startGame();  
}
// function to show alert
const showAlert= (msg) =>{
    alertBox.textContent=msg;
    alertBox.style.display="block";
    setTimeout(() => {
        alertBox.style.display="none";
    },9000);
}
// adding event listener to restart button
 restartBtn.addEventListener('click',restartGame);
//calling start game function
startGame();