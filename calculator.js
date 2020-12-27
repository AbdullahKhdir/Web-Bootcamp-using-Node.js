const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({extended : true}));

app.get("/", function(req, res){       //Get Request to home root from browser
res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
var num1= Number(req.body.num1);
var num2= Number(req.body.num2);
var result = num1 + num2;

res.send("Number1 : "+num1+" and Number2 : "+num2+" = "+result);
});

//------------------------------------------------------------

app.get("/bmiCalculator", function(req, res){ //Get Request to home root from browser
res.sendFile(__dirname + "/bmiCalculator.html");
});

app.post("/bmiCalculator", function(req, res){
var weight = parseFloat(req.body.weight);
var height = parseFloat(req.body.height);
var result = weight / (height * height);
res.send("Your Weight is : "+weight +
         " and your height is : "+ height + "---"+ result);
});

app.listen(3000, function(){
  console.log("Server has started on port 3000!");
});
