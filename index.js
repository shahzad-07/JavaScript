let username;

document.getElementById("myButton").onclick = function() {
    username = document.getElementById("myText").value;
    console.log("My name is : " , username);
    document.getElementById("myLabel").innerHTML = "Hello "+username;
}