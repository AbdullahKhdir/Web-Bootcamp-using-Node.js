const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.set('view engine', 'ejs');

app.get("/" , function(req, res){
  res.sendFile(__dirname + "/index.html");

  var today = new Date();
  var currentDay = today.getDay(); // 0 Sunday 1,2,3,4,5 6saturday
  var day ="";
    switch (currentDay) {
        case 0:
        day ="Sunday";
        break;
        case 1:
        day ="Monday";
        break;
        case 2:
        day ="Tuesday";
        break;
        case 3:
        day ="Wednesday";
        break;
        case 4:
        day ="Thursday";
        break;
        case 5:
        day ="Friday";
        break;
        case 6:
        day ="Saturday";
        break;
      default:
        day="Err day = " + currentDay;
    }

    res.render("list", {Day : day});
  });

app.post("/" , function(req, res){

});


app.listen(3000, function(){
  console.log("Server is on !");
});
