
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({extenden : true}));

app.get("/", function(req, res){ //Get Request to home root from browser
res.send("<h1>Express Server!</h1>");
});

app.get("/contact", function(req, res){
res.send("<h2>Contact Informations: xxx@gmail.com</h2>");
});

app.get("/about", function(req, res){
res.send("<h3>About!.</h2>");
});

app.listen(3000, function(){
  console.log("Server has started on port 3000!");
});
