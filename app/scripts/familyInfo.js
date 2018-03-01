var usersRef = firestore.collection("users");
var documentRef = usersRef.doc(userDocument);



function getFamilyInfo() {

  documentRef.update({
        maritalStatus: document.getElementById('maritalStatus').value,
        familySize: document.getElementById('familySize').value,
        numElderly: document.getElementById('numElderly').value,
        numChildren: document.getElementById('numChildren').value
      }).then(function () {
        console.log("Saved");
        window.location = "index.html";
      })
      .catch(function (error) {
      console.log(error);
    });
  };
