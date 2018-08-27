const mongoose = require("mongoose");
const express = require("express");
const app=express();
PORT=process.env.PORT||3001;
const db= require('./models')
//mongoose.connect(process.env.MONGODB_URI|| "mongodb://localhost/review")
mongoose.connect("mongodb://localhost/review");
const bodyp= require("body-parser");

app.use(bodyp);
app.get("/api/song", function(req, res){
  db.Song.findall().then(function(dbreply){
      res.json(dbreply)
  })
  .catch(function(err){
      console.log(err)
  })  
})

app.get("/populate", function(req, res){
    db.Album.create({title:"kitty", artist:"thinger"}).then( function(dbreply){
        console.log(dbreply);
        db.Song.then({title:"kitty", artist:"thinger"}).then(function(dbreply){
            console.log(dbreply)
            res.send("added?")
        })
    })
})

app.post("/api/song", function(req, res){
    console.log(req.body)
    db.Song.create(req.body).then(function(dbreply){
        res.json(dbreply)
    })
    .catch(function(err){
        console.log(err)
    })  
})
app.post("/api/album", function(req, res){
    console.log(req.body)
    db.Song.create(req.body).then(function(dbreply){
        res.json(dbreply)
    })
    .catch(function(err){
        console.log(err)
    })  
})
app.get("*", function(req, res){
    res.send("404")
})

app.listen(PORT, ()=>{
    console.log(`listing on ${PORT}`)
})