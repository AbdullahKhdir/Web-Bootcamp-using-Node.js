const express = require('express');
const bodyParser = require('body-parser');
const date = require(__dirname + '/date.js');
/*const { JSDOM } = require( "jsdom" );
const { window } = new JSDOM( "" );
const $ = require( "jquery" )( window );*/
const app = express();
let items =["Eat Breakfast" ,"Study" ,"Do some stuff"];
let workItems =[];

app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');

app.get("/" , function(req, res){
    let day = date.getDay();
    res.render("list", {title : day, newListItems : items});
});

app.post("/" , function(req, res){

    let item =req.body.newItem;

    if (req.body.button === "Work") {
      if (item.length !== 0) {
      console.log(req.body);
      workItems.push(item);
      res.redirect("/work");
      }else{
      //show Notification using jQuery
      }
    }else if(req.body.button === "remove-Work"){
      console.log( req.body);
      workItems.pop();
      res.redirect("/work");

    }else if(req.body.button === "Today"){
      if (item.length !== 0) {
        console.log(req.body);
        items.push(item);
        res.redirect("/");
      }else {
        //show Notification using jQuery
      }
    }else if(req.body.button === "remove-Today"){
      console.log( req.body);
      items.pop();
      res.redirect("/");
    }
        /*$(".add").on("click", function(){
          items.push(item);
        });

        $(".remove").on("click", function(){
          items.pop();
        });*/
});

app.get("/work" , function(req, res){
  res.render("list", {title : "Work List", newListItems : workItems});
});

app.get("/about" , function(req, res){
  res.render("about");
});

app.listen(3000, function(){
  console.log("Server is on !");
});
