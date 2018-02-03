

  $(document).ready(function() { 




  // Initialize Firebase
    var config = {
    apiKey: "AIzaSyDySbzKfm4vcDdeZMDZT5M8y8U53E6ULbE",
    authDomain: "traintime-70c8c.firebaseapp.com",
    databaseURL: "https://traintime-70c8c.firebaseio.com",
    projectId: "traintime-70c8c",
    storageBucket: "traintime-70c8c.appspot.com",
    messagingSenderId: "223788944954"
  };

  firebase.initializeApp(config);

var database = firebase.database();
var currentTime = moment();

database.ref().on("child_added", function(childSnap) {

    var name = childSnap.val().name;
    var destination = childSnap.val().destination;
    var firstTrain = childSnap.val().firstTrain;
    var frequency = childSnap.val().frequency;
    var min = childSnap.val().min;
    var next = childSnap.val().next;

    $(".table > tbody").append("<tr><td>" + name + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + next + "</td><td>" + min + "</td></tr>");
});

database.ref().on("value", function(snapshot) {
   

});

//grabs information from the form
$("#submit").on("click", function() {
   event.preventDefault();

    var trainName = $("#name").val().trim();
    var destination = $("#destination").val().trim();
    var firstTrain = $("#firstTrainTime").val().trim();
    var frequency = $("#frequency").val().trim();

    //ensures that each input has a value
    if (trainName == "") {
        alert('Enter a train name.');
        return false;
    }
    if (destination == "") {
        alert('Enter a destination.');
        return false;
    }
    if (firstTrain == "") {
        alert('Enter a first train time.');
        return false;
    }
    if (frequency == "") {
        alert('Enter a frequency');
        return false;
    }

    // THE MATH!
    //subtracts the first train time back a year to ensure it's before current time.
    var firstTrainConverted = moment(firstTrain, "hh:mm").subtract("1, years");
    // the time difference between current time and the first train
    var difference = currentTime.diff(moment(firstTrainConverted), "minutes");
    var remainder = difference % frequency;
    var minUntilTrain = frequency - remainder;
    var nextTrain = moment().add(minUntilTrain, "minutes").format("hh:mm a");

    var newTrain = {
        name: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency,
        min: minUntilTrain,
        next: nextTrain
    }

    console.log(newTrain);
    database.ref().push(newTrain);

    $("#name").val("");
    $("#destination").val("");
    $("#firstTrainTime").val("");
    $("#frequency").val("");

    return false;
});
});