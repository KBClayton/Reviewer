const Recommend = require("../models/Recommend");
const mongoose = require("mongoose");
const axios = require("axios");
const cheerio = require('cheerio');
module.exports = function(app) {

  app.get("/recommend/do512", function(req, res) {
    // First, we grab the body of the html with request
    axios.get("http://www.austinchronicle.com/food/reviews/").then(function(response) {
      // Then, we load that into cheerio and save it to $ for a shorthand selector
      console.log("HEYHEYHEYHEYHEYHEYHEYHEYHEY");
      var $ = cheerio.load(response.data);
      // Now, we grab every h2 within an article tag, and do the following:
      $("section#CenterColumn").children("h2").each(function(i, element) {
        // Save an empty result object
        var result = {};
        if ($(this)
        .children("a")
        .text() == ""){
          return;
        }
        // Add the text and href of every link, and save them as properties of the result object
        result.title = $(this)
        .children("a")
        .text()
        .replace("\'", "")
        .replace("Restaurant Review: ", "")
        .replace("Far Flung Correspondence: ", "")
        .replace("Review: ");
        result.summary = $(this)
          .next("div.description")
          .text();
        result.link = "https://www.austinchronicle.com/" + $(this)
          .children("a")
          .attr("href");
        /*result.imagelink = $(this)
          .children("figure.photo")
          .children("a")
          .children("img")
          .attr("src");
        result.food = true;*/
          
        console.log(result);
        
            });
            })
            .catch(function(err) {
              // If an error occurred, log it
              console.log(err);;
          });
      });
  /*app.get("/recommend/do512", function(req, res) {
    // First, we grab the body of the html with request
    axios.get("https://do512.com").then(function(response) {
      // Then, we load that into cheerio and save it to $ for a shorthand selector
      const $ = cheerio.load(response.data);
      // Now, we grab every h2 within an article tag, and do the following:
      $("div.ds-events-group").each(function(i, element) {
        // Save an empty result object
        let result = {};
        if ($(this)
        .children("div.ds-listing.event-card")
        .children("a.ds-listing-event-title")
        .children("span.ds-listing-event-title-text")
        .text() == ""){
          return;
        }
        // Add the text and href of every link, and save them as properties of the result object
        result.title = $(this)
        .children("div.ds-listing.event-card")
        .children("a.ds-listing-event-title")
        .children("span.ds-listing-event-title-text")
        .text()
        result.location = $(this)
          .children("div.ds-listing.event-card")
          .children("div.ds-listing-details-container")
          .children("div.ds-listing-details")
          .children("div.ds-venue-name")
          .children("a")
          .children("span")
          .text();
        result.time = $(this)
        .children("div.ds-listing.event-card")
        .children("div.ds-listing-details-container")
        .children("div.ds-listing-details")
        .children("div.ds-event-time")
        .text();
        result.image = $(this)
          .children("div.ds-listing.event-card")
          .children("div.ds-cover-image")
          .attr("background-image");
        result.link = "https://do512.com/" + $(this)
          .children("div.ds-listing")
          .attr("data-permalink")
        result.do512 = true;
          
        console.log(result);
        res.json(result);
        
        db.Article.create(result)
          .then(function(result) {
            res.json(result)
            })
            .catch(function(err) {
              // If an error occurred, log it
              console.log(err);
            });
          }).catch(function(err) {
              console.log(err);
            });
      });*/
}