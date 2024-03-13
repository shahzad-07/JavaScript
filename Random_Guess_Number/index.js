const ans = Math.floor(Math.random()*10+1);
let guess = 0;

document.getElementById("button").onclick = function(){
    
    let val = document.getElementById("randomguess").value;
    
    guess += 1;

    if(val == ans){
        alert(`You guessed it right, Number is ${ans} after ${guess} guesses`);
    }
    else if(val > ans){
        alert('Too Big number.');
    }
    else{
        alert('Too Small number.');
    }
}