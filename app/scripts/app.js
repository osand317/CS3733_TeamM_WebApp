    const fileImage = document.getElementById('fileUserImage');
    const txtEmail = document.getElementById("txtEmail");
    const txtPassword = document.getElementById("txtPassword");
    const firstName = document.querySelector('#txtFirstName');
    const lastName = document.querySelector('#txtLastName');
    const mobile = document.getElementById('txtMobile');
    const btnSignUpEmployee = document.getElementById("btnSignUpEmployee");
    const newEmployee = document.getElementById("btnEmployee");
    const txtPosition = document.getElementById("txtPosition");

    fileImage.onchange = function() {
      document.getElementById('imageName').textContent = fileImage.files[0].name;
    };


    btnSignUpEmployee.addEventListener('click', e=> {
        const txtFirstName = firstName.value;
        const txtLastName = lastName.value;
        const email = txtEmail.value;
        const pass = txtPassword.value;
        const userPosition = txtPosition.value;
        const userMobile = mobile.value;
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
                    profileType: "Employee",
                    profileImage: imageUrl,
                    firstName: txtFirstName,
                    lastName: txtLastName,
                    userEmail: email,
                    position: userPosition,
                    mobile: userMobile,
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
