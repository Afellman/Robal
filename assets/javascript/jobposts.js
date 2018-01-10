
// Initializing Firebase
var config = {
  apiKey: "AIzaSyCRUos4srVsw2Gw6_ghM2YTUSXdm-L6kEo",
  authDomain: "robal-f2619.firebaseapp.com",
  databaseURL: "https://robal-f2619.firebaseio.com",
  projectId: "robal-f2619",
  storageBucket: "robal-f2619.appspot.com",
  messagingSenderId: "1011207778959"
};
firebase.initializeApp(config);

// Initializing variables

var database = firebase.database();
var auth = firebase.auth()
var jobLocation;
var jobPostArray = [];
var mapLocation;
var userEmail;
var receiver;
// Function turning snapshop into an Array
function snapshotToArray(snapshot) {
  var returnArr = [];
  snapshot.forEach(function (childSnapshot) {
    var item = childSnapshot.val();
    item.key = childSnapshot.key;
    returnArr.push(item);
  });
  return returnArr;
};

// Checking if signed in and assigning unique user id locally
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    console.log(user.email)
    userEmail = user.email
    console.log("User is signed in.")
    console.log(userEmail)
  } else {
    console.log('No user is signed in.')
  }
});


// Gathering data of job posts from Firebase
database.ref("/jobPost").on('value', function (snapshot) {
  jobPostArray = snapshotToArray(snapshot);
  console.log(jobPostArray)
  // running through the array of posts, storing each key/value locally, 
  // then appending them to the dom
  for (var i = 0; i < jobPostArray.length - 1; i++) {
    var fname = jobPostArray[i].name;
    var lname = jobPostArray[i].lastname;
    var email = jobPostArray[i].eaddress;
    var hours = jobPostArray[i].hrs;
    var location = jobPostArray[i].area;
    var description = jobPostArray[i].need;
    var title = jobPostArray[i].work;
    // Appeding everything to the DOM
    var contact = '<button type="button" class="btn btn-primary contact-modal-btn" data-email="' + email + '" data-toggle="modal" data-target="#contactModal">Contact</button>'
    var container = '<div id="job-list-item"class="mt-3"></div>';
    var title = '<div class="row title-row"><div class="col-md-12"><h3 id="job-title">' + title + '</h3></div></div>';
    var mapButton = '<button type="button" class="job-btn btn btn-primary map-btn" data-toggle="modal" data-loc="' + location + '" data-target="#mapModal">Map</button>';
    var jobSpec = '<div class="ml-2 row"><div class="col-md-12"><p class="subtle">Employeer is: ' + fname + " " + lname + ' - ' + email + ' <br>' + hours + ' hours at ' + location + '</p>' + '<p id="job-description">' + description + '</p></div></div>';
    $('#job-list-container').prepend(container);
    $('#job-list-item').append(title);
    $('#job-list-item').append(jobSpec);
    $('#job-list-item').append(mapButton);
    $('#job-list-item').append(contact);
    $('#job-list-item').append('<hr class="job-line">');

  };
});
// Initialize Google Maps API -------------------
// NEED TO ADD PROPER COORDS FROM FIREBASE
function initMap() {
  $(document).on('click', '.map-btn', function () {
    mapLocation = $(this).attr('data-loc');
    codeAddress();
  });

  function codeAddress() {
    var myLatLng;
    var map;
    var marker;
    var geocoder = new google.maps.Geocoder()
    geocoder.geocode({ 'address': mapLocation }, function (results, status) {
      if (status == 'OK') {
        myLatLng = results[0].geometry.location;
        marker = new google.maps.Marker({
          map: map,
          position: results[0].geometry.location

        });
        showMap(myLatLng)
        return myLatLng
      } else {
        console.log('geocode error');
      }
    });
  };

  function showMap(myLatLng) {
    console.log(myLatLng)

    // Create a map object and specify the DOM element for display.
    var map = new google.maps.Map(document.getElementById('map'), {
      center: myLatLng,
      zoom: 13
    });
    // Create a marker and set its position.
    var marker = new google.maps.Marker({
      map: map,
      position: myLatLng,
      title: 'Hello World!'
    });
    $("#mapModal").on("shown.bs.modal", function (e) {
      google.maps.event.trigger(map, "resize");
      return map.setCenter(myLatLng);
    });
  };
};
// ---------------------------
// Assigning receiver variable locally
$(document).on('click', '.contact-modal-btn', function () {
  console.log('modal')
  receiver = $(this).attr('data-email')
  console.log(receiver)
});
// Pushing job accept message to firebase

$('#contact-btn').on('click', function (e) {
  var jobAcceptMsg = $('#contact-msg').val();
  var msgObj = {
    from: userEmail,
    to: receiver,
    msg: jobAcceptMsg
  };
  database.ref('/jobAcceptMsg').push(msgObj);
});

$("#sign-out-btn").on("click", function (event) {
  firebase.auth().signOut().then(function () {
    // Sign-out successful.
  }).catch(function (error) {
    // An error happened.
  });
});

