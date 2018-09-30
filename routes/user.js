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
//var moment = require('moment');
//moment().format();
//Amazon 
const AWS=require("aws-sdk");
//const fileupload = require("express-fileupload");
const BUCKET_NAME = 'atxreviewer';
const IAM_USER_KEY = process.env.AWS_ACCESS_KEY_ID;
const IAM_USER_SECRET = process.env.AWS_SECRET_ACCESS_KEY;




module.exports = function(app) {
  function uploadToS3(file){
    let s3bucket = new AWS.S3({
      accessKeyId: IAM_USER_KEY,
      secretAccessKey: IAM_USER_SECRET,
      Bucket: BUCKET_NAME
    });
    s3bucket.createBucket(function(){
      var params = {
        Bucket: BUCKET_NAME,
        Key: file.name,
        Body: file.data
      };
      s3bucket.upload(params, function(err, data){
        if(err){
          console.log('error in callback');
          console.log(err);
        }
        console.log('success');
        console.log(data);
        return data;
      })
    })
  }


  app.post("/api/user/new", async (req, res) => {
      //console.log(`The post has hit the server, here is new User`);
      //console.log(req.body);
      //logger.info("The request has hit the server for new user");
      //logger.info(req.body);
      let picdata
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
      if(req.body.imageFile){
        console.log("in image upload if")
        picdata=await uploadToS3(req.body.imageFile)
        console.log(picdata)
      }
      //console.log(`user is: ${process.env.etherealUser}`)


      var user = new User({
        username: req.body.username,
        email:req.body.email,
        password: req.body.password,
        picture:req.body.picture
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
        html: '<p>Hello '+user.username+', click the link to verify your email account</p><br><a href="'+urlHelper+'/api/user/verify/'+user.username+`/`+string+'" target="_blank"><b>Verify me</b></a>' // html body
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
              console.log(error);

          }
          console.log('Message sent: %s'+info.messageId);
          // Preview only available when sending through an Ethereal account
          //console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
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
        res.cookie("token", token, {
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
    },  (err, user) => {
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
              res.cookie("token", token, {
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

  app.put("/api/user/", async (req, res) => {
    //console.log(req.body);
    if(!await verify.loggedin(req)){
      console.log("failed validation")
      res.status(401).send({success: false, message: "you are not logged in"});
      return;
    }

    User.findOne({
      username: req.session.username
    }, (err, user) => {
      if(!user){
        res.status(401).send({success: false, message: "critial error"});
      } else {
        user.comparePassword(req.body.password, (err, isMatch) => {
            if(!err && isMatch){
              user.password=req.body.newPasssword
              // user.findOneAndUpdate({
              //   username: req.session.username
              // },{password:req.body.newPasssword}).then((err, dbreply)=>{
                user.save((err,dbreply) => {
                if(err){
                  res.status(401).send({success: false, message: "critial error"});
                }else{
                  //console.log(dbreply)
                  res.json({success: true, message: "password updated"})
                }
              })
            }else{
              res.status(401).send({success: false, message: "critial error"});
            }
        })
      }
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
    User.findOne({_id:req.session.uid}, 'username roles picture email emailVerified averageRating products reviews chats replies productRatings reviewRatings')
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

  app.get("/api/user/alluser", async (req, res) => {
    if(!await verify.loggedin(req)){
      console.log("failed validation")
      res.status(401).send({success: false, message: "you are not logged in"});
      return;
    }
    User.find({}, 'username roles picture email emailVerified averageRating products reviews chats replies productRatings reviewRatings')
    .exec( function(err, dbreply) {
      if (err) {res.json(err)};
      res.json(dbreply);
    });
  })


  app.post("/api/user/userview", async (req, res) => {
    if(!await verify.loggedin(req)){
      console.log("failed validation")
      res.status(401).send({success: false, message: "you are not logged in"});
      return;
    }
    User.findOne({username:req.body.username}, 'username picture averageRating products reviews chats replies productRatings reviewRatings')
    .exec( function(err, dbreply) {
      if (err) {res.json(err)};
      res.json(dbreply);
    });
  })

  app.post("/api/user/userfind", async (req, res) => {
    if(!await verify.loggedin(req)){
      console.log("failed validation")
      res.status(401).send({success: false, message: "you are not logged in"});
      return;
    }
    var re = new RegExp(req.body.username, 'i');
    User.find({username:{ $regex: re }}, 'username picture profileInfo')
    .exec( function(err, dbreply) {
      if (err) {res.json(err)};
      res.json(dbreply);
    });
  })


  app.get("/api/user/averagereview", (req, res) => {
    let prodAvg=0;
    let revUp=0;
    let revDown=0;
    User.findOne({_id:req.session.uid}, 'averageRating  productRatings reviewRatings')
    .populate("productRatings")
    .populate("reviewRatings")
    .then((dbreply, err)=> {
      if(err){
        res.json(err)
      }
      // console.log("in average reveiw exec")
      // console.log(dbreply);
      if(dbreply){
      if(dbreply.productRatings){
        for(let i=0; i<dbreply.productRatings.length; i++){
          prodAvg+=dbreply.productRatings[i].rating;
        }
      }
      if(dbreply.reviewRatings){
        for(let i=0; i<dbreply.reviewRatings.length; i++){
          if(dbreply.reviewRatings[i].rating===-1){
            revDown++
          }else if (dbreply.reviewRatings[i].rating===1){
            revUp++
          }
        }
      }
      prodAvg=prodAvg/dbreply.productRatings.length;

      // console.log(revDown)
      // console.log(revUp)
      }
      res.json({averageProductRating: prodAvg, numberProductReviews:dbreply.productRatings.length, revUp: revUp, revDown:revDown, numberReviewRatings:dbreply.reviewRatings.length})      
    })
  })

  app.get("/api/user/verify/:name/:id", (req, res) => {
    let urlHelper = "http://localhost:3001"
    if (process.env.NODE_ENV === "production") {
      urlHelper = "https://austin-reviews.herokuapp.com";
    }
    //console.log("in verify route")
    //console.log(req.params)
    User.findOneAndUpdate( {$and:[{emailVerifyKey:req.params.id}, {username:req.params.name}]}, {emailVerified:true, emailVerifyKey:null},{upsert:true}).then((dbreply, err) =>{
      // if(err){
      //   console.log(err)
      //   res.set('Content-Type', 'text/html');
      //   res.send(new Buffer(`<h2>Sorry, there was an error.</h2>`));
      // }
      if(dbreply){
        if(dbreply.emailVerified===true){
          // res.set('Content-Type', 'text/html');
          // res.send(new Buffer(`<h2>Your email has been verified, <a href="${urlHelper}" target="_blank">go to main page.</a></h2>`));
          res.json({sucess:true, message:"Your email has been verified"})

        }
      }else if(err){
        res.json({sucess:false, message:"something wen wrong"})
        //res.json(err)
      }
    })
  })

 app.post("/api/user/reset/", (req, res) => {
  let urlHelper = "http://localhost:3001"
  if (process.env.NODE_ENV === "production") {
    urlHelper = "https://austin-reviews.herokuapp.com";
    //urlHelper=urlHelper+PORT2
  }
  // console.log("in reset route")
  // console.log(req.body)
  let email=req.body.email;
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
  const entropy = new Entropy({ total: 1e16, risk: 1e20 });
  let string = entropy.string();

  User.findOneAndUpdate( {$and:[{email:email}, {emailVerified:true}]}, {emailVerifyKey:string, passwordResetRequest:Date.now()},{upsert:true}).exec((err, dbreply) =>{
    // if(err){
    //   console.log(err)
    //   res.set('Content-Type', 'text/html');
    //   res.send(new Buffer(`<h2>Sorry, there was an error.</h2>`));
    //   return;
    // }
    // console.log("past reset first findone and update")
    // console.log(dbreply)
    if(dbreply){
      let mailOptions = {
        from: '"Austin Reviews" <'+process.env.etherealUser+'>', // sender address
        to: dbreply.email, // list of receivers
        subject: 'requested password reset', // Subject line
        text: 'Click the link reset your password, this link is only good for 1 hour', // plain text body
        html: '<p>Hello '+dbreply.username+',click the link reset your password, this link is only good for 1 hour</p><br><a href="'+urlHelper+'/api/user/resetreq/'+dbreply.username+`/`+string+'" target="_blank"><b>Reset my password</b></a>' // html body
      };
      // console.log(mailOptions)
      // console.log("past mailoptions, going inasdfsdfto transporter")
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s'+info.messageId);
        // Preview only available when sending through an Ethereal account
       // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
      });
      res.json({sucess:true, message:"An email has been sent to your account"})
    }

  })
 })

  app.get("/api/user/resetreq/:name/:email", (req, res) => {
    let urlHelper = "http://localhost:3001"
    if (process.env.NODE_ENV === "production") {
      urlHelper = "https://austin-reviews.herokuapp.com";
    }
    // console.log("in password reset route")
    // console.log(req.params)
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
    const entropy = new Entropy({ total: 1e16, risk: 1e20 });
    let string = entropy.string();
    User.findOne( {$and:[{emailVerifyKey:req.params.email}, {username:req.params.name}, {emailVerified:true}]}).exec((err, user) =>{
      // console.log("in first findone")
      // console.log(user)
      if(user){
        let dbdate=new Date(user.passwordResetRequest)
        let currentdate= new Date()
        // console.log(dbdate.getTime())
        // console.log(currentdate.getTime()-dbdate.getTime());
        if((currentdate.getTime()-dbdate.getTime())<3600000){
          let mailOptions = {
            from: '"Austin Reviews" <'+process.env.etherealUser+'>', // sender address
            to: user.email, // list of receivers
            subject: 'Your password reset', // Subject line
            text: 'Your password has been reset, it is: '+string, // plain text body
            html: '<p>Your password has been reset, it is: '+string+' </p> <a href="'+urlHelper+'" target="_blank"><b>Go to home page </b></a>' // html body
          };
          user.password=string;
          user.passwordReset=Date.now();
          user.emailVerifyKey=null;
          user.save((err,dbreply) => {
            if(dbreply){
              //console.log(dbreply)
              transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    //return console.log(error);
                    res.set('Content-Type', 'text/html');
                    res.send(new Buffer(`<h2>Sorry, there was an error expired.</h2>`));
                }
                console.log('Message sent: %s'+info.messageId);
                // Preview only available when sending through an Ethereal account
                //console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
              });
              res.json({sucess:true, message:"Your password has been reset, check your email"})
            }else{
              res.status(401).send({success: false, message: "critial error"});
            }
          })
        }else{
          res.set('Content-Type', 'text/html');
          res.send(new Buffer(`<h2>Sorry, the link expired.</h2>`));
        }
    }
    if(err){
      res.json(err)
    }
    })  
  })

  

}