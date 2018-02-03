

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

 var database=firebase.database();
 var currentTime = moment();


database.ref().on("child_added" , function(childSnapshot){
    
    

      var trainName = childSnapshot.val().trainName;
      var destination = childSnapshot.val().destination;
      var firstTrainTime = childSnapshot.val().firstTrainTime;
      var frequency = childSnapshot.val().frequency;
      var min = childSnapshot.val().min;
      var next = childSnapshot.val().next;

   $("tbody").append("<tr><td" + name + "</td><td>" + destination + "</td><td>" + time + "</td><td>" 
            + frequency + "</td><td>" + min + "</td><td>" + next + "</td></tr>");
 


   });
   
database.ref().on("value", function(snapshot){

  

   });

 
$("#submit").on("click", function(){
      event.preventDefault();
      var trainName = $("#name").val().trim();
      var destination = $("#destination").val().trim();
      var firstTrainTime = $("#firstTrainTime").val().trim();
      var frequency = $("#frequency").val().trim();

      if (trainName == ""){
        alert("Enter a train name.");
        return false;
      }

      if (destination == ""){
        alert("Enter a destination.");
        return false;
      }

      if (firstTrainTime == ""){
        alert("Enter a first train time.");
        return false;
      }

      if(frequency ==""){
        alert("Enter a frequency");
        return false;
      }

      var firstTrainConverted = moment(firstTrainTime, "hh:mm").subtract("1, years");
      var difference = currentTime.diff(moment(firstTrainConverted), "minutes");
      var remainder = difference % frequency;
      var minUntilTrain = frequency - remainder;
      var nextTrain = moment().add(minUntilTrain, "minutes").format("hh:mm a");

      var newTrain ={
        trainName: name,
        destination: destination,
        firstTrainTime: firstTrainTime,
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