const User = require("../models/User");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const logger = require('heroku-logger');
const verify=require("./verify")
const nodemailer = require('nodemailer');
const { Entropy } = require('entropy-string');
const dotenv = require("dotenv");
dotenv.config();
const PORT2 = process.env.PORT || 3001;

module.exports = function(app) {
  app.post("/api/user/new", (req, res) => {
      //console.log(`The post has hit the server, here is new User`);
      //console.log(req.body);
      //logger.info("The request has hit the server for new user");
      //logger.info(req.body);

      const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: process.env.etherealUser,
            pass: process.env.etherealPass
        },
        tls: {
          rejectUnauthorized: false
      }
      });
      //console.log(`user is: ${process.env.etherealUser}`)


      var user = new User({
        username: req.body.username,
        email:req.body.email,
        password: req.body.password
      });

      const entropy = new Entropy({ total: 1e16, risk: 1e20 });
      let string = entropy.string();
      //console.log(string)
      user.emailVerifyKey=string;
      let urlHelper = "http://localhost:3001"
      let url2="localhost"
      if (process.env.NODE_ENV === "production") {
        urlHelper = "https://austin-reviews.herokuapp.com";
        url2="austin-reviews.herokuapp.com";
      }
      //console.log(`urlhelper is: ${urlHelper}`)


      let mailOptions = {
        from: '"Austin Reviews" <'+process.env.etherealUser+'>', // sender address
        to: user.email, // list of receivers
        subject: 'Verify Account', // Subject line
        text: 'Click the link to verify your account', // plain text body
        html: '<a href="http://'+urlHelper+'/user/verify/'+user.username+`/`+string+'" ><b>Verify me</b></a>' // html body
      };

      //console.log(user);
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


        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
              return console.log(error);
          }
          console.log('Message sent: %s'+info.messageId);
          // Preview only available when sending through an Ethereal account
          console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        });
        // jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
        //   if(err){
        //       console.log(err);
        //   }else{
        //   console.log(decoded); // bar
        //   }
        // });
        
        req.session.uid= user.id;
        req.session.username= user.username;
        //console.log(`The port should be ${PORT2}`)
        res.cookie("username", user.username, {
          //signed:true, 
          expires:new Date(Date.now() + 36000000)})
          res.cookie("port", PORT2, {
            //signed:true, 
            expires:new Date(Date.now() + 36000000)})
        res.cookie("hash", process.env.googlelocation, {
              //signed:true, 
          expires:new Date(Date.now() + 36000000)})
        res.cookie("url", url2, {
            //signed:true, 
        expires:new Date(Date.now() + 36000000)})

        //res.cookie('supercookie2', {token: "JWT " + token, username:user.username}, cookieParams);
        //vault.write(req, JSON.stringify({token: "JWT " + token, username:dbreply.username}));
        return res.json({success: true, message: "Successfully created new user", token: token, hash: process.env.googlelocation, port:PORT2});
      })
  });

  app.post("/api/user/login", (req, res) => {
    let urlHelper = "http://localhost:3001"
    let url2="localhost";
    if (process.env.NODE_ENV === "production") {
      urlHelper = "https://austin-reviews.herokuapp.com"
      url2="austin-reviews.herokuapp.com";
    }
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
              // var serializeCookie = function(key, value, hrs) {
              //   // This is res.cookie’s code without the array management and also ignores signed cookies.
              //   if ('number' == typeof value) value = val.toString();
              //   if ('object' == typeof value) value = JSON.stringify(val);
              //   return cookie.serialize(key, value, { expires: new Date(Date.now() + 1000 * 60 * hrs), httpOnly: true });
              //  }; 
              // var setMultipleCookies = function(res) {
              //   set_cookies.push(getCookie(myCookie1, myValue1.toString(), default_cookie_age);
              //   set_cookies.push(getCookie(myCookie2, myValue2.toString(), default_cookie_age);
              //   res.header("Set-Cookie", set_cookies);
              // } 

              //console.log(`The port should be ${PORT2}`)
              res.cookie("username", user.username, {
                //signed:true, 
                expires:new Date(Date.now() + 36000000)})
              res.cookie("port", PORT2, {
                  //signed:true, 
                  expires:new Date(Date.now() + 36000000)})
              res.cookie("hash", process.env.googlelocation, {
                    //signed:true, 
                expires:new Date(Date.now() + 36000000)})
              res.cookie("url", url2, {
                  //signed:true, 
              expires:new Date(Date.now() + 36000000)})
      
              res.json({success: true, token: token, hash: process.env.googlelocation, port:PORT2});
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

  app.get("/api/user/allstuff", async (req, res) => {
    if(!await verify.loggedin(req)){
      console.log("failed validation")
      res.status(401).send({success: false, message: "you are not logged in"});
      return;
    }
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
      //console.log(dbreply);
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

  app.get("/api/user/verify/:name/:id", (req, res) => {
    User.findOneAndUpdate( {$and:[{emailVerifyKey:req.params.id}, {username:req.params.name}]}, {emailVerified:true, emailVerifyKey:null},{upsert:true}).exec(function(err, dbreply) {
      if(err){
        res.json(err)
      }
      if(dbreply){
        if(dbreply.emailVerified===true){
          res.json({sucess:true, message:"Your email has been verified"})
        }
      }
    })
  })

 app.get("/api/user/reset/:email", (req, res) => {

  User.findOneAndUpdate( {$and:[{email:req.params.email}, {emailVerified:true}]}, { passwordReset:Date.now()},{upsert:true}).exec(function(err, dbreply) {

  })
 })


  app.get("/api/user/reset/:name/:id", (req, res) => {
    User.findOneAndUpdate( {$and:[{emailVerifyKey:req.params.id}, {username:req.params.name}, {emailVerified:true}]}, {passwordReset:Date.now()},{upsert:true}).exec(function(err, dbreply) {
      if(err){
        res.json(err)
      }
      if(dbreply){
        if(dbreply.emailVerified===true){
          res.json({sucess:true, message:"Your password has been reset"})
        }
        
      }
    })
  })

}