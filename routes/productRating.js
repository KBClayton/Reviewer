const Product = require("../models/Product");
const ProductRating = require("../models/ProductRating");
const mongoose = require("mongoose");
const User = require("../models/User");
const Review = require("../models/Review");
const Reply= require("../models/Reply");
const verify=require("./verify");

module.exports = function(app) {
    app.post("/api/productrate",  async function(req, res){

        //let logger= await verify.loggedin(app, req)
        //console.log(logger);
        console.log(req.body);
        // if(!verify.loggedin(app, req)){
        //   return res.status(401).send({success: false, message: "You are not logged in"});
        // }
          //console.log(req.body);
          //console.log(req.session.uid);
          newprodRating=req.body;
          newprodRating.user=req.session.uid;
          //newprodRating.username=req.session.username;
          Product.findOne({_id:newprodRating.parentProduct}).populate("ratings").then(dbmod=>{
              console.log(`this is productfind userid=${req.session.uid}`)
              let preidstuff;
              let idstuff;
              let preParentproduct;
              let parentProductSuff;
              let twice=false
              //console.log(dbmod.ratings);
              for(let i=0; i<dbmod.ratings.length; i++){
                  //console.log(JSON.stringify(dbmod.ratings[i].user))
                  if(dbmod.ratings[i].user!==undefined){
                     preidstuff=JSON.stringify( dbmod.ratings[i].user);
                     idstuff=preidstuff.slice(1,preidstuff.length-1)
                     preParentproduct=JSON.stringify( dbmod.ratings[i].parentProduct)
                     parentProductSuff=preParentproduct.slice(1,preParentproduct.length-1)
                  }
                  // && JSON.stringify(dbmod.ratings[i].user)===req.session.uid
                  console.log(`${parentProductSuff} and ${idstuff}`)
                  if(parentProductSuff!==undefined && idstuff!==undefined){
                    if(parentProductSuff===newprodRating.parentProduct && idstuff===req.session.uid){
                        twice=true
                        res.json({sucess:false, error:"you can't rate things twice."})
                        break;
                    }
                  }
              }
              if(!twice){
                ProductRating.create(newprodRating).then(dbModel => {
                    //update user
                    User.findByIdAndUpdate(req.session.uid, { "$push": { "productRatings": dbModel._id } },
                    { "new": true, "upsert": true }).then(dbreply=> {
                        //console.log(dbreply)
                        Product.findByIdAndUpdate(newprodRating.parentProduct, { "$push": { "ratings": dbModel._id } },{ "new": true, "upsert": true }).then(dbreply2=>{

                            //console.log(dbreply2);
                            res.json(dbModel);
                        })
                    //console.log(dbreply);
                    //console.log(logger);
        
                    });
                    //res.json(dbModel)
                });
              }
          })

      });

}