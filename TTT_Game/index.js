const cell = document.querySelectorAll(".cell");
const statustext = document.querySelector("#statustext");
const restartbtn = document.querySelector("#resetbtn");
const wincondition = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let options = ["", "", "", "", "", "", "", "", ""];
let currentplayer = "X";
let running = true;

initializegame();

function initializegame(){
    cell.forEach(ce => ce.addEventListener("click", cellclicked));
    restartbtn.addEventListener("click", restartgame);
    statustext.textContent = `${currentplayer}'s turn`;
    running = true;
}

function cellclicked(){
    const cellindex = this.getAttribute("cellindex");

    if(options[cellindex] != "" || !running){
        return;
    }

    updatecell(this, cellindex);
    checkwinner();
}

function updatecell(cell, index){
    options[index] = currentplayer;
    cell.textContent = currentplayer;
}

function changeplayer(){
    currentplayer = (currentplayer == "X") ? "O" : "X";
    statustext.textContent = `${currentplayer}'s turn`;
}

function checkwinner(){
    let roundwon = false;
    for(let i=0; i<wincondition.length; i++){
        const condition = wincondition[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];
        
        if(cellA=="" || cellB=="" || cellC==""){
            continue;
        }

        if(cellA == cellB && cellB == cellC){
            roundwon = true;
            break;
        }
    }

    if(roundwon){
        statustext.textContent = `${currentplayer} Wins!`;
        running = false;
    }
    else if(!options.includes("")){
        statustext.textContent = `Draw!`;
        running = false;
    }
    else{
        changeplayer();
    }
}

function restartgame(){
    currentplayer = "X";
    options = ["", "", "", "", "", "", "", "", ""];
    statustext.textContent = `${currentplayer}'s turn`;
    cell.forEach(cell => cell.textContent="");
    running = true;
}