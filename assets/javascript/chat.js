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

/* =================================================================
========================= FIREBASE LOGIC ===========================
================================================================= */

// Grab the username entered from Local Storage...
let username = localStorage.getItem("username");
// Change the username used for site chat to that username...
$("#username").text(username);

var database = firebase.database();
var connectionsRef = database.ref("/users/(inPopoutChat)/");
var messagesRef = database
  .ref("/messages")
  .child("asd")
  .limitToLast(5);
// console.log(messagesRef)
var connectedRef = database.ref(".info/connected/");

// When the client's connection state changes...
connectedRef.on("value", function(snap) {
  // If they are connected..
  if (snap.val()) {
    // Add user to the connections list.
    var con = connectionsRef.push({
      username
    });
    // Remove user from the connection list when they disconnect.
    con.onDisconnect().remove();
  }
});

  // Create a timestamp to include in user message...
  var date = new Date();
  const unixTime = $("unixtime").val();
  const currentTime = moment(unixTime).format("h:mm a");

  var timestamp =
    date.getUTCMonth() +
    "/" +
    date.getUTCDay() +
    "/" +
    date.getUTCFullYear() +
    " - " +
    currentTime;
  /* =================================================================
    ====================================================================
    CURRENTLY THE FOLLOWING CODE DISPLAYS MESSAGES **TWICE** INSTEAD OF
    JUST SHOWING THEM ONCE. LOOKING FOR A SOLUTION.
    ====================================================================
    ================================================================= */

  database.ref("/messages").limitToLast(10).on("child_added", function(childSnap) {
    // console.log(childSnap.val().message)
    console.log("i");
    console.log(childSnap.val());
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
      console.log(newMessage);
    }
  });

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
        /* ==================================================================
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

  // If the user clicks the "HTML MARKDOWN SUPPORTED" button.
  $("#chatNote").on("click", function() {
    // Print out info LOCALLY in the chat window...
    var supportText1 = $("<span id='chatText'>");
    var supportText2 = $("<p id='chatText'> <br><br>");
    $("#modalTitle").text("CHAT: Supported Markdown");
    supportText1.text(
      "Supported Tags: h1, h2, etc... a, p, br, hr, u, b, i, u, li, ul"
    );
    supportText2.text(
      "Supported Classes: .small .big .red .blue .green .yellow .glow .rotate"
    );
    supportText1.prependTo($("#globalChat"));
    supportText2.prependTo($("#globalChat"));
  });

  // Clear all forms...
  function clearForms() {
    $("#chatInput").val("");
  }

