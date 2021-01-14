const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const _ = require('lodash');
const date = require(__dirname + '/date.js');

/*const { JSDOM } = require( "jsdom" );
const { window } = new JSDOM( "" );
const $ = require( "jquery" )( window );*/

let items =["Eat Breakfast" ,"Study" ,"Do some stuff"];
let workItems =[];
let cBox =[];

const app = express();
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');
mongoose.connect('mongodb://localhost:27017/todolistDB', {useNewUrlParser: true, useUnifiedTopology: true});

const ITEMS_SCHEMA ={
  name:{type: String,
        required : true}
};
const ITEMS_WORKS_SCHEMA ={
  name:{type: String,
        required : true}
};

const collectionItem = mongoose.model("item",ITEMS_SCHEMA);
const collectionItemsWork = mongoose.model("workItem",ITEMS_WORKS_SCHEMA);

const docItem1 = new collectionItem({
    name: "Eat Breakfast!"
});
const docItem2 = new collectionItem({
    name: "Study"
});
const docItem3 = new collectionItem({
    name: "Do some stuff"
});
const docItem4 = new collectionItem({
    name: "mongoDB is inserted!"
});
const docItemWork1 = new collectionItemsWork({
    name: "Cannot set headers after they are sent to the client"
});
const docItemWork2 = new collectionItemsWork({
    name: "Work Item 2"
});
const docItemWork3 = new collectionItemsWork({
    name: "Work Item 3"
});

app.get("/" , function(req, res){
  let day = date.getDay();
  collectionItem.find({ }, function(err, foundItem) {
      if (err) {
        console.log(err);
      }else {
          if (_.isEmpty(foundItem)) {
            //jQuery Alert please refresh the page!
            collectionItem.insertMany([docItem1, docItem2, docItem3, docItem4], function(err, result){
                if (err) {
                  console.log(err);
                }else {
                }
            });
            res.redirect("/");
          }
          res.render("list", {title : day, newListItems : foundItem}); // only one request can be send, otherwise res.write() should be used!
      }
      });

  collectionItemsWork.find({ }, function(err, foundItem) {
          if (err) {
            console.log(err);
          }else {
              if (_.isEmpty(foundItem)) {
                collectionItemsWork.insertMany([docItemWork1, docItemWork2, docItemWork3], function(err, result){
                    if (err) {
                      console.log(err);
                    }else {
                    }
                });
              }
          }
          });
});


app.post("/" , function(req, res){

    let item =req.body.newItem;
    const CBOX = req.body.checkbox;
    cBox.push(CBOX);

    if (req.body.button === "Work") {
      //if (item.length !== 0) { instead input attribute is used
      console.log(req.body);
      collectionItemsWork.bulkWrite([
        {
          insertOne: {
            document: {
              name: _.trim(item)
            }
          }
        }
      ]);
      res.redirect("/work");
      //}else{
      //show Notification using jQuery
      //}
    }else if(req.body.button === "remove-Work"){

      for (var i = 0; i <= cBox.length; i++) {
      collectionItemsWork.deleteOne({ name : cBox[i]} , function(err, result){
        if (err) {
          console.log(err);
        }else {
          cBox.pop();
        }
      });
    }
      res.redirect("/work");

    }else if(req.body.button === "Today"){
        console.log(req.body);
        collectionItem.bulkWrite([
          {
            insertOne: {
              document: {
                name: _.trim(item)
              }
            }
          }
        ]);
        res.redirect("/");
    }else if(req.body.button === "remove-Today"){

      for (var i = 0; i <= cBox.length; i++) {
      collectionItem.deleteOne({ name : cBox[i]} , function(err, result){
        if (err) {
          console.log(err);
        }else {
          cBox.pop();
        }
      });
    }
    res.redirect("/");
  }

});

app.get("/work" , function(req, res){

  collectionItemsWork.find({ }, function(err, foundItem) {
      if (err) {
        console.log(err);
      }else {
          if (_.isEmpty(foundItem)) {
            //jQuery Alert please refresh the page!
            collectionItemsWork.insertMany([docItemWork1, docItemWork2, docItemWork3], function(err, result){
                if (err) {
                  console.log(err);
                }else {
                }
            });
            res.redirect("/work");
          }
          res.render("list", {title : "Work List", newListItems : foundItem});
      }
      });

});

app.listen(5000, function(){
  console.log("Server is on !");
});
