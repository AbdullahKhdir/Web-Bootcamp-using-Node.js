const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');
const app = express();

app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static("public")); //to access local resources

//get()
app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html");
});

//app.post()
app.post("/" , function(req, res){

const firstName = req.body.FirstName;
const lastName = req.body.LastName;
const email = req.body.Email;

const data = {
    members : [
      {
        email_address : email,
        status : "subscribed",
        merge_fields : {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
};
const jsonData = JSON.stringify(data);

const url = "https://us7.api.mailchimp.com/3.0/lists/0c943faf09";

const options = {
  method: "POST",
  auth : "AbdullKh:b623c8ceaa33666d88c8f84230d920b9-us7"
}

  const request = https.request(url, options, function(response){

      response.on("data", function(data){
        //console.log(JSON.parse(data));
        if (response.statusCode == "200") {
            //res.sendStatus(200);
            res.sendFile(__dirname + "/success.html");
        }else{
            res.sendFile(__dirname + "/failur.html");
            //res.sendStatus(403);
          }
      });
  });

  request.write(jsonData);
  request.end();
});

//Listen()
app.listen(3000 ,function(){
console.log("Server is running on port 3000!");
});
//ChimpyKey
//b623c8ceaa33666d88c8f84230d920b9-us7
//list ID
//0c943faf09
