//Code that generates, styles, and stores the Simon sequences
var buttonColors = ['red', 'blue', 'green', 'yellow'];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;


$(document).keydown(function () {
  if (!started) {
    nextSequence();
    started = true;
  }
});

//keeping track of user responses to the above sequences
$('.btn').click(function (event) {
  // var userChosenColor = event.target.id; is also very possible and accepted
  var userChosenColor = $(this).attr('id');
  userClickedPattern.push(userChosenColor);
  animatePress(userChosenColor);
  playSound(userChosenColor);

  checkAnswer(userClickedPattern.length - 1);
});


//utility functions
function checkAnswer (currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(nextSequence,1000);
    }
  } else {
    playSound("wrong");
    $('body').addClass('game-over');
    $('h1').text("Game Over, Press Any Key to Restart");

    setTimeout(function () {
      $('body').removeClass('game-over');
    },200);

    startOver();
  }
}

function nextSequence() {
  $('h1').text("Level " + (++level));
  userClickedPattern = [];

  var randomNumber = Math.floor(Math.random() * 4),
      randomChosenColor = buttonColors[randomNumber];

  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
}

function playSound(name) {
  var audio = new Audio('sounds/' + name + '.mp3');
  audio.play();
}

function animatePress(currentColor) {
  $('#' + currentColor).addClass('pressed');
  setTimeout( function() {
    $('#' + currentColor).removeClass('pressed');
  },100);
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

// { //this is what i used to replay the string of instructions each time before the user could input
//   var index = 0;
//   var playSequence = setInterval(function () {
//     animatePress(gamePattern[index]);
//     playSound(gamePattern[index]);
//     index++;
//     if (index >= gamePattern.length) {
//       clearInterval(playSequence);
//     }
//   },500);
// }
