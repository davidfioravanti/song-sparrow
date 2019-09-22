$(document).ready(function () {

    // Declare username var to hold user data...
    let username;

    // Player Song Sparrow theme music...
    var songSparrowTheme = new Audio("assets/audio/songSparrowTheme.mp3");
    songSparrowTheme.volume = .25;
    songSparrowTheme.play();

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

            // Store the value of #usernameForm
            username = $("#usernameForm").val().trim();
            // Clear the form
            $("#usernameForm").val("");
            console.log(username);

            // Open the main application...
            window.location.assign("soundSparrow.html") 
        }
    })
});