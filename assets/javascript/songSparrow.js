
$(document).ready(function () {

    
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


    // Grab the username entered from Local Storage...
    let username = localStorage.getItem("username");
    // Change the username used for site chat to that username...
    $("#username").text(username);

    // Fade in speech bubble...
    setTimeout(function() {
        $("#instructions").css("opacity", "1");
        setTimeout(function() {
            // Fade out speech bubble...
            $("#instructions").css("opacity" , "0");
            // Fade in chat window...
            $("#chatDiv").css("opacity", "1");
        }, 5000);
    });

    // When the user clicks the Song Sparrow Logo...
    $("#songSparrowLogo").on("click", function () {
        // Play a bird sound...
        var birdSound = new Audio("assets/audio/birdSound.mp3");
        birdSound.volume = .1;
        birdSound.play();
    })


    // When the user presses a key while inside the chat input area...
    $("#chatInput").on("keydown", function (e) {

        // If the button pressed was "enter"...
        if (e.which == 13) {
            // Prevent page refresh...
            e.preventDefault();

        // Store the users submitted message...
        var chatMessage = $("#chatInput").val().trim();
        console.log(chatMessage);

            // If the users message was empty...
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
        // Hide the response modal...
        $("#responseModal").css("display", "none");
    })

    // When the user clicks the about button in footer...
    $("#aboutButton").on("click", function () {

        // Show the about modal...
        $("#aboutModal").css("display", "block");

        // When the user clicks the close button...
        $("#closeButton").on("click", function(){
            // Hide the about modal...
            $("#aboutModal").css("display", "none");
        })
    })

    // When the user clicks the favorites button in footer...
    $("#favoritesButton").on("click", function () {

        // Show the favorites modal...
        $("#favoritesModal").css("display", "block");

        // When the user clicks the close button...
        $("#closeButton2").on("click", function(){
            // Hide the favorites modal...
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
        clearSearchForms();
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