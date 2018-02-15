var usersRef = firestore.collection("users");
var farmers = [];
var profile = [];
var boxNum = 0;
var btn = document.getElementById('addFarmer');
var selectedFarmers =[];
var content = "<table id='table' class='mdl-data-table mdl-js-data-table mdl-data-table--selectable mdl-shadow--2dp'><thead><tr><th class='mdl-data-table__cell--non-numeric'>Name</th><th>Email</th><th>Product</th><th>Mobile</th><th>Select</th></tr></thead>";
usersRef.where("profileType", "==", "Farmer")
  .get()
  .then(function (querySnapShot) {
    querySnapShot.forEach(function (doc) {
      profile.push(doc.data().firstName);
      profile.push(doc.data().lastName);
      profile.push(doc.data().userEmail);
      profile.push(doc.data().farmerType);
      profile.push(doc.data().mobile);
      profile.push(doc.data().profileId);
      generateTable();
      boxNum++;
      farmers.push(profile);
      profile = [];
    });
    // console.log(farmers);
    document.getElementById('table').innerHTML = "<tbody>" + content + "</tbody></table>";
  })
  .catch(function (error) {
    console.log(error);
  });


function generateTable() {
  content = content + "<tr>";
  content = content + "<td class='mdl-data-table__cell--non-numeric'>" + profile[0] + " " + profile[1] + "</td>";
  content = content + "<td>" + profile[2] + "</td>";
  content = content + "<td>" + profile[3] + "</td>";
  content = content + "<td>" + profile[4] + "</td>";
  content = content + "<td>" + "<input id=box"+ boxNum + " type='checkbox'>" + "</td>";
  content = content + "</tr>";
  // console.log(content);
};

function checkForSelection() {
  for (var i = 0; i < farmers.length; i++) {
    if (document.getElementById('box'+i).checked) {
      selectedFarmers.push(farmers[i][5]);
  }

  // console.log(selectedFarmers);
}
var documentRef = usersRef.doc(userDocument);
documentRef.update({
      farmersID: selectedFarmers
    }).then(function () {
      console.log("Saved");
    })
    .catch(function (error) {
    console.log(error);
  });
};

btn.addEventListener('click', e=>{
  checkForSelection();
});
