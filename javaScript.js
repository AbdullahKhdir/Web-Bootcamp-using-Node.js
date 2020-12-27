/*<script type="module">
function getRandomArbitrary(min, max) {
return Math.floor((Math.random() * (max - min)) + min);
}
  var playerOne =getRandomArbitrary(1,7);
  var playerTwo =getRandomArbitrary(1,7);
  document.querySelector(".dice .img1").setAttribute("src" , "images/dice"+playerOne+".png")
  document.querySelector(".dice .img2").setAttribute("src" , "images/dice"+playerTwo+".png")

  if (playerOne > playerTwo) {
    document.querySelector("h1").innerHTML = "Player 1 <strong>WON<strong>"
  }else if(playerOne == playerTwo){
    document.querySelector("h1").innerHTML = "<strong>DRAW<strong>"
  }else {
    document.querySelector("h1").innerHTML = "Player 2 <strong>Won<strong>"
  }
</script>*/
function getRandomArbitrary(min, max) {
return Math.floor((Math.random() * (max - min)) + min);
}
  var TeamPlayerOne =getRandomArbitrary(1,7);
  var TeamPlayerTwo =getRandomArbitrary(1,7);
  var Team2PlayerOne =getRandomArbitrary(1,7);
  var Team2PlayerTwo =getRandomArbitrary(1,7);
  var summeTeamOne = TeamPlayerOne + TeamPlayerTwo;
  var summeTeamTwo = Team2PlayerOne + Team2PlayerTwo;
  document.querySelector(".dice .img1").setAttribute("src" , "images/dice"+TeamPlayerOne+".png");
  document.querySelector(".dice .img2").setAttribute("src" , "images/dice"+TeamPlayerTwo+".png");
  document.querySelector(".dice .img3").setAttribute("src" , "images/dice"+Team2PlayerOne+".png");
  document.querySelector(".dice .img4").setAttribute("src" , "images/dice"+Team2PlayerTwo+".png");

  if (summeTeamOne > summeTeamTwo) {
    document.querySelector("h1").innerHTML = "🥇🏆Team 1 <strong>WON<strong>"
  }else if(summeTeamOne == summeTeamTwo){
    document.querySelector("h1").innerHTML = "<strong>DRAW!<strong>"
  }else {
    document.querySelector("h1").innerHTML = "Team 2 <strong>Won<strong>🏆🥇"
  }
