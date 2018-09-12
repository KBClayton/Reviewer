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
        req.session.token=token;

        // jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
        //   if(err){
        //       console.log(err);
        //   }else{
        //   console.log(decoded); // bar
        //   }
        // });
        
        req.session.uid= user.id;
        req.session.username= user.username;
        res.cookie("username", user.username, {
          //signed:true, 
          expires:new Date(Date.now() + 36000000)})
        //res.cookie('supercookie2', {token: "JWT " + token, username:user.username}, cookieParams);
        //vault.write(req, JSON.stringify({token: "JWT " + token, username:dbreply.username}));
        return res.json({success: true, message: "Successfully created new user", token: "JWT " + token, hash: process.env.googlelocation});
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
              }, process.env.JWT_SECRET, {expiresIn:"10h"});
              req.session.token=token;
              req.session.uid= user.id;
              req.session.username= user.username;
              //res.cookie('supercookie2', {token: "JWT " + token, username:isMatch.username}, cookieParams);
              //vault.write(req, JSON.stringify({token: "JWT " + token, username:isMatch.username}));
              res.cookie("username", user.username, {
                //signed:true, 
                expires:new Date(Date.now() + 36000000)})
              res.json({success: true, token: "JWT " + token, hash: process.env.googlelocation});
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
    res.clearCookie("username");
    req.session.token=null;
    req.session.uid= null;
    req.session.username=null;
    res.status(200).send({success:true, message:"loggedout"});
  })

  app.get("/api/user/allstuff", (req, res) => {
    User.findOne({_id:req.session.uid})
    .populate("products")
    .populate("reviews")
    .populate("replies")
    .populate("chats")
    .populate("productRatings")
    .populate("reviewRatings")
    .exec( function(err, dbreply) {
      if (err) {res.json(err)};
      res.json(dbreply);
    });
    // .then(dbreply=>
    //   {
    //     res.json(dbreply)}
    // );
  })

  app.get("/api/user/averagereview", (req, res) => {
    User.findOne({_id:req.session.uid})
    .populate("productRatings")
    .populate("reviewRatings")
    .exec(function(err, dbreply) {
      if(err){
        res.json(err)
      }
      let prodAvg=0;
      let revAvg=0
      console.log(dbreply);
      if(dbreply.productRatings){
        for(let i=0; i<dbreply.productRatings.length; i++){
          prodAvg+=dbreply.productRatings[i].rating;
        }
      }
      if(dbreply.reviewRatings){
        for(let i=0; i<dbreply.reviewRatings.length; i++){
          revAvg+=dbreply.reviewRatings[i].rating;
        }
      }
      prodAvg=prodAvg/dbreply.productRatings.length;
      revAvg=revAvg/dbreply.reviewRatings.length;
      res.json({averageProductRating: prodAvg, numberProductReviews:dbreply.productRatings.length, averageReviewRating: revAvg, numberReviewRatings:dbreply.reviewRatings.length})      
    })
  })
}