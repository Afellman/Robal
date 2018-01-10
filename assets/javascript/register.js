
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
var auth = firebase.auth();
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    user = user.email
    console.log("User is signed in.")
  } else {
    console.log('No user is signed in.')
  }
});

$("#reg-form-btn").on("click", function (event) {
  event.preventDefault();
  var uid;
  var fName = $("#name").val().trim();
  var lName = $("#lastname").val().trim();
  var email = $("#email").val().trim();
  var location = $("#location").val().trim();
  var password = $("#password").val().trim();
  var skills = $("#skills").val().trim();
  console.log('click');
  console.log(fName);
  console.log(lName);
  console.log(email);
  console.log(location);
  console.log(password);
  console.log(skills);

  auth.createUserWithEmailAndPassword(email, password)
    .then(function (firebaseUser) {
      uid = firebaseUser.uid;
      console.log("User " + firebaseUser.uid + " created successfully!");
      register(uid);
      return firebaseUser;
    }).then(function (firebaseUser) {
      console.log("Logged in as:", firebaseUser.uid);
      window.location.href = "dashboard.html";
    }).catch(function (error) {
      console.error("Error: ", error);
    }).then();

  function register(uid) {
    var registrationInfo = {
      id: uid,
      name: fName,
      lastname: lName,
      eaddress: email,
      area: location,
      pword: password,
      skills: skills,
      hours: 5,
      jobsAccepted: {}
    };

    database.ref('/registration').push(registrationInfo);
  };

  $("#name").val("");
  $("#lastname").val("");
  $("#email").val("");
  $("#location").val("");
  $("#password").val("");
  $("#skills").val("");
});

$("#sign-out-btn").on("click", function (event) {
  firebase.auth().signOut().then(function () {
    // Sign-out successful.
  }).catch(function (error) {
    // An error happened.
  });
});