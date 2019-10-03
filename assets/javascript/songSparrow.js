
$(document).ready(function () {
    
/* =================================================================
======================== FIREBASE CONFIG ===========================
================================================================= */

  var firebaseConfig = {
    apiKey: "AIzaSyA-boyJhILCEE5YejxDlFIhU37LYe-IXq8",
    authDomain: "song-sparrow-app-ef307.firebaseapp.com",
    databaseURL: "https://song-sparrow-app-ef307.firebaseio.com",
    projectId: "song-sparrow-app-ef307",
    storageBucket: "",
    messagingSenderId: "233980157165",
    appId: "1:233980157165:web:d15eacb9f1afb5022440e4"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  var database = firebase.database();
  var database = firebase.database();
  var connectionsRef = database.ref("/users/(connected)/");
  // console.log(messagesRef)
  var connectedRef = database.ref(".info/connected/");
  var numVisits = localStorage.getItem("numVisits");

  if (numVisits) {
      var getVisits = parseInt(localStorage.getItem("numVisits"));
      console.log("PREV. NUMBER OF SITE VISITS: " + getVisits);
      getVisits++;
      localStorage.setItem("numVisits", getVisits);
      console.log("# OF SITE VISITS: " + getVisits);
      numVisits = getVisits;
  }
  else {
      localStorage.setItem("numVisits", "1")
      var getVisitsNum = localStorage.getItem("numVisits");
      console.log("FIRST VISIT: " + getVisitsNum);
      numVisits = 1;   
  }

  sessionStorage.setItem("rowNum", "3");

    // When the client's connection state changes...
    connectedRef.on("value", function(snap) {

        // If they are connected..
        if (snap.val()) {
    
        // Add user to the connections list.
        var con = connectionsRef.push({
            username,
        })
        // Remove user from the connection list when they disconnect.
        con.onDisconnect().remove()
        }
    })

/* =================================================================
======================== ANIMATION/SOUNDS ==========================
================================================================= */

    // Fade in speech bubble...
    setTimeout(function() {
        $("#instructions").css("opacity", "1");
        setTimeout(function() {
            // Fade out speech bubble...
            $("#instructions").css("opacity" , "0");
            // Fade in chat window...
            $("#chatDiv").css("opacity", "1");
        }, 2000);
    });

    // When the user clicks the Song Sparrow Logo...
    $("#songSparrowLogo").on("click", function () {
        // Play a bird sound...
        var birdSound = new Audio("assets/audio/birdSound.mp3");
        birdSound.volume = .1;
        birdSound.play();
    })

/* =================================================================
========================= MAIN APP LOGIC ===========================
================================================================= */

    // Grab the username entered from Local Storage...
    let username = localStorage.getItem("username");
    // Change the username used for site chat to that username...
    $("#username").text(username);

/* =================================================================
========================= LOGIN GREETING ===========================
================================================================= */

    if (numVisits % 3 === 0 || numVisits === 1) {
        $("#loginTitle").html("<h2 id='greeting' class='glow'>WELCOME BACK " + username + "!</h2>");
        $("#loginBody").html("<h4>SONG SPARROW USERS HAVE BEEN SEARCHING FOR: </h4><br>");
        database.ref("/searches").limitToLast(3).on("child_added", function(loginSnap) {
        var newSearchDiv = $("<div id='newSearchDiv'>")
        var loginSearch = loginSnap.val().searchName;
        var newLoginSearch = $("<p class='loginSearch'>" + loginSearch + "</p><br>" +
        "<a href='" + loginSnap.val().searchURL + "' target='_blank' rel='noopener'>" +
        "<img class='loginImg' src='" + loginSnap.val().searchImg + "'></a>");
        newLoginSearch.appendTo(newSearchDiv);
        newSearchDiv.appendTo("#loginBody");
        })
        $("#loginModal").fadeIn();
        $("#loginClose").on("click", function() {
            $("#loginModal").fadeOut();
            setTimeout(() => {
                $("#loginModal").remove();
            }, 1000);
        })
    }

/* =================================================================
========================= SEARCHES TABLE ===========================
================================================================= */

    // UPDATES THE LATEST SEARCHES TABLE WITH RESULTS!
    database.ref("/searches").limitToLast(3).on("child_added", function(childSnap) {
        var rowNumStr = sessionStorage.getItem("rowNum");
        // console.log(rowNumStr);
        var rowNumInt = parseInt(rowNumStr);
        // console.log(rowNumInt);

        // IF THE NUMBER OF ROWS DISPLAYED IS GREATER THAN 0...
        if (rowNumInt > 0){

            // CREATE A NEW ROW!
            let latestSearch = childSnap.val().searchName;
            let latestURL = childSnap.val().searchURL;
            let newTr = $("<tr class='added" + rowNumInt + "'>");
            let newTdNum = $("<td class='added td" + rowNumInt + "'>" + rowNumInt + "</td>")
            let newTdName = $("<a class='added td"+ rowNumInt + "' href='" + latestURL + "'><td class='added td" + rowNumInt + "'>" + latestSearch + "</td></a>");
            newTdName.prependTo(newTr);
            newTdNum.prependTo(newTr);
            newTr.prependTo("tbody");
            rowNumInt--;
            sessionStorage.setItem("rowNum", rowNumInt);
        }
        else {
            $(".added").remove();
            sessionStorage.setItem("rowNum", "3");

            let latestSearch = childSnap.val().searchName;
            let newTr = $("<tr class='added" + rowNumInt + "'>");
            let newTdNum = $("<td class='added td" + rowNumInt + "'>" + rowNumInt + "</td>")
            let newTdName = $("<td class='added td" + rowNumInt + "'>" + latestSearch + "</td>");
            newTdName.prependTo(newTr);
            newTdNum.prependTo(newTr);
            newTr.prependTo("tbody");
            rowNumInt--;
            sessionStorage.setItem("rowNum", rowNumInt);
        }
    })

/* =================================================================
========================= USER FAVORITES ===========================
================================================================= */

    database.ref("/users/" + username + "/(favorites)").on("child_added", function(favSnap) {
        // console.log(favSnap);
        var favRow = $("<div id='newFavDiv' class='text-center newFav'>");
        var favCol = $("<div id='newFavCol'>");
        var favBr = $("<br>");
        var favName = $("<p id='newFavName' class='col-12'>" + favSnap.val().name + "</p>");
        var favImg = $("<a id='newFavLink' target='_blank' rel='noopener' href='" + favSnap.val().url + "'>" + 
        "<img id='newFavImg' class='col-12' src='" + favSnap.val().img + "'>" + "</a>");
        favRow.appendTo($("#favoritesPlaceholder"));
        favCol.appendTo(favRow);
        favName.appendTo(favCol);
        favBr.appendTo(favName)
        favImg.appendTo(favName);
    })

    database.ref("/messages").limitToLast(10).on("child_added", function(childSnap) {
        // console.log(childSnap.val().message)
        // console.log("i");
        // console.log(childSnap.val());
        let Username = childSnap.val().username;
        let Message = childSnap.val().message;
        let Timestamp = childSnap.val().timestamp;
        let invalidTag = "script";
        let invalidCSS = "style";
        if (Message.includes(invalidTag) || Message.includes(invalidCSS)) {
          // DO NOTHING!
        } else {
          var newMessage = $(
            "<div class='row messageDiv'>" +
              "<span class='col-12 messageUsername'>" +
              Username +
              " : " +
              "</span><span class='col-12 messageMessage'>" +
              Message +
              "<br>" +
              "</span><span class='col-12 messageTimestamp'>" +
              Timestamp +
              "</span>"
          );
          newMessage.prependTo("#globalChat");
        // console.log(newMessage);
        }
      });

    // Create a timestamp to include in user message...
    const unixTime = $("unixtime").val();
    const date = moment(unixTime).format("MM/DD/YY");
    const currentTime = moment(unixTime).format("h:mm A");

    var timestamp = currentTime + " - " + date ;

/* =================================================================
======================== EVENT LISTENERS ===========================
================================================================= */

    // When the user presses a key inside the chat input...
    $("#chatInput").on("keydown", function(e) {
        // If the button pressed was "enter"...
        if (e.which == 13) {
        // Prevent page refresh...
        e.preventDefault();

        // Store the users submitted message...
        var chatMessage = $("#chatInput")
            .val()
            .trim();
        var invalidTag = "<script>";
        let invalidCSS = "style";

        // If the chat message is empty...
        if (chatMessage == "") {
            // DO NOTHING
        }
        // If the chat message contained a script...
        else if (chatMessage.includes(invalidTag)) {
            alert("NICE TRY! NO JAVASCRIPT FOR YOU!");
            clearForms();
        }
        // If the chat message contained css...
        else if (chatMessage.includes(invalidCSS)) {
            alert("NO STYLE FOR YOU!");
            clearForms();
        } else {
            /* ======================================================================
                =====================================================================
                THIS BLOCK IS ONLY FOR TESTING CHAT OUTPUT! NOT FOR LIVE-SITE!!!!
                =====================================================================
                ================================================================== */

            // // Create a new <p> tag...
            // var modalText = $("<p id='chatText'>");
            // // Set the new <p>'s html to (username: + chatMessage)...
            // modalText.html(username + ": &nbsp; &nbsp;" + chatMessage);
            // // Prepend the new <p> to the chat window...
            // modalText.prependTo($("#globalChat"));
            // // Clear all forms...

            /* ===================================================================
                ======================================================================
                ======================================================================
                =================================================================== */

            database.ref("/messages").push({
            username: username,
            message: chatMessage,
            timestamp: timestamp
            });
            clearForms();
        }
        }
    });
        // Clear all forms...
        function clearForms() {
            $("#chatInput").val("");
        }

    // When the user clicks on the HTML Markdown Supported Button...
    $("#chatNote").on("click", function() {
        // Print out supported markdown into the chat window...
        var supportText1 = $("<span id='chatText'>");
        var supportText2 = $("<p id='chatText'> <br><br>");
        $("#modalTitle").text("CHAT: Supported Markdown");
        supportText1.text("Supported Tags: h1, h2, etc... a, p, br, hr, u, b, i, u, li, ul");
        supportText2.text("Supported Classes: .small .big .red .blue .green .yellow .glow .rotate")
        supportText1.prependTo($("#globalChat"));
        supportText2.prependTo($("#globalChat"));
    })

    // When the user clicks the POPOUT CHAT BUTTON...
    $("#popOutChat").on("click", function() {
        // Open a new "600x600" window, and open chat.html ...
        window.open ("popOutChat.html",
        "Song Sparrow Chat",
        "menubar=0,resizable=0,width=600,height=600");
    })

    // When the user clicks the seach button...
    $("#searchButton").on("click", function (){
        $("#resultsmindiv").css("display", "block")
        let artistName = $("#artistNameForm").val().trim().toUpperCase();
        if (artistName !== "") {
            search();
        }
        else {
            searchErrorEmpty();
        }
    })

    // When the user presses a key inside of a search form...
    $(".searchForm").on("keydown", function (e) {
        if (e.which == 13) {
            $("#resultsmindiv").css("display", "block")
            e.preventDefault();
            let artistName = $("#artistNameForm").val().trim().toUpperCase();
            if (artistName !== "") {
                search();
            }
            else {
                searchErrorEmpty();
            }
        }
    })

    // When the user clicks a close button on a response modal...
    $(".close").on("click", function() {
        $("#responseModal").css("display", "none");
    })

    // When the user clicks the close search button...
    $("#searchClose").on("click", function() {
        $("#resultsmindiv").css("display", "none");
        $("#resultsDiv").css("display", "none");
    })
    // When the user clicks the about button in footer...
    $("#aboutButton").on("click", function () {
        $("#aboutModal").css("display", "block");

        // When the user clicks the close button...
        $("#closeButton").on("click", function(){
            $("#aboutModal").css("display", "none");
        })
    })

    $("#favoriteButton").on("click", function(){
        var username =localStorage.getItem("username");
        let favoriteName = sessionStorage.getItem("tempName");
        let favoriteImg = $("#artistImg").attr("src");
        let favoriteURL = $("#artistURL").attr("href");
    
        database.ref("/users/" + username + "/(favorites)").push({
            name: favoriteName,
            img: favoriteImg,
            url: favoriteURL
          });
    })

    // When the user clicks the favorites button in footer...
    $("#favoritesButton").on("click", function () {
        $("#favoritesModal").css("display", "block");
        
        $("#favoritesReset").on("mouseover mouseout", function() {
            $("#warningText").toggle();
        });

        $("#favoritesReset").on("dblclick", function() {
            var username = localStorage.getItem("username");
            $(".newFav").remove();
            database.ref("/users/" + username + "/(favorites)").set({

            })
        })

        // When the user clicks the close button...
        $("#closeButton2").on("click", function(){
            $("#favoritesModal").css("display", "none");
        });
    })

    // When the user clicks the min/max button.
    $("#resultsminbtn").on("click", function(){
        $("#resultsDiv").css("display", "")
        if($(this).text() === "+"){
            $("#resultsminbtn").text("-")
        } else {
            $("#resultsminbtn").text("+")
        }
    });
});

function search() {

    $("#resultsDiv").css("display", "none");
    $("#seatGeekRow").css("display", "none");
    $("#eventImage").remove();
    $('#songsDiv').remove();
    $("#seatGeekResultsEventDate").text("");
    $("#seatGeekResultsEventName").text("");
    $("#seatGeekResultsEventCity").text("");
    $("#seatGeekResultsEventVenue").text("");
    $("#seatGeekResultsEventAddress").text("");
    $("#seatGeekResultsEventPrice").text("");
    $("#findEventButton").css("display", "none");
    // If artistNameForm is not empty...
    if ($("#artistNameForm").val() !== "") {
        var artistName = $("#artistNameForm").val().trim();
        console.log("===========================")
        console.log("SEARCH STARTED: ")
        console.log("ARTIST NAME: " + artistName);
        geniusAPIFirstCall();
    }
    // If artistsNameForm is EMPTY!
    else {
        searchErrorEmpty();
    }
}

function clearSearchForms() {
    $(".searchForm").val("");
}

function clearChatForms() {
    $("#chatInput").val("");
}

function searchErrorEmpty() {
    $("#modalTitle").text("ERROR!");
    $("#modalBody").empty();
    var modalText = $("<p class='modalText'>");
    modalText.text("ENTER AN ARTIST NAME TO SEARCH FOR!");
    modalText.appendTo($("#modalBody"));
    $("#responseModal").css("display", "block");
}

function geniusAPIFirstCall() {

/* =================================================================
======================= GENIUS API CONFIG ==========================
================================================================= */

    var config = {
        geniusKEY: 'c73834d65amsh116e415b6adfba2p14b76cjsnf234503f539a',
        seatGeekKEY: 'MTg1NzgxOTZ8MTU2OTM0NDQ1NS44'
    } 
    var geniusAPIKey = config.geniusKEY;

    var artistNameSearch = $('#artistNameForm').val().trim();
    // var songNameSearch = $('#songNameForm').val().trim();
    // var albumNameSearch = $('#albumNameForm').val().trim();
    // var yearNameSearch = $('#yearNameForm').val().trim();

    var GeniusQueryURL = 'https://genius.p.rapidapi.com/search?q=' + artistNameSearch;

    var topSongs = [];

/* =================================================================
====================== GENIUS AJAX CALL 1 ==========================
================================================================= */

    $.ajax({
        url: GeniusQueryURL,
        method: "GET",
        headers: {
            "x-rapidapi-host": "genius.p.rapidapi.com",
            "x-rapidapi-key": geniusAPIKey
        }
    }).then(function (response) {

        // console.log(response.response);

        var artist_ID = response.response.hits[0].result.primary_artist.id;
        var artist_URL = response.response.hits[0].result.primary_artist.url;
        var artist_Image = response.response.hits[0].result.primary_artist.image_url;

        var altImg1 = response.response.hits[1].result.primary_artist.image_url;
        var altURL1 = response.response.hits[1].result.primary_artist.url;
        var altImg2 = response.response.hits[2].result.primary_artist.image_url;
        var altURL2 = response.response.hits[2].result.primary_artist.url;
        var altImg3 = response.response.hits[3].result.primary_artist.image_url;
        var altURL3 = response.response.hits[3].result.primary_artist.url;
        var altImg4 = response.response.hits[4].result.primary_artist.image_url;
        var altURL4 = response.response.hits[4].result.primary_artist.url;
        var altImg5 = response.response.hits[5].result.primary_artist.image_url;
        var altURL5 = response.response.hits[5].result.primary_artist.url;
        // $('#resultsDiv').text('hellloooo');;
        var nameUprCase = artistNameSearch.toUpperCase();
        $("#resultsArtistName").html("SEARCH FOR:<br> \"" + nameUprCase + "\"");
        $("#artistURL").attr("href", artist_URL);
        $("#artistImg").attr("src", artist_Image);

        $("#altImg1").attr("src", altImg1);
        $("#altURL1").attr("href", altURL1);
        $("#altImg2").attr("src", altImg2);
        $("#altURL2").attr("href", altURL2);
        $("#altImg3").attr("src", altImg3);
        $("#altURL3").attr("href", altURL3);
        $("#altImg4").attr("src", altImg4);
        $("#altURL4").attr("href", altURL4);
        $("#altImg5").attr("src", altImg5);
        $("#altURL5").attr("href", altURL5);

        /* =================================================
        ====================================================
        HERE, WE STORE THE ARTIST ID IN ORDER TO PERFORM A
        SECOND AJAX CALL TO GET A MORE DETAILED RESPONSE
        OBJECT FROM GENIUS API. NOW WE CAN USE IT'S OBJECT.
        ====================================================
        ================================================= */
        sessionStorage.setItem("artistName", artistNameSearch);
        sessionStorage.setItem("artistId", artist_ID);
        var newDiv = $("<div id='songsDiv'>");
        newDiv.appendTo(".artistSongs");
        // get top three hits and push to songList section under artistImg
        for (var i = 0; i < 3; i++) {
                var song = $('<p>');
                topSongs.push((response.response.hits[i].result.title).toUpperCase());
                song.append(topSongs[i]);
                $('#songsDiv').append(song);
                song.attr("id", "songTitle");
        };
        
        // ENSURES THE MAIN ARTIST IMAGE BELONGS TO THE ONE THE USER SEARCHED FOR.
        // var counter = 0;
        for (var i = 0; i < response.response.hits.length; i++) {

            var lowerCaseArtist = (response.response.hits[i].result.primary_artist.name).toLowerCase();
            // console.log(lowerCaseArtist);

            if (artistNameSearch.toLowerCase() === lowerCaseArtist) {
                console.log('FOUND ARTIST NAME: ' + response.response.hits[i].result.primary_artist.name);
                counter = i;

                var artist_URL = response.response.hits[i].result.primary_artist.url;
                var artist_Image = response.response.hits[i].result.primary_artist.image_url;
                var tempName = response.response.hits[i].result.primary_artist.name;
                sessionStorage.setItem("tempName", tempName);

                $("#artistURL").attr("href", artist_URL);
                $("#artistImg").attr("src", artist_Image);
                
            }
            else {
                var tempSearch = $("#artistNameForm").val().trim();
                sessionStorage.setItem("tempName", tempSearch);
            }
        };

        // STORE THE SEARCH IN FIREBASE! 
        var database = firebase.database();
        var SearchURL = $("#artistURL").attr("href");
        var SearchIMG = $("#artistImg").attr("src");
        database.ref("/searches").push({
            searchName: nameUprCase,
            searchURL: SearchURL,
            searchImg: SearchIMG,    
        })




    // console.log(topSongs);
        geniusAPISecondCall();
        seatGeekSecondAPICall();
    });
}

function geniusAPISecondCall() {

    // Re-declare the config...
    var config = {
        geniusKEY: 'c73834d65amsh116e415b6adfba2p14b76cjsnf234503f539a',
        seatGeekKEY: 'MTg1NzgxOTZ8MTU2OTM0NDQ1NS44'  
    } 
    var geniusAPIKey = config.geniusKEY;

/* =================================================================
====================== GENIUS AJAX CALL 2 ==========================
================================================================= */

    // Get the artist ID that was stored in first call...
    let artist_ID = sessionStorage.getItem("artistId");
    console.log("ARTIST ID:" + artist_ID);
    // Use it in a SECOND ajax call to get more information...
    var artistIDQueryURL = 'https://genius.p.rapidapi.com/search?q=' + artist_ID;
    
    $.ajax({
        url: artistIDQueryURL,
        method: "GET",
        headers: {
            "x-rapidapi-host": "genius.p.rapidapi.com",
            "x-rapidapi-key": geniusAPIKey
        }
    }).then(function (response) {
    console.log('-----Genius Second API call------')
    // console.log(response.response);
    

    // Show the populated results div!
    $("#resultsDiv").fadeIn(1000);

    // IF THE CONCERT BUTTON IS CHECKED....
    if($("#concertButton").is(":checked")){
        console.log("SEARCHING SEATGEEK!");
        seatGeekAPICall(); 
    }
    else{

    }
    })
}

/* =================================================================
====================== SEATGEEK AJAX CALL 2 ========================
================================================================= */

function seatGeekSecondAPICall() {
    var config = {
        geniusKEY: 'c73834d65amsh116e415b6adfba2p14b76cjsnf234503f539a',
        seatGeekKEY: 'MTg1NzgxOTZ8MTU2OTM0NDQ1NS44'
    } 

    let artistName = sessionStorage.getItem("artistName");
    var seatGeekKEY = config.seatGeekKEY;
    var queryURL = "https://api.seatgeek.com/2/events?q=" + artistName + "&client_id=" + seatGeekKEY;

    var genresArr = [];

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){

        console.log('--------- SeatGeekSecond API Call ---------')
        console.log(response);

        let geekResponse2 = response.events[0];
        
        // console.log(geekResponse2.performers[0].hasOwnProperty('genres')); // returns true
        // console.log(data.Genres);

        if (geekResponse2.hasOwnProperty("performers") && (geekResponse2.performers[0].hasOwnProperty("genres"))) {

            let data = {
                Performers: geekResponse2.performers[0],
                Genres: geekResponse2.performers[0].genres
            }

            for (var i = 0; i < data.Genres.length; i++) {
                genresArr.push(data.Genres[i].name);
            }

            console.log(genresArr);
            $('#genius').remove();

            var genresDiv = $('<div>');
            $('#attribution').text('ARTIST GENRES:');
            genresDiv.attr('id', 'artistGenres');


            $('#attribution').append(genresDiv);
            var newDiv = $('<div>');
            newDiv.attr('id', 'genresDiv');
            $('#attribution').append(newDiv);


            $.each(genresArr, function (index, value) {
                $('#attribution').append('<p id=genreTitle'+index+'>');
                $('#genreTitle'+index).css('font-size', '15px');
                $('#genreTitle'+index).text(value.toUpperCase());

                // break loop after 2 since our row only shows 3 songs we'll only want
                // 3 genres max
                return index < 2;
            });

        } else {

            // display the genius image in HTML/CSS
            console.log('OOPS! No Genres Listed');
            $('#artistGenres').append('<p id=attribution>POWERED BY GENIUS:</p>');
            $('#artistGenres').append('<img id=genius src=assets/images/genius.png>');
        }
    });
}

