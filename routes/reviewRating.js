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
          Review.findOne({_id:newrevRating.parentReview}).populate("ratings").then(dbmod=>{
            let thumbs
            let preidstuff
            let idstuff
            let preParentproduct
            let parentProductSuff
            let twice=false
            if(newrevRating.rating===-1){
                thumbs={thumbsDown:1}
            }else{
                thumbs={thumbsUp:1}
            }
              //console.log(dbmod.ratings);
              for(let i=0; i<dbmod.ratings.length; i++){
                  //console.log(JSON.stringify(dbmod.ratings[i].user))
                  if(dbmod.ratings[i].user!==undefined){
                     preidstuff=JSON.stringify( dbmod.ratings[i].user);
                     idstuff=preidstuff.slice(1,preidstuff.length-1)
                     preParentproduct=JSON.stringify( dbmod.ratings[i].parentReview)
                     parentProductSuff=preParentproduct.slice(1,preParentproduct.length-1)
                  }
                  // && JSON.stringify(dbmod.ratings[i].user)===req.session.uid
                  //console.log(`${parentProductSuff} and ${idstuff}`)
                  if(parentProductSuff!==undefined && idstuff!==undefined){
                    if(parentProductSuff===newrevRating.parentReview && idstuff===req.session.uid){
                        twice=true
                        res.json({sucess:false, error:"you can't rate things twice."})
                        break;
                    }
                  }
              }

          //.newrevRating.username=req.session.username;
          if(!twice){
          ReviewRating.create(newrevRating).then(dbModel => {
            //update user
            User.findByIdAndUpdate(req.session.uid, { "$push": { "reviewRatings": dbModel._id } },
            { "new": true, "upsert": true }).then(dbreply=> {
                console.log(dbreply)
                Review.findByIdAndUpdate(newrevRating.parentReview, { "$push": { "ratings": dbModel._id }, $inc: thumbs },{ "new": true, "upsert": true }).then(dbreply2=>{
                    console.log(dbreply2);
                    res.json(dbModel);
                })
              //console.log(dbreply);
              //console.log(logger);
   
            });
            //res.json(dbModel)
          });
        }
        });
      });
    
}