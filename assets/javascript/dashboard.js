
$(document).ready(function () {
  // Initialzing Firebase
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
  var postNumber = 0;
  var jobAcceptMessages = [];
  var user;
  var userInfo;
  // function to convert snapshot json to array.
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
      user = user.email
      console.log("User is signed in.")
      populateWithUserData(user);

    } else {
      console.log('No user is signed in.')
    }
  });

  // getting user data from firebase
  function populateWithUserData(userEmail) {
    database.ref('/registration').on('value', function (snapshot) {
      var userArray = snapshotToArray(snapshot);
      for (var i = 0; i < userArray.length; i++) {
        if (userArray[i].eaddress == userEmail) {
          console.log('user found')
          var info = userArray[i];
          addUserInfoToDom(info);
        }
      }
    })
  };

  // Adding user info to the DOM -----------------
  function addUserInfoToDom(userInfo) {
    $('#user-title').text(userInfo.name + " " + userInfo.lastname)
    $('#wallet-amount').text(userInfo.hours + " hours");
    $('#jobs-completed').text(userInfo.jobs_completed);

    // grabbing and appending inbox messages
    database.ref('/jobAcceptMsg').on('value', function (snapshot) {
      var messagesToUser;
      var messages = snapshotToArray(snapshot);
      for (var i = 0; i < messages.length; i++) {
        console.log(messages[i])
        if (messages[i].to == userInfo.eaddress) {
          var msg = messages[i].msg;
          $('#inbox').prepend('<li class="inbox-message">' + msg + ' - <em>from: ' + messages[i].from + '</em></li>');
          // Function to clear messages (need to refresh firebase after delete)
        }
      }

      $('.inbox-message').on('click', function () {
        $(this).remove();
      });
    });
    // grabbing and appending jobs posted by user
    database.ref("/jobPost").on('value', function (snapshot) {
      var posts = [];
      jobPostArray = snapshotToArray(snapshot);
      console.log(jobPostArray)
      // running through the array of posts, storing each key/value locally, 
      // then appending them to the dom
      for (var i = 0; i < jobPostArray.length; i++) {
        if (jobPostArray[i].eaddress == userInfo.eaddress) {
          var work = jobPostArray[i].work;
          posts.push(jobPostArray[i])

          console.log(posts)
          $('#posted-jobs').prepend('<li class="post-list-item" data-post="' + postNumber + '"data-toggle="modal" data-target="#myPostedJobsModal">' + work + '</li>');
          postNumber++
          // Function to clear messages (need to refresh firebase after delete)
        };
      };

      // Populating the My Posted Jobs modal with detailed information about the job they posted.
      $('.post-list-item').on('click', function () {
        var dataPost = $(this).attr('data-post');
        console.log(dataPost)
        console.log(posts)
        var fname = posts[dataPost].name;
        var lname = posts[dataPost].lastname;
        var email = posts[dataPost].eaddress;
        var hours = posts[dataPost].hrs;
        var location = posts[dataPost].area;
        var description = posts[dataPost].need;
        var title = posts[dataPost].work;
        // Appeding everything to the DOM
        var container = '<div id="job-list-item"class="mt-3"></div>';
        var title = '<div class="row title-row"><div class="col-md-12"><h3 id="job-title">' + title + '</h3></div></div>';
        var jobSpec = '<div class="ml-2 row"><div class="col-md-12"><p class="subtle">Employeer is: ' + fname + " " + lname + ' - ' + email + ' <br>' + hours + ' hours at ' + location + '</p>' + '<p id="job-description">' + description + '</p></div></div>';
        $('#posted-jobs-expanded').html(container);
        $('#job-list-item').append(title);
        $('#job-list-item').append(jobSpec);

        // Need to update firebase after delete...
        $('#delete-job').on('click', function () {
          $('*[data-post="' + dataPost + '"]').remove();

        });
      });
    });
  };
  // Chat Box code------------------------------------

  // Grabbing and appending chatbox 
  database.ref('/chatBox/posts').on('value', function (snapshot) {
    chatBoxArray = snapshotToArray(snapshot);
    console.log(chatBoxArray)
    postNumber = snapshot.postNumber;
    $('#chat-area').empty();
    // running through the array of posts, storing each locally, 
    // then appending it to the dom
    for (var i = chatBoxArray.length - 1; i > chatBoxArray.length - 7; i--) {
      var line = chatBoxArray[i];
      $('#chat-area').prepend('<p> - ' + line + '</p><br>');
    };
  });
  database.ref('/chatBox').on('value', function (snapshot) {
    postNumber = snapshot.val().postNumber;
  });
  $('#chat-submit').on('click', function (event) {
    event.preventDefault();
    var postText = $('#new-chat-box').val();
    database.ref('/chatBox/posts').push(postText)
    $('#new-chat-box').val("");
  });


  $("#sign-out-btn").on("click", function (event) {
    firebase.auth().signOut().then(function () {
      // Sign-out successful.
    }).catch(function (error) {
      // An error happened.
    });
  });


  // End document.ready
});
