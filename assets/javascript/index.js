

$(document).ready(function () {

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
            database.ref("users/" + username).set({
                key: username,
                isOnline: true,
            })
            // Open the main application...
            window.location.assign("soundSparrow.html") 
            }

            else {

            }
        }
    })
    
    sessionStorage.setItem("rowNum", "1");
    
    database.ref("/searches").limitToLast(3).on("child_added", function(childSnap) {
        var rowNumStr = sessionStorage.getItem("rowNum");
        console.log(rowNumStr);
        var rowNumInt = parseInt(rowNumStr);
        console.log(rowNumInt);

        if (rowNumInt < 4){
            let latestSearch = childSnap.val().artistName;
            let newTr = $("<tr class='added" + rowNumInt + "'>");
            let newTdNum = $("<td class='added td" + rowNumInt + "'>" + rowNumInt + "</td>")
            let newTdName = $("<td class='added td" + rowNumInt + "'>" + latestSearch + "</td>");
            newTdName.prependTo(newTr);
            newTdNum.prependTo(newTr);
            newTr.prependTo("tbody");
            rowNumInt++;
            sessionStorage.setItem("rowNum", rowNumInt);
        }
        else {
            $(".added").remove();
            sessionStorage.setItem("rowNum", "1");
        }
    })
});
