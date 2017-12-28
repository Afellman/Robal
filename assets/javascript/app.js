<<<<<<< HEAD
(function($) {
  "use strict"; // Start of use strict

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top - 54)
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function() {
    $('.navbar-collapse').collapse('hide');
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#mainNav',
    offset: 54
  });

})(jQuery); // End of use strict
=======
// Initialize Firebase
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

database.ref().on('value', function(childSnapshot) {
var jobSpecs = childSnapshot.val().newPost;
var name = jobSpecs.name;
var email = jobSpecs.emal;
var hours = jobSpecs.hours;
var loc = jobSpecs.loc;
var description = jobSpecs.description;

$('#job-list-container').append('<div id="job-list-item-1" class="mt-3"><div class="row"><div class="col-md-12"><h3 id="job-title">' + name + '</h3></div></div><div class="ml-2 row"><div class="col-md-12"><p id="job-spec">Hours: '+ hours +' Location: ' + loc + '</p><p id="job-description">'+ description + '</p></div></div>');
});



>>>>>>> master
