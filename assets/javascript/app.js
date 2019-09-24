

// api key for the genius API
var APIKEY = config.APIKEY;



// sample artist search, change to user input later on
var Search = "dave grohl";

// basic search url, can be changed to search by songs, artist songs etc
var GeniusQueryURL =  'https://genius.p.rapidapi.com/search?q='+ Search;

// ajax call to genius api
// must include headers 'x-rapidapi-host' and 'x-rapidapi-key' 
// since we are using the rapidapi hosting service
$.ajax({
    url: GeniusQueryURL,
    method: "GET",
    headers: {
        "x-rapidapi-host": "genius.p.rapidapi.com",
		"x-rapidapi-key": APIKEY
    }
}).then(function(response){

    console.log(response.response.hits[0]);

    // in genius each artist has a unique ID that you need to grab
    // if you want to search for bio & other related info about the artist
    // you can't specifically access that info with the basic search api
    var artist_ID = response.response.hits[0].result.primary_artist.id;
    console.log(artist_ID);


});


var Search = "dave grohl";

var myKEY = config.seatGeekKEY;

var queryURL = "https://api.seatgeek.com/2/performers?q="+Search+"&client_id="+myKEY;



// seat geek API call
$.ajax({
    url: queryURL,
    method: "GET",
    
}).then(function(response){

    console.log(response)


});

