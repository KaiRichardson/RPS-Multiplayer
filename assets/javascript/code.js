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

var images = [
    {
        line: "./assets/images/rock-paper-scisors/rock.png",
        color: "./assets/images/rock-paper-scisors/rock-color.png"
    },
    {
        line: "./assets/images/rock-paper-scisors/paper.png",
        color: "./assets/images/rock-paper-scisors/paper-color.png"
    },
    {
        line: "./assets/images/rock-paper-scisors/scissors.png",
        color: "./assets/images/rock-paper-scisors/scissors-color.png"
    }
]
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
]

//player 1 stats
var playerName = "";
var playerAvatar = "";
var playerAge = 0;
var playerWins = 0;
var playerlosses = 0;

function signInPage() {

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
    }

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
    }

    formDiv.append(avatarRow);


    var formBtn = $("<button>");
    // formBtn.attr({ "type": inputs[2].type, "class": "btn btn-default", "id": "add-user" });
    formBtn.text(inputs[2].id);
    formDiv.append(formBtn);

    $("#main_body").append(formDiv);

}

// Capture Button Click
// $("#odd-user").on("click", function (event) {
//     event.preventDefault();
//     console.log("butts");
    

//     playerName = $("#name-input").val().trim();
//     playerAge = $("#age-input").val().trim();

//     // Code for the push
//     dataRef.ref().push({
//         Name: playerName,
//         Age: playerAge,
//         Avatar: playerAvatar,
//         dateAdded: firebase.database.ServerValue.TIMESTAMP
//     });
// });

// Firebase watcher + initial loader HINT: This code behaves similarly to .on("value")
// dataRef.ref().on("child_added", function (childSnapshot) {

//     // full list of items to the well
//     $("#full-member-list").append("<div class='well'><span class='member-name'> " +
//         childSnapshot.val().name +
//         " </span><span class='member-email'> " + childSnapshot.val().email +
//         " </span><span class='member-age'> " + childSnapshot.val().age +
//         " </span><span class='member-comment'> " + childSnapshot.val().comment +
//         " </span></div>");

//     // Handle the errors
// }, function (errorObject) {
//     console.log("Errors handled: " + errorObject.code);
// });

// dataRef.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function (snapshot) {
//     // Change the HTML to reflect
//     $("#name-display").text(snapshot.val().name);
//     $("#email-display").text(snapshot.val().email);
//     $("#age-display").text(snapshot.val().age);
//     $("#comment-display").text(snapshot.val().comment);
// });

function lineColor() {

    $("#avatarRow img").each(function () {
        var newState = $(this).attr("data-line");
        $(this).attr("src", newState);
        $(this).attr("data-state", "line");
    });

    var state = $(this).attr("data-state");

    if (state === "line") {
        
        playerAvatar = $(this).attr("data-color");
        console.log(playerAvatar);
        
        var newState = $(this).attr("data-color");
        $(this).attr("src", newState);
        $(this).attr("data-state", "color");
    };
};


// Only two users can play at the same time.

// Both players pick either `rock`, `paper` or `scissors`. 

// players make their selection, 

// the game will tell them whether a tie occurred or if one player defeated the other.

// track each player's wins and losses.

$(document).on("click", ".avatars", lineColor);

$(document).ready(signInPage);
