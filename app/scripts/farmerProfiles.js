var usersRef = firestore.collection("users");
var farmer = [];
var profile = [];
var boxNum = 0;
var profileuserID;

// var btn = document.getElementById('addFarmer');
var selectedFarmers =[];
var content = "<table id='table' class='mdl-data-table mdl-js-data-table mdl-data-table--selectable mdl-shadow--2dp'><thead><tr><th class='mdl-data-table__cell--non-numeric'>Name</th><th>Email</th><th>Product</th><th>Mobile</th><th>Profile</th></tr></thead>";
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
      farmer.push(profile);
      profile = [];
    });
    // console.log(farmer);
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


function searchCallback() {
    // Declare variables
    var input, filter, table, tr, td, i, j;
    input = document.getElementById("searchFilter");
    filter = input.value.toUpperCase();
    table = document.getElementById("table");
    tr = table.getElementsByTagName("tr");

    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td");
        for (j = 0; j < td.length; j++) {
            if (td[j]) {
                if (td[j].innerHTML.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                    j = td.length; // If row should be shown, stop checking
                } else {
                    tr[i].style.display = "none";

                }
            }
        }
    }
}
