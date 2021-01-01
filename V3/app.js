const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const _ = require('lodash');
const date = require(__dirname + '/date.js');
var async = require("async");

/*const { JSDOM } = require( "jsdom" );
const { window } = new JSDOM( "" );
const $ = require( "jquery" )( window );*/
const app = express();
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');
mongoose.connect('mongodb://localhost:27017/todolistDB', {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});

let cBox =[];
let day = date.getDay();

const ITEMS_SCHEMA ={
  name:String
};
const DYN_LIST_SCHEMA = {
name : String,
items: [ITEMS_SCHEMA] //create a relation to items schema from the item variable
};

const collectionItem = mongoose.model("item",ITEMS_SCHEMA);
const collectionList = mongoose.model("List", DYN_LIST_SCHEMA);

const defaultItem = new collectionItem({
    name: "New list is added!"
});
const DEFAULT_ITEMS = [defaultItem];

app.get("/", function(req, res){
  collectionItem.find({ }, function(err, foundItem) {
      if (err) {
        console.log(err);
      }else {
          if (_.isEmpty(foundItem)) {
            //jQuery Alert please refresh the page!
            collectionItem.insertMany([defaultItem], function(err, result){
                if (err) {
                  console.log(err);
                }else {
                }
            });
            res.redirect("/");
          }
          res.render("list", {title : "Today", newListItems : foundItem}); // only one request can be send, otherwise res.write() should be used!
      }
      });
});

app.post("/" , function(req, res){

    let getListName = req.body.list;
    let item =req.body.newItem;

    console.log("List Name : " + getListName);

    const insertItemDyn = new collectionItem({
          name: item
    });

    if (getListName === "Today") {
      collectionItem.bulkWrite([
        {
          insertOne: {
            document: {
              name: _.trim(item)
            }
          }
        }
      ]);
    //  insertItemDyn.save;
      res.redirect("/");
    }else {
      console.log("dynPageName is : " + getListName);
      collectionList.findOne({name: getListName}, function(err, foundList){

      foundList.items.push(insertItemDyn);
      foundList.save();
      res.redirect("/" + getListName);
      });
    }
});

app.post("/delete", function(req, res){
    const CBOX = req.body.checkbox;
    let getListName= req.body.listName;

    if (getListName === "Today") {
      console.log("List :"+getListName);
      collectionItem.bulkWrite([
        {
          deleteOne:{
              filter: { name: CBOX }
          }
        }
      ]);
      res.redirect("/");
    }else {
      //to search for a doc in an array and modify it ($pull)
      collectionList.findOneAndUpdate({name : getListName} , {$pull: {items: {name: CBOX}}} , function(err, foundList){
      if (!err) {
        res.redirect("/" + getListName);
      }
      });
    }
  });




app.get("/:dynPage", function(req, res){

  const DYN_PAGE= _.capitalize(req.params.dynPage);
  collectionList.findOne({name : DYN_PAGE}, function(err, foundList){

    if (err) {
      console.log( "Error >> " + err);
    }else {
      if (!foundList) {
        //create a new list (collection)
        const LIST = new collectionList({ //new collection schema
          name: DYN_PAGE,
          items: DEFAULT_ITEMS
        });
        LIST.save(); // save the new collection in the database
        res.redirect("/"+ DYN_PAGE);
      }else {
        //Show an existing list.ejs (edit list.ejs)
        res.render("list" , {title : foundList.name , newListItems : foundList.items});
      }
    }
  });
});

app.listen(3000, function(){
  console.log("Server is on !");
});
