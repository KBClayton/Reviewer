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
let nightmare = Nightmare({
  gotoTimeout: 15000,
  loadTimeout: 15000,
  executionTimeout: 12000
});
//import initNightmare from 'nightmare';

// Some options I set for all instances
//const nightmareOptions = {
//  gotoTimeout: 10000,
//  loadTimeout: 15000
//};

//class Nightmare {
//  static getNewNightmare() {
//    return initNightmare(nightmareOptions);
//  }
//}

//export default Nightmare;

const jquery = require("jquery");
const cron = require('node-cron');
//Food Helper Arrays
let linkHelperFood = [];
let imgHelperFood = [];
let locHelperFood = [];
//Music Helper Arrays
let linkHelperMusic = [];
let imgHelperMusic = [];
let descHelperMusic = [];
let linkHelperBooks = [];
let musicStoreNameArray = ["Waterloo Records", "End of an Ear", "Waterloo Records", "Antone's Record Store", "Waterloo Records", "Breakaway Records", "Waterloo Records", "Piranha Records", "Waterloo Records", "BLK Vinyl"];
let musicAddressArray = ["600 N Lamar Blvd Austin TX 78703", "4304 Clawson Rd Austin TX 78704", "600 N Lamar Blvd Austin TX 78703", "2928 Guadalupe St Austin TX 78705", "600 N Lamar Blvd Austin TX 78703", "211 W N Loop Blvd Austin TX 78751", "600 N Lamar Blvd Austin TX 78703", "1208 N Interstate Hwy 35 E Round Rock TX 78681", "600 N Lamar Blvd Austin TX 78703", "2505 E 6th St Austin TX 78702"];
let musicLatArray = [30.271, 30.229, 30.271, 30.296, 30.271, 30.318, 30.271, 30.519, 30.271, 30.258];
let musicLongArray = [-97.754, -97.784, -97.754, -97.742, -97.754, -97.724, -97.754, -97.689, -97.754, -97.714];
let musicTicketLinkArray = ["https://www.waterloorecords.com/Store","http://endofanear.com/","https://www.waterloorecords.com/Store","http://antonesrecordshop.com/content/","https://www.waterloorecords.com/Store","http://breakawayrecordshop.com/","https://www.waterloorecords.com/Store","http://www.piranharecords.net/home","https://www.waterloorecords.com/Store","https://www.blkvinylatx.com/"];
//Book Helper Arrays
let imgHelperBooks = [];
let titleHelperBooks = [];
let synHelperBooks = [];
let authorHelperBooks = [];
let bookStoreNameArray = ["BookPeople", "Malvern Books", "BookPeople", "South Congress Books", "BookPeople", "Resistencia", "BookPeople", "Recycled Reads", "BookPeople", "BookWoman", "BookPeople", "Austin Books & Comics"];
let bookAddressArray = ["603 N Lamar Blvd Austin TX 78703", "613 W 29th St Austin TX 78705", "603 N Lamar Blvd Austin TX 78703", "1608 S Congress Ave Austin TX 78704", "603 N Lamar Blvd Austin TX 78703", "4926 E Cesar Chavez St Austin TX 78702", "603 N Lamar Blvd Austin TX 78703", "5335 Burnet Rd Austin TX 78756", "603 N Lamar Blvd Austin TX 78703", "5501 N Lamar Blvd Austin TX 78751", "603 N Lamar Blvd Austin TX 78703", "5002 N Lamar Blvd Austin TX 78751"];
let bookLatArray = [30.272, 30.295, 30.272, 30.247, 30.272, 30.251, 30.272, 30.327, 30.272, 30.322, 30.272, 30.317];
let bookLongArray = [-97.753, -97.743, -97.753, -97.750, -97.753, -97.700, -97.753, -97.739, -97.753, -97.728, -97.753, -97.732];
let bookTicketLinkArray = ["https://www.bookpeople.com","http://malvernbooks.com/","https://www.bookpeople.com","https://southcongressbooks.com/","https://www.bookpeople.com","http://www.resistenciabooks.com/","https://www.bookpeople.com","http://library.austintexas.gov/recycled-reads","https://www.bookpeople.com","https://www.ebookwoman.com/","https://www.bookpeople.com","https://www.austinbooks.com/"];
//Do512 Helper Array
let dailyArray = [];
//Obscura Helper Arrays
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
            descHelperFood = [];
            console.log(linkHelperFood);
            for (let i = 0; i<linkHelperFood.length ; i++){
              await axios.get(linkHelperFood[i]).then(function(response) {
                const $ = cheerio.load(response.data);
                let chronImageFood = $("div.copy").children("div.imageRight").children("a").children("img").attr("src") ? "https://www.austinchronicle.com" + $("div.copy").children("div.imageRight").children("a").children("img").attr("src") : $("div.story-image.top-image").children("a.lightbox").attr("href") ? "https://www.austinchronicle.com" + $("div.story-image.top-image").children("a.lightbox").attr("href") : "https://via.placeholder.com/300x300";
                let chronLocFood = $("div.description").children("b").text() ? $("div.description").children("b").text() : $("div.copy").children("h3").next("b").text() ? $("div.copy").children("h3").next("b").text() : "301 W 2nd St, Austin, TX 78701";
                let chronDescFood = $("div.copy").children("p").first().text() ? $("div.copy").children("p").first().text() : "Sorry, no description is available. Please vist the link for more information.";
                imgHelperFood.push(chronImageFood);
                locHelperFood.push(chronLocFood);
                descHelperFood.push(chronDescFood);
                console.log(i);
                })
                .catch(function(err) {
                  chronImageFood = "https://via.placeholder.com/300x300";
                  imgHelperFood.push(chronImageFood);
                  chronLocFood = "301 W 2nd St, Austin, TX 78701";
                  locHelperFood.push(chronLocFood);
                  chronDescFood = "Sorry, no description available. Please visit the link for more information.";
                  descHelperFood.push(chronDescFood)
                  console.log(err);
                  })
              };
              return imgHelperFood;
          }).then(function(response) {
              //let foodArray = [];
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
                .replace("Restaurant Review: ", "")
                .replace("Far Flung Correspondence: ", "")
                .replace("Review: ", "");
                result.description = descHelperFood[i];
                result.location = $(this)
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
                Recommend.findOne({ title:result.title }).then(function(response) {
                  if(!response || response===null){
                    Recommend.create(result).then(result => {
                      //foodArray.push(result);
                      console.log(result.title + " was added to the database");
                    }).catch(function(err) {
                      // If an error occurred, log it
                      console.log(err);
                        })
                  }
                  else {
                    console.log(result.title + " was already in the database");
                  };
                    }).catch(function(err) {
                      // If an error occurred, log it
                      console.log(err);
                        });
                      });
                    res.json("the database was successfully updated");
                    //console.log(foodArray);
                    //console.log("if " + linkHelperFood.length + " != " + imgHelperFood.length + " != " + locHelperFood.length + ", -> there was a problem.");
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
              //console.log(linkHelperMusic);
              for (let i = 0; i<linkHelperMusic.length ; i++){
                await axios.get(linkHelperMusic[i]).then(function(response){
                  const $ = cheerio.load(response.data);
                  let chronImageMusic = $("div.copy").children("div.imageRight.top-image.sans-border").children("a.lightbox").attr("href") ? "https://www.austinchronicle.com" + $("div.copy").children("div.imageRight.top-image.sans-border").children("a.lightbox").attr("href") : "https://via.placeholder.com/300x300";
                  imgHelperMusic.push(chronImageMusic);
                  let chronDescMusic = $("div.copy").children("p").first().text() ? $("div.copy").children("p").first().text() + ".." : "Sorry, no description is available. Please vist the link for more information.";
                  descHelperMusic.push(chronDescMusic);
                  console.log(i);
                  })
                  .catch(function(err) {
                    chronImageMusic = "https://via.placeholder.com/300x300";
                    imgHelperMusic.push(chronImageMusic);
                    chronDescMusic = "Sorry, no description is available. Please vist the link for more information.";
                    descHelperMusic.push(chronDescMusic);
                    console.log(err);
                    })
                };
                return imgHelperMusic;
          }).then(function(response) {
              axios.get("http://www.austinchronicle.com/music/reviews/").then(function(response) {
              const $ = cheerio.load(response.data);
              // Now, we grab every h2 within an article tag, and do the following:
              $("section#CenterColumn").children("h2").each(function(i, element) {
                let u = Math.floor(Math.random()*musicStoreNameArray.length);
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
                result.address = musicAddressArray[u];
                result.lat = musicLatArray[u];
                result.long = musicLongArray[u];
                result.ticketLink = musicTicketLinkArray[u];
                result.storeName = musicStoreNameArray[u];
                result.music = true;
                Recommend.findOne({ location:result.location }).then(function(response) {
                  if(!response || response===null) {
                    Recommend.create(result).then(function(result) {
                      console.log(result.location + " was added to the database");
                      }).catch(function(err) {
                        // If an error occurred, log it
                        console.log(err);
                        })
                  }
                  else {
                  console.log(result.location + " was already in the database");
                  //console.log("musicArray Length = " + musicArray.length);
                  return true;
                  }
                    }).catch(function(err) {
                      // If an error occurred, log it
                      console.log(err);
                        });
                });
                  res.json("the database was successfully updated");
                }).catch(function(err) {
                  // If an error occurred, log it
                  console.log(err);
                });
              });
            });  

  app.get("/recommend/acBooks", function(req, res) {
    // First, we grab the body of the html with axios
    axios.get("http://www.austinchronicle.com/books/reviews/").then(function(response) {
      linkHelperBooks = [];
      const $ = cheerio.load(response.data);
      // Now, we grab every h2 within an article tag, and do the following:
      $("section#CenterColumn").children("h2").each(function(i, element) {
        if ($(this)
          .children("a")
          .text() == "") {
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
              let chronSynBooks = $("div.copy").next("p").text() ? $("div.copy").next("p").text() + "..." :  "";
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
            //let booksArray = [];
            axios.get("http://www.austinchronicle.com/books/reviews/").then(function(response){
              const $ = cheerio.load(response.data);
              $("section#CenterColumn").children("h2").each(function(i, element) {
                let u = Math.floor(Math.random()*bookStoreNameArray.length);
                let result = {};
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
                  return;
                };
                result.title = titleHelperBooks[i] === "" 
                  ? $(this)
                    .children("a")
                    .text()
                    .split(' by ' + result.location)[0]
                      : titleHelperBooks[i].split(' by ' + result.location)[0];
                result.description = /*synHelperBooks[i] === ""
                  ? $(this)
                    .next("div.description")
                    .text()
                      : titleHelperBooks[i].split(" ")[0] == $(this)
                      .next("div.description")
                      .text() ? synHelperBooks[i] :*/ synHelperBooks[i];
                result.link = linkHelperBooks[i];
                result.image = imgHelperBooks[i];
                result.address = bookAddressArray[u];
                result.lat = bookLatArray[u];
                result.long = bookLongArray[u];
                result.ticketLink = bookStoreNameArray[u] === "BookPeople" ? bookTicketLinkArray[u] + "/search/site/" + result.title.replace(/\ /g, "%20")
                  .replace(/\,/g, "%2C")
                  .replace(/\:/g, "%3A")
                  .replace(/\$/g, "%24")
                  .replace(/\?/g, "%3F")
                  .replace(/\"/g, "%22")
                  .replace(/\'/g, "%27")
                  .replace(/\&/g, "%26") : bookTicketLinkArray[u];
                result.storeName = bookStoreNameArray[u];
                result.books = true;
                Recommend.findOne({ title:result.title }).then(function(response) {
                  if(!response || response===null){
                    Recommend.create(result).then(result => {
                      //booksArray.push(result);
                      console.log(result.title + " was added to the database");
                    }).catch(function(err) {
                      // If an error occurred, log it
                      console.log(err);
                        })
                  }
                  else {
                    console.log(result.title + " was already in the database");
                  };
                    }).catch(function(err) {
                      // If an error occurred, log it
                      console.log(err);
                        });
            });
            res.json("the database was successfully updated");
            //console.log(booksArray);
            //console.log("if " + linkHelperBooks.length + " != " + imgHelperBooks.length + ", -> there was a problem.")
          }).catch(function(err) {
            // if an error occured, log it
            console.log(err);
          });
        });
      });

  app.get("/recommend/daily", function(req, res) {
    // First, we grab the body of the html with request
    customHeaderRequest.get("http://do512.com/").then(function(response) {
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
            result.obscuraP1 = true;
            Recommend.findOne({ title:result.title }).then(function(response) {
              if(!response || response===null){
                Recommend.create(result).then(res => {
                  //obscuraArray.push(res);
                  console.log(res.title + " was added to the database");
                }).catch(function(err) {
                  // If an error occurred, log it
                  console.log(err);
                    })
              }
              else {
                console.log(result.title + " was already in the database");
              };
                }).catch(function(err) {
                  // If an error occurred, log it
                  console.log(err);
                    });
        });
        res.json("the database was successfully updated");
        //console.log("if " + linkHelperObscura.length + " != " + addressHelperObscura.length + ", -> there was a problem.")
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
            result.obscuraP2 = true;
            Recommend.findOne({ title:result.title }).then(function(response) {
              if(!response || response===null){
                Recommend.create(result).then(res => {
                  //obscuraArray.push(result);
                  console.log(res.title + " was added to the database");
                }).catch(function(err) {
                  // If an error occurred, log it
                  console.log(err);
                    })
              }
              else {
                console.log(result.title + " was already in the database");
              }
                }).catch(function(err) {
                  // If an error occurred, log it
                  console.log(err);
                    });
        });
        res.json("the database was successfully updated");
        console.log("if " + linkHelperObscura.length + " != " + addressHelperObscura.length + ", -> there was a problem.")
      }).catch(function(err) {
        //if error, log error
        console.log(err);
      });
    });
  });

  app.get("/recommend/obscura/images", async function(req, res) {
    //declare a new nightmare
    let nightmare = Nightmare({
      gotoTimeout: 15000,
      loadTimeout: 15000,
      executionTimeout: 12000
    });
    console.log(req.query);
    let titleHelper = req.query.title;
    nightmare
      .goto(req.query.link)
      .wait(4000);
    await nightmare.evaluate(() => {
        let obscureObject = {};
        obscureObject.image = $("figure.js-item-image.slick-slide.slick-current.slick-active")
          .children("a.js-trigger-lightbox.gallery-image-container")
          .children("img")
          .attr("src");
        return obscureObject;
      }).then((response) => {
        console.log(response.image);
        Recommend.findOneAndUpdate({title: titleHelper}, {image: response.image}).then(async(result) => {
            console.log(result);
            res.json(result);
            console.log("image added")
          }).catch(function(err) {
            // If an error occurred, log it
            console.log(err);
              })
    }).catch(function(err) {
      // If an error occurred, log it
      console.log(err);
    });
      // finally cleanup
      nightmare.end();
      // kill the Electron process explicitly to ensure no orphan child processes
      nightmare.proc.disconnect();
      nightmare.proc.kill();
      nightmare.ended = true;
      //set nightmare = null to kill the current nightmare
      nightmare=null;
});
        
  app.get("/recommend/trails", async function(req, res) {
    let nightmare = Nightmare({
      gotoTimeout: 15000,
      loadTimeout: 15000,
      executionTimeout: 20000
    });
    // First, we grab the body of the html with request
    nightmare
    .goto("https://www.alltrails.com/us/texas/austin")
    .wait(2000)
    await nightmare.evaluate(async() => {
      let collection =[];
      const objectA = $("section#nearby-trails").children("div").attr("data-react-props");
      const objectB = JSON.parse(objectA).results;
      await $.each(objectB, function(i, element){
        let trail = {};
        let difficultyArray = ["", "an easy", "a modertely easy", "a moderate", "a moderately difficult", "a challenging"]
        let tLength = parseFloat(objectB[i].length) / 1609.34;
        let trailLength = tLength.toFixed(1).toString();
        let tEl = parseFloat(objectB[i].elevation_gain) * 3.38084;
        let elGain = tEl.toFixed(1).toString();
        objectB[i].activities[objectB[i].activities.length - 1] = "and " + objectB[i].activities[objectB[i].activities.length - 1];
        let activityDescription = objectB[i].activities.join(", ");
        let dogMessage = "";
        for (j=0 ; j < objectB[i].features.length ; j++) {
          if (objectB[i].features[j] == "dogs") {
            dogMessage = " Dogs are welcome on this trail.";
            break;
          }
          else if (objectB[i].features[j] == "dogs-leash"){
            dogMessage = " Leashed dogs are welcome on this trail.";
            break;
          }
          else {
            dogMessage = " Unfortunately, dogs are not allowed on this trail.";
          }
        };
        trail.ticketLink = objectB[i].features.join(", ");
        trail.title = objectB[i].name.split(" in")[0];
        trail.location = objectB[i].area_name;
        trail.description = "is " + difficultyArray[objectB[i].difficulty_rating] + " " + trailLength + " mile trail with an elevation gain of " + elGain + " feet. Available activities include " + activityDescription + "." + dogMessage; 
        trail.image = "https://alltrails.com/api/alltrails/trails/" + objectB[i].ID + "/profile_photo?show_placeholder=no&size=large&key=3p0t5s6b5g4g0e8k3c1j3w7y5c3m4t8i";
        trail.link = "https://alltrails.com/trails/" + objectB[i].slug + "?ref=result-card";
        trail.lat = objectB[i]._geoloc.lat;
        trail.long = objectB[i]._geoloc.lng;
        trail.outdoor = true;
        collection.push(trail);
    });
    return collection})
    .then(async function(result) {
      let trailArray = [];
      for (i=0; i<result.length ; i++) {
        await Recommend.findOne({ title:result[i].title }).then(function(response) {
          if(!response || response===null){
            Recommend.create(result[i]).then(res => {
              trailArray.push(res);
              console.log(res.title + " was added to the database");
            }).catch(function(err) {
              // If an error occurred, log it
              console.log(err);
                })
          }
          else {
            console.log(response.title + " was already in the database");
          };
            }).catch(function(err) {
              // If an error occurred, log it
              console.log(err);
                });
      } 
      res.json(trailArray);
      console.log(trailArray);
      })
      .catch(function(err) {
        // If an error occurred, log it
        console.log(err);
      });
        // finally cleanup
        nightmare.end();
        // kill the Electron process explicitly to ensure no orphan child processes
        nightmare.proc.disconnect();
        nightmare.proc.kill();
        nightmare.ended = true;
        //set nightmare = null to kill the current nightmare
        nightmare = null;
      
    });

  //route to get all restaurant recommendations
  app.get("/recommend/acFood/all", function(req, res){
    // console.log(req.body);
    Recommend.find({food:true}).then(dbModel => res.json(dbModel));
  });
  //route to get all album recommendations
  app.get("/recommend/acMusic/all", function(req, res){
    // console.log(req.body);
    Recommend.find({music:true}).then(dbModel => res.json(dbModel));
  });
  //route to get all book recommendations
  app.get("/recommend/acBooks/all", function(req, res){
    // console.log(req.body);
    Recommend.find({books:true}).then(dbModel => res.json(dbModel));
  });
  //route to get all do512 event recommendations
  app.get("/recommend/daily/all", function(req, res){
    // console.log(req.body);
    Recommend.find({do512:true}).then(dbModel => res.json(dbModel));
  });
  //route to get all atlas obscura recommendations
  app.get("/recommend/obscura/all", function(req, res){
    // console.log(req.body);
    Recommend.find({obscura:true}).then(dbModel => res.json(dbModel));
  });
  //route to get all alltrail recommendations
  app.get("/recommend/trails/all", function(req, res){
    // console.log(req.body);
    Recommend.find({outdoor:true}).then(dbModel => res.json(dbModel));
  });
  //route to delete daily recommendations
  app.delete("/recommend/daily/delete", function(req, res){
    Recommend.deleteMany({do512:true}).then(dbModel=>{
      res.json(dbModel)
    })
  })
}
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//!!!!!!!!!!!!!!!!!THIS VARIABLE NEEDS TO BE CHANGED IF DEPLOYED TO HEROKU!!!!!!!!!!!!!!!!!!!!!
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
const dotenv = require("dotenv");
dotenv.config();
console.log(process.env.NODE_ENV);
let urlHelper = "http://localhost:3000/"
if (process.env.NODE_ENV === "production") {
    urlHelper = "https://austin-reviews.herokuapp.com/"
}
console.log(`urlhelper is: ${urlHelper}`)

