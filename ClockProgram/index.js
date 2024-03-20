const mylabel = document.getElementById("mylabel");

update();
setInterval(update, 1000);
function update(){
    let date = new Date();
    mylabel.innerHTML = updateTime(date);

    function updateTime(date){
        let h = date.getHours();
        let m = date.getMinutes();
        let s = date.getSeconds();

        let ampm = h > 12 ? "pm" : "am";

        h = (h%12) || 12;
        h = formatzero(h);
        m = formatzero(m);
        s = formatzero(s);

        return `${h}:${m}:${s} ${ampm}`;
    }

    function formatzero(time){
        time = time.toString();
        return time = time.length < 2 ? "0"+time : time;
    }
}