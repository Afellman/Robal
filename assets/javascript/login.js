
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

$("#add-form-btn").on("click", function (event) {
  event.preventDefault();
  var email = $("#email-login-input").val();
  var password = $("#password-input").val();
  console.log(email);
  console.log(password);
  auth.signInWithEmailAndPassword(email, password)
    .then(function (firebaseUser) {
      uid = firebaseUser.uid;
      console.log("User " + firebaseUser.uid + " signed in!");
      return firebaseUser;
    }).then(function (firebaseUser) {
      console.log("Logged in as:", firebaseUser.uid);
      window.location.href = "dashboard.html"
    }).catch(function (error) {
      console.error("Error: ", error);
      $('#loginFail1').text("Login failed.")
      $('#loginFail2').text("Check your email and password, or register an account at our Member Registration page.")
    }).then();

  $("#email-login-input").val("");
  $("#password-input").val("");

});

$("#sign-out-btn").on("click", function (event) {
  firebase.auth().signOut().then(function () {
    // Sign-out successful.
  }).catch(function (error) {
    // An error happened.
  });
});
