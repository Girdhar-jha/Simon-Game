var userClickedPattern = [];
var level = 0;
var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var started = false;
$(document).keydown(function () {
  if(!started) {
    $("h1").text("LEVEL" + level);
    nextsequence();
    started = true;
  }
});
function nextsequence() {
  userClickedPattern = [];
  level++;
  $("h1").text("LEVEL " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChooseColor = buttonColours[randomNumber];
  gamePattern.push(randomChooseColor);
  $("#" + randomChooseColor).delay(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChooseColor);

}
$(".btn").click(function(event) {
  var userChoosenColor = $(this).attr("id");

  userClickedPattern.push(userChoosenColor);
  checkAnswer(userClickedPattern.length - 1);
  playSound(userChoosenColor);
  animatePress(userChoosenColor);
});

function playSound(bomb) {
  var io = "sounds/" + bomb + ".mp3";
  var audio = new Audio(io);
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}


function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("success");
    if (userClickedPattern.length == gamePattern.length) {
      setTimeout(function() {
        nextsequence();
      }, 1000);
    }
  }
  else{
    console.log("wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("GAME OVER, PRESS ANY KEY TO START");
    startOver();
}
}
function startOver(){
  level=0;
  gamePattern = [];
  started = false;
}
