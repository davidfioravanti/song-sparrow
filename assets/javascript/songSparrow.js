
$(document).ready(function () {
    
/* =================================================================
======================== FIREBASE CONFIG ===========================
================================================================= */


  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyCeGNMI-uJ6gVv7zoJIrSa-RU2G6UiIfk8",
    authDomain: "project-one-153f1.firebaseapp.com",
    databaseURL: "https://project-one-153f1.firebaseio.com",
    projectId: "project-one-153f1",
    storageBucket: "",
    messagingSenderId: "947287095403",
    appId: "1:947287095403:web:c5d4b6022e2fdd90d6592e"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

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


    // When the user presses a key while inside the chat input area...
    $("#chatInput").on("keydown", function (e) {

        // If the button pressed was "enter"...
        if (e.which == 13) {
            e.preventDefault();

        // Store the users submitted message...
        var chatMessage = $("#chatInput").val().trim();
        console.log(chatMessage);

            if (chatMessage == "") {
                // Dynamically create the appropriate error modal...
                $("#modalTitle").text("UH-OH!");
                $("#modalBody").empty();
                var modalText = $("<p class='modalText'>");
                modalText.text("YOUR CHAT MESSAGE CAN'T BE EMPTY!");
                // Append created elements to the modal...
                modalText.appendTo($("#modalBody"));
                // Display the modal...
                $("#responseModal").css("display", "block");
            }

            // If the user's message is NOT empty (contains at least one char.)...
            else if (chatMessage !== "") {
                // Create a new <p> tag...
                var modalText = $("<p id='chatText'>");
                // Change new <p> tag's html to (username: + chatMessage)...
                modalText.html(username + ": &nbsp; &nbsp;" + chatMessage);
                // PREPEND the new <p> tag to the chat window...
                modalText.prependTo($("#globalChat"));
                // Clear the chat input form...
                clearChatForms();
            }
        }
    })

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
        window.open ("chat.html",
        "Song Sparrow Chat",
        "menubar=0,resizable=0,width=600,height=600");
    })


    // When the user presses a key inside of a search form...
    $(".searchForm").on("keydown", function (e) {
        if (e.which == 13) {
            e.preventDefault();
            search();
        }
    })

    // When the user clicks a close button on a response modal...
    $(".close").on("click", function() {
        $("#responseModal").css("display", "none");
    })

    // When the user clicks the about button in footer...
    $("#aboutButton").on("click", function () {
        $("#aboutModal").css("display", "block");

        // When the user clicks the close button...
        $("#closeButton").on("click", function(){
            $("#aboutModal").css("display", "none");
        })
    })

    // When the user clicks the favorites button in footer...
    $("#favoritesButton").on("click", function () {
        $("#favoritesModal").css("display", "block");

        // When the user clicks the close button...
        $("#closeButton2").on("click", function(){
            $("#favoritesModal").css("display", "none");
        })
    })
});


function search() {
    // If artistNameForm is not empty...
    if ($("#artistNameForm").val() !== "") {
        var artistName = $("#artistNameForm").val().trim();
        console.log("===========================")
        console.log("SEARCH STARTED: ")
        console.log("ARTIST NAME: " + artistName);
        geniusAPIFirstCall();
        
    }
    // If artistsNameForm has at least 1 character...
    else {
        $("#modalTitle").text("ERROR!");
        $("#modalBody").empty();
        var modalText = $("<p class='modalText'>");
        modalText.text("ENTER AN ARTIST NAME TO SEARCH FOR!");
        modalText.appendTo($("#modalBody"));
        $("#responseModal").css("display", "block");
    }
}

function addToFavorites() {
}

function clearSearchForms() {
    $(".searchForm").val("");
}

function clearChatForms() {
    $("#chatInput").val("");
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
    var songNameSearch = $('#songNameForm').val().trim();
    var albumNameSearch = $('#albumNameForm').val().trim();
    var yearNameSearch = $('#yearNameForm').val().trim();

    var GeniusQueryURL = 'https://genius.p.rapidapi.com/search?q=' + artistNameSearch;

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

        console.log(response.response);

        var artist_ID = response.response.hits[0].result.primary_artist.id;
        var artist_URL = response.response.hits[0].result.primary_artist.url;
        var artist_Image = response.response.hits[0].result.primary_artist.image_url;

        // $('#resultsDiv').text('hellloooo');;
        var nameUprCase = artistNameSearch.toUpperCase();
        $("#resultsArtistName").text(nameUprCase);
        $("#artistURL").attr("href", artist_URL);
        $("#artistImg").attr("src", artist_Image);

        /* =================================================
        ====================================================
        HERE, WE STORE THE ARTIST ID IN ORDER TO PERFORM A
        SECOND AJAX CALL TO GET A MORE DETAILED RESPONSE
        OBJECT FROM GENIUS API. NOW WE CAN USE IT'S OBJECT.
        ====================================================
        ================================================= */

        sessionStorage.setItem("artistId", artist_ID);
        geniusAPISecondCall();
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
    console.log(response.response);
    

    // Show the populated results div!
    $("#resultsDiv").fadeIn(1000);
    })
}
$("#resultsminbtn").on("click", function(){
    $("#resultsDiv").css("display", "")
    if($(this).text() === "+"){
        $("#resultsminbtn").text("-")
    } else {
        $("#resultsminbtn").text("+")
    }
    })
