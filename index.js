

//Programm Start
var buttonColours =["red", "green" , "blue" , "yellow"];
var userClickedPattern= []; //user clicked color
var gamePattern=[];         //Random generated color
var start = true;
var level = 1;

$(document).on("keydown", function(){
if (start) {
level=1;
userClickedPattern=[];
gamePattern=[];
$("#level-title").text("Level "+level);
var randomNr = nextSeq();
initSession(randomNr);
gamePattern.push(randomNr);
//console.log(gamePattern);
start = false;
}
});


//Click a color
$(".btn").on("click", function(){

  var strBtn =this.className;
  getBtnSound(strBtn.slice(4));

  var userChosenColor = strBtn.slice(4);
  userClickedPattern.push(userChosenColor);

  checkPattern(userClickedPattern.length - 1);
});

function nextSeq(){
  var getRandomNr = Math.floor(Math.random() * 4);
  var randomChosenColour  = buttonColours[getRandomNr];
  return randomChosenColour;
}

function getBtnSound(key){
  switch (key) {
    case "blue":
    var audio = new Audio("sounds/blue.mp3");
    audio.play();
    $(".blue").addClass("pressed");
    setTimeout(function(){
    $(".blue").removeClass("pressed");
    }, 100);
    break;

    case "green":
    var audio = new Audio("sounds/green.mp3");
    audio.play();
    $(".green").addClass("pressed");
    setTimeout(function(){
    $(".green").removeClass("pressed");
    }, 100);
    break;

    case "red":
    var audio = new Audio("sounds/red.mp3");
    audio.play();
    $(".red").addClass("pressed");
    setTimeout(function(){
    $(".red").removeClass("pressed");
    }, 100);
    break;

    case "yellow":
    var audio = new Audio("sounds/yellow.mp3");
    audio.play();
    $(".yellow").addClass("pressed");
    setTimeout(function(){
    $(".yellow").removeClass("pressed");
    }, 100);
    break;
    default:
  }

}

function initSession(getRandomNr){

  switch (getRandomNr) {
    case "blue":
    var audio = new Audio("sounds/blue.mp3");
    audio.play();
    $(".blue").addClass("pressed");
    setTimeout(function(){
    $(".blue").removeClass("pressed");
    }, 100);
    break;

    case "green":
    var audio = new Audio("sounds/green.mp3");
    audio.play();
    $(".green").addClass("pressed");
    setTimeout(function(){
    $(".green").removeClass("pressed");
    }, 100);
    break;

    case "red":
    var audio = new Audio("sounds/red.mp3");
    audio.play();
    $(".red").addClass("pressed");
    setTimeout(function(){
    $(".red").removeClass("pressed");
    }, 100);
    break;

    case "yellow":
    var audio = new Audio("sounds/yellow.mp3");
    audio.play();
    $(".yellow").addClass("pressed");
    setTimeout(function(){
    $(".yellow").removeClass("pressed");
    }, 100);
    break;
    default:

  }

}

function addPattern(){

  var color = nextSeq();
  switch (color) {

    case "red":
    var audio = new Audio("sounds/red.mp3");
    audio.play();
    $("#"+color).fadeOut(100).fadeIn(100);
    break;

    case "green":
    var audio = new Audio("sounds/green.mp3");
    audio.play();
    $("#"+color).fadeOut(100).fadeIn(100);
    break;

    case "blue":
    var audio = new Audio("sounds/blue.mp3");
    audio.play();
    $("#"+color).fadeOut(100).fadeIn(100);
    break;

    case "yellow":
    var audio = new Audio("sounds/yellow.mp3");
    audio.play();
    $("#"+color).fadeOut(100).fadeIn(100);
    break;

    default:
  }
  return color;
}
function checkPattern(checkPattern){

  if(gamePattern[checkPattern] === userClickedPattern [checkPattern]){

      if(gamePattern.length === userClickedPattern.length){
        setTimeout(function(){
          level = level + 1;
          $("#level-title").text("Level "+ level);
          var aPattern = addPattern();
          gamePattern.push(aPattern);
          //console.log( "GamePattern :" +gamePattern);
          //console.log( "UserClickedPattern :" + userClickedPattern);
        }, 1500);
            userClickedPattern= [];
      }

    }else{
      $("Body").addClass("game-over");
      $("h1").text("Game Over, Press Any Key to Restart");
      var gameOver = new Audio("sounds/wrong.mp3");
      gameOver.play();
      setTimeout(function(){
        $("Body").removeClass("game-over");
      }, 500);
      start = true;
    }

  }
