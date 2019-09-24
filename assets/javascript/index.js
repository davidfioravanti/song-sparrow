

$(document).ready(function () {

    var firebaseConfig = {
        apiKey: "AIzaSyBOsUXGIfG_aTH7TvqmOayFAWs_tAXCnhk",
        authDomain: "song-sparrow-84a16.firebaseapp.com",
        databaseURL: "https://song-sparrow-84a16.firebaseio.com",
        projectId: "song-sparrow-84a16",
        storageBucket: "",
        messagingSenderId: "361838930394",
        appId: "1:361838930394:web:98fd953fcceed5641e38e3"
      };
      // Initialize Firebase
      firebase.initializeApp(firebaseConfig);


    // Player Song Sparrow theme music...
    // var songSparrowTheme = new Audio("assets/audio/songSparrowTheme.mp3");
    // songSparrowTheme.volume = .25;
    // songSparrowTheme.play();


    // Declare username var to hold user data...
    var username;
    // Check Local Storage for an existing username...
    var checkNameExists = localStorage.getItem("username");
    // If none exists...
    if (checkNameExists !== "") {
        // Populate the username form with the retrieved data...
        username = localStorage.getItem("username");
        $("#usernameForm").val(username);
    }

    // Display and subseq. hide the speech bubble...
    setTimeout(function() {
        $("#speechBubble").css("opacity", "1");
        setTimeout(function() {
            $("#speechBubble").css("opacity", "0");
        }, 4000);
    }, 2000);


    // If the user clicks the songSparrowLogo...
    $("#songSparrowLogo").on("click", function () {
        
            // Play a bird sound...
            var birdSound = new Audio("assets/audio/birdSound.mp3");
            birdSound.volume = .1;
            birdSound.play();

            // Display speech bubble...
            $("#speechBubble").css("opacity", "1");
            setTimeout(function() {
                $("#speechBubble").css("opacity", "0");
            }, 2000);
    })

    // When the user presses the "enter" key to submit a form...
    $(document).on("keydown", function (e) {
        
        if (e.which == 13) {
            e.preventDefault();
            username = $("#usernameForm").val().trim();

            if (username !== "") {
            // Clear the form
            $("#usernameForm").val("");
            console.log(username);
            localStorage.setItem('username', username);

            // Open the main application...
            window.location.assign("soundSparrow.html") 
            }

            else {

            }
        }
    })
});
