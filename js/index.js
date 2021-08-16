const canvas = document.getElementById("main-canvas");
const context = canvas.getContext("2d");

let multiplication = 2;

let clockRadius = 0,
    clockTextSize = 48;

let hourTheta = 0,
    minuteTheta = 0,
    secondTheta = 0;

let hour = 0,
    minute = 0,
    second = 0;

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    let min = Math.min(canvas.width, canvas.height);
    clockRadius = min / 3
    clockTextSize = min / 20;
}

function dblclick() {
    document.getElementById("setting-window").style.display = "block";
}

function applySetting() {
    document.getElementById("setting-window").style.display = "none";
    
    multiplication = parseInt(document.getElementById("multiplication").value);
}

function tick() {
    let date = new Date();
    let day = date.getHours(),
        minutes = date.getMinutes(),
        seconds = date.getSeconds(),
        milliseconds = date.getMilliseconds();
    day += minutes/60 + seconds/3600 + milliseconds/3600000;
    day /= 24;

    hourTheta = 2 * Math.PI * multiplication * day - Math.PI / 2;
    minuteTheta = 2 * Math.PI * multiplication * day * 12 - Math.PI / 2;
    secondTheta = 2 * Math.PI * multiplication * day * 12 * 60 - Math.PI / 2;

    day *= multiplication;

    hour = parseInt(day * 12);
    minute = parseInt(day * 12 * 60) % 60;
    second = parseInt(day * 12 * 60 * 60) % 60;
}

function render() {
    context.fillStyle = BACKGROUND_COLOR;
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.textAlign = "center";
    for (let i = 1; i <= 12; i++) {
        context.font = CLOCK_TEXT_FONT.replace("${CLOCK_TEXT_SIZE}", clockTextSize);
        context.fillStyle = CLOCK_TEXT_COLOR;
        let theta = i * Math.PI / 6 - Math.PI / 2;
        let x = canvas.width / 2 + Math.cos(theta) * clockRadius;
        let y = canvas.height / 2 + Math.sin(theta) * clockRadius;
        context.fillText(i, x, y + clockTextSize / 3);
    }

    context.fillStyle = DIGITAL_TEXT_COLOR;
    context.fillText(`${hour}:${zeroPad(minute, 2)}:${zeroPad(second, 2)}`, canvas.width / 2, canvas.height / 2 + clockTextSize / 3);

    context.strokeStyle = HOUR_HAND_COLOR;
    context.lineWidth = HOUR_HAND_WIDTH;
    context.beginPath();
    context.moveTo(canvas.width / 2, canvas.height / 2);
    context.lineTo(canvas.width / 2 + Math.cos(hourTheta) * clockRadius * HOUR_HAND_RATIO,
                   canvas.height / 2 + Math.sin(hourTheta) * clockRadius * HOUR_HAND_RATIO);
    context.stroke();

    context.strokeStyle = MINUTE_HAND_COLOR;
    context.lineWidth = MINUTE_HAND_WIDTH;
    context.beginPath();
    context.moveTo(canvas.width / 2, canvas.height / 2);
    context.lineTo(canvas.width / 2 + Math.cos(minuteTheta) * clockRadius * MINUTE_HAND_RATIO,
                   canvas.height / 2 + Math.sin(minuteTheta) * clockRadius * MINUTE_HAND_RATIO);
    context.stroke();

    context.strokeStyle = SECOND_HAND_COLOR;
    context.lineWidth = SECOND_HAND_WIDTH;
    context.beginPath();
    context.moveTo(canvas.width / 2, canvas.height / 2);
    context.lineTo(canvas.width / 2 + Math.cos(secondTheta) * clockRadius * SECOND_HAND_RATIO,
                   canvas.height / 2 + Math.sin(secondTheta) * clockRadius * SECOND_HAND_RATIO);
    context.stroke();
}


window.addEventListener("resize", resize);
window.addEventListener("dblclick", dblclick);

resize();

setInterval(() => {
    tick();
    render();
}, 1000 / 60);