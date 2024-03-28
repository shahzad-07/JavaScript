const gameboard = document.querySelector("#gameboard");
const ctx = gameboard.getContext("2d");
const scoretext = document.querySelector("#scoretext");
const resetbtn = document.querySelector("#resetbtn");

const gameheight = gameboard.height;
const gamewidth = gameboard.width;

const boardbackground = "forestgreen";
const paddle1color = "lightblue";
const paddle2color = "pink";
const paddleborder = "black";
const ballcolor = "yellow";
const ballbordercolor = "grey";
const ballradius = 12.5;
const paddlespeed = 50;

let intervalid;
let ballspeed = 1;
let ballx = gamewidth/2;
let bally = gameheight/2;
let ballxdirection = 0;
let ballydirection = 0;
let player1score = 0;
let player2score = 0;

let paddle1 = {
    width: 25,
    height: 100,
    x: 0,
    y: 0
};
let paddle2 = {
    width: 25,
    height: 100,
    x: gamewidth - 25,
    y: gameheight - 100
};

window.addEventListener("keydown", changedirection);
resetbtn.addEventListener("click", resetgame);

gamestart();

function gamestart(){
    createball();
    nexttick();
}

function nexttick(){
    intervalid = setTimeout( () => {
        clearboard();
        drawpaddles();
        moveball();
        drawball(ballx, bally);
        checkcollision();
        nexttick();
    }, 10)
}

function clearboard(){
    ctx.fillStyle = boardbackground;
    ctx.fillRect(0, 0, gamewidth, gameheight);
}

function drawpaddles(){
    ctx.strokeStyle = paddleborder;

    ctx.fillStyle = paddle1color;
    ctx.fillRect(paddle1.x, paddle1.y, paddle1.width, paddle1.height);
    ctx.strokeRect(paddle1.x, paddle1.y, paddle1.width, paddle1.height);

    ctx.fillStyle = paddle2color;
    ctx.fillRect(paddle2.x, paddle2.y, paddle2.width, paddle2.height);
    ctx.strokeRect(paddle2.x, paddle2.y, paddle2.width, paddle2.height);
}

function createball(){
    ballspeed = 1;
    
    ballxdirection = Math.random() < 0.5 ? 1 : -1;

    ballydirection = Math.random() < 0.5 ? 1 : -1;

    ballx = gamewidth/2;
    bally = gameheight/2;

    drawball(ballx, bally);
}


function moveball(){
    ballx += (ballspeed * ballxdirection);
    bally += (ballspeed * ballydirection);
}

function drawball(ballx, bally){
    ctx.fillStyle = ballcolor;
    ctx.strokeStyle = ballbordercolor;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(ballx, bally, ballradius, 0, 2*Math.PI);
    ctx.stroke();
    ctx.fill();
}

function checkcollision(){
    
    if(bally <= 0+ballradius){
        ballydirection *= -1;
    }
    if(bally >= gameheight-ballradius){
        ballydirection *= -1;
    }
    
    if(ballx <= 0){
        player2score += 1;
        updatescore();
        createball();
        return;
    }
    if(ballx >= gamewidth){
        player1score += 1;
        updatescore();
        createball();
        return;
    }

    if(ballx <= (paddle1.x + paddle1.width + ballradius)){
        if(bally > paddle1.y && bally < paddle1.y+paddle1.height){
            ballx = (paddle1.x + paddle1.width) + ballradius;
            ballxdirection *= -1;
            ballspeed += 0.2;
        }
    }
    if(ballx >= (paddle2.x - ballradius)){
        if(bally > paddle2.y && bally < paddle2.y+paddle2.height){
            ballx = paddle2.x - ballradius;
            ballxdirection *= -1;
            ballspeed += 0.2;
        }
    }
}

function changedirection(event){
    const keypressed = event.keyCode;

    const paddle1up = 87;
    const paddle1down = 83;
    const paddle2up = 38;
    const paddle2down = 40;

    switch(keypressed){
        case(paddle1up):
            if(paddle1.y > 0){
                paddle1.y -= paddlespeed;
            }
            break;
        case(paddle1down):
            if(paddle1.y < gameheight-paddle1.height){
                paddle1.y += paddlespeed;
            }
            break;
        case(paddle2up):
            if(paddle2.y > 0){
                paddle2.y -= paddlespeed;
            }
            break;
        case(paddle2down):
            if(paddle2.y < gameheight-paddle2.height){
                paddle2.y += paddlespeed;
            }
            break;
    }
}

function updatescore(){
    scoretext.textContent = `${player1score} : ${player2score}`;
}

function resetgame(){
    player1score = 0;
    player2score = 0;

    paddle1 = {
        width: 25,
        height: 100,
        x: 0,
        y: 0
    };
    paddle2 = {
        width: 25,
        height: 100,
        x: gamewidth - 25,
        y: gameheight - 100
    };

    ballspeed = 1;
    ballx = 0;
    bally = 0;
    ballxdirection = 0;
    ballydirection = 0;
    updatescore();
    clearInterval(intervalid);
    gamestart();
}