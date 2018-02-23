// ------------------------- Firebase --------------------- //
var reportDisplay = document.querySelector("#reportDisplay");
var reportBody = document.querySelector("#reportBody");
var reportHeading = document.querySelector("#reportHeading");
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
var currentReports = [];
var allReports = [];
var allTableHeaders = [];
db.collection("reports").limit(50).onSnapshot(function(querySnapshot){
    allTableHeaders = [];
    reportBody.innerHTML = "";
    reportHeading.innerHTML = "";

    querySnapshot.forEach(function (doc) {
        getTableHeaders(doc);
        createTableRow(reportDisplay, doc.data(), doc.id);
        currentReports.push(doc);
        allReports.push(doc);
    });
    createTableHeading(reportDisplay);
    populateFilters();
    searchCallback();
});

// db.collection("users").limit(50).onSnapshot(function(querySnapshot){
//     allTableHeaders = [];
//     profileBody.innerHTML = "";
//     profileHeading.innerHTML = "";
//
//     querySnapshot.forEach(function (doc) {
//         getTableHeaders(doc);
//         createTableRow(profileDisplay, doc.data(), doc.id);
//         // currentReports.push(doc);
//         // allReports.push(doc);
//     });
//     createTableHeading(profileDisplay);
// });


function createTableRow(displayArea, data, id){
    if(displayArea === reportDisplay){
        var tbody = document.querySelector("#reportBody");
    }
    else if(displayArea === profileDisplay){
        var tbody = document.querySelector("#profileBody");
    }
    // let data = doc.data();
    let tr = document.createElement('tr');

    allTableHeaders.forEach(function(header){
        if (data) {
            let td = document.createElement('td');
            td.classList.add("mdl-data-table__cell--center");
            if (Object.keys(data).indexOf(header) > -1) {
                td.textContent = data[header];
                if (header === 'reportType' && currentSearchFilters.indexOf(data[header].toString()) === -1){
                    currentSearchFilters.push(data[header].toString());
                }
            }
            else {
                td.textContent = "";
            }
            tr.appendChild(td);
        }
    });
    // let td = document.createElement('td');
    // td.textContent = id;
    // tr.appendChild(td);
    tr.setAttribute("id", id);
    tbody.appendChild(tr);
}

function createTableHeading(displayArea) {
    if(displayArea === reportDisplay){
        var thead = document.querySelector("#reportHeading");
    }
    else if(displayArea === profileDisplay){
        var thead = document.querySelector("#profileHeading");
    }
    let tr = document.createElement('tr');
    allTableHeaders.forEach(function(header){
        let th = document.createElement('th');
        th.textContent = header;
        // th.classList.add("full-width");
        tr.appendChild(th);
    });
    thead.appendChild(tr);
}

function getTableHeaders(doc){
    let data = doc.data();
    let headers = Object.keys(data);
    headers.forEach(function(header){
        if (allTableHeaders.indexOf(header) === -1) allTableHeaders.push(header);
        // if (header in allTableHeaders) allTableHeaders.push(header);
    })
}

// function createTableRow(parent){
//     var tr = document.createElement('tr');
//     parent.appendChild(tr);
//     return tr;
// }
// function createTableEntry(value, tr){
//     var td = document.createElement('td');
//     td.classList.add("mdl-data-table__cell--center");
//     tr.appendChild(td);
//     td.textContent = value;
// }
// function createTableHeading(data, displayArea){
//     if(displayArea === reportDisplay){
//         var thead = document.querySelector("#reportHeading");
//     }
//     else if(displayArea === profileDisplay){
//         var thead = document.querySelector("#profileHeading");
//     }
//     displayArea.appendChild(thead);
//     var tr = createTableRow(thead);
//     // Loops through all of the keys in the object, creating a table heading for each one
//     var keyArray = Object.keys(data);
//     keyArray.forEach(function (key) {
//         var th = document.createElement('th');
//         th.textContent = key;
//         th.classList.add("full-width");
//         tr.appendChild(th);
//     });
//     var th = document.createElement('th');
//     th.textContent = 'ID';
//     tr.appendChild(th);
//
// }
// function createTableBody(data, displayArea, id){
//     if(displayArea === reportDisplay){
//         var tbody = document.querySelector("#reportBody");
//     }
//     else if(displayArea === profileDisplay){
//         var tbody = document.querySelector("#profileBody");
//     }
//     var tr = createTableRow(tbody);
//     // Loops through all of the values for the object, creating a table entry for each
//     var valueArray = Object.values(data);
//     valueArray.push(id);
//     valueArray.forEach(function(val){
//         createTableEntry(val, tr);
//     });
// }

// ------------------------- Graphs ---------------------- //
var ctx = document.getElementById('chart').getContext('2d');
// var times = [];
var points = [];
var dates = [];
function getChartData(fieldToPlot, startDate, endDate) {
    console.log(startDate, endDate);
    db.collection("reports").where('timestamp', '>=', startDate).where('timestamp', '<=', endDate).orderBy('timestamp').get()
        .then(function (snapshot) {
            // times.length = 0;
            points.length = 0;
            dates.length = 0;
            snapshot.forEach(function (doc) {
                let date = doc.data().timestamp.toString();
                date = date.split(':')[0] + ':' + date.split(':')[1];
                // console.log(date);
                dates.push(date);
                // console.log("going to push: ", Number(doc.data()[fieldToPlot]));
                points.push(Number(doc.data()[fieldToPlot]));
                // console.log("points array: ", points);
            });
            chart.update();
        });
}

var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
        // labels: ["January", "February", "March", "April", "May", "June", "July"],
        labels: dates,
        datasets: [{
            label: "Yield",
            // backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            // data: [0, 10, 5, 2, 20, 30, 45],
            data: points,
        }]
    },

    // Configuration options go here
    options: {}
});

