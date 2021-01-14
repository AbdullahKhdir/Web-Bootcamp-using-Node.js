"use strict";
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const _ = require('lodash');
const date = require(__dirname + '/date.js');
var async = require("async");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { document } = (new JSDOM(`...`)).window;

/*const { JSDOM } = require( "jsdom" );
const { window } = new JSDOM( "" );
const $ = require( "jquery" )( window );*/

const app = express();
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');
mongoose.connect('mongodb+srv://admin-abdullah:start123@mongodb.7trds.mongodb.net/todolistDB', {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});

let cBox =[];
let day = date.getDay();
let datum = date.getDate();
let gEditId="";
let id = "";
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
    name: "A Daily ToDo List!"
});
const DEFAULT_ITEMS = [defaultItem];
let trigger = true;

//--------------------------------------
app.get("/", function(req, res){
  if (trigger) {   //one time execution
  collectionItem.find({}, function(err, foundItem) {
      if (err) {
        console.log(err);
      }else {
          if(_.isEmpty(foundItem)){
            //jQuery Alert please refresh the page!
            collectionItem.insertMany([defaultItem], function(err, result){
                if (err) {
                  console.log(err);
                }else {
                }
            });
            res.redirect("/");
            }
      }
      });
    trigger = false;
    }else {
        cBox=[];
        res.redirect("/" +_.trim(_.kebabCase(datum)));
    }
});
app.post("/", function(req, res){

    let getListName = req.body.list;
    let item =req.body.newItem;
    //console.log(getListName);
    const insertItemDyn = new collectionItem({
          name: item
    });

    if (_.isEmpty(item)) {
      res.status(204).send();
    }else {
      if (getListName === "Favicon.ico" ||item  === "Favicon.ico") {
        item = "";
      }

    if (getListName === datum) {
      collectionItem.bulkWrite([
        {
          insertOne: {
            document: {
              name: _.trim(item)
            }
          }
        }
      ]);
    //insertItemDyn.save;
      cBox =[];
      res.redirect("/");
    }else {
      //console.log("dynPageName is : " + getListName);
      if (getListName==="Favicon.ico" || item === "Favicon.ico") {
        getListName="";
      }else {
      collectionList.findOne({name: getListName}, function(err, foundList){
      foundList.items.push(insertItemDyn);
      foundList.save();
      res.redirect("/" + getListName);
      });
      }
    }
    }
});
app.post("/deleteIndex" , function(req, res){

  let getListName = req.body.listName;
  let cBoxName = req.body.checkbox;

  //console.log("deleting an item using bulkWrite!");
  collectionItem.bulkWrite([{
    deleteMany: {
      filter: { _id: cBoxName}
    }
  }]);
  res.redirect("/");

});
//--------------------------------------

//--------------------------------------
app.get("/index", function(req, res){
  collectionList.find({}, function(err, foundList){
    res.render("lists", {title: foundList, newListItems: foundList,
                          home: "/" , lists: "/index", add:"/newList"});
    });
      cBox=[];
});
app.post("/index", function(req, res){

});
//--------------------------------------

//------------Post-Req lists to an array to delete------------
app.post("/pushSelectedList" , function(req, res){
    const checkedList = req.body.checkbox;
    let   getListName = req.body.listName;

    //console.log("List Name : " + getListName);
    //console.log("checkBox params : " + checkedList);
    gEditId = checkedList;
    id = gEditId;
    res.status(204).send();
    if (typeof checkedList !== "undefined"){
      cBox.forEach(function(item){
        if(cBox[item] === cBox[item-1]){
          cBox.pop();
        }
      });
      cBox.push(req.body.checkbox);
      //console.log("cBox:" + cBox);
    }else{
    cBox.pop();
    }
});
app.post("/deleteList" , function(req, res){
  console.log("Post delete: " + cBox);
  cBox.forEach(function(item){
      collectionList.bulkWrite([{
        deleteMany: {
          filter: { _id: item }
        }
      }]);
    });
  res.redirect("/index");
});
//------------------------------------------------------------

