const fileImage = document.getElementById('fileUserImage');
const farmerType = document.querySelector('#txtFarmerType');
const txtEmail = document.getElementById("txtEmail");
const txtPassword = document.getElementById("txtPassword");
const firstName = document.querySelector('#txtFirstName');
const lastName = document.querySelector('#txtLastName');
const idNumber = document.getElementById('txtIdNumber');
const address = document.getElementById('txtAddress');
const txtMoo = document.getElementById('txtMoo');
const subDistrict = document.getElementById('txtSubDistrict');
const district = document.getElementById('txtDistrict');
const province = document.getElementById('txtProvince');
const mobile = document.getElementById('txtMobile');
const zip = document.getElementById('txtZip');
const btnSignUpInspector = document.getElementById("btnSignUpInspector");
const newInspector = document.getElementById("btnInspector");

fileImage.onchange = function() {
  document.getElementById('imageName').textContent = fileImage.files[0].name;
};





        btnSignUpInspector.addEventListener('click', e=> {
            const txtFirstName = firstName.value;
            const txtLastName = lastName.value;
            const txtFarmer = farmerType.value;
            const email = txtEmail.value;
            const pass = txtPassword.value;
            const accountId = idNumber.value;
            const userAddress = address.value;
            const userMoo = txtMoo.value;
            const userSubDistrict = subDistrict.value;
            const userDistrict = district.value;
            const userProvince = province.value;
            const userMobile = mobile.value;
            const userZip = zip.value;
            const image = fileImage.files[0];
            const metadata = { contentType: image.type};
            const name = (+new Date()) + ' - ' + txtFirstName+ ' ' + txtLastName;
            var imageUrl = '';

            console.log("Creating firebase account");
            secondaryApp.auth().createUserWithEmailAndPassword(email, pass)
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
                        profileType: "Inspector",
                        profileImage: imageUrl,
                        inspectorType: txtFarmer,
                        firstName: txtFirstName,
                        lastName: txtLastName,
                        userEmail: email,
                        userId: accountId,
                        address: userAddress,
                        moo: userMoo,
                        subDistrict: userSubDistrict,
                        district: userDistrict,
                        province: userProvince,
                        mobile: userMobile,
                        zip: userZip,
                        profileId: docRef.uid
                    }).then(function () {
                        console.log("Status saved");
                        window.location = 'profileCreation.html'
                    }).catch(function (error) {
                        console.log(error);
                    });
                    })
                }).catch(function (e) {
                console.log(e.message)
            });
        });

        firebase.auth().onAuthStateChanged(firebaseUser =>{
            if (firebaseUser){
                console.log(firebaseUser);
                currentUserInfo(firebaseUser);
            }else {
                console.log('Not logged in');
                window.location = 'login.html'
            }
        });


        //
        // secondaryApp.auth().createUserWithEmailAndPassword("test@gmail.com", "password").then(function(firebaseUser) {
        //     console.log("User " + firebaseUser.uid + " created successfully!");
        //     //I don't know if the next statement is necessary
        //     secondaryApp.auth().signOut();
        // });
