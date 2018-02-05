// ------------------------- Firebase --------------------- //
var reportDisplay = document.querySelector("#reportDisplay");
var profileDisplay = document.querySelector("#profileDisplay");
var map = document.querySelector("#map");
// var searchBtn = document.querySelector("#searchBtn");
// var form = document.querySelector("form");

var config = {
    apiKey: "AIzaSyCFWzxl0VLYePJ-5O8U5umWWNJLT7TG9Fo",
    authDomain: "urmatt-app.firebaseapp.com",
    databaseURL: "https://urmatt-app.firebaseio.com",
    projectId: "urmatt-app",
    storageBucket: "urmatt-app.appspot.com",
    messagingSenderId: "523826665141"
};
if(!firebase.apps.length){
    firebase.initializeApp(config);
}
var db = firebase.firestore();

// search for report with matching num of eggs
// function searchDB(query){
//     db.collection("reports").where("eggs", "==", query.toString()).get()
//         .then(function(querySnapshot) {
//             querySnapshot.forEach(function(doc) {
//                 // doc.data() is never undefined for query doc snapshots
//                 console.log(doc.id, " => ", doc.data());
//             });
//         })
//         .catch(function(error) {
//             console.log("Error getting documents: ", error);
//         });
// }
//
// searchBtn.addEventListener("click", function(e){
//     e.preventDefault();
//     var query = form.query.value;
//     searchDB(query);
//     form.reset();
// });

// ------------------------- Tables ---------------------- //
// Update list of reports whenever the database changes
db.collection("reports").limit(50).onSnapshot(function(querySnapshot){
    // reportDisplay.innerHTML = "";
    var needsHeading = true;
    querySnapshot.forEach(function (doc) {
        if(needsHeading){createTableHeading(doc.data(), reportDisplay)}
        needsHeading = false;
        createTableBody(doc.data(), reportDisplay);
    });
});

//Update list of profiles whenever the database changes
db.collection("profiles").limit(50).onSnapshot(function(querySnapshot){
    // reportDisplay.innerHTML = "";
    var needsHeading = true;
    querySnapshot.forEach(function (doc) {
        if(needsHeading){createTableHeading(doc.data(), profileDisplay)}
        needsHeading = false;
        createTableBody(doc.data(), profileDisplay);
    });
});

function createTableRow(parent){
    var tr = document.createElement('tr');
    parent.appendChild(tr);
    return tr;
}
function createTableEntry(value, tr){
    var td = document.createElement('td');
    tr.appendChild(td);
    td.textContent = value;
}
function createTableHeading(data, displayArea){
    if(displayArea === reportDisplay){
        var thead = document.querySelector("#reportHeading");
    }
    else if(displayArea === profileDisplay){
        var thead = document.querySelector("#profileHeading");
    }
    displayArea.appendChild(thead);
    var tr = createTableRow(thead);
    // Loops through all of the keys in the object, creating a table heading for each one
    var keyArray = Object.keys(data);
    keyArray.forEach(function (key) {
        var th = document.createElement('th');
        th.textContent = key;
        tr.appendChild(th);
    });
}
function createTableBody(data, displayArea){
    if(displayArea === reportDisplay){
        var tbody = document.querySelector("#reportBody");
    }
    else if(displayArea === profileDisplay){
        var tbody = document.querySelector("#profileBody");
    }
    var tr = createTableRow(tbody);
    // Loops through all of the values for the object, creating a table entry for each
    var valueArray = Object.values(data);
    valueArray.forEach(function(val){
        createTableEntry(val, tr);
    });
}

// ------------------------- Graphs ---------------------- //
// Setup for chart
google.charts.load('current', {'packages':['line']});
// google.charts.setOnLoadCallback(drawChart);

function drawChart(eggData) {
    var data = new google.visualization.DataTable();
    data.addColumn('number', 'Date');
    data.addColumn('number', 'Eggs');

    var timeStampedEggs = [];
    for(var i=0; i < eggData.length; i++){
        var entry = [];
        entry.push(i);
        entry.push(eggData[i]);
        timeStampedEggs.push(entry);
    }

    data.addRows(timeStampedEggs);

    var options = {
        chart: {
            // title: 'Eggs'
            // subtitle: 'in millions of dollars (USD)'
        },
        colors: ['#39b524'],
        width: 900,
        height: 600
    };
    var chart = new google.charts.Line(document.getElementById('linechart_material'));

    chart.draw(data, google.charts.Line.convertOptions(options));
}

// Redraw chart whenever data in reports changes
db.collection("reports").onSnapshot(function (querySnapshot) {
    var data = [];
    querySnapshot.forEach(function (doc) {
        data.push(doc.data().eggs);
    });
    drawChart(data);
});

// ------------------------- Download ---------------------- //
function getDataAndDownload() {
    console.log("getting data")
    db.collection("reports").get()
        .then(function(snapshot){
            var data = [];
            snapshot.forEach(function(doc){
                data.push(doc.data());
            })
            downloadCSV({data: data, filename: "reports.csv"});
        })
}
function convertArrayOfObjectsToCSV(args) {
    var result, ctr, keys, columnDelimiter, lineDelimiter, data;

    data = args.data || null;
    if (data == null || !data.length) {
        return null;
    }

    columnDelimiter = args.columnDelimiter || ',';
    lineDelimiter = args.lineDelimiter || '\n';

    keys = Object.keys(data[0]);

    result = '';
    result += keys.join(columnDelimiter);
    result += lineDelimiter;

    data.forEach(function(item) {
        ctr = 0;
        keys.forEach(function(key) {
            if (ctr > 0) result += columnDelimiter;

            result += item[key];
            ctr++;
        });
        result += lineDelimiter;
    });

    return result;
}
function downloadCSV(args) {
    var data, filename, link;
    data = args.data;
    var csv = convertArrayOfObjectsToCSV({
        data: data
    });
    if (csv == null) return;

    filename = args.filename || 'export.csv';

    if (!csv.match(/^data:text\/csv/i)) {
        csv = 'data:text/csv;charset=utf-8,' + csv;
    }
    data = encodeURI(csv);

    link = document.createElement('a');
    link.setAttribute('href', data);
    link.setAttribute('download', filename);
    link.click();
}

// ------------------------- GPS ---------------------- //
// Gets lat and long with geolocation api, sets map center to current location
window.onload = function() {
    var startPos;
    var geoSuccess = function(position) {
        startPos = position;
        document.getElementById('startLat').innerHTML = startPos.coords.latitude;
        document.getElementById('startLon').innerHTML = startPos.coords.longitude;
        map.setAttribute("src", getMapUrl());
    };
    navigator.geolocation.getCurrentPosition(geoSuccess);
};

// Creates url to call Google Maps API
function getMapUrl(){
    var url = "https://www.google.com/maps/embed/v1/view?key=AIzaSyAskkxEXqXBV0mDVQgzoT3LTWbYhNgfe2w&center=" +
        document.getElementById('startLat').innerHTML +
        "," +
        document.getElementById('startLon').innerHTML +

        "&zoom=18&maptype=satellite";
    console.log(url);
    return url;

}