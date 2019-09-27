


var config = {
    geniusKEY: 'c73834d65amsh116e415b6adfba2p14b76cjsnf234503f539a',
    seatGeekKEY: 'MTg1NzgxOTZ8MTU2OTM0NDQ1NS44'

} 

// api key for the genius API
var geniusAPIKey = config.geniusKEY;



$(".searchForm").on("keydown", function (e) {
    if (e.which == 13) {
        e.preventDefault();
        API_Search();
    }

});

$('#searchButton').on('click', function(){

    API_Search();

})

function API_Search(){


    var artistNameSearch = $('#artistNameForm').val().trim();
    var songNameSearch = $('#songNameForm').val().trim();
    var albumNameSearch = $('#albumNameForm').val().trim();
    var yearNameSearch = $('#yearNameForm').val().trim();

    // var lyricsSearch = $('#lyricsNameForm').val().trim();
    // var membersSearch = $('#membersNameForm').val().trim();


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
        var artist_ID = response.response.hits[0].result.primary_artist.id;
        var artist_URL = response.response.hits[0].result.primary_artist.url;
        var top_Song = response.response.hits[0].result.stats.pageviews;


        var artist_Image = response.response.hits[0].result.primary_artist.image_url;

        console.log(artist_Image);


        // var genreResponse = response;

        // display genre of artist
        var newDiv = $('<div>');

        // $('#resultsDiv').text('hellloooo');;
        var nameUprCase = artistNameSearch.toUpperCase();
        $("#resultsArtistName").text(nameUprCase);
        $("#artistImg").attr("src", artist_Image);
        $("#resultsDiv").fadeIn(1000);


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


};


