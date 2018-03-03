// App shell functionality. Should be included on every page.

    const btnLogOut = document.getElementById("btnLogOut");
    const btnProfile = document.getElementById('showProfile');
    const btnFarmerAssign = document.getElementById('farmerAssign');
    const btnAccountCreate = document.getElementById('accountCreate');
    const btnFormFill = document.getElementById('fillForm');
    const btnFamilyInfo = document.getElementById("btnFamilyInfo");
    var currentUser = localStorage.getItem("currentUser");
    var userDocument = localStorage.getItem("userDocument");
    var userType = localStorage.getItem("userType");
    var userID = '';
    var productType = localStorage.getItem("productType");
    var waitingVariable = false;
    var usersRef = firestore.collection("users");

    btnProfile.addEventListener('click', e=>{
      localStorage.setItem('Page', '1');
      window.location = 'profileView.html';
    });

    btnLogOut.addEventListener('click', e=> {
        localStorage.clear();
        firebase.auth().signOut();
    });

    btnFamilyInfo.addEventListener('click', e=>{
      window.location = "familyInfo.html";
    });

    firebase.auth().onAuthStateChanged(firebaseUser =>{
        if (firebaseUser){
            // console.log(firebaseUser);
            currentUser = firebaseUser;
            localStorage.setItem("currentUser",currentUser);
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
            localStorage.setItem("userDocument",userDocument);
            userType = doc.data().profileType;
            localStorage.setItem("userType", userType);
            if (userType == 'Farmer') {
              console.log('Farmer');
              productType = doc.data().farmerType;
              localStorage.setItem("productType",productType);
            }else if (userType == 'Inspector') {
              productType = doc.data().inspectorType;
              localStorage.setItem("productType",productType);
            }
            displayOption();
            waitingVariable = true;
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
  } else {
    btnFormFill.classList.add('disabled');
    btnFormFill.style.display = "none";
  }
};


function accessManage() {
  if (productType == 'Rice') {
    window.location = "/riceForm.html";
  } else if (productType == 'Chia Seed') {
    window.location = "/chiaForm.html";
  } else if (productType == 'Egg') {
    window.location = "/eggForm.html";
  } else if (productType == 'Coconut') {
    window.location = "/coconutForm.html";
  }
};
