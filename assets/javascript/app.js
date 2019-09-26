

// api key for the genius API
var geniusAPIKey = config.geniusKEY;






var artistName = $('#searchButton').on('click', function () {

    var artistNameSearch = $('#artistNameForm').val().trim();
    console.log(artistNameSearch);


    // basic search url, can be changed to search by songs, artist songs etc
    var GeniusQueryURL = 'https://genius.p.rapidapi.com/search?q=' + artistNameSearch;


    // ajax call to genius api
    // must include headers 'x-rapidapi-host' and 'x-rapidapi-key' 
    // since we are using the rapidapi hosting service
    $.ajax({
        url: GeniusQueryURL,
        method: "GET",
        headers: {
            "x-rapidapi-host": "genius.p.rapidapi.com",
            "x-rapidapi-key": geniusAPIKey
        }
    }).then(function (response) {

        console.log(response.response);

        // in genius each artist has a unique ID that you need to grab
        // if you want to search for bio & other related info about the artist
        // you can't specifically access that info with the basic search api
        var artist_URL = response.response.hits[0].result.primary_artist.url;

        var artist_Image = response.response.hits[0].result.primary_artist.image_url;

        console.log(artist_Image);


        // var genreResponse = response;

        // display genre of artist
        var newDiv = $('<div>');

        $('#resultsDiv').append(newDiv);
        // $('#resultsDiv').text('hellloooo');
        newDiv.text('helloooooo');
        newDiv.html('<a href='+artist_URL+'></a>');

        // $('#resultsDiv').append('<img src='+artist_Image+'</img>');


    });


    // var Search = "dave grohl";



    var seatGeekKEY = config.seatGeekKEY;

    var queryURL = "https://api.seatgeek.com/2/performers?q=" + artistNameSearch + "&client_id=" + seatGeekKEY;


    // seat geek API call
    $.ajax({
        url: queryURL,
        method: "GET",

    }).then(function (response) {

        // console.log(response)




    });


});