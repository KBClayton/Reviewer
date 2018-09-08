const Product = require("../models/Product");
const ProductRating = require("../models/ProductRating");
const ReviewRating = require("../models/ReviewRating");
const mongoose = require("mongoose");
const User = require("../models/User");
const Review = require("../models/Review");
const Reply= require("../models/Reply");
const verify=require("./verify");

module.exports = function(app) {
    app.post("/api/reviewrate",  async function(req, res){

        //let logger= await verify.loggedin(app, req)
        //console.log(logger);
        console.log(req.body);
        // if(!verify.loggedin(app, req)){
        //   return res.status(401).send({success: false, message: "You are not logged in"});
        // }
          //console.log(req.body);
          //console.log(req.session.uid);
          newrevRating=req.body;
          newrevRating.user=req.session.uid;
          //.newrevRating.username=req.session.username;
          ReviewRating.create(newrevRating).then(dbModel => {
            //update user
            User.findByIdAndUpdate(req.session.uid, { "$push": { "reviewRatings": dbModel._id } },
            { "new": true, "upsert": true }).then(dbreply=> {
                console.log(dbreply)
                Review.findByIdAndUpdate(newrevRating.parentReview, { "$push": { "ratings": dbModel._id } },{ "new": true, "upsert": true }).then(dbreply2=>{
                    console.log(dbreply2);
                    res.json(dbModel);
                })
              //console.log(dbreply);
              //console.log(logger);
   
            });
            //res.json(dbModel)
          });
      });
    
}