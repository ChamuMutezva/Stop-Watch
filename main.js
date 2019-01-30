/*jslint es6 */
"use strict";
let display = document.getElementById("display");
let startStop = document.getElementById("startStop");
let reset = document.getElementById("reset");
let recordTime = document.getElementById("record");
let pastTimes = document.getElementById("pastTimes");
let listOfTimers = [];
let timeCounted = "0";
let timerStarted = false;
let counter = 0;
let interval;
let sec = 0;
let min = 0;

function timer() {
    if (timerStarted === false) {
        interval = setInterval(function () {
            counter = counter + 1;
            calculateTime();
        }, 100);
        timerStarted = true;
    } else if (timerStarted === true) {
        clearInterval(interval);
        timerStarted = false;
    }
}
document.addEventListener("keypress", handleKeypress);

function handleKeypress(event) {
    console.log(event.key);
    if (event.key === "s" || event.key === "S") {
        timer();
    } else if (event.key === "r" || event.key === "R") {
        clearAllTimers();
    } else if (event.key === "t" || event.key === "T") {
        displayTimes();
    }
}

startStop.addEventListener("click", function () {
    timer();
});

reset.addEventListener("click", function () {
    clearAllTimers();
});

recordTime.addEventListener("click", function () {
    displayTimes();
});

function displayTimes() {
    let correctTime = min + ":" + sec;
    let msg = "";
    listOfTimers.push(correctTime);
    for (let endTime of listOfTimers) {

        msg = msg + endTime + "<br>";
        console.log(endTime);
        pastTimes.innerHTML = msg;
    }
}

function clearAllTimers() {
    sec = 0;
    min = 0;
    timerStarted = false;
    counter = 0;
    clearInterval(interval);
    listOfTimers = [];
    pastTimes.innerHTML = "";
    display.innerHTML = "00:00";
}

function calculateTime() {
    if (counter >= 100) {
        min = min + 1;
        sec = counter % 100;
        counter = 0;
    } else {
        sec = counter;
    }
    timeCounted = min + ":" + sec;
    display.innerHTML = timeCounted;
}