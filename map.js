$(document).ready(function() {

    // Variables for bringin in long/lat from Google Geocoding API
    
      let category = [];
      let postal = [];
      let zipCode = $(this).attr("data-name");
    
    
    
    //checked the queryURL and it does bring back a value. Still working on working ajax call
    
      function getCoordinates(zipCode) {
        let queryURL = "https://maps.googleapis.com/maps/api/geocode/json?components=postal_code:" + zipCode + "&key=AIzaSyAJ1giei1E95OkC-K2gtHTnzXapNSQLWqw";
    
        $.ajax({
          url: queryURL,
          method: "GET",
          dataType: "json",
          success: function(results){
          console.log(results);
              // latitude = data.results[0].geometry.location.lat;
              // longitude= data.results[0].geometry.location.lng;
              // alert("Lat = "+latitude+"- Long = "+longitude);
          }
    
        });
    
    
      
      }
    
          $('#getAdventure').on("click", function (event) {
            event.preventDefault();
            let zip = $(".zipCode").val().trim();
            postal.push(zip);
            console.log(zip);
            getCoordinates(zip);
          });
    
    
    
    
    
    
    
    
    
    //Initialize RapidAPI (the middleman to Spoonacular API)
    //var RapidAPI = new require('rapidapi-connect');
    //var rapid = new RapidAPI('default-application_5abfa693e4b00687d3579d2a', '35797c0f-67c6-4386-9991-a3a8c18e340f');
    
    // Initialize the Firebase connection
    // var config = {
    //     apiKey: "AIzaSyDmoyIPkRW6mPdQOSnj0uXIOipmiU_1gc4",
    //     authDomain: "recipe-app-52f20.firebaseapp.com",
    //     databaseURL: "https://recipe-app-52f20.firebaseio.com",
    //     projectId: "recipe-app-52f20",
    //     storageBucket: "recipe-app-52f20.appspot.com",
    //     messagingSenderId: "1016364414039"
    //   };
    
    // firebase.initializeApp(config);
    
    // // create database object
    // const database = firebase.database();
    
    
    // $.ajax({
    //   type: 'GET',
    //   url: 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients?fillIngredients=true&number=5&ingredients=apples%2Cflour%2Csugar%2Cmilk&limitLicense=true&ranking=2',
    
    
    //   // important part //
    //   headers: {
    //     'X-Mashape-Key': 'GlBSyGZxQXmshuRk2RcbiWgLs60sp1k5OFrjsnKS0C6LXsEpMr',
    //     'X-Mashape-Host': 'spoonacular-recipe-food-nutrition-v1.p.mashape.com'
    //   }
    //   // important part //
    
    
    // })
    // .then(res => console.log(res))
    // .catch(err => console.error(err));
    // // .done(function(data) {
    // //   alert(data);
    // // })
    
    
    
    // How to make something happen when a value changes in the database
    
    // database.ref().on("value", function(snapshot) { something happens
    // }, function(errorObject) {
    //  console.log("The read failed: " + errorObject.code); });
    
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
    
    
      // we're going to have to make our API call using CURL url https://stackoverflow.com/questions/36756014/using-curl-to-make-ajax-call
      // -H 'X-Mashape-Key: 4FEmgcoC9ZmshcPhJktTGdDBvHuEp1JalbejsnAA3CFG66uu08'
      // END API QUERY BUILDER SECTION --- END API QUERY BUILDER SECTION ---  
    
      // LOGIC TO GET THE INPUTS FROM THE DOM 
      
    
    
      
      // select all inputIngredients text fields with jQuery
      // and read the values into an array 
      // all text fields holding ingredients should have the same name
    
      // CODE FOR THE ORDER DELIVERY BUTTON USING THE GOOGLE MAPS API WITH THE PLACES LIBRARY
    
      // service = new google.maps.places.PlacesService(map);
      // service.textSearch(request, callback);
    
      // more detailed documentation for passing text based search requests https://developers.google.com/maps/documentation/javascript/places#TextSearchRequests
    
      });



