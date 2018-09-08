const Review = require("../models/Review");
const mongoose = require("mongoose");
const Product = require("../models/Product");
const User = require("../models/User");

module.exports = function(app) {

  app.get("/api/review/:id", function(req, res){
     // console.log(req.body);
      Review.findOne({_id:req.params.id}).sort({'dateCreated': -1}).populate('replies').then(dbModel => res.json(dbModel));
  });
  app.get("/api/review/", function(req, res){
   // console.log(req.body);
    Review.find({}).sort({'dateCreated': -1}).populate('replies').then(dbModel => res.json(dbModel));
  });
  app.post("/api/review",  function(req, res){
     // console.log(req.body);
     // console.log(req.session.uid);
      //console.log(req.body.parentProduct);
      Review.create(req.body).then(dbModel => {
        //update user
        //console.log(dbModel.id)
        User.findByIdAndUpdate(req.session.uid, { "$push": { "reviews": dbModel._id } },
        { "new": true, "upsert": true }).then(dbreply=> {
          //console.log(dbreply)
          Product.findByIdAndUpdate(req.body.parentProduct, { "$push": { "reviews": dbModel._id } },
          { "new": true, "upsert": true }).then(newdbreply=> {
            //console.log(newdbreply);
            res.json(dbModel)
          });
        });
        //update product
        
        //res.json(dbModel)
      });
  });
  app.get("/api/review/bad", function(req, res){
    Review.find({rating:{$lt:0}}).sort({'dateCreated': 1}).then((dbreply, err)=>{
      if(err){
        console.log(err);
        res.json({sucess:false, message:"failed"})
      }else{
        res.json(dbreply)
      }
    })
  });
  app.post("/api/review/search/:query", function(req, res){
    var re = new RegExp(req.params.query, 'i');
    Review.find().or([{ 'description': { $regex: re }}, { 'title': { $regex: re }}, { 'catagories': { $regex: re }}]).sort({'dateCreated': 1}).exec(function(err, users) {
      res.json(JSON.stringify(users));
  });
  });

  app.delete("/api/review/:id", function(req, res){
    Review.deleteOne({id:req.params.id}).then(dbreply=>{
      res.json(dbreply)
    })
  })

}