/* =================================================================
====================== SEATGEEK AJAX CALL 1 ========================
================================================================= */


function seatGeekAPICall() {

    var config = {
        geniusKEY: 'c73834d65amsh116e415b6adfba2p14b76cjsnf234503f539a',
        seatGeekKEY: 'MTg1NzgxOTZ8MTU2OTM0NDQ1NS44'
    } 

    let artistName = sessionStorage.getItem("artistName");
    var seatGeekKEY = config.seatGeekKEY;
    var queryURL = "https://api.seatgeek.com/2/events?q=" + artistName + "&client_id=" + seatGeekKEY;


    // seat geek API call
    $.ajax({
        url: queryURL,
        method: "GET",

    }).then(function (response) {
        // console.log(response)
        $("#seatGeekRow").css("display", "block");
        let geekResponse = response.events[0];
        let info = {
            eventName: geekResponse.short_title,
            eventDate: geekResponse.datetime_local,
            eventCity: geekResponse.venue.display_location,
            eventCountry: geekResponse.venue.country,
            eventVenue: geekResponse.venue.name,
            eventAddress: geekResponse.venue.address,
            eventLink: geekResponse.url,
            eventPrice: geekResponse.stats.average_price,
            eventImage: geekResponse.performers[0].image,
        }
        $("#findEventButton").css("display", "block");
        $("#seatGeekResultsEventDate").text(info.eventDate);
        $("#seatGeekResultsEventName").text(info.eventName);
        $("#seatGeekResultsEventCity").text(info.eventCity + " (" + info.eventCountry + ")");
        $("#seatGeekResultsEventVenue").text(info.eventVenue);
        $("#seatGeekResultsEventAddress").text(info.eventAddress);
        $("#seatGeekResultsEventPrice").text("AVG. PRICE: $" + info.eventPrice);
        $("#seatGeekResultsEventLink").attr("href", info.eventLink);
        var EventImage = $("<img id='eventImage' src='" + info.eventImage + "'>");
        EventImage.appendTo($("#seatGeekResultsEventLink"));
        var findEventLink = "https://seatgeek.com/" + artistName + "-tickets?oq=" + artistName;
        $("#findEventLink").attr("href", findEventLink);
})
}