//const urlHelper = "https://austin-reviews.herokuapp.com/"
//automated scheduler for updating the restaurant recommendations
const updateFood = cron.schedule('5 * * * *', async function(error, response, body) {
  await axios.get(urlHelper + "recommend/acFood").then(res => {
    console.log(res);
    console.log("RESTAURANT RECS UPDATED");
  }).catch(function(err) {
    // If an error occurred, log it
    console.log(err);
    });
  }, false);
//automated scheduler for updating the album recommendations
const updateMusic = cron.schedule('10 * * * *', async function(error, response, body) {
  await axios.get(urlHelper + "recommend/acMusic").then(res => {
    console.log(res);
    console.log("ALBUM RECS UPDATED");
  }).catch(function(err) {
    // If an error occurred, log it
    console.log(err);
    });
  }, false);
//automated scheduler for updating the book recommendations
const updateBooks = cron.schedule('15 * * * *', async function(error, response, body) {
  await axios.get(urlHelper + "recommend/acBooks").then(res => {
    console.log(res);
    console.log("BOOK RECS UPDATED");
  }).catch(function(err) {
    // If an error occurred, log it
    console.log(err);
    });
  }, false);
//automated scheduler for updating the daily event recommendations
const clearDo512 = cron.schedule('20 * * * *', function(error, response, body) {
  axios.delete(urlHelper + "recommend/daily/delete").then(res => {
    console.log(res);
    console.log("YESTERDAY'S RECS DELETED");
  }).catch(function(err) {
    // If an error occurred, log it
    console.log(err);
    });
  }, false);
