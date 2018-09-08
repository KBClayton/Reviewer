const User = require("../models/User");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const logger = require('heroku-logger');
const verify=require("./verify")

module.exports = function(app) {
  app.post("/api/user/new", (req, res) => {
      console.log(`The post has hit the server, here is new User`);
      //console.log(req.body);
      //logger.info("The request has hit the server for new user");
      //logger.info(req.body);

      var user = new User({
        username: req.body.username,
        email:req.body.email,
        password: req.body.password
      });
      console.log(user);
      user.save((err,dbreply) => {
        //console.log(dbreply);
        if(err){
          console.log(err);
          return res.json({success: false, message: "Username or email taken"});
        }
        const token = jwt.sign({
          _id: user._id,
          username: user.username
        }, process.env.JWT_SECRET, {expiresIn:"10h"});
        req.session.token="JWT "+token;

        

        req.session.uid= user.id;
        req.session.username= user.username;
        //res.cookie('supercookie2', {token: "JWT " + token, username:user.username}, cookieParams);
        //vault.write(req, JSON.stringify({token: "JWT " + token, username:dbreply.username}));
        return res.json({success: true, message: "Successfully created new user", token: "JWT " + token});
      })
  });

  app.post("/api/user/login", (req, res) => {
     // console.log(req.body)
      //console.log(vault.read(req))
    User.findOne({
      username: req.body.username
    }, (err, user) => {
      if(!user){
        res.status(401).send({success: false, message: "wrong username"});
      } else {
        user.comparePassword(req.body.password, (err, isMatch) => {
            if(!err && isMatch){
              const token = jwt.sign({
                _id: user._id,
                username: user.username 
              }, process.env.JWT_SECRET);
              req.session.token="JWT "+token;
              //res.cookie('supercookie2', {token: "JWT " + token, username:isMatch.username}, cookieParams);
              //vault.write(req, JSON.stringify({token: "JWT " + token, username:isMatch.username}));
              res.json({success: true, token: "JWT " + token});
            } else {
              res.status(401).send({success: false, message: "wrong username or password"});
            }
        });
      }
    });
  })

  app.put("/api/user/", (req, res) => {
    //console.log(req.body);
    var user = new User({
      username: req.body.username,
      email:req.body.email,
      password: req.body.password
    });
    user.save(err => {
      if(err){
        return res.json({success: false, message: "Username taken"});
      }
      return res.json({success: true, message: "Successfully created new user"});
    })
  });

  app.delete("/api/user/logout", (req, res) => {
   // console.log(req.body);
    //console.log('Decrypted cookies: ', req.signedCookies)
    //res.cookie('supercookie2', {token: false, username:false}, cookieParams);
    if(!req.session.token){
      res.send({success:false, message:"You weren't logged in"})
    }
    req.session.token=null;
    req.session.uid= null;
    res.status(200).send({success:true, message:"loggedout"});
  })

  app.get("/api/user/allstuff", (req, res) => {
    User.findOne({_id:req.session.uid}).populate("products")
    .populate("reviews")
    .populate("replies")
    .populate("chats")
    .exec( function(err, dbreply) {
      if (err) {res.json(err)};
      res.json(dbreply);
    });
    // .then(dbreply=>
    //   {
    //     res.json(dbreply)}
    // );
  })
}