var startDate;
var endDate;
document.querySelector('#startDate').addEventListener('change', function(){
    startDate = new Date(this.value);
});
document.querySelector('#endDate').addEventListener('change', function(){
    endDate = new Date(this.value);
});
document.querySelector('#dateRangeBtn').addEventListener('click', function(){
    getChartData('Height', startDate, endDate);
});

document.querySelector("#Yield").addEventListener("click", function(){
    getChartData('Yield');
    // addData(chart, dates, points);
});
document.querySelector("#Block-No").addEventListener("click", function(){
    getChartData('Block-No');
    // addData(chart, dates, points);
});

window.onload = function(){
    let initialStartDate = new Date('0');
    let initialEndDate = new Date(Date());
    getChartData('Height', initialStartDate, initialEndDate);
};


// ------------------------- Download ---------------------- //
function getDataAndDownload() {
    // console.log("getting data");
    // db.collection("reports").get()
    //     .then(function(snapshot){
    //         var data = [];
    //         snapshot.forEach(function(doc){
    //             data.push(doc.data());
    //             // console.log(doc.data());
    //         });
    //         downloadCSV({data: data, filename: "reports.csv"});
    //     })
    var data = [];
    currentReports.forEach(function(doc){
        data.push(doc.data());
    })
    downloadCSV({data: data, filename: "reports.csv"});
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
// window.onload = function() {
//     var startPos;
//     var geoOptions = {
//         maximumAge: 5 * 60 * 1000,
//         timeout: 10 * 1000
//     };
//     var geoSuccess = function(position) {
//         startPos = position;
//         document.getElementById('startLat').innerHTML = startPos.coords.latitude;
//         document.getElementById('startLon').innerHTML = startPos.coords.longitude;
//         map.setAttribute("src", getMapUrl());
//     };
//     var geoError = function(error) {
//         console.log('Error occurred. Error code: ' + error.code);
//         // error.code can be:
//         //   0: unknown error
//         //   1: permission denied
//         //   2: position unavailable (error response from location provider)
//         //   3: timed out
//     };
//     navigator.geolocation.getCurrentPosition(geoSuccess, geoError, geoOptions);
// };
//
// // Creates url to call Google Maps API
// function getMapUrl(){
//     var url = "https://www.google.com/maps/embed/v1/view?key=AIzaSyAskkxEXqXBV0mDVQgzoT3LTWbYhNgfe2w&center=" +
//         document.getElementById('startLat').innerHTML +
//         "," +
//         document.getElementById('startLon').innerHTML +
//
//         "&zoom=18&maptype=satellite";
//     // console.log(url);
//     return url;
//
// }
// ------------------------- Search Stuff ---------------------- //
var searchBy = document.getElementById("searchByUL");

// Create list of filters in dropdown
function populateFilters() {
    currentSearchFilters.forEach(function(filterName) {
        var li = document.createElement("li");
        li.textContent = filterName;
        li.setAttribute("class", "mdl-menu__item");
        var cb = document.createElement('input');
        cb.setAttribute("onclick", 'toggleFilter(this.textContent);');
        cb.type = 'checkbox';
        cb.checked = true;
        li.appendChild(cb);
        searchBy.appendChild(li);

    });

}

// function createSingleFilter(idNum){
//     var cb = document.createElement('input');
//     cb.type = 'checkbox';
//     cb.checked = true;
//     cb.id = 'checkbox' + idNum;
//
//
//     var label = document.createElement('label');
//
// }

// Callback function to toggle a filter when it is clicked
var currentSearchFilters = [];
function toggleFilter(filterName) {
    if(currentSearchFilters.indexOf(filterName) === -1){
        currentSearchFilters.push(filterName);
    }
    else {
        currentSearchFilters.splice(currentSearchFilters.indexOf(filterName), 1);
    }
    // console.log(currentSearchFilters);
    searchCallback();
}

// Check if a result should be shown based on whether or not its filter is currently active
function shouldBeShown(i){
    let table = reportDisplay;
    // let reportTypeIndex = table.rows[0].cells.indexOf('reportType');
    let reportTypeIndex = (function(){
        for (let k = 0, cell; cell = table.rows[0].cells[k]; k++) {
            if (cell.textContent === 'reportType') return k;
        }
    })();
    let currentReportType = table.rows[i].cells[reportTypeIndex].textContent;
    return (currentSearchFilters.indexOf(currentReportType) > -1);
}

// Iterates through table and hides those that shouldn't be shown, based on search term and filters
function searchCallback() {
    // Declare variables
    var input, filter, table, tr, td;
    input = document.getElementById("searchFilter");
    filter = input.value.toUpperCase();
    table = document.getElementById("reportDisplay");
    tr = table.getElementsByTagName("tr");

    // Loop through all table rows, and hide those who don't match the search query
    for (var i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td");
        for (var j = 0; j < td.length; j++) {
            // if (td[j]) {
                if (td[j].innerHTML.toUpperCase().indexOf(filter) > -1 && shouldBeShown(i)) {
                    tr[i].style.display = "";
                    let reportID = tr[i].getAttribute('id');
                    let report = allReports.find(o => o.id === reportID);
                    if(currentReports.indexOf(report) === -1){
                        currentReports.push(report);
                    }
                    j = td.length; // If row should be shown, stop checking
                } else {
                    tr[i].style.display = "none";
                    let reportID = tr[i].getAttribute('id');
                    let report = allReports.find(o => o.id === reportID);
                    // console.log(td[j].getAttribute('id'));
                    let index = currentReports.indexOf(report);
                    if(index > -1){
                        currentReports.splice(index, 1);
                    }
                }
            // }
        }
    }
    // console.log(currentReports);
}
