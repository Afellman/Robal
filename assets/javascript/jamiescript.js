$(document).ready(function () {
  $(document).ready(function(){
	//Initializ Firebase
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
				var postNumber;
        var jobAcceptMessages = [];
        var user;
        var userInfo;

    function snapshotToArray(snapshot) {
		var returnArr = [];

		snapshot.forEach(function(childSnapshot) {
			var item = childSnapshot.val();
			item.key = childSnapshot.key;

			returnArr.push(item);
		});
					return returnArr;
	};

	// Checking if signed in and assigning unique user id locally
        firebase.auth().onAuthStateChanged(function(user) {
          if (user) {
            user = user.email
            console.log("User is signed in.")
            populateWithUserData(user);

          } else {
            console.log('No user is signed in.')
            alert('you are not signed in');
          }
        });

         // getting user data from firebase
        function populateWithUserData(userEmail){
          database.ref('/registration').on('value', function(snapshot) {
            var userArray = snapshotToArray(snapshot);
            for (var i = 0; i < userArray.length; i++) {
              if (userArray[i].eaddress == userEmail){
                console.log('user found')
                var info = userArray[i];
                addUserInfoToDom(info);
              }
            }
          })
        };

        // Adding user info to the DOM IMPORTANT JAMIE
        function addUserInfoToDom(userInfo) {
          $('#user-title').text(userInfo.name + " " + userInfo.lastname)
          $('#wallet-amount').text(userInfo.hours + " hours");
          $('#jobs-completed').text(userInfo.jobs_completed);

        };

        				// grabbing shapshot from firebase/chatbox/posts
        database.ref('/chatBox/posts').on('value', function(snapshot) {
					chatBoxArray = snapshotToArray(snapshot);
					console.log(chatBoxArray)
					postNumber = snapshot.postNumber;
                    $('#chat-area').empty();

					// running through the array of posts, storing each locally, 
					// then appending it to the dom
					for (var i = chatBoxArray.length - 1; i > chatBoxArray.length - 7; i --){
						var line = chatBoxArray[i];
						$('#chat-area').prepend('<p> - ' + line + '</p><br>');
					};
				});
				database.ref('/chatBox').on('value', function(snapshot) {
					postNumber = snapshot.val().postNumber;
				});
				$('#chat-submit').on('click', function(event) {
          event.preventDefault(); 
					var postText = $('#new-chat-box').val();
					database.ref('/chatBox/posts').push(postText)
          $('#new-chat-box').val("");
				});
			
        // Getting firebase snapshot for job accept messages and prepending 
        // to the #inbox div.
        database.ref('/jobAcceptMsg').on('value', function (snapshot) {
          var messages = snapshotToArray(snapshot);
          console.log(messages);
          messages.forEach(function(msg) {
            $('#inbox').prepend('<li class="inbox-message">'+ msg + '</li>');
            // Function to clear messages (need to refresh firebase after delete)
            $('.inbox-message').on('click', function (){
              $(this).remove();
            });
          });
        });

});//END DOCUMENT.READY
});