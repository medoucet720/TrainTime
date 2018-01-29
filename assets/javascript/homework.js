

  $(document).ready(function() { 



  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDySbzKfm4vcDdeZMDZT5M8y8U53E6ULbE",
    authDomain: "traintime-70c8c.firebaseapp.com",
    databaseURL: "https://traintime-70c8c.firebaseio.com",
    projectId: "traintime-70c8c",
    storageBucket: "",
    messagingSenderId: "223788944954"
  };
  firebase.initializeApp(config);


 firebase.initializeApp(config);
 var database=firebase.database();
 var currentTime = moment();


 $("#submit").on("click", function() {
    // Don't refresh the page!
      event.preventDefault();
      console.log("click detected");

      var trainName = $("#name").val().trim();
      var destination = $("#destination").val().trim();
      var firstTrainTime = $("#firstTrainTime").val();
      var frequency = $("#frequency").val().trim();

     database.ref().push({
        trainName: name,
        destination: destination,
        firstTrainTime: firstTrainTime,
        frequency: frequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
      });

   });

   database.ref().on("child_added", function(childSnapshot){
      
      console.log(childSnapshot.val().trainName);
      console.log(childSnapshot.val().destination);
      console.log(childSnapshot.val().firstTrainTime);
      console.log(childSnapshot.val().frequency);
     

  
   $("tbody").append("<tr> <td> " + childSnapshot.val().trainName + "</td> <td> " + childSnapshot.val().destination + 
    "</td> <td> " + childSnapshot.val().firstTrainTime + " </td><td></td><td> " + childSnapshot.val().frequency + "</td> </tr>");
 
 }, function(errorObject) {
  console.log("Errors handled: " + errorObject.code);

 });

  database.ref().orderByChild("data-added").limitToLast(1).on ("child_added", function(snapshot) {
    $("#name").text(snapshot.val().trainName);
    $("#destination").text(snapshot.val().destination);
    $("#firstTrainTime").text(snapshot.val().firstTrainTime);
    $("#frequency").text(snapshot.val().frequency);

  });


});
