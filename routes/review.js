const Review = require("../models/Review");
const mongoose = require("mongoose");
const Product = require("../models/Product");
const User = require("../models/User");

module.exports = function(app) {

  app.get("/api/review/:id", function(req, res){
      console.log(req.body);
      Review.findOne({_id:req.params.id}).populate('Reply').then(dbModel => res.json(dbModel));
  });
  app.get("/api/review/", function(req, res){
    console.log(req.body);
    Review.find({}).populate('Reply').then(dbModel => res.json(dbModel));
  });
  app.post("/api/review",  function(req, res){
      console.log(req.body);
      console.log(req.session.uid);
      console.log(req.body.parentProduct);
      Review.create(req.body).then(dbModel => {
        //update user
        console.log(dbModel.id)
        User.findByIdAndUpdate(req.session.uid, { "$push": { "reviews": dbModel._id } },
        { "new": true, "upsert": true }).then(dbreply=> {
          console.log(dbreply)
          Product.findByIdAndUpdate(req.body.parentProduct, { "$push": { "reviews": dbModel._id } },
          { "new": true, "upsert": true }).then(newdbreply=> {
            console.log(newdbreply);
            res.json(dbModel)
          });
        });
        //update product
        
        //res.json(dbModel)
      });
  });
}