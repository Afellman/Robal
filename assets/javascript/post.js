
$(".form-control").valid();

var config = {
  apiKey: "AIzaSyCRUos4srVsw2Gw6_ghM2YTUSXdm-L6kEo",
  authDomain: "robal-f2619.firebaseapp.com",
  databaseURL: "https://robal-f2619.firebaseio.com",
  projectId: "robal-f2619",
  storageBucket: "robal-f2619.appspot.com",
  messagingSenderId: "1011207778959"
};

firebase.initializeApp(config);

// Storing Firebase in database

var database = firebase.database();

$("#add-form-btn").on("click", function (event) {
  event.preventDefault();

  var fName = $("#name-input").val().trim();
  var lName = $("#last-name-input").val().trim();
  var email = $("#email-input").val().trim();
  var location = $("#location-input").val().trim();
  var hours = $("#hours-input").val().trim();
  var job = $("#job-input").val().trim();
  var wNeed = $("#work-needed-input").val().trim();

  console.log(fName);
  console.log(lName);
  console.log(email);
  console.log(location);
  console.log(hours);
  console.log(job);
  console.log(wNeed);

  var newJobPost = {

    name: fName,
    lastname: lName,
    eaddress: email,
    area: location,
    hrs: hours,
    work: job,
    need: wNeed,
  };

  window.location.href = "dashboard.html"

  database.ref('/jobPost').push(newJobPost);

  $("#name-input").val("");
  $("#last-name-input").val("");
  $("#email-input").val("");
  $("#location-input").val("");
  $("#hours-input").val("");
  $("#job-input").val("");
  $("#work-needed-input").val("");

});

$("#sign-out-btn").on("click", function (event) {

  firebase.auth().signOut().then(function () {
    // Sign-out successful.
  }).catch(function (error) {
    // An error happened.
  });

});

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    user = user.email
    console.log("User is signed in.")
    populateWithUserData(user);

  } else {
    console.log('No user is signed in.')
  }
});
