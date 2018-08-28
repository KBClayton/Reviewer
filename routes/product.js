const Product = require("../models/Product");
const mongoose = require("mongoose");
module.exports = function(app) {

app.get("/api/product", function(req, res){
    Product.find({}).then(dbModel => res.json(dbModel));
  });
app.post("/api/product",  function(req, res){
    Product.create(req.body).then(dbModel => res.json(dbModel));
  });
}