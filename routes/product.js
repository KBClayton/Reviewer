const Product = require("../models/Product");
const mongoose = require("mongoose");
module.exports = function(app) {

  app.get("/api/product", function(req, res){
    console.log(req.body);
    console.log(vault.read(req));
      Product.find({}).then(dbModel => res.json(dbModel));
  });

  app.get("/api/product/:id", function(req, res){
    console.log(req.body);
      Product.findOne({_id:req.params.id}).populate('Review').populate('Reply').then(dbModel => res.json(dbModel));
  });

  app.post("/api/product",  function(req, res){
      console.log(req.body);
      Product.create(req.body).then(dbModel => res.json(dbModel));
  });
}