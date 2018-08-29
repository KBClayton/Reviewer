const Review = require("../models/Review");
const mongoose = require("mongoose");
module.exports = function(app) {

app.get("/api/review/id", function(req, res){
    console.log(req.body);

    Product.findOne({_id:req.params.id}).populate('Reply').then(dbModel => res.json(dbModel));
  });
app.post("/api/review",  function(req, res){
    console.log(req.body);

    Product.create(req.body).then(dbModel => res.json(dbModel));
  });
}