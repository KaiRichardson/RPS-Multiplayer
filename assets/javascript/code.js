// Initialize Firebase
var config = {
    apiKey: "AIzaSyAzU4XHb1NLZRuOZ-4tuK0XH_NTLsf-f2w",
    authDomain: "rps-multiplayer-5f436.firebaseapp.com",
    databaseURL: "https://rps-multiplayer-5f436.firebaseio.com",
    projectId: "rps-multiplayer-5f436",
    storageBucket: "rps-multiplayer-5f436.appspot.com",
    messagingSenderId: "29822331552"
};
firebase.initializeApp(config);

var dataRef = firebase.database();

// Initial Values
var inputs = [
    {
        id: "Name",
        type: "text"
    },
    {
        id: "Age",
        type: "number"
    },
    {
        id: "Start Playing",
        type: "submit"
    }];

var rpsImg = [
    {
        line: "./assets/images/rock-paper-scisors/rock.png",
        color: "./assets/images/rock-paper-scisors/rock-color.png",
        item: "r"
    },
    {
        line: "./assets/images/rock-paper-scisors/paper.png",
        color: "./assets/images/rock-paper-scisors/paper-color.png",
        item: "p"
    },
    {
        line: "./assets/images/rock-paper-scisors/scissors.png",
        color: "./assets/images/rock-paper-scisors/scissors-color.png",
        item: "s"
    }
];
var avatars = [
    {
        line: "./assets/images/avatars/artist.png",
        color: "./assets/images/avatars/artist-color.png"
    },
    {
        line: "./assets/images/avatars/chef.png",
        color: "./assets/images/avatars/chef-color.png"
    },
    {
        line: "./assets/images/avatars/astronaut.png",
        color: "./assets/images/avatars/astronaut-color.png"
    },
    {
        line: "./assets/images/avatars/farmer.png",
        color: "./assets/images/avatars/farmer-color.png"
    },
    {
        line: "./assets/images/avatars/policewoman.png",
        color: "./assets/images/avatars/policewoman-color.png"
    }
];

//player stats

var p1Wins;
var p1Losses;
var p1Name;
var p1Choice;

var p2Wins;
var p2Losses;
var p2Name;
var p2Choice;

var playerTurn;
var whoAmI = "none";

var numPlayers = 2;
var rpsPick = "";

var playerName = "";
var playerAvatar = "";
var playerAge = 0;
var playerWins = 0;
var playerlosses = 0;
var ties = 0;

var playerReady = false;

function signInPage() {
    //player stats
    playerName = "";
    playerAvatar = "";
    playerAge = 0;
    playerWins = 0;
    playerlosses = 0;
    ties = 0;

    $("#main_body").empty();

    var formDiv = $("<form>");
    formDiv.attr({ "role": "form", "id": "inputForm" });

    for (var i = 0; i < 2; i++) {

        var formRow = $("<div>");
        formRow.attr("class", "form-group row");
        formDiv.append(formRow);

        var formLabel = $("<label>");
        formLabel.attr({ "for": inputs[i].id + "-input", "class": "inputLabel" });
        formLabel.text(inputs[i].id);
        formLabel.append("<br>");
        formRow.append(formLabel);

        var formInput = $("<input>");
        formInput.attr({ "type": inputs[i].type, "class": "form-control inputInput", "id": inputs[i].id + "-input" });
        formRow.append(formInput);
    };

    var avatarRow = $("<div>");
    avatarRow.text("Chose an Avatar");
    avatarRow.attr({ "class": "row", "id": "avatarRow" });
    avatarRow.append("<br>");

    for (var i = 0; i < avatars.length; i++) {

        var formAvatar = $("<img>");
        formAvatar.attr("src", avatars[i].line);
        formAvatar.attr("data-line", avatars[i].line);
        formAvatar.attr("data-color", avatars[i].color);
        formAvatar.attr("data-state", "line");
        formAvatar.addClass("avatars");
        avatarRow.append(formAvatar);
    };

    formDiv.append(avatarRow);

    var formBtn = $("<button>");
    formBtn.attr({ "type": inputs[2].type, "class": "btn btn-default", "id": "add-user" });
    formBtn.text(inputs[2].id);
    
    $("#main_body").append(formDiv);
    $("#main_body").append(formBtn);
};

// Capture Button Click
function fireBasePush(event) {
    event.preventDefault();

    playerName = $("#Name-input").val();
    playerAge = $("#Age-input").val();

    console.log(playerName);
    console.log(playerAge);
    console.log(playerAvatar);

    if (playerName === "") {
        alert("Please enter your name!")
    } else if (playerAge === "") {
        alert("Please enter your age!")
    } else if (playerAvatar === "") {
        alert("Please Chose an Avatar!")
    } else {

        playerReady = true;
        // Code for the push
        dataRef.ref().push({
            Name: playerName,
            Age: playerAge,
            Avatar: playerAvatar,
            Ready: playerReady,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        });
        gameSetup();
    };
};

