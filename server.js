/*
 * Write your routing code in this file.  Make sure to add your name and
 * @oregonstate.edu email address below.
 *
 * Name: Michael Chan
 * Email: chanmic@oregonstate.edu
 */
var fs = require('fs');
var path = require('path');
var express = require('express');
var handlebars = require('express-handlebars');
var MongoClient = require('mongodb').MongoClient;
//var videos = require('./videos.json');
var bodyParser = require('body-parser');
var app = express();
var port = process.env.PORT || 4112;

var mongoURL = 'mongodb://cs290_miurary:cs290_miurary@classmongo.engr.oregonstate.edu:27017/cs290_miurary';
var mongoConnection = null;

app.engine('handlebars', handlebars( {
  defaultLayout: 'main',
}));

app.set('view engine', 'handlebars');

app.use(bodyParser.json());

app.get('/', function (req, res) {
  var collection = mongoConnection.collection('final');
  var videos = collection.find({}).toArray(function (err, videos) {
    if (err) {
      res.status(500).send("Error fetching");
    }
    else {
      res.status(200).render('index', {
        video: videos
      });
      console.log("== Server status", res.statusCode);
    }
  })

});

app.use(express.static('public'));
app.use(bodyParser.json());

app.get('*', function (req, res) {
  res.status(404).render('404');
  console.log("== Server status", res.statusCode);
});

app.post('/deleteVideo', function (req, res) {
  if (req.body && req.body.videoId) {
    var collection = mongoConnection.collection('final');
    collection.remove({videoId: req.body.videoId}, {justOne: true});
    res.status(200).send("removed");
  }
  else {
    res.status(400).send("rip");
  }
});

app.post('/addVideo', function (req, res) {

if (req.body && req.body.title && req.body.videoId) {
  var collection = mongoConnection.collection('final');
  collection.insertOne({
    title: req.body.title,
    videoId: req.body.videoId
  })
  res.status(200).send("Swag");
}
else {
  res.status(400).send("Oh no :(");
}
});

MongoClient.connect (mongoURL, function (err, connection) {

  if (err)
    throw err;
  mongoConnection = connection;
  app.listen(port, function () {
    console.log("== Server listening on port:", port);
});
});
