const Review = require("../models/Review");
const mongoose = require("mongoose");
const Product = require("../models/Product");
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
      Review.create(req.body).then(dbModel => res.json(dbModel));
  });
}