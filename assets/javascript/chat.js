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

    // Declare username var to hold user data...
    let username = localStorage.getItem("username");
    $("#username").text(username);

    // When the user presses a key inside the chat input...
    $("#chatInput").on("keydown", function (e) {

        // If the button pressed was "enter"...
        if (e.which == 13) {
            // Prevent page refresh...
            e.preventDefault();

        // Store the users submitted message...
        var chatMessage = $("#chatInput").val().trim();
        console.log(chatMessage);

            // If the chat message is empty...
            if (chatMessage == "") {
                // DO NOTHING
            }
            else {
                // Create a new <p> tag...
                var modalText = $("<p id='chatText'>");
                // Set the new <p>'s html to (username: + chatMessage)...
                modalText.html(username + ": &nbsp; &nbsp;" + chatMessage);
                // Prepend the new <p> to the chat window...
                modalText.prependTo($("#globalChat"));
                // Clear all forms...
                clearForms();
            }
        }
    })

    // If the user clicks the "HTML MARKDOWN SUPPORTED" button.
    $("#chatNote").on("click", function() {
        // Print out info LOCALLY in the chat window...
        var supportText1 = $("<span id='chatText'>");
        var supportText2 = $("<p id='chatText'> <br><br>");
        $("#modalTitle").text("CHAT: Supported Markdown");
        supportText1.text("Supported Tags: h1, h2, etc... a, p, br, hr, u, b, i, u, li, ul");
        supportText2.text("Supported Classes: .small .big .red .blue .green .yellow .glow .rotate")
        supportText1.prependTo($("#globalChat"));
        supportText2.prependTo($("#globalChat"));
    })

// Clear all forms...
function clearForms() {
    $("#chatInput").val("");
    console.log(timeLimit);
}
});