$(document).ready(function () {
  var config = {
    apiKey: "AIzaSyCRUos4srVsw2Gw6_ghM2YTUSXdm-L6kEo",
    authDomain: "robal-f2619.firebaseapp.com",
    databaseURL: "https://robal-f2619.firebaseio.com",
    projectId: "robal-f2619",
    storageBucket: "robal-f2619.appspot.com",
    messagingSenderId: "1011207778959"
  };
  firebase.initializeApp(config);
  var database = firebase.database();
  var auth = firebase.auth();
  // Add smooth scrolling to all links
  $("#learn-more").click(function () {
    $('html, body').animate({
      scrollTop: $("#section2").offset().top
    }, 2000);
  });
  // Checking if signed in and assigning unique user id locally
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      console.log(user.email)
      console.log("User is signed in.")
      console.log(userEmail)
    } else {
      console.log('No user is signed in.')
    }
  });
});

