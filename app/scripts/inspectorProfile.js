var usersRef = firestore.collection("users");
var inspector = [];
var profile = [];
var boxNum = 0;
var profileuserID;

// var btn = document.getElementById('addFarmer');
var selectedInspectors =[];
var content = "<table id='table' class='mdl-data-table mdl-js-data-table mdl-data-table--selectable mdl-shadow--2dp'><thead><tr><th class='mdl-data-table__cell--non-numeric'>Name</th><th>Email</th><th>Product</th><th>Mobile</th><th>Profile</th></tr></thead>";
usersRef.where("profileType", "==", "Inspector")
  .get()
  .then(function (querySnapShot) {
    querySnapShot.forEach(function (doc) {
      profile.push(doc.data().firstName);
      profile.push(doc.data().lastName);
      profile.push(doc.data().userEmail);
      profile.push(doc.data().inspectorType);
      profile.push(doc.data().mobile);
      profile.push(doc.data().profileId);
      generateTable();
      boxNum++;
      inspector.push(profile);
      profile = [];
    });
    // console.log(inspector);
    document.getElementById('table').innerHTML = "<tbody>" + content + "</tbody></table>";
    checkForSelection();
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
  content = content + "<td>" + "<a onclick='assignValue(" +'"' + profile[5]+ '"' + ");'><i class='material-icons' id='box"+ boxNum + "'>perm_identity </i></a>" + "</td>";
  content = content + "</tr>";
  // console.log(content);
};

function assignValue(info){
  profileuserID = info;
  console.log(info);
  localStorage.setItem('Page', '2');
  localStorage.setItem("userID", profileuserID);
  window.location = "profileView.html";
};

// function checkForSelection() {
//   var j =0;
//   for (var i = 0; i < inspector.length; i++) {
//     document.getElementById('box'+i).addEventListener('click', e=>{
//       // profileuserID = inspector[i][5];
//       console.log(e);
//     });
//     j++;
  // console.log(selectedInspectors);
// }
// var documentRef = usersRef.doc(userDocument);
// documentRef.update({
//       inspectorID: selectedInspectors
//     }).then(function () {
//       console.log("Saved");
//     })
//     .catch(function (error) {
//     console.log(error);
//   });
// };
//
// btn.addEventListener('click', e=>{
//   checkForSelection();
// });
