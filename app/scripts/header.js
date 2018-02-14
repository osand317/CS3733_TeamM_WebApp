    const btnLogOut = document.getElementById("btnLogOut");
    const btnProfile = document.getElementById('showProfile');
    var currentUser = '';

    btnProfile.addEventListener('click', e=>{
      window.location = 'profileView.html';
    });

    btnLogOut.addEventListener('click', e=> {
        firebase.auth().signOut();
    });

    firebase.auth().onAuthStateChanged(firebaseUser =>{
        if (firebaseUser){
            // console.log(firebaseUser);
            currentUser = firebaseUser;
            currentUserInfo(firebaseUser);
        }else {
            console.log('Not logged in');
            window.location = 'login.html'
        }
    });


    function currentUserInfo(user) {
      var usersRef = firestore.collection("users");
      var query = usersRef.where("profileId", '==', user.uid).get()
      .then(function (querySnapShot) {
        querySnapShot.forEach(function(doc) {
            const userProfileName = doc.data().firstName;
            // console.log(userProfileName);
            document.getElementById('labelUserProfile').textContent = userProfileName + '  ';
        });
      })
    };
