
'use strict';

$(document).ready(function() {


  // Initialize Firebase connection
  var config = {
    apiKey: "AIzaSyAfvqfgBdfABlSoNcpqlbJMpmwPHp1vt-E",
    authDomain: "localeventfinder-f4f1f.firebaseapp.com",
    databaseURL: "https://localeventfinder-f4f1f.firebaseio.com",
    projectId: "localeventfinder-f4f1f",
    storageBucket: "localeventfinder-f4f1f.appspot.com",
    messagingSenderId: "107746642812"
  };

  // global variables

  let geoCodeKey="";
  let tmk = "";
  let latitude = "";
  let longitude = "";

  firebase.initializeApp(config);
//   console.log("firebase database connection initialized");
  
  const database = firebase.database();
//   console.log("Local database variable assigned");

// Variables for bringin in long/lat from Google Geocoding API

  let category = [];
  let postal = [];
  let zipCode = $(this).attr("data-name");
  let latlong = "";
  let city = [];
//checked the queryURL and it does bring back a value. Still working on working ajax call

  function getCoordinates(zipCode) {
    
    // read the value of gck from the database
    database.ref().on("value", function(snapshot) {
      let geoCodeKey = snapshot.val().gck;
    //   console.log("gck is " + geoCodeKey);
      return geoCodeKey;
    });
    let queryURL = "https://maps.googleapis.com/maps/api/geocode/json?components=postal_code:" + zipCode + "&key=" + geoCodeKey;

    $.ajax({
      url: queryURL,
      method: "GET",
      dataType: "json",
      success: function(response){
            latitude = response.results[0].geometry.location.lat;
            longitude= response.results[0].geometry.location.lng;
            map.setCenter({lat: latitude, lng: longitude});
      }
      
    });
    
  }
    // Handles the zipcode Errors
    function zipErrorHandling() {
        let message, x;
        message = document.getElementById("warning");
        message.innerHTML = "";
        x = document.getElementById("zipCodeID").value;
        console.log("X is coming back as " + x);
        console.log(x.length);
        try { 
            if(x === "")  throw "Please enter a valid Zip Code";
            if(isNaN(x)) throw "Please enter a valid Zip Code";
            oninvalid="this.setCustomValidity('Please enter 5 digits only')"
             //x = Number(x);
            if(x.length < 5)    throw "Please enter 5 characters";
            if(x.length > 10)   throw "Please only enter 5 characters";
        }
        catch(err) {
            message.innerHTML = err;
        }
    }

    $(function(data) {
        $(".zipCode").keydown(function(event) {
            if (event.keyCode===13) {
                let zip = $(".zipCode").val().trim();
                postal.push(zip);
                // console.log(zip);
                getCoordinates(zip);
                $('#warning').empty();
                zipErrorHandling();
                $('.zipCode').val('');
                ticketMaster();
            }
        });
    })

    $(function() {
        $("form").submit(function() { 
        return false; 
        });
    });

    $('#pageSubmenu').on('click', function (event){
        event.preventDefault();
    });

        // this function is used later to append the infowindow to the eventmarker on the map 
        function bindInfoWindow(newMark,map,infowindow){
            newMark.addListener('click', function() {
            infowindow.close();
            infowindow.open(map, newMark);
            })
        }
        let classificationName = "&classificationName=";
        let familyFriendly = "";
        let infowindow;

        function ticketMaster(){
        // get the ticketmaster API key from the database    
        database.ref().on("value", function(snapshot) {
            tmk = snapshot.val().tmk;
            let eventCategory = "";
            const radius = 25;
            const unit = "miles"
            var today = new Date();
            var dd = today.getDate();
            var tmdd = today.getDate()+1;
            var mm = today.getMonth()+1; //January is 0!
            var yyyy = today.getFullYear();
    
            if(dd<10) {
                dd = '0'+dd
            } 
    
            if(tmdd<10) {
                tmdd = '0'+tmdd;
            } 
    
            if(mm<10) {
                mm = '0'+mm
            } 

           
    
            let todayString = `${yyyy}-${mm}-${dd}T00:00:00Z`
            console.log("todayString is " + todayString)
            
            let tomorrowString = `${yyyy}-${mm}-${tmdd}T00:00:00Z`
            console.log("tomorrowString is " + tomorrowString);
    
            let latlong = latitude + ","  + longitude;
            console.log("latlong is " + latlong)
        
        const eventQueryURL = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${tmk}&keyword=${eventCategory}&geoPoint=${latlong}&radius=${radius}&unit=${unit}&startDateTime=${todayString}&endDateTime=${tomorrowString}${classificationName}${familyFriendly}`;
        console.log(eventQueryURL)
        $.ajax({
            url: eventQueryURL,
            method: "GET",
            dataType: "json",
            success: function(results){
            for (var i=0; i<results._embedded.events.length;i++)
            {
                    let eventLat = results._embedded.events[i]._embedded.venues[0].location.latitude;
                    let eventLong = results._embedded.events[i]._embedded.venues[0].location.longitude;
                    let eventName = results._embedded.events[i].name;
                    let eventImage = results._embedded.events[i].images[0].url;
                    let eventInfo = results._embedded.events[i].info;
                    let eventInfoDisplay ="";
                    if (results._embedded.events[i].info !== undefined)
                    {
                        eventInfoDisplay=results._embedded.events[i].info;
                        console.log("there IS event info to display")
                    }
                    let venueURL = results._embedded.events[i]._embedded.venues[0].url;
                    let venueName = results._embedded.events[i]._embedded.venues[0].name;
                    let iconImage = new google.maps.MarkerImage('./assets/img/icon1.png', null, null, null, new google.maps.Size(45, 45));
                    let eventUrl = results._embedded.events["0"].url
                    let str = "Get Tickets Here";
                    let result = str.link(eventUrl);
                    // let result = $("p").append(`<a  target="_blank" href='${eventUrl}'>${str}</a>`)
                    //$(".footer").prepend('<div class="media-left"><img class="media-object" alt="ticketmaster event image" src =' + eventImage+'></div>'+'<div class="media-body"><h3 class="media-heading">'+eventName+'</h3></div>');
                    //let eventURL = results._embedded.events[i]._embedded.attractions[0].url;
                    let eventLatLong = {
                        lat: parseInt(eventLat),
                        lng: parseInt(eventLong)
                    }
                    iconImage = new google.maps.MarkerImage('./assets/img/icon1.png', null, null, null, new google.maps.Size(45, 45));
                    let newMark = new google.maps.Marker({
                       position: {lat: parseFloat(eventLat),
                               lng: parseFloat(eventLong)
                               },
                        map: map,
                        icon: iconImage,
                        title: eventName
                      });
                       infowindow = new google.maps.InfoWindow({
                      content: '<img src="' + eventImage +'"' + 'alt="TicketMaster Image;" class = "concerts;"  id="concerts"; style = align:"middle"; height="65"; width="120";>'+ '<a href="' + venueURL + '" target="_blank" style = center; color #999>' + eventName + '</a><div style="text-size:8px;"> at ' + venueName + "</div>"
                     });
                     bindInfoWindow(newMark,map,infowindow);
                }
            }});  
        });
        }

    // Clicking the button creates the zipcode that goes to the getCoordinates

    $('#getAdventure').on("click", function (event) {
        event.preventDefault();
        let zip = $(".zipCode").val().trim();
        postal.push(zip);
        // console.log(zip);
        getCoordinates(zip);
        $('#warning').empty();
        zipErrorHandling();
        $('.zipCode').val('');


        if(document.getElementById('cboxcon').checked) {
            console.log("Music,")
            classificationName+="Music,"
            // adds "Music" to classificationName array
            $('#cboxcon').prop('checked', false);
        }
        if(document.getElementById('cboxsport').checked) {
            classificationName+="Sports,"
            $('#cboxsport').prop('checked', false);
        }
        if(document.getElementById('cboxart').checked) {
            classificationName+="Arts,"
            // adds  "Arts" to classificationName array
            $('#cboxart').prop('checked', false);
        }
        if(document.getElementById('cboxfamily').checked) {
            console.log("family checked")
            familyFriendly = "&includeFamily=yes";
            // adds includeFamily=yes to the queryString
            $('#cboxfamily').prop('checked', false);
        }
        ticketMaster();
            // reset the classification name and family friendly variables for the next run through
            classificationName = "&classificationName=";
            familyFriendly = "";
        });  

// end of document ready
});


let map;
let infoWindow;
let request;
let service;
let markers = [];
let marker;
let pos;
let newRequest;
let callback;

function initialize() {
// console.log('map loaded');
    // definitions
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 44.986656, lng: -93.258133},
        zoom: 12,
        styles: [
            {elementType: 'geometry', stylers: [{color: '#172436'}]},
            {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
            {
              featureType: 'administrative.locality',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'poi',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'geometry',
              stylers: [{color: '#768B8E'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'labels.text.fill',
              stylers: [{color: '#ffffff'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry',
              stylers: [{color: '#38414e'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry.stroke',
              stylers: [{color: '#212a37'}]
            },
            {
              featureType: 'road',
              elementType: 'labels.text.fill',
              stylers: [{color: '#9ca5b3'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry',
              stylers: [{color: '#746855'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry.stroke',
              stylers: [{color: '#1f2835'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'labels.text.fill',
              stylers: [{color: '#f3d19c'}]
            },
            {
              featureType: 'transit',
              elementType: 'geometry',
              stylers: [{color: '#2f3948'}]
            },
            {
              featureType: 'transit.station',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'water',
              elementType: 'geometry',
              stylers: [{color: '#000000'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.fill',
              stylers: [{color: '#aaaaaa'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.stroke',
              stylers: [{color: '#17263c'}]
            }
          ]
    });

    // recenter map around user's location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
            };
            map.setCenter(pos);
        }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } 

    // recenter the map and reload the places after the map has been dragged and released
    map.addListener('dragend', function() {
        // google.maps.event.addListener(map, 'dragend', function(event) {
    //   console.log(event);
        map.getCenter()
    //   console.log(map.getCenter());

    clearResults(markers)
            let request = {
                location: map.getCenter(),
                radius: 5000,
                types: ['zoo']
            };
            service.nearbySearch(request, callback);
            return service.nearbySearch(request, callback);
    
    })
}
// function callback(results, status) {
//     if(status == google.maps.places.PlacesServiceStatus.OK){
//         for (var i = 0; i < results.length; i++){
//             markers.push(createMarker(results[i]));
//         }
//     }
// }



//creates a marker for the places
// function createMarker(place) {
//     //customization of the icon happens at this line
// //   let iconImage    = new google.maps.MarkerImage(place.icon, null, null, null, new google.maps.Size(32, 32));
//     let iconImage = new google.maps.MarkerImage('./assets/img/icon1.png', null, null, null, new google.maps.Size(45, 45));
//     const placeLoc = place.geometry.location;
//     marker = new google.maps.Marker({
//         map: map,
//         position: place.geometry.location,
//         icon: iconImage,
//     });
    
//     //opens the infoWindow to show name and other information
//     google.maps.event.addDomListener(marker, 'click', function() {
//         infoWindow.setContent(place.name);
//         infoWindow.open(map, this);
//     //   console.log(place);

//     });
//     return marker;
// }
//clears the markers when the map is moved so we don't keep leaving more and more markers
function clearResults(markers) {
    for (let m in markers) {
        markers[m].setMap(null)
    }
    markers = []
}

google.maps.event.addDomListener(window, 'load', initialize);

