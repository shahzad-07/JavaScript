const playertext = document.querySelector("#playertext");
const computertext = document.querySelector("#computertext");
const resulttext = document.querySelector("#resulttext");

const choicebtn = document.querySelectorAll(".choicebtn");

let player;
let computer;
let result;

choicebtn.forEach(button => button.addEventListener("click", btnfunction));

function btnfunction(event){
    player = event.target.textContent;
    computerturn();

    playertext.textContent = `Player: ${player}`;
    computertext.textContent = `Computer: ${computer}`;
    resulttext.textContent = checkwinner();
}

function computerturn(){
    const random = Math.floor(Math.random()*3)+1;

    switch(random){
        case 1: computer = "ROCK";
                break;
        case 2: computer = "PAPER";
                break;
        case 3: computer = "SCISSOR";
                break;
    }
}

function checkwinner(){
    if(player == computer){
        return "DRAW!";
    }
    else if(computer == "ROCK"){
        return (player == "PAPER") ? "You Win!" : "You Lose!";
    }
    else if(computer == "PAPER"){
        return (player == "SCISSOR") ? "You Win!" : "You Lose!";
    }
    else if(computer == "SCISSOR"){
        return (player == "ROCK") ? "You Win!" : "You Lose!";
    }
}