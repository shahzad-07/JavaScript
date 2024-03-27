const timer = document.querySelector("#timer");
const startbtn = document.querySelector("#startbtn");
const pausebtn = document.querySelector("#pausebtn");
const resetbtn = document.querySelector("#resetbtn");

let starttime = 0;
let elapsedtime = 0;
let currenttime = 0;
let paused = true;
let intervalid;
let hrs = 0;
let mins = 0;
let secs = 0;

startbtn.addEventListener("click", startfunction);
pausebtn.addEventListener("click", pausefunction);
resetbtn.addEventListener("click", () => {
    paused = true;
    clearInterval(intervalid);
    starttime = 0;
    elapsedtime = 0;
    currenttime = 0;
    hrs = 0;
    mins = 0;
    secs = 0;
    timer.textContent = "00:00:00";
});

function startfunction(){
    if(paused){
        paused = false;
        starttime = Date.now() - elapsedtime;
        intervalid = setInterval(updatetime, 100);
    }
}

function pausefunction(){
    if(!paused){
        paused = true;
        elapsedtime = Date.now() - starttime;
        clearInterval(intervalid);
    }
}

function updatetime(){
    elapsedtime = Date.now() - starttime;
    secs = Math.floor((elapsedtime/1000)%60);
    mins = Math.floor((elapsedtime/(1000*60))%60);
    hrs = Math.floor((elapsedtime/(1000*60*60))%60);

    secs = pad(secs);
    mins = pad(mins);
    hrs = pad(hrs);

    timer.textContent = `${hrs}:${mins}:${secs}`;

    function pad(unit){
        return (("0")+unit).length > 2 ? unit : "0"+unit;
    }
}