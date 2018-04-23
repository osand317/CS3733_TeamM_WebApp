var openTable = document.querySelector("#openTable");
var openTableHeading = document.querySelector("#openTableHeading");
var openTableBody = document.querySelector("#openTableBody");
var closedTable = document.querySelector("#closedTable");
var closedTableHeading = document.querySelector("#closedTableHeading");
var closedTableBody = document.querySelector("#closedTableBody");

var currentReports = [];
var allReports = [];
var allTableHeaders = [];
var requestsRef;

requestsRef = firestore.collection("requests");

requestsRef.onSnapshot(function(querySnapshot){
    console.log("updating");
    allTableHeaders = [];
    clearTables();
    querySnapshot.forEach(function (doc) {
        getTableHeaders(doc);
        createTableRow(doc.data(), doc.id);
        // currentReports.push(doc);
        // allReports.push(doc);
    });
    createTableHeading();
    // populateFilters();
    // searchCallback();
});

function createTableRow(data, id){
    var tbody = document.querySelector("#openTableBody");
    let tr = document.createElement('tr');

    allTableHeaders.forEach(function(header){
        if (data) {
            let td = document.createElement('td');
            td.classList.add("mdl-data-table__cell--center");
            if (Object.keys(data).indexOf(header) > -1) {
                td.textContent = data[header];
                //Get report types for use as filters
                // if (header === 'reportType' && currentSearchFilters.indexOf(data[header].toString()) === -1){
                //     currentSearchFilters.push(data[header].toString());
                // }
            }
            else {
                td.textContent = "";
            }
            tr.appendChild(td);
        }
    });
    // tr.setAttribute("id", id);
    tbody.appendChild(tr);
}

function createTableHeading() {
    var thead = document.querySelector("#openTableHeading");
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

function clearTables(){
    openTableBody.innerHTML = "";
    openTableHeading.innerHTML = "";
    closedTableBody.innerHTML = "";
    closedTableHeading.innerHTML = "";
}