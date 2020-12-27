const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({extended : true}));

app.get("/", function(req, res){
res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
  const queryCity =req.body.city ;
  const queryDegree = "units=metric"; //For temperature in Fahrenheit use units=imperial
                                      //For temperature in Celsius use units=metric
                                      //in Kelvin with no parameter (no queryDegree)
  const apiKey ="8ea482ce436676191f15c6baff8e00ce";

  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + queryCity +
              "&appid=" + apiKey + "&" +queryDegree ;

//https.get() takes only one Response parameter
https.get(url, function(response){ // p.s  https.get(url, oneParameterCallBackFunction)
  //console.log(res.statusCode);

  response.on("data", function(data){

    const weatherData = JSON.parse(data);
    const temp = weatherData.main.temp;
    const weatherDesc = weatherData.weather[0].description;
    const city = weatherData.name;
    const country = weatherData.sys.country;
    const iconUrl = "http://openweathermap.org/img/wn/"+ weatherData.weather[0].icon +"@2x.png";

    res.write("<h1>the current temperature in "
              + city+" "+  country + " is " +  temp + " degrees Celcius</h1> ");
    res.write("<h2> weatherDesc : " + weatherDesc+"</h2>");
    res.write("<br><br><img src=" + iconUrl + " alt='Weather Image'>");
    res.send();
  });
});
});


app.listen(3000, function(){
  console.log("Server is running on 3000!");
});



/*const object = {
  name: "Abdullah",
  Course : "Web bootcamp!"
}
console.log(JSON.stringify(object));*/
