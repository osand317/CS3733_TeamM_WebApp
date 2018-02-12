

firebase.auth().onAuthStateChanged(firebaseUser =>{
    if (firebaseUser){
        // console.log(firebaseUser);
        profileViewUserInfo(firebaseUser);
    }else {
        console.log('Not logged in');
        window.location = 'login.html'
    }
});


function profileViewUserInfo(user) {
  var usersRef = firestore.collection("users");
  var query = usersRef.where("profileId", '==', user.uid).get()
  .then(function (querySnapShot) {
    querySnapShot.forEach(function(doc) {
        const userProfileName = doc.data().firstName;
        const userImage = doc.data().profileImage;
        const lastName = doc.data().lastName;
        const email = doc.data().userEmail;
        const mobile = doc.data().mobile;
        const profileType = doc.data().profileType;
        console.log(userProfileName);
        document.getElementById('userImage').src = userImage;
        document.getElementById('profileType').textContent = profileType;
        document.getElementById('firstName').textContent = userProfileName;
        document.getElementById('lastName').textContent = lastName;
        document.getElementById('email').textContent = email;
        document.getElementById('mobile').textContent = mobile;
    });
  })
};