//------------Post-Req items of a list to an array to delete------------
app.post("/pushSelectedItem", function(req, res){
    const checkedItem = req.body.checkbox;
    let getListName = req.body.listName;

//    console.log("List Name : " + getListName);
//    console.log("checkBox params : " + checkedItem);

    res.status(204).send();

    if (typeof checkedItem !== "undefined"){
      cBox.push(checkedItem);
    }else{
      cBox.pop();
    }
    //console.log("innerInfos item : " + cBox);
});
app.post("/delete" , function(req, res){
    let getListName = req.body.listName;
    if (req.body.listName === "Today") {
      //console.log("deleting an item using bulkWrite!");
      collectionItem.bulkWrite([{
        deleteMany: {
          filter: { _id: cBox }
        }
      }]);
      res.redirect("/");
    }else {
      //console.log("findAndUpdate!");
      cBox.forEach(function(item){
        collectionList.findOneAndUpdate( {name: getListName} , {$pull: {items: {_id: item}}} , function(err, foundList){
        if (!err) {
        }
        });
      });
        cBox = [];
        res.redirect("/" + getListName);
    }
  });
//------------------------------------------------------------------

//-------------Get & Post Request NewList--------------------------
app.get("/newList" ,function(req, res){

  //let str =[{name : "",items: [{name:""}]}];
    res.render("AddList", {title: "",
                              home: "/" , lists: "/index",
                              add: "/newList"});
});
app.post("/newList", function(req, res){
  let getListName = req.body.comboseTitelTxt;
  let getListContent = req.body.comboseTxt;

  //console.log(getListName);
  //console.log(getListContent);

  const newListContent = new collectionItem({
      name: _.trim(getListContent)
  });
  const newList = new collectionList({ //new collection schema
    name: getListName,
    items: newListContent
  });
  newList.save(); // save the new collection in the database
  res.redirect("/index");
});
//----------------------------------------------------------------

//-----------Get & Post Request to edit a list----------------------
app.get("/edit" , function(req, res){

    if (typeof gEditId !== "undefined"){
        //console.log("get EditListId : " + gEditId);
        collectionList.find({_id: gEditId}, function(err, foundList){
            res.render("updateList", {title: foundList, home: "/",
                                      lists: "/index", add:"/newList"});
            gEditId ="";
            if (err) {
              res.status(204).send();
            }
        });
    }
});
app.post("/editList", function(req, res){

  if (typeof gEditId !== "undefined"){
    //console.log("Post EditListId : " + gEditId);
    collectionList.find({_id: gEditId}, function(err, foundList){
        res.render("updateList", {title: foundList, home: "/",
                                  lists: "/index", add:"/newList"});
      });
  }

});
app.post("/SaveList", function(req, res){

  let setListTitel = req.body.listTitle;
  let setContent = req.body.listTxt;

  //console.log("title: " + setListTitel);
  //console.log("Content: " + setContent);
  //console.log("ListId" + id);

  const setItem = new collectionItem({
      name: setContent
  });

  collectionList.findOneAndUpdate({_id : id} , {$set: {name: setListTitel, items:setItem}}, function(err, foundList){
  if (!err) {
    res.redirect("/index");
  }else {
    console.log(err);
  }
});

  /*collectionList.findOne({_id: listID}, function(err, foundlist){
      if (err) {
        console.log(err);
      }else {
        collectionList.bulkWrite([{
        updateOne: {
        filter: { name: _.trim(foundlist.name)},
        update: { title: _.trim(getListTitle)}
        }}]);
        res.redirect("/index");
      }
  });*/

});
//------------------------------------------------------------------

//dynPage für creating a daily list using datum
//dynPage für looking for old daily lists
app.get("/:dynPage", function(req, res){
  const DYN_PAGE= _.capitalize(req.params.dynPage);
  collectionList.findOne({name : DYN_PAGE}, function(err, foundList){
  cBox =[];
    if (err) {
      console.log( "Error >> " + err);
    }else {
      if (DYN_PAGE === _.trim(_.kebabCase(datum))) {
      if (DYN_PAGE !== "Favicon.ico" && !_.isEmpty(DYN_PAGE)) {
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
        res.render("index", {title: foundList.name,
                             newListItems: foundList.items,
                             home: "/", lists: "/index", add:"/newList"});
      }
      }
    }else {
      res.status(404).sendFile(__dirname + '/public/imgs/err404.jpg');
    }
    }
  });
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 2000;
}

app.listen(port, function(){
  console.log("Server is on !");
});
