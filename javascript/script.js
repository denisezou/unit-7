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
let database = firebase.database();

//initial values
let name = "";
let destination = "";
let arrivaltime = "";
let frequencymin = "";
var minAway

function initializethis() {

$("#submit-button").on("click", function(){

let name = $("#input-train").val().trim();
console.log(name);

let destination = $("#input-destination").val().trim();
console.log(destination);

let arrivaltime= $("#input-arrival").val().trim();
console.log(arrivaltime);

let frequencymin = $("#input-freq").val().trim();
console.log(frequencymin);

$("#here").append("<tr><td scope='row'>" + name + "</td><td>" + destination + "</td><td>" + frequencymin + "</td><td>" + arrivaltime+ "</td><td>" + minAway+ "</td></tr>");
});
}


//initialize the function
initializethis();