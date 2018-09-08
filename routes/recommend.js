const Recommend = require("../models/Recommend");
const mongoose = require("mongoose");
const axios = require("axios");
const request = require("request-promise");
const cheerio = require('cheerio');
const customHeaderRequest = request.defaults({
  headers: {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 Safari/537.36',
            'Connection': 'keep-alive'}
  });
const Nightmare = require('nightmare');
const nightmare = Nightmare();
const jquery = require("jquery");
let linkHelperFood = [];
let imgHelperFood = [];
let locHelperFood = [];
let linkHelperMusic = [];
let imgHelperMusic = [];
let descHelperMusic = [];
let linkHelperBooks = [];
let imgHelperBooks = [];
let titleHelperBooks = [];
let synHelperBooks = [];
let authorHelperBooks = [];
let dailyArray = [];
let linkHelperObscura = [];
let addressHelperObscura = [];

module.exports = function(app) {

  app.get("/recommend/acFood", function(req, res) {
    axios.get("http://www.austinchronicle.com/food/reviews/").then((response) => {
      linkHelperFood = [];
      const $ = cheerio.load(response.data);
      $("section#CenterColumn").children("h2").each(function(i, element) {
        if ($(this)
      .children("a")
      .text() == ""){
      return;
      }
      linkHelperFood.push("https://www.austinchronicle.com" + $(this)
      .children("a")
      .attr("href"));
        });
        return linkHelperFood;
      }).then(async function(response) {
            imgHelperFood = [];
            locHelperFood = [];
            console.log(linkHelperFood);
            for (let i = 0; i<linkHelperFood.length ; i++){
              await axios.get(linkHelperFood[i]).then(function(response) {
                const $ = cheerio.load(response.data);
                let chronImageFood = $("div.copy").children("div.imageRight").children("a").children("img").attr("src") ? "https://www.austinchronicle.com" + $("div.copy").children("div.imageRight").children("a").children("img").attr("src") : $("div.story-image.top-image").children("a.lightbox").attr("href") ? "https://www.austinchronicle.com" + $("div.story-image.top-image").children("a.lightbox").attr("href") : "https://via.placeholder.com/300x300";
                let chronLocFood = $("div.description").children("b").text() ? $("div.description").children("b").text() : $("div.copy").children("h3").next("b").text() ? $("div.copy").children("h3").next("b").text() : "301 W 2nd St, Austin, TX 78701";
                imgHelperFood.push(chronImageFood);
                locHelperFood.push(chronLocFood);
                console.log(i);
                })
                .catch(function(err) {
                  chronImageFood = "https://via.placeholder.com/300x300";
                  imgHelperFood.push(chronImageFood);
                  chronLocFood = "301 W 2nd St, Austin, TX 78701";
                  locHelperFood.push(chronLocFood);
                  console.log(err);
                  })
              };
              return imgHelperFood;
          }).then(function(response) {
              let foodArray = [];
              axios.get("http://www.austinchronicle.com/food/reviews/").then(function(response){
              const $ = cheerio.load(response.data);
              // Now, we grab every h2 within an article tag, and do the following:
              $("section#CenterColumn").children("h2").each(function(i, element) {
                let result = {};
                if ($(this)
                .children("a")
                .text() == ""){
                  return;
                }
                // Add the text and href of every link, and save them as properties of the result object
                result.title = $(this)
                .children("a")
                .text()
                //.replace("\'", "")
                .replace("Restaurant Review: ", "")
                .replace("Far Flung Correspondence: ", "")
                .replace("Review: ", "");
                result.description = $(this)
                  .next("div.description")
                  .text()
                  .replace("?", "") + "...";
                result.address = locHelperFood[i]
                  .split(", www")[0]
                  .split(", 512")[0]
                  .split(", 737")[0];
                result.link = linkHelperFood[i];
                result.image = imgHelperFood[i];
                result.food = true;
                foodArray.push(result);
                Recommend.create(result).then(dbModel => {
                  console.log(dbModel);
                }).catch(function(err) {
                  // If an error occurred, log it
                  console.log(err);
                    });
                    });
                    res.json(foodArray);
                console.log("if " + linkHelperFood.length + " != " + imgHelperFood.length + " != " + locHelperFood.length + ", -> there was a problem.");
                    }).catch(function(err) {
                      // If an error occurred, log it
                      console.log(err);
                  });
          });
        });
        
  app.get("/recommend/acMusic", function(req, res) {
    axios.get("http://www.austinchronicle.com/music/reviews/").then(function(response){
      linkHelperMusic = [];
      const $ = cheerio.load(response.data);
        $("section#CenterColumn").children("h2").each(function(i, element) {
          if ($(this)
            .children("a")
            .text() == ""){
            return;
            }
      linkHelperMusic.push("https://www.austinchronicle.com" + $(this)
        .children("a")
        .attr("href"));
            });
            return linkHelperMusic;
          }).then(async function(response) {
              imgHelperMusic = [];
              descHelperMusic = [];
              console.log(linkHelperMusic);
              for (let i = 0; i<linkHelperMusic.length ; i++){
                await axios.get(linkHelperMusic[i]).then(function(response){
                  const $ = cheerio.load(response.data);
                  let chronImageMusic = $("div.copy").children("div.imageRight.top-image.sans-border").children("a.lightbox").attr("href") ? "https://www.austinchronicle.com" + $("div.copy").children("div.imageRight.top-image.sans-border").children("a.lightbox").attr("href") : "https://via.placeholder.com/300x300";
                  imgHelperMusic.push(chronImageMusic);
                  let chronDescMusic = $("div.copy").children("p").text().split(".")[0] ? $("div.copy").children("p").text().split(".")[0] + "..." : "";
                  descHelperMusic.push(chronDescMusic);
                  console.log(i);
                  })
                  .catch(function(err) {
                    chronImageMusic = "https://via.placeholder.com/300x300";
                    imgHelperMusic.push(chronImageMusic);
                    chronDescMusic = "";
                    descHelperMusic.push(chronDescMusic);
                    console.log(err);
                    })
                };
                return imgHelperMusic;
          }).then(function(response) {
              let musicArray = [];
              axios.get("http://www.austinchronicle.com/music/reviews/").then(function(response) {
              const $ = cheerio.load(response.data);
              // Now, we grab every h2 within an article tag, and do the following:
              $("section#CenterColumn").children("h2").each(function(i, element) {
                // Save an empty result object
                let result = {};
                // Add the text and href of every link, and save them as properties of the result object
                result.title = $(this)
                .children("a")
                .text();
                result.location = $(this)
                  .next("div.description")
                  .text();
                result.link = linkHelperMusic[i];
                result.image = imgHelperMusic[i];
                result.description = descHelperMusic[i];
                result.address = "600 N Lamar Blvd Austin TX 78703";
                result.lat = "30.271";
                result.long = "-97.754";
                result.music = true;
                musicArray.push(result);
                Recommend.create(result).then(dbModel => {
                  console.log(dbModel);
                }).catch(function(err) {
                  //if error, log error
                  console.log(err);
                  });
                });
                  res.json(musicArray);
                  console.log("if " + linkHelperMusic.length + " != " + imgHelperMusic.length + ", -> there was a problem.");
                }).catch(function(err) {
                  // If an error occurred, log it
                  console.log(err);
                });
              });
            });  

  app.get("/recommend/acBooks", function(req, res) {
    // First, we grab the body of the html with request
    axios.get("http://www.austinchronicle.com/books/reviews/").then(function(response) {
      linkHelperBooks = [];
      const $ = cheerio.load(response.data);
      // Now, we grab every h2 within an article tag, and do the following:
      $("section#CenterColumn").children("h2").each(function(i, element) {
        if ($(this)
          .children("a")
          .text() == ""){
            return;
          }
      linkHelperBooks.push("https://www.austinchronicle.com" + $(this)
        .children("a")
        .attr("href"));
          });
        return linkHelperBooks;
        }).then(async function(response) {
          imgHelperBooks = [];
          titleHelperBooks = [];
          synHelperBooks = [];
          authorHelperBooks = [];
          console.log(linkHelperBooks);
          for (let i = 0; i<linkHelperBooks.length ; i++) {
            await axios.get(linkHelperBooks[i]).then(function(response) {
              const $ = cheerio.load(response.data);
              let chronImageBooks = $("div.story-image.top-image").children("a.lightbox").attr("href") ? "https://www.austinchronicle.com" + $("div.story-image.top-image").children("a.lightbox").attr("href") : $("div.imageRight.top-image").children("a.lightbox").attr("href") ? "https://www.austinchronicle.com" + $("div.imageRight.top-image").children("a.lightbox").attr("href") : "https://via.placeholder.com/300x300";
              imgHelperBooks.push(chronImageBooks);
              let chronTitleBooks = $("div.copy").children("h3").children("i").text() ? $("div.copy").children("h3").children("i").text()  : "";
              titleHelperBooks.push(chronTitleBooks);
              let chronSynBooks = $("div.copy").children("p").text().split(".")[1] ? $("div.copy").children("p").text().split(".")[0] + "." + $("div.copy").children("p").text().split(".")[1] + "..." : $("div.copy").children("p").text().split(".")[0] ? $("div.copy").children("p").text().split(".")[0] : "";
              synHelperBooks.push(chronSynBooks);
              let chronAuthBooks = $("div.copy").children("h3").next("b").text().replace("by ", "") ? $("div.copy").children("h3").next("b").text().replace("by ", "") : "";
              authorHelperBooks.push(chronAuthBooks);
              console.log(i);
              }).catch(function(err) {
                chronImageBooks = "https://via.placeholder.com/300x300";
                imgHelperBooks.push(chronImageBooks);
                chronTitleBooks = "";
                titleHelperBooks.push(chronTitleBooks);
                chronSynBooks = "";
                synHelperBooks.push(chronSynBooks);
                chronAuthBooks = "";
                authorHelperBooks.push(chronAuthBooks);
                console.log(err);
              })
            };
            return imgHelperBooks;
          }).then(function(response) {
            let booksArray = [];
            axios.get("http://www.austinchronicle.com/books/reviews/").then(function(response){
              const $ = cheerio.load(response.data);
              $("section#CenterColumn").children("h2").each(function(i, element) {
                let result = {};
                result.title = titleHelperBooks[i] === "" 
                  ? $(this)
                    .children("a")
                    .text() 
                      : titleHelperBooks[i];
                result.description = synHelperBooks[i] === ""
                  ? $(this)
                    .next("div.description")
                    .text()
                      : titleHelperBooks[i].split(" ")[0] == $(this)
                      .next("div.description")
                      .text() ? synHelperBooks[i] : synHelperBooks[i];
                if ($(this)
                  .children("a")
                  .text()
                  .split("by ")[1] != undefined && $(this)
                  .children("a")
                  .text()
                  .split("by ")[1]
                  .split(" ").length === 2) {
                    result.location = $(this)
                      .children("a")
                      .text()
                      .split("by ")[1];
                }
                else if (authorHelperBooks[i] != "") {
                  result.location = authorHelperBooks[i];
                }
                else {
                  result.location = "";
                };
                result.link = linkHelperBooks[i];
                result.image = imgHelperBooks[i];
                result.books = true;
                booksArray.push(result);
                Recommend.create(result).then(dbModel => {
                  console.log(dbModel);
                }).catch(function(err) {
                  //if error, log error
                console.log(err);
              });
            });
            res.json(booksArray);
            console.log("if " + linkHelperBooks.length + " != " + imgHelperBooks.length + ", -> there was a problem.")
          }).catch(function(err) {
            // if an error occured, log it
            console.log(err);
          });
        });
      });

  app.get("/recommend/daily", function(req, res) {
    // First, we grab the body of the html with request
    customHeaderRequest.get("http://do512.com/").then(function(response) {
      console.log("HEYHEYHEYHEYHEYHEYHEYHEY");
      dailyArray = [];
      // Then, we load that into cheerio and save it to $ for a shorthand selector
      const $ = cheerio.load(response);
      // Now, we grab every h2 within an article tag, and do the following:
      $("div.ds-events-group").children("div.ds-listing.event-card").each(function(i, element) {
        // Save an empty result object
        let result = {};
        if ($(this)
        .children("a.ds-listing-event-title")
        .children("span.ds-listing-event-title-text")
        .text() == ""){
          return;
        }
        // Add the text and href of every link, and save them as properties of the result object
        result.title = $(this)
        .children("a.ds-listing-event-title")
        .children("span.ds-listing-event-title-text")
        .text()
        result.location = $(this)
          .children("div.ds-listing-details-container")
          .children("div.ds-listing-details")
          .children("div.ds-venue-name")
          .children("a")
          .children("span")
          .text();
        let addHelp = $(this)
          .children("div.ds-listing-details-container")
          .children("div.ds-listing-details")
          .children("div.ds-venue-name")
          .children('span[itemprop="address"]')
        let streetDaily = addHelp
        .children('meta[itemprop="streetAddress"]')
        .attr("content") ? addHelp
          .children('meta[itemprop="streetAddress"]')
          .attr("content") : "";
        let cityDaily = addHelp
          .children('meta[itemprop="addressLocality"]')
          .attr("content") ? addHelp
            .children('meta[itemprop="addressLocality"]')
            .attr("content") : "";
        let stDaily = addHelp
          .children('meta[itemprop="addressRegion"]')
          .attr("content") ? addHelp
            .children('meta[itemprop="addressRegion"]')
            .attr("content") : "";
        let zipDaily = addHelp
          .children('meta[itemprop="postalCode"]')
          .attr("content") ? addHelp
            .children('meta[itemprop="postalCode"]')
            .attr("content") : "";
        result.address = streetDaily + " " + cityDaily + " " + stDaily + " " + zipDaily;
        let geoHelp = $(this)
          .children("div.ds-listing-details-container")
          .children("div.ds-listing-details")
          .children("div.ds-venue-name")
          .children('span[itemprop="geo"]')
          .children("span.geo")
        result.lat = geoHelp
          .children("span.latitude")
          .children('meta[itemprop="latitude"]')
          .attr("content") ? geoHelp
            .children("span.latitude")
            .children('meta[itemprop="latitude"]')
            .attr("content") : "";
        result.long = geoHelp
        .children("span.longitude")
        .children('meta[itemprop="longitude"]')
        .attr("content") ? geoHelp
          .children("span.longitude")
          .children('meta[itemprop="longitude"]')
          .attr("content") : "";
        result.time = $(this)
        .children("div.ds-listing-details-container")
        .children("div.ds-listing-details")
        .children("div.ds-event-time")
        .text()
        .replace(/\n/g, "")
        .replace(/ /g, "")
        .replace("(", " (");
        result.image = $(this)
          .children("div.ds-cover-image")
          .attr()
          .style
          .replace("background-image:url(\'", "")
          .replace("\');", "");
        result.link = "https://do512.com/" + $(this)
          .attr("data-permalink")
        result.ticketLink = $(this)
          .children("div.ds-listing-details-container")
          .children("div.ds-listing-extra-details")
          .children("div.ds-table-row-vert-align")
          .children("div.ds-listing-actions")
          .children("nav.ds-utility-nav")
          .children("div.ds-btn-container-buy-tix")
          .children('span[itemprop="offers"]')
          .children("a.ds-buy-tix")
          .attr("href") ? $(this)
            .children("div.ds-listing-details-container")
            .children("div.ds-listing-extra-details")
            .children("div.ds-table-row-vert-align")
            .children("div.ds-listing-actions")
            .children("nav.ds-utility-nav")
            .children("div.ds-btn-container-buy-tix")
            .children('span[itemprop="offers"]')
            .children("a.ds-buy-tix")
            .attr("href") : "";
        result.do512 = true;
          
        console.log(result);
        Recommend.create(result).then(dbModel => {
          console.log(dbModel);
        }).catch(function(err) {
          // If an error occurred, log it
          console.log(err);
      });
        dailyArray.push(result);
        })
      res.json(dailyArray);
      })
      .catch(function(err) {
        // If an error occurred, log it
        console.log(err);
    });
    });

  app.get("/recommend/obscuraP1", function(req, res) {
    // First, we grab the body of the html with request
    axios.get("http://www.atlasobscura.com/things-to-do/austin-texas/places").then(function(response) {
      linkHelperObscura = [];
      // Then, we load that into cheerio and save it to $ for a shorthand selector
      const $ = cheerio.load(response.data);
      // Now, we grab every h2 within an article tag, and do the following:
      $("div.index-card-wrap").each(function(i, element) {
        if ($(this)
          .children("a.content-card-place")
          .children("div.content-card-text")
          .children("h3.content-card-title")
          .children("span")
          .text() == ""){
            return;
          }
      linkHelperObscura.push("https://www.atlasobscura.com/" + $(this)
        .children("a.content-card-place")
        .attr("href"));
        });
      return linkHelperObscura;
      }).then(async function(response) {
        addressHelperObscura = [];
        console.log(linkHelperObscura);
        for (let i = 0; i<linkHelperObscura.length ; i++) {
          await axios.get(linkHelperObscura[i]).then(function(response) {
            const $ = cheerio.load(response.data);
            let obscuraLoc = $("address.place-address").children("a.non-decorated-link").text() ? $("address.place-address").children("a.non-decorated-link").text() : "";
            addressHelperObscura.push(obscuraLoc);
            console.log(i);
          }).catch(function(err) {
            obscuraLoc = "301 W 2nd St, Austin, TX 78701";
            addressHelperObscura.push(obscuraLoc);
            console.log(err);
          })
        };
        return addressHelperObscura;
      }).then(function(response) {
        let obscuraArray = [];
        axios.get("http://www.atlasobscura.com/things-to-do/austin-texas/places").then(function(response) {
          const $ = cheerio.load(response.data);
          $("div.index-card-wrap").each(function(i, element) {
            if ($(this)
              .children("a.content-card-place")
              .children("div.content-card-text")
              .children("h3.content-card-title")
              .children("span")
              .text() == ""){
                return;
            }
            let result = {};
            result.title = $(this)
              .children("a.content-card-place")
              .children("div.content-card-text")
              .children("h3.content-card-title")
              .children("span")
              .text()
            result.location = $(this)
              .children("a.content-card-place")
              .children("div.content-card-text")
              .children("h3.content-card-title")
              .children("span")
              .text();
            result.address = addressHelperObscura[i]
              .replace("Austin", " Austin")
              .replace("United", " United")
              .replace(/,/g, "");
            result.description = $(this)
              .children("a.content-card-place")
              .children("div.content-card-text")
              .children("div.content-card-subtitle")
              .text();
            result.image = $(this)
              .children("a.content-card-place")
              .children("figure.content-card-figure")
              .children("img")
              .attr("src");
            result.link = linkHelperObscura[i];
            result.lat = $(this)
              .children("a.content-card-place")
              .children("div.content-card-text")
              .children("div.lat-lng")
              .text()
              .split(", ")[0] ? $(this)
                .children("a.content-card-place")
                .children("div.content-card-text")
                .children("div.lat-lng")
                .text()
                .split(", ")[0]
                .replace("\n", "") : "";
            result.long = $(this)
              .children("a.content-card-place")
              .children("div.content-card-text")
              .children("div.lat-lng")
              .text().split(", ")[1] ? $(this)
                .children("a.content-card-place")
                .children("div.content-card-text")
                .children("div.lat-lng")
                .text().split(", ")[1]
                .replace("\n", "") : "";
            result.obscura = true;
            obscuraArray.push(result);
            Recommend.create(result).then(dbModel => {
              console.log(dbModel);
            }).catch(function(err) {
              //if error, log error
              console.log(err);
            });
        });
        res.json(obscuraArray);
        console.log("if " + linkHelperObscura.length + " != " + addressHelperObscura.length + ", -> there was a problem.")
      }).catch(function(err) {
        //if error, log error
        console.log(err);
      });
    });
  });

  app.get("/recommend/obscuraP2", function(req, res) {
    // First, we grab the body of the html with request
    axios.get("http://www.atlasobscura.com/things-to-do/austin-texas/places?page=2").then(function(response) {
      linkHelperObscura = [];
      // Then, we load that into cheerio and save it to $ for a shorthand selector
      const $ = cheerio.load(response.data);
      // Now, we grab every h2 within an article tag, and do the following:
      $("div.index-card-wrap").each(function(i, element) {
        if ($(this)
          .children("a.content-card-place")
          .children("div.content-card-text")
          .children("h3.content-card-title")
          .children("span")
          .text() == ""){
            return;
          }
      linkHelperObscura.push("https://www.atlasobscura.com/" + $(this)
        .children("a.content-card-place")
        .attr("href"));
        });
      return linkHelperObscura;
      }).then(async function(response) {
        addressHelperObscura = [];
        console.log(linkHelperObscura);
        for (let i = 0; i<linkHelperObscura.length ; i++) {
          await axios.get(linkHelperObscura[i]).then(function(response) {
            const $ = cheerio.load(response.data);
            let obscuraLoc = $("address.place-address").children("a.non-decorated-link").text() ? $("address.place-address").children("a.non-decorated-link").text() : "";
            addressHelperObscura.push(obscuraLoc);
            console.log(i);
          }).catch(function(err) {
            obscuraLoc = "301 W 2nd St, Austin, TX 78701";
            addressHelperObscura.push(obscuraLoc);
            console.log(err);
          })
        };
        return addressHelperObscura;
      }).then(function(response) {
        let obscuraArray = [];
        axios.get("http://www.atlasobscura.com/things-to-do/austin-texas/places?page=2").then(function(response) {
          const $ = cheerio.load(response.data);
          $("div.index-card-wrap").each(function(i, element) {
            if ($(this)
              .children("a.content-card-place")
              .children("div.content-card-text")
              .children("h3.content-card-title")
              .children("span")
              .text() == ""){
                return;
            }
            let result = {};
            result.title = $(this)
              .children("a.content-card-place")
              .children("div.content-card-text")
              .children("h3.content-card-title")
              .children("span")
              .text()
            result.location = $(this)
              .children("a.content-card-place")
              .children("div.content-card-text")
              .children("h3.content-card-title")
              .children("span")
              .text();
            result.address = addressHelperObscura[i]
              .replace("Austin", " Austin")
              .replace("United", " United")
              .replace(/,/g, "");
            result.description = $(this)
              .children("a.content-card-place")
              .children("div.content-card-text")
              .children("div.content-card-subtitle")
              .text();
            result.image = $(this)
              .children("a.content-card-place")
              .children("figure.content-card-figure")
              .children("img")
              .attr("src");
            result.link = linkHelperObscura[i];
            result.lat = $(this)
              .children("a.content-card-place")
              .children("div.content-card-text")
              .children("div.lat-lng")
              .text()
              .split(", ")[0] ? $(this)
                .children("a.content-card-place")
                .children("div.content-card-text")
                .children("div.lat-lng")
                .text()
                .split(", ")[0]
                .replace("\n", "") : "";
            result.long = $(this)
              .children("a.content-card-place")
              .children("div.content-card-text")
              .children("div.lat-lng")
              .text().split(", ")[1] ? $(this)
                .children("a.content-card-place")
                .children("div.content-card-text")
                .children("div.lat-lng")
                .text().split(", ")[1]
                .replace("\n", "") : "";
            result.obscura = true;
            obscuraArray.push(result);
            Recommend.create(result).then(dbModel => {
              console.log(dbModel);
            }).catch(function(err) {
              //if error, log error
              console.log(err);
            });
        });
        res.json(obscuraArray);
        console.log("if " + linkHelperObscura.length + " != " + addressHelperObscura.length + ", -> there was a problem.")
      }).catch(function(err) {
        //if error, log error
        console.log(err);
      });
    });
  });
        
  app.get("/recommend/trails", function(req, res) {
    // First, we grab the body of the html with request
    nightmare
    .goto("https://www.alltrails.com/us/texas/austin")
    .wait(2000)
    .evaluate(function() {
      let collection =[]
      const objectA = $("section#nearby-trails").children("div").attr("data-react-props");
      const objectB = JSON.parse(objectA).results;
      $.each(objectB, function(i, element){
        let trail = {}
        console.log(i);
        trail.title = objectB[i].name;
        trail.location = objectB[i].area_name;
        trail.image = "https://alltrails.com/api/alltrails/trails/" + objectB[i].ID + "/profile_photo?show_placeholder=no&size=large&key=3p0t5s6b5g4g0e8k3c1j3w7y5c3m4t8i";
        trail.link = "https://alltrails.com/trails/" + objectB[i].slug + "?ref=result-card";
        trail.lat = objectB[i]._geoloc.lat;
        trail.long = objectB[i]._geoloc.lng;
        trail.outdoor = true;
        collection.push(trail);
    });
    return collection})
    .end()
    .then(function(response) {
      for (i=0; i<response.length ; i++) {
        Recommend.create(response[i]).then(dbModel => {
          console.log(dbModel);
        }).catch(function(err) {
          //if error, log error
          console.log(err);
        });
      } 
      res.json(response);
      console.log(response);
      })
      .catch(function(err) {
        // If an error occurred, log it
        console.log(err);
    });
    });
}