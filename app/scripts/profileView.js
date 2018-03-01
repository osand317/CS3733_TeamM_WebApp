var previousPage = localStorage.getItem('Page');
var btnCheckIn = document.getElementById('checkIn');


firebase.auth().onAuthStateChanged(firebaseUser =>{
    if (firebaseUser){
        if (previousPage == '2') {
          profileuserID = localStorage.getItem("userID");
          profileViewUserInfo(profileuserID);
        } else {
          profileuserID = firebaseUser.uid;
          profileViewUserInfo(profileuserID);
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
        const familySize = doc.data().familySize;
        const maritalStatus = doc.data().maritalStatus;
        const numElderly = doc.data().numElderly;
        const numChildren = doc.data().numChildren;
        document.getElementById('userImage').src = userImage;
        document.getElementById('profileType').textContent = profileType;
        document.getElementById('firstName').textContent = userProfileName;
        document.getElementById('lastName').textContent = lastName;
        document.getElementById('email').textContent = email;
        document.getElementById('mobile').textContent = mobile;
        document.getElementById('maritalStatus').textContent = maritalStatus;
        document.getElementById('familySize').textContent = familySize;
        document.getElementById('numElderly').textContent = numElderly;
        document.getElementById('numChildren').textContent = numChildren;
        if ((profileType == 'Inspector') && (userType == 'Employee')) {
          btnCheckIn.innerHTML = "<input class='mdl-button mdl-js-button mdl-button--raised mdl-button--colored' onclick='viewCheckIn();' type=button value='Show Check-in'>";
        }
    });
  });
};

function viewCheckIn() {
  console.log("working");
  localStorage.setItem('Page', 'CheckIn');
  window.location = "checkInWindow.html";
};
