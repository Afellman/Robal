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



