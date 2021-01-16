"use strict";
const express = require('express');
const body = require('body-parser');
const mongoose = require('mongoose');
const _ = require('lodash');
//const date = require(__dirname + '/date.js');
//var async = require("async");
//const jsdom = require("jsdom");
//const { JSDOM } = jsdom;
//const { document } = (new JSDOM(`...`)).window;

/*const { JSDOM } = require( "jsdom" );
const { window } = new JSDOM( "" );
const $ = require( "jquery" )( window );*/

const app = express();
app.use(body.urlencoded({extended : true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');
mongoose.connect('mongodb://localhost:27017/wikiDB', {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});

const docArticles = {
  title  : String,
  content: String
};
const collectionArticles = mongoose.model("Article", docArticles);

//--------------------------------------
app.route("/articles")
.get(function(req, res){

collectionArticles.find(function(err, foundList){
    if (err) {
      console.log(err);
    }else {
      res.send(foundList);
    }
  });
})
.post(function(req, res){
  const addValue = new collectionArticles({
      title: req.body.title,
      content: req.body.content
  });

  addValue.save(function(err){
    if (!err) {
      res.send("Article is added!");
    }else {
      res.send("err: " + err);
    }
  });
})
.delete(function(req, res){
  collectionArticles.deleteMany(function(err){
    if (err) {
      console.log(err);
    }else {
      console.log("deleted all!");
    }
  });
});
//--------------------------------------
//--------------------------------------
app.route("/articles/:articleTitle")
.get(function(req, res){
    collectionArticles.findOne({title : req.params.articleTitle}, function(err, foundArticle){
        if (err) {
          res.send(err);
        }else {
          if (foundArticle) {
            res.send(foundArticle);
          }else {
            res.send("Artikel is not found!");
          }
        }
    });
})
.put(function(req, res){

  collectionArticles.update(
    {title : req.params.articleTitle},
    {title : req.body.title, content : req.body.content},
    {overwrite : true} , function(err){
      if (!err) {
        res.send("updated");
      }else {
        res.send(err);
      }
    });
})
.patch(function(req, res){

  collectionArticles.update(
    {title : req.params.articleTitle},
    {$set : req.body},
    function(err){
      if (!err) {
        res.send("updated");
      }else {
        res.send(err);
      }
    });
})
.delete(function(req, res){

  collectionArticles.deleteOne({title : req.params.articleTitle} , function(err){
    if (err) {
      res.send(err);
    }else {
      res.send("deleted");
    }
  });

});
//--------------------------------------

//--------------------------------------
let port = process.env.PORT;
if (port == null || port == "") {
  port = 2000;
}
app.listen(port, function(){
  console.log("Server is on !");
});
//--------------------------------------
