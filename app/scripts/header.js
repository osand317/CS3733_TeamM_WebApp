    const btnLogOut = document.getElementById("btnLogOut");
    const btnProfile = document.getElementById('showProfile');
    const btnFarmerAssign = document.getElementById('farmerAssign');
    const btnAccountCreate = document.getElementById('accountCreate');
    var currentUser = '';
    var userDocument = '';
    var userType = '';
    var userID = '';
    var eggFarmer = [];
    var chiaFarmer = [];
    var coconutFarmer = [];
    var riceFarmer = [];

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
      userID = user.uid;
      var query = usersRef.where("profileId", '==', user.uid).get()
      .then(function (querySnapShot) {
        querySnapShot.forEach(function(doc) {
            const userProfileName = doc.data().firstName;
            userDocument = doc.id;
            userType = doc.data().profileType;
            displayOption();
            // console.log(userProfileName);
            document.getElementById('labelUserProfile').textContent = userProfileName + '  ';
        });
      })
    };

function displayOption() {
  if (userType == 'Farmer') {
    btnFarmerAssign.classList.add('disabled');
    btnFarmerAssign.style.display = "none";
    btnAccountCreate.classList.add('disabled');
    btnAccountCreate.style.display = "none";
  } else if (userType == 'Inspector') {
    btnAccountCreate.classList.add('disabled');
    btnAccountCreate.style.display = "none";
  }
};
