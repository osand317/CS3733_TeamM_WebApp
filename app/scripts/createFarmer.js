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
    const btnSignUpFarmer = document.getElementById("btnSignUpFarmer");
    const txtPosition = document.getElementById("txtPosition");

    fileImage.onchange = function() {
      document.getElementById('imageName').textContent = fileImage.files[0].name;
    };


        firebase.auth().onAuthStateChanged(firebaseUser =>{
            if (firebaseUser){
                console.log(firebaseUser);
                currentUserInfo(firebaseUser);
            }else {
                console.log('Not logged in');
                window.location = 'login.html'
            }
        });

        btnSignUpFarmer.addEventListener('click', e=> {
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
                        profileType: "Farmer",
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
                        window.location = 'profileCreation.html'
                    }).catch(function (error) {
                        console.log(error);
                    });
                    })
                }).catch(function (e) {
                console.log(e.message)
            });
        });
