

var APIKEY = "1c954bd7942243419f6f0f04f4e0abf9";
var queryURL = 'https://api.spotify.com/v1/artists/' + APIKEY + '/albums?album_type=SINGLE&offset=20&limit=1'

$.ajax({
    url: queryURL,
    method: "GET"
}).then(function(response){

    console.log(response);


});