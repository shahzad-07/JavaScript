document.getElementById("submit").onclick = function(){

    if(document.getElementById("cbutton").checked){
        let temp = document.getElementById("value").value;
        temp = Number(temp);
        temp = toCelcius(temp).toFixed(2);
        document.getElementById("resval").innerHTML = `${temp}`;
    }
    else if(document.getElementById("fbutton").checked){
        let temp = document.getElementById("value").value;
        temp = Number(temp);
        temp = toFahrenheit(temp).toFixed(2);
        document.getElementById("resval").innerHTML = `${temp}`;
    }
    else{
        document.getElementById("resval").innerHTML = `Please Select a Unit!`;
    }
}

function toCelcius(temp){
    return (temp-32)*(5/9);
}

function toFahrenheit(temp){
    return temp*9/5+32;
}