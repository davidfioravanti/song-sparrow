
# SONG SPARROW (beta v0.1):
<h2>A website/web-app that searches for music info. </h2>
<hr>
<img class="logo" src="assets/images/songSparrowLogo.png">
<h2 class="centered"> Looking for music info on your favorite artists? <br>
<i>YOUR BIRD-BUDDY SONG SPARROW <br>
HAS YOUR BACK!</i></h2>
<hr>
<br>
<h2 class="centered">CHANGELOG:</h2>

<hr>
<h3>9/29/19:</h3>
<p>&nbsp;&nbsp;&nbsp;
Website is almost fully functional!</p>
<p>&nbsp;&nbsp;&nbsp;
Chat function is fully implemented and correctly displaying the 10 most recent messages. Included
various methods of form validation to prevent users from injecting script into the chat. HTML markdown
is fully supported in chat (IE: allows users to create html tags w/ pre-defined classes for styling)</p>
<p>&nbsp;&nbsp;&nbsp;
API integration is about 90% complete. As of now, the user can use the UI to query Genius for artist/song info
AND Seat Geek to find out events/ticket pricing. We're looking at implementing a few more features to enrich
the end-user experience.</p>
<p>&nbsp;&nbsp;&nbsp;
Firebase Real-Time Database is fully functional across the website. Currently it logs user searches/messages sent in the chat window/logs users. Looking into utilizing FBase for the "Favorites" feature of the website, instead of relying on local storage to hold favorites.
</p>
<p>

- David Fioravanti (Gainstrive)
<br>
<br>

<hr>

<hr>
<h3>9/23/19:</h3>
<p>&nbsp;&nbsp;&nbsp;
Added prototype files for the index, main-app, and popout-chat pages (including their respective css/js files).</p>
<p>&nbsp;&nbsp;&nbsp;
Site function is limited to basic navigation, but the file structure is set up to expand on functionality.</p>
<p>&nbsp;&nbsp;&nbsp;
A Real-Time Firebase database is set up and linked in each file, which will allow user interaction to be stored and for a primitive chat functionality</p>
<p>&nbsp;&nbsp;&nbsp;
For now, when the user enters a username on the index.html page, that name is put in local storage and used throughout the site for chat functionality</p>

- David Fioravanti (Gainstrive)
<br>
<br>

<hr>

<h3>9/22/19:</h3>
<p>&nbsp;&nbsp;&nbsp;
Website logo and image assets created.</p>
<p>&nbsp;&nbsp;&nbsp;
Designed the site layout in photoshop to guide HTML design.
</p>
- David Fioravanti (Gainstrive)
<br>
<br>







<style>
    body{
        background: rgb(47, 47, 47);
    }
h1 {
    text-align: center;
    color: rgb(246, 188, 80);
    text-shadow: 0px 10px 30px rgb(33,37,41);
    user-select: none;
    z-index: 1000;
    background-color: rgba(36, 32, 32, 0.692);
    border: rgb(33, 37, 41) 2px solid;
    border-radius: 20px;
    box-shadow: 0px 0px 30px 10px rgb(47, 47, 47);
    animation: textGlow 2s infinite ease;
}
    @keyframes textGlow {
        0% {text-shadow: 0px 10px 30px rgb(33,37,41)}
        50% {text-shadow: 0px 10px 50px rgb(255, 0, 0)}
        100% {text-shadow: 0px 10px 30px rgb(33,37,41)}
    }
.centered {
    text-align: center;
}
.logo {
    width: 50%;
    margin-left: 20%;
    filter: drop-shadow(0px 0px 30px orange)
}
.yellow {
    color: yellow;
}
</style>
