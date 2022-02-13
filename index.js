const buttonColours = ["red", "blue", "green", "yellow"];
const gamePattern = [];
let userClickedPattern = [];

let randomChosenColour;
let level = 0;
let gameStarted = false;
let randomNumber;

$("#" + randomChosenColour);

$(document).keypress(function () {
  if (!gameStarted) {
    nextSequence();
    gameStarted = false;
  }
});

$(".btn").click(btnClick);

function btnClick(event) {
  let userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
}

function nextSequence() {
  level++;
  $("#level-title").text("Level " + level);
  randomChosenColour = buttonColours[randomNumber];
  randomNumber = Math.floor(Math.random() * 3) + 1;
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(pressedColor) {
  $("#" + pressedColor)
    .keypress()
    .addClass("pressed");

  setTimeout(function () {
    $("#" + pressedColor).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");

    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 100);
    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
