const Reply= require("../models/Reply");
const mongoose = require("mongoose");
module.exports = function(app, vault) {

  app.get("/api/reply/", function(req, res){
      console.log(req.body);
      console.log(vault.read(req));
      Product.find({}).then(dbModel => res.json(dbModel));
  });

  app.get("/api/reply/id", function(req, res){
    console.log(req.body);
    Product.findOne({id:req.params.id}).then(dbModel => res.json(dbModel));
  });
  
  app.post("/api/reply",  function(req, res){
      console.log(req.body);
      Product.create(req.body).then(dbModel => res.json(dbModel));
  });
}