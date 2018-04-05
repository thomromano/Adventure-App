"use strict";

// Initialize RapidAPI (the middleman to Spoonacular API)
var RapidAPI = new require('rapidapi-connect');
var rapid = new RapidAPI('default-application_5abfa693e4b00687d3579d2a', '35797c0f-67c6-4386-9991-a3a8c18e340f');

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
var database = firebase.database();
 
// $.ajax({
//         url: 'https://api.nal.usda.gov/ndb/reports/V2?ndbno=01009&ndbno=01009&ndbno=45202763&ndbno=35193&type=b&format=json&api_key=R5NltYxgLvkdgZgiIxEU35EwTBeQnBVKKug8qEhq',
//         type: "GET",
//             success: function (response) {
                 
//                     var nutrients = response.data[i].images.fixed_height.url;

//                     console.log(response);
//                 }

// })
var foodItem = function (rawList) {
    var terms = ['ndb', 'title', 'water', 'kcal', 'protein', 'lipidTotal', 'ash', 'carb', 'fiberTotalDietary', 'sugarTotal', 'elCa', 'elFe', 'elMg', 'elP', 'elK', 'elNa', 'elZn', 'elCu', 'elMa', 'elSe', 'vitaminC', 'thiamin','riboflavin', 'niacin', 'pantothenicAcid', 'vitaminB6', 'folateTotal', 'folicAcid', 'foodFolate', 'dietaryFolate', 'cholineTotal', 'vitaminB12', 'vitaminAIU', 'vitaminA', 'retinol', 'alphaCarotene', 'betaCarotene', 'betaCryptoxanthin', 'lycopene', 'luteinZeazanthin', 'vitaminE', 'vitaminD', 'vitaminDIU', 'vitaminK', 'saturatedFat', 'monounsaturatedFat', 'polyunsaturatedFat', 'cholesterol', 'primaryWeight', 'primaryWeightDesc', 'secondaryWeight', 'secondaryWeightDesc', 'refuse'];
    
    for (var i in terms) {
        this[terms[i]] = rawList[i];
    }
};

var foodMatch = function (match) {
    this.internal = match;
    this.score = match.score;
    this.data = new foodItem(fullData[Number(match.ref)]);
};


var apiKey = "R5NltYxgLvkdgZgiIxEU35EwTBeQnBVKKug8qEhq";
var ndbno = "01009";
var type = "b";
var format = "json";

var url = "http://api.nal.usda.gov/ndb/reports/?ndbno=" + ndbno + "&type=" + type + "&format=" + format + "&api_key=" + apiKey;

$.get(url, function( data ) {
    alert( "Data Loaded: " + JSON.stringify(data) );
});
var foodWeb = require('foodweb');

var term = 'butter'; // the search term
var maxLength = 5; // the maximum number of items to return

foodWeb.search(term, maxLength);
/*
 [foodMatch {
     internal: {...},
     score: Number,
     data: foodItem {...}
 }, ...]
*/
var item = foodWeb.search('cheez it')[0];

// kilocalories in 100 grams
var calories = item.data.kcal;
// kilocalories in a serving
var serving = Math.round((item.data.primaryWeight / 100) * calories);
// description of serving
var servingDescription = item.data.primaryWeightDesc;

console.log(servingDescription, 'is', serving, 'calories');

// 29 crackers is 135 caloriesnpm install -g lunr

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

  // END API QUERY BUILDER SECTION --- END API QUERY BUILDER SECTION ---  

  // LOGIC TO GET THE INGREDIENTS FROM THE DOM 
  
  // select all inputIngredients text fields with jQuery
  // and read the values into an array 
  // all text fields holding ingredients should have the same name

  // CODE FOR THE ORDER DELIVERY BUTTON USING THE GOOGLE MAPS API WITH THE PLACES LIBRARY

  // service = new google.maps.places.PlacesService(map);
  // service.textSearch(request, callback);

  // more detailed documentation for passing text based search requests https://developers.google.com/maps/documentation/javascript/places#TextSearchRequests