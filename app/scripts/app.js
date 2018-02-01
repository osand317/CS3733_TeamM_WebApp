(function () {
    var config = {
        apiKey: "AIzaSyAc5zOr-2Pt0dKzoU61Hv68vb4ealPgjyQ",
        authDomain: "pwagram-82371.firebaseapp.com",
        databaseURL: "https://pwagram-82371.firebaseio.com",
        projectId: "pwagram-82371",
        storageBucket: "pwagram-82371.appspot.com",
        messagingSenderId: "953557656666"
    };
    firebase.initializeApp(config);

    var firestore = firebase.firestore();
    var storage = firebase.storage().ref();

    const fileImage = document.getElementById('fileUserImage');
    const farmerType = document.querySelector('#txtFarmerType');
    const contractNumber = document.getElementById('txtContractNumber');
    const txtEmail = document.getElementById("txtEmail");
    const txtPassword = document.getElementById("txtPassword");
    const firstName = document.querySelector('#txtFirstName');
    const lastName = document.querySelector('#txtLastName');
    const idNumber = document.getElementById('txtIdNumber');
    const village = document.getElementById('txtVillage');
    const address = document.getElementById('txtAddress');
    const txtMoo = document.getElementById('txtMoo');
    const subDistrict = document.getElementById('txtSubDistrict');
    const district = document.getElementById('txtDistrict');
    const province = document.getElementById('txtProvince');
    const mobile = document.getElementById('txtMobile');
    const area = document.getElementById('txtArea');
    const btnSignUp = document.getElementById("btnSignUp");
    const btnLogIn = document.getElementById("btnLogIn");
    const btnLogOut = document.getElementById("btnLogOut");



    fileImage.onchange = function() {
      document.getElementById('imageName').textContent = fileImage.files[0].name;
    };

    //
    // btnLogIn.addEventListener('click', e=> {
    //     const email = txtEmail.value;
    //     const pass = txtPassword.value;
    //     const auth = firebase.auth();
    //     const promise = auth.signInWithEmailAndPassword(email, pass);
    //     promise.catch(e=> console.log(e.message));
    //
    // });


    btnSignUp.addEventListener('click', e=> {
        const txtFirstName = firstName.value;
        const txtLastName = lastName.value;
        const txtFarmer = farmerType.value;
        const userContractNumber = contractNumber.value;
        const email = txtEmail.value;
        const pass = txtPassword.value;
        const accountId = idNumber.value;
        const villageName = village.value;
        const userAddress = address.value;
        const userMoo = txtMoo.value;
        const userSubDistrict = subDistrict.value;
        const userDistrict = district.value;
        const userProvince = province.value;
        const userMobile = mobile.value;
        const userArea = area.value;
        const image = fileImage.files[0];
        const metadata = { contentType: image.type};
        const name = (+new Date()) + ' - ' + txtFirstName+ ' ' + txtLastName;
        var imageUrl = '';

        console.log("Creating firebase account");
        const auth = firebase.auth();
        auth.createUserWithEmailAndPassword(email, pass)
            .then(function (docRef) {
              console.log('Storing user information');
              console.log('User ID', docRef.uid);
              const task = storage.child(name).put(image, metadata);
              task.on('state_changed', function(snapshot){
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                  case firebase.storage.TaskState.PAUSED: // or 'paused'
                    console.log('Upload is paused');
                    break;
                  case firebase.storage.TaskState.RUNNING: // or 'running'
                    console.log('Upload is running');
                    break;
                }
                }, function(error) {
                // Handle unsuccessful uploads
                }, function() {
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                imageUrl = task.snapshot.downloadURL
                console.log(imageUrl);
                firestore.collection('users').add({
                    profileImage: imageUrl,
                    farmerType: txtFarmer,
                    contractNumber: userContractNumber,
                    firstName: txtFirstName,
                    lastName: txtLastName,
                    userEmail: email,
                    userId: accountId,
                    village: villageName,
                    address: userAddress,
                    moo: userMoo,
                    subDistrict: userSubDistrict,
                    district: userDistrict,
                    province: userProvince,
                    mobile: userMobile,
                    area: userArea,
                    profileId: docRef.uid
                }).then(function () {
                    console.log("Status saved");
                }).catch(function (error) {
                    console.log(error);
                });
                })
            }).catch(function (e) {
            console.log(e.message)
        });
    });

    btnLogOut.addEventListener('click', e=> {
        firebase.auth().signOut();
    });

    firebase.auth().onAuthStateChanged(firebaseUser =>{
        if (firebaseUser){
            console.log(firebaseUser);
            currentUserInfo(firebaseUser);
        }else {
            console.log('Not logged in');
            window.location = 'main.html'
        }
    });

    function writeNewPost(uid, username) {
        // A post entry.
        var postData = {
            author: username,
            uid: uid
        };

        // Get a key for a new Post.
        var newPostKey = firebase.database().ref().child('posts').push().key;

        // Write the new post's data simultaneously in the posts list and the user's post list.
        var updates = {};
        updates['/posts/' + newPostKey] = postData;
        return firebase.database().ref().update(updates);
    };

    function currentUserInfo(user) {
      var usersRef = firestore.collection("users");
      var query = usersRef.where("profileId", '==', user.uid).get()
      .then(function (querySnapShot) {
        querySnapShot.forEach(function(doc) {
            const userProfileName = doc.data().firstName;
            console.log(userProfileName);
            document.getElementById('labelUserProfile').textContent = userProfileName;
        });
      })
    };

} ());
// Initialize Firebase
