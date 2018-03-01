// ------------------------- Firebase --------------------- //
var reportDisplay = document.querySelector("#reportDisplay");
var reportBody = document.querySelector("#reportBody");
var reportHeading = document.querySelector("#reportHeading");
var map = document.querySelector("#map");

// ------------------------- Tables ---------------------- //
var currentReports = [];
var allReports = [];
var allTableHeaders = [];
var reportsRef;

// Recreate table whenever report database updates
if (localStorage.getItem("userType") == 'Farmer') {
  reportsRef = firestore.collection("reports").where("userID", '==', localStorage.getItem("currentUser"));
} else if (localStorage.getItem("userType") == 'Inspector') {
  reportsRef = firestore.collection("reports").where("inspectorID", '==', localStorage.getItem("currentUser"));
} else {
  reportsRef = firestore.collection("reports");
}
reportsRef.onSnapshot(function(querySnapshot){
    allTableHeaders = [];
    reportBody.innerHTML = "";
    reportHeading.innerHTML = "";
    querySnapshot.forEach(function (doc) {
        getTableHeaders(doc);
        createTableRow(doc.data(), doc.id);
        currentReports.push(doc);
        allReports.push(doc);
    });
    createTableHeading();
    populateFilters();
    searchCallback();
});

function createTableRow(data, id){
    var tbody = document.querySelector("#reportBody");
    let tr = document.createElement('tr');

    allTableHeaders.forEach(function(header){
        if (data) {
            let td = document.createElement('td');
            td.classList.add("mdl-data-table__cell--center");
            if (Object.keys(data).indexOf(header) > -1) {
                td.textContent = data[header];
                //Get report types for use as filters
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
    tr.setAttribute("id", id);
    tbody.appendChild(tr);
}

function createTableHeading() {
    var thead = document.querySelector("#reportHeading");
    let tr = document.createElement('tr');
    allTableHeaders.forEach(function(header){
        let th = document.createElement('th');
        th.textContent = header;
        tr.appendChild(th);
    });
    thead.appendChild(tr);
}

function getTableHeaders(doc){
    let data = doc.data();
    let headers = Object.keys(data);
    headers.forEach(function(header){
        if (allTableHeaders.indexOf(header) === -1) allTableHeaders.push(header);
    })
}


// ------------------------- Graphs ---------------------- //
// Using chart.js

var ctx = document.getElementById('chart').getContext('2d');
var points = [];
var dates = [];
function getChartData(fieldToPlot, startDate, endDate) {
    firestore.collection("reports").where('timestamp', '>=', startDate).where('timestamp', '<=', endDate).orderBy('timestamp').get()
        .then(function (snapshot) {
            points.length = 0;
            dates.length = 0;
            snapshot.forEach(function (doc) {
                let date = doc.data().timestamp.toString();
                date = date.split(':')[0] + ':' + date.split(':')[1];
                dates.push(date);
                points.push(Number(doc.data()[fieldToPlot]));
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
            label: "Data",
            // backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(247, 170, 78)',
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
document.querySelector("#Height").addEventListener("click", function(){
    getChartData('Height');
    // addData(chart, dates, points);
});

// Set default date ranges
window.onload = function(){
    let initialStartDate = new Date('0');
    let initialEndDate = new Date(Date());
    getChartData('Height', initialStartDate, initialEndDate);
};

// ------------------------- Download ---------------------- //
function getDataAndDownload() {
    var data = [];
    currentReports.forEach(function(doc){
        data.push(doc.data());
    });
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

// ------------------------- Search Stuff ---------------------- //
var searchBy = document.getElementById("searchByUL");

// Create list of filters in dropdown
function populateFilters() {
    currentSearchFilters.forEach(function(filterName) {
        var li = document.createElement("li");
        li.textContent = filterName;
        li.setAttribute("class", "mdl-menu__item");
        var cb = document.createElement('input');
        cb.setAttribute("onclick", 'toggleFilter(this.parentElement.textContent);');
        cb.type = 'checkbox';
        cb.checked = true;
        li.appendChild(cb);
        searchBy.appendChild(li);

    });
}

// Callback function to toggle a filter when it is clicked
var currentSearchFilters = [];
function toggleFilter(filterName) {
    if(currentSearchFilters.indexOf(filterName) === -1){
        currentSearchFilters.push(filterName);
    }
    else {
        currentSearchFilters.splice(currentSearchFilters.indexOf(filterName), 1);
    }
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
                    let index = currentReports.indexOf(report);
                    if(index > -1){
                        currentReports.splice(index, 1);
                    }
                }
        }
    }
}
