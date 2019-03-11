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
var minAway


$("#submit-button").on("click", function(event){

let name = $("#input-train").val().trim();
console.log(name);

let destination = $("#input-destination").val().trim();
console.log(destination);

let arrivaltime= $("#input-arrival").val().trim();
console.log(arrivaltime);

let frequencymin = $("#input-freq").val().trim();
console.log(frequencymin);

// Code for the push
dataRef.ref().push({

    name: name,
    destination: destination,
    arrivaltime: arrivaltime,
    frequencymin: frequencymin,
    dateAdded: firebase.database.ServerValue.TIMESTAMP
});
});

dataRef.ref().on("child_added", function(childSnapshot){

    //log what is coming out of snapshot
console.log(childSnapshot.val().name);
console.log(childSnapshot.val().destination);
console.log(childSnapshot.val().arrivaltime);
console.log(childSnapshot.val().frequencymin);
console.log(childSnapshot.val().dateAdded);


$("#here").append("<tr><td scope='row'>" + childSnapshot.val().name + "</td><td>" + childSnapshot.val().destination + "</td><td>" + childSnapshot.val().frequencymin + "</td><td>" + childSnapshot.val().arrivaltime+ "</td><td>" + childSnapshot.val().minAway+ "</td></tr>");


}, function(errorObject){
    console.log("Errors: " + errorObject.code);
});
