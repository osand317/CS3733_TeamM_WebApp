var previousPage = localStorage.getItem('Page');

firebase.auth().onAuthStateChanged(firebaseUser =>{
    if (firebaseUser){
        if (previousPage == '2') {
          profileuserID = localStorage.getItem("userID");
          profileViewUserInfo(profileuserID);
        } else {
          profileViewUserInfo(firebaseUser.uid);
        }
    }else {
        console.log('Not logged in');
        window.location = 'login.html'
    }
});


function profileViewUserInfo(userID) {
  console.log(userID);
  var usersRef = firestore.collection("users");
  var query = usersRef.where("profileId", '==', userID).get()
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