function gameSetup() {
    // if (myPlayerNumber === null) {
    //     alert('Game is full.  Can\'t join. :-(');
    //   }
    $("#main_body").empty();

    // player 1 (you) stats show here
    var leftDiv = $("<div>");
    leftDiv.attr({ "id": "left_body", "class": "col-5" });

    leftDiv.append($("<h1>").text("Player 1"));
    leftDiv.append($("<img>").attr("src", playerAvatar).addClass("p_avatars"));
    leftDiv.append($("<h2>").text("Name: " + playerName));
    leftDiv.append($("<h2>").text("Age: " + playerAge));

    for (var i = 0; i < rpsImg.length; i++) {

        var rps = $("<img>");
        rps.attr("src", rpsImg[i].line);
        rps.attr("data-line", rpsImg[i].line);
        rps.attr("data-color", rpsImg[i].color);
        rps.attr("item", rpsImg[i].item);
        rps.attr("data-state", "line");
        rps.addClass("rps");
        leftDiv.append(rps);
    };


    // waiting animation here
    var midDiv = $("<div>");
    midDiv.attr({ "id": "mid_body", "class": "col-2" });
    midDiv.text("| Please wait for an opponent |");
    
    // player 2 (opponent) stats show here
    var rightDiv = $("<div>");
    rightDiv.attr({ "id": "right_body", "class": "col-5" });
    rightDiv.attr("id", "right_div");


    rightDiv.append($("<h1>").text("Player 2"));
    rightDiv.append($("<img>").attr("src", playerAvatar).addClass("p_avatars"));
    rightDiv.append($("<h2>").text("Name: " + playerName));
    rightDiv.append($("<h2>").text("Age: " + playerAge));

    $("#main_body").append(leftDiv);
    $("#main_body").append(midDiv);
    $("#main_body").append(rightDiv);
};

function rpsPicker() {
    // Determines which key was pressed.
    var userGuess = rpsPick;

    // Randomly chooses a choice from the options array. This is the Computer's guess.
    var computerGuess = computerChoices[Math.floor(Math.random() * computerChoices.length)];

    // This logic determines the outcome of the game (win/loss/tie), and increments the appropriate number
    if ((userGuess === "r") || (userGuess === "p") || (userGuess === "s")) {

      if ((userGuess === "r" && computerGuess === "s") ||
        (userGuess === "s" && computerGuess === "p") || 
        (userGuess === "p" && computerGuess === "r")) {
        wins++;
      } else if (userGuess === computerGuess) {
        ties++;
      } else {
        losses++;
      }

      // Hide the directions
      directionsText.textContent = "";

      // Display the user and computer guesses, and wins/losses/ties.
      userChoiceText.textContent = "You chose: " + userGuess;
      computerChoiceText.textContent = "The computer chose: " + computerGuess;
      winsText.textContent = "wins: " + wins;
      lossesText.textContent = "losses: " + losses;
      tiesText.textContent = "ties: " + ties;
    }
  };

function lineColor() {

    if ($(this).attr("class") === "avatars") {
        
        $("#avatarRow img").each(function () {
            var newState = $(this).attr("data-line");
            $(this).attr("src", newState);
            $(this).attr("data-state", "line");
        });
    } else {
        $("#right_div img").each(function () {
            var newState = $(this).attr("data-line");
            $(this).attr("src", newState);
            $(this).attr("data-state", "line");
        });
    }

    var state = $(this).attr("data-state");

    if (state === "line") {

        playerAvatar = $(this).attr("data-color");
        console.log(playerAvatar);

        rpsPick = $(this).attr("item");
        console.log(rpsPick);

        var newState = $(this).attr("data-color");
        $(this).attr("src", newState);
        $(this).attr("data-state", "color");
    };
};







// Firebase watcher + initial loader HINT: This code behaves similarly to .on("value")
dataRef.ref().on("child_added", function (childSnapshot) {

    // full list of items to the well
    $("#left_body").append(
        "<div class='well'><span class='member-name'> " + childSnapshot.val().name +
        " </span><span class='member-email'> " + childSnapshot.val().email +
        " </span><span class='member-age'> " + childSnapshot.val().age +
        " </span><span class='member-comment'> " + childSnapshot.val().comment +
        " </span></div>");

    // Handle the errors
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});

dataRef.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function (snapshot) {
    // Change the HTML to reflect
    $("#name-display").text(snapshot.val().name);
    $("#email-display").text(snapshot.val().email);
    $("#age-display").text(snapshot.val().age);
    $("#comment-display").text(snapshot.val().comment);
});



// Only two users can play at the same time.

// Both players pick either `rock`, `paper` or `scissors`. 

// players make their selection, 

// the game will tell them whether a tie occurred or if one player defeated the other.

// track each player's wins and losses.

$(document).on("click", ".rps", rpsPicker);
$(document).on("click", ".avatars", lineColor);
$(document).on("click", "#add-user", fireBasePush);

$(document).ready(signInPage);
