"use strict";

//Initialize RapidAPI (the middleman to Spoonacular API)
//var RapidAPI = new require('rapidapi-connect');
//var rapid = new RapidAPI('default-application_5abfa693e4b00687d3579d2a', '35797c0f-67c6-4386-9991-a3a8c18e340f');

// Initialize the Firebase connection
var config = {
    apiKey: "AIzaSyDmoyIPkRW6mPdQOSnj0uXIOipmiU_1gc4",
    authDomain: "recipe-app-52f20.firebaseapp.com",
    databaseURL: "https://recipe-app-52f20.firebaseio.com",
    projectId: "recipe-app-52f20",
    storageBucket: "recipe-app-52f20.appspot.com",
    messagingSenderId: "1016364414039"
  };

firebase.initializeApp(config);

// create database object
const database = firebase.database();


$.ajax({
  type: 'GET',
  url: 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients?fillIngredients=true&number=5&ingredients=apples%2Cflour%2Csugar%2Cmilk&limitLicense=true&ranking=2',


  // important part //
  headers: {
    'X-Mashape-Key': 'GlBSyGZxQXmshuRk2RcbiWgLs60sp1k5OFrjsnKS0C6LXsEpMr',
    'X-Mashape-Host': 'spoonacular-recipe-food-nutrition-v1.p.mashape.com'
  }
  // important part //


})
.then(res => console.log(res))
.catch(err => console.error(err));
// .done(function(data) {
//   alert(data);
// })



// How to make something happen when a value changes in the database

// database.ref().on("value", function(snapshot) { something happens
// }, function(errorObject) {
//  console.log("The read failed: " + errorObject.code); });


//the API key is
  // -H 'X-Mashape-Key: 4FEmgcoC9ZmshcPhJktTGdDBvHuEp1JalbejsnAA3CFG66uu08'
// how to set a value in the database

// database.ref().set({
// clickCount: clickCounter

// how to read a value from the database

// variable = snapshot.val().KeyValueIdentifierFromDatabase;

// what can/should we use the database for? 

// IDEAS: 
// 1. We could do a "X number of recipes searched so far" counter 
// 2. We could write localStorage data to the database and retrieve it when someone reconnects
// 3. could we write our API keys to the database and retrieve them to prevent them from being available in the code itself?

// END DATABASE SECTION --- END DATABASE SECTION ---  END DATABASE SECTION

// START API QUERY BUILDER SECTION --- START API QUERY BUILDER SECTION --- 

function buildQueryURL() {
    
    // queryURL is the url we'll use to query the API
    var queryURL = "ourAPI";
    
    // anything else we need to build the query goes here...
    return queryURL;
  }

var apiKey = "R5NltYxgLvkdgZgiIxEU35EwTBeQnBVKKug8qEhq";
var ndbno = "01009";
var type = "b";
var format = "json";

//var url = "http://api.nal.usda.gov/ndb/reports/?ndbno=" + ndbno + "&type=" + type + "&format=" + format + "&api_key=" + apiKey;

var url = "http://api.yummly.com/v1/api/recipes?_app_id=2dff9c1b_app_key=12039102b6b8cfd732dcffcd64c93f2e&salt"
$.get(url, function( data ) {
    //alert( "Data Loaded: " + JSON.stringify(data) )
    console.log(data);
    console.log(data.report.food.name);
    console.log(data.report.food.nutrients[6].name);
    //console.log(data.report.food.nutrient)
  });

 
  var ingredients = [];
  //for (var i = 0; i < ingredients.length; i++);
  ingredients.push($("#pageSubmenu.input").val().trim());

  console.log(ingredients);

  var energy = '';
  $.each(food0.nutrient, function () {
      if (this.name == 'Energy') {
          energy = this.value;
  
         return false; // == break; return true == continue;
      }
  })



  // we're going to have to make our API call using CURL url https://stackoverflow.com/questions/36756014/using-curl-to-make-ajax-call
  // -H 'X-Mashape-Key: 4FEmgcoC9ZmshcPhJktTGdDBvHuEp1JalbejsnAA3CFG66uu08'
  // END API QUERY BUILDER SECTION --- END API QUERY BUILDER SECTION ---  

  // LOGIC TO GET THE INGREDIENTS FROM THE DOM 
  
  // select all inputIngredients text fields with jQuery
  // and read the values into an array 
  // all text fields holding ingredients should have the same name

  // CODE FOR THE ORDER DELIVERY BUTTON USING THE GOOGLE MAPS API WITH THE PLACES LIBRARY

  // service = new google.maps.places.PlacesService(map);
  // service.textSearch(request, callback);

  // more detailed documentation for passing text based search requests https://developers.google.com/maps/documentation/javascript/places#TextSearchRequests