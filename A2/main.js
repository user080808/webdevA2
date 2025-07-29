/* jshint esversion: 6 */
// Get the element ids of the content sections and main menu text
const players = document.getElementById("players");
const events = document.getElementById("events");
const strengths = document.getElementById("strengths");
const weaknesses = document.getElementById("weaknesses");
const minigame = document.getElementById("minigame");
const mainh1 = document.getElementById("mainh1");
const mainp = document.getElementById("mainp");

// Nav menu
//target all elements to save to constants
const participants = document.getElementById("participants");
const timeline = document.getElementById("history");
const ads = document.getElementById("ads");
const flaws = document.getElementById("flaws");
const game = document.getElementById("game");
const btnFS = document.querySelector("#btnFS");
const btnWS = document.querySelector("#btnWS");
var allpages = document.querySelectorAll(".content");
//select all subtopic pages
function hideall() { //function to hide all pages
    for (let onepage of allpages) { //go through all subtopic pages
        onepage.style.display = "none"; //hide it
    }
}

function show(page) { //function to show selected page
    hideall();
    //select the page based on the parameter passed in
    let onepage = document.querySelector(page);
    onepage.style.display = "block"; //show the page
}
const topicNav = document.querySelector(".topicNav");

topicNav.addEventListener("click", function (evt) {
    if (evt.target.id == "participants") {
        show("#players");
        events.style.opacity = 0;
        strengths.style.opacity = 0;
        weaknesses.style.opacity = 0;
        minigame.style.opacity = 0;
        setTimeout(function () {
            players.style.opacity = 1;
        }, 1000);
    }
    if (evt.target.id == "history") {
        show("#events");
        players.style.opacity = 0;
        strengths.style.opacity = 0;
        weaknesses.style.opacity = 0;
        minigame.style.opacity = 0;
        setTimeout(function () {
            events.style.opacity = 1;
        }, 1000);
    }
    if (evt.target.id == "ads") {
        show("#strengths");
        events.style.opacity = 0;
        players.style.opacity = 0;
        weaknesses.style.opacity = 0;
        minigame.style.opacity = 0;
        setTimeout(function () {
            strengths.style.opacity = 1;
        }, 1000);
    }
    if (evt.target.id == "flaws") {
        show("#weaknesses");
        events.style.opacity = 0;
        strengths.style.opacity = 0;
        players.style.opacity = 0;
        minigame.style.opacity = 0;
        setTimeout(function () {
            weaknesses.style.opacity = 1;
        }, 1000);
    }
    if (evt.target.id == "game") {
        show("#minigame");
        events.style.opacity = 0;
        strengths.style.opacity = 0;
        weaknesses.style.opacity = 0;
        players.style.opacity = 0;
        setTimeout(function () {
            minigame.style.opacity = 1;
        }, 1000);
    }
});
hideall();

// Transition for page startup; Main menu elements slowly reveal themselves after timeout
setTimeout(function () {
    mainh1.style.opacity = 1;
}, 1000);

setTimeout(function () {
    mainp.style.opacity = 1;
}, 2000);

setTimeout(function () {
    participants.style.opacity = 1;
}, 3000);

setTimeout(function () {
    timeline.style.opacity = 1;
}, 3250);

setTimeout(function () {
    ads.style.opacity = 1;
}, 3500);

setTimeout(function () {
    flaws.style.opacity = 1;
}, 3750);

setTimeout(function () {
    game.style.opacity = 1;
}, 4000);

setTimeout(function () {
    btnFS.style.opacity = 1;
}, 4250);

setTimeout(function () {
    btnWS.style.opacity = 1;
}, 4500);

// Fullscreen/Exit fullscreen, fully compatible with all browsers
btnFS.addEventListener("click", enterFullscreen);
btnWS.addEventListener("click", exitFullscreen);
function enterFullscreen() { //must be called by user generated event
    if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) { // Firefox
        document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) { // Chrome, Safari, and Opera
        document.documentElement.webkitRequestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) { // IE/Edge
        document.documentElement.msRequestFullscreen();
    }
}
function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.mozCancelFullScreen) { // Firefox
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) { // Chrome, Safari, and Opera
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { // IE/Edge
        document.msExitFullscreen();
    }
}

// Guessing game
var currGuess = -100,
    counter = 0,
    valid = 0;
var ans = 49;
const quiz = document.querySelector("#quiz");
const btnGuess = document.querySelector("#btnGuess");
const guessField = document.querySelector("#guessField");
const smallerlbl = document.querySelector("#smaller");
const biggerlbl = document.querySelector("#bigger");
const commentsBox = document.querySelector("#commentsBox");
btnGuess.addEventListener("click", GuessFn);

function GuessFn() {
    currGuess = parseInt(guessField.value);
    console.log("Curr Guess:" + currGuess);
    let comments = "";
    if (currGuess == ans && valid == 0) {
        comments = "CORRECT!";
    }
    if (currGuess > ans && valid == 0) {
        //replace the right number with current guess
        biggerlbl.innerHTML = currGuess;
        comments = "Too big!";
    }
    if (currGuess < ans && valid == 0) {
        //replace the left number with current guess
        smallerlbl.innerHTML = currGuess;
        comments = "Too small!";
    }
    guessField.value = "";
    counter++;
    //use JS Template Strings literals (backticks)
    commentsBox.innerHTML = `Your guess: ${currGuess} is ${comments} Tries:${counter}`;
    // If correct answer is guessed, create new element with additional content
    if (currGuess == ans && valid == 0) {
        var funfact = document.createElement('p');
        funfact.id = 'new-id';
        funfact.textContent = "A total of 49 countries were part of the Allies in World War 2. Initially it was only 26 countries, with more joining the war effort later on.";
        funfact.classList.add("new-class");
        quiz.appendChild(funfact);
        funfact.style.backgroundColor = "rgb(90, 90, 90)";
        valid++;
    }
}

// Minigame
// Start minigame
var startGame = document.getElementById("startGame");
startGame.addEventListener("click", Game);

function Game() {
    // Once started, remove ability to start a new game (prevenet starting multiple instances of the Game function)
    startGame.removeEventListener("click", Game);
    var time = 60;
    var timerBox = document.getElementById("timerBox");
    var gameBox = document.getElementById("gameBox");
    const enemyId = document.getElementById("enemyId");

    // Randomisation of enemy movement
    function GetRandom(min, max) {
        //this will select a number between min and max
        return Math.round(Math.random() * (max - min)) + min;
    }

    // Enemy movement
    function MoveEnemy() {

        const enemyWidth = enemyId.offsetWidth;
        const enemyHeight = enemyId.offsetHeight;
        const boxWidth = gameBox.offsetWidth;
        const boxHeight = gameBox.offsetHeight;

        const maxX = boxWidth - enemyWidth;
        const maxY = boxHeight - enemyHeight;

        enemyId.style.left = GetRandom(0, maxX) + "px";
        enemyId.style.top = GetRandom(0, maxY) + "px";

        // After moving, change enemy sprite to make it shoot (purely decorative)
        setTimeout(function () {
            enemyId.classList.remove("enemy-default");
            enemyId.classList.add("enemy-firing");
            const gunshot = new Audio("audio/gunshot.mp3");
            gunshot.play();
        }, 500);
        // After shooting, reset enemy sprite to default state
        setTimeout(function () {
            enemyId.classList.remove("enemy-firing");
            enemyId.classList.add("enemy-default");
        }, 750);

    }

    const scoreBox = document.getElementById("scoreBox");
    var score = 0; //to track how many kills
    // Function when enemy is killed/clicked on
    function enemyKill() {
        //increases score after killing
        score++;
        //update html scorebox
        scoreBox.innerHTML = "Score: " + score;
        // Change sprite to dead if enemy is clicked on, as well as play an enemy death sound
        enemyId.classList.remove("enemy-default");
        enemyId.classList.add("enemy-dead");
        const deathsound = new Audio("audio/deathsound.mp3");
        deathsound.play();
        // Reset sprite to default after a while (no multiple enemies unfortunately)
        setTimeout(function () {
            enemyId.classList.remove("enemy-dead");
            enemyId.classList.add("enemy-default");
        }, 750);
    }
    //link enemy to mouseclick to enemyKill function
    enemyId.addEventListener("click", enemyKill);
    // Make it such that clicking anywhere on the game area plays a shooting sound
    function shooting() {
        const gunshot = new Audio("audio/gunshot.mp3");
        gunshot.play();
    }
    gameBox.addEventListener("click", shooting);

    // Game loop
    var timecounter = setInterval(function () {
        time--;
        timerBox.innerHTML = "Time until extraction: " + time;
        MoveEnemy();
        // Stop the game when time is up and re-add the ability to start
        if (time == 0) {
            clearInterval(timecounter);
            enemyId.removeEventListener("click", enemyKill);
            gameBox.removeEventListener("click", shooting);
            alert("Game over! Your final score: " + score);
            startGame.addEventListener("click", Game);
        }
    }, 1000);
}