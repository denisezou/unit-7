// Initialize Firebase
var config = {
    apiKey: "AIzaSyB8_Awittu9HqoVo0BT9qsyL-fOMpJZcsA",
    authDomain: "denzoutesting.firebaseapp.com",
    databaseURL: "https://denzoutesting.firebaseio.com",
    projectId: "denzoutesting",
    storageBucket: "denzoutesting.appspot.com",
    messagingSenderId: "201211345201"
};

firebase.initializeApp(config);

// Assign the reference to the database to a variable named 'database'
// var database = ...
let dataRef = firebase.database();

//initial values
let name = "";
let destination = "";
let arrivaltime = "";
let frequencymin = "";


$("#submit-button").on("click", function (event) {

    let name = $("#input-train").val().trim();
    console.log(name);

    let destination = $("#input-destination").val().trim();
    console.log(destination);

    let arrivaltime = $("#input-first").val().trim();
    console.log(arrivaltime);

    let frequencymin = $("#input-freq").val().trim();
    console.log(frequencymin);

    //Gotta calculate how many minutes away

    //arrivaltime
    arrivaltimeConverted = moment(arrivaltime, "HH:mm").subtract(1, "years");
    console.log("this is the converted first train time" + arrivaltimeConverted);

    //current time
    let currentTime = moment();
    console.log("this is the current time " + moment(currentTime).format("HH:mm"));

    // military time of arrival - current military time 
    let diffTime = moment().diff(moment(arrivaltimeConverted), "minutes");
    console.log("this is the diff between the two " + diffTime);


    //diffTime % frequencymin (remainder)
    let remainder = diffTime % frequencymin;
    console.log("this is the remainder " + remainder);

    //frequency - remainer = minAway
    let minAway = frequencymin - remainder;
    console.log("min till next train " + minAway);

    //calculate next train
    let nextTrain = (moment().add(minAway, "minutes"));

    let formattednextTrain = JSON.stringify(moment(nextTrain).format("HH:mm"));
    console.log("Arrival of next train " + (moment(nextTrain).format("HH:mm")));

    // Code for the push
    dataRef.ref().push({

        name: name,
        destination: destination,
        nextTrain: formattednextTrain,
        frequencymin: frequencymin,
        minAway: minAway,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
});

dataRef.ref().on("child_added", function (childSnapshot) {

    //log what is coming out of snapshot
    console.log(childSnapshot.val().name);
    console.log(childSnapshot.val().destination);
    console.log(childSnapshot.val().nextTrain);
    console.log(childSnapshot.val().frequencymin);
    console.log(childSnapshot.val().minAway);


    $("#here").append("<tr><td scope='row' class = 'text-center'>" + childSnapshot.val().name + "</td><td scope='row' class = 'text-center'>" + childSnapshot.val().destination + "</td><td scope='row' class = 'text-center'>" + childSnapshot.val().frequencymin + "</td><td scope='row' class = 'text-center'>" + childSnapshot.val().nextTrain + "</td><td scope='row' class = 'text-center'>" + childSnapshot.val().minAway + "</td></tr>");


}, function (errorObject) {
    console.log("Errors: " + errorObject.code);
});