//automated scheduler for updating the daily event recommendations
const updateDo512 = cron.schedule('25 * * * *', function(error, response, body) {
  axios.get(urlHelper + "recommend/daily").then(res => {
    console.log(res);
    console.log("DAILY RECS UPDATED");
  }).catch(function(err) {
    // If an error occurred, log it
    console.log(err);
    });
  }, false);
//automated scheduler functions for updating the obscura recommendations
const updateObscura1 = cron.schedule('30 * * * *', async function(error, response, body) {
  await axios.get(urlHelper + "recommend/obscuraP1").then(res => {
    console.log(res);
    console.log("OBSCURA P1 RECS UPDATED");
  }).catch(function(err) {
    // If an error occurred, log it
    console.log(err);
    });
  }, false);
const updateObscura2 = cron.schedule('35 * * * *', async function(error, response, body) {
  await axios.get(urlHelper + "recommend/obscuraP1/images").then(res => {
    console.log(res);
    console.log("OBSCURA P1 IMAGES UPDATED");
  }).catch(function(err) {
    // If an error occurred, log it
    console.log(err);
    });
  }, false);
const updateObscura3 = cron.schedule('40 * * * *', async function(error, response, body) {
  await axios.get(urlHelper + "recommend/obscuraP2").then(res => {
    console.log(res);
    console.log("OBSCURA P2 RECS UPDATAED");
  }).catch(function(err) {
    // If an error occurred, log it
    console.log(err);
    });
  }, false);
const updateObscura4 = cron.schedule('45 * * * *', async function(error, response, body) {
  await axios.get(urlHelper + "recommend/obscuraP2/images").then(res => {
    console.log(res);
    console.log("OBSCURA P2 IMAGES UPDATED");
  }).catch(function(err) {
    // If an error occurred, log it
    console.log(err);
    });
  }, false);
//automated scheduler for updating the trail recommendations
const updateTrail = cron.schedule('0 * * * *', async function(error, response, body) {
  await axios.get(urlHelper + "recommend/trails").then(res => {
    console.log(res);
    console.log("TRAIL RECS UPDATED");
  }).catch(function(err) {
    // If an error occurred, log it
    console.log(err);
    });
  }, false);


 
/*updateFood.start();
updateMusic.start();
updateBooks.start();
clearDo512.start();
updateDo512.start();
updateObscura1.start();
updateObscura2.start();
updateObscura3.start();
updateObscura4.start();
updateTrail.start();*/