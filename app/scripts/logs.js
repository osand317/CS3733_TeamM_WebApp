var logTable = document.querySelector("#logTable");
var logTableHeading = document.querySelector("#logTableHeading");
var logTableBody = document.querySelector("#logTableBody");

var currentReports = [];
var allReports = [];
var allTableHeaders = [];
var logsRef;

logsRef = firestore.collection("logs");

logsRef.onSnapshot(function(querySnapshot){
    tableCallback(querySnapshot, logTable);
});

function tableCallback(querySnapshot, selector){
    allTableHeaders = [];
    clearTable(selector);
    querySnapshot.forEach(function (doc) {
        getTableHeaders(doc);
        if (shouldBeShown(doc.data(), selector)){
            createTableRow(doc.data(), selector);
        }
        // currentReports.push(doc);
        // allReports.push(doc);
    });
    createTableHeading(selector);
    // populateFilters();
    // searchCallback();
}

function createTableRow(data, selector){
    // var tbody = document.querySelector(selector + "Body");
    var tbody = selector.getElementsByTagName("tbody")[0];
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

function createTableHeading(selector) {
    // var thead = document.querySelector(selector + "Heading");
    var thead = selector.getElementsByTagName("thead")[0];
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

function clearTable(selector){
    selector.getElementsByTagName("tbody")[0].innerHTML = "";
    selector.getElementsByTagName("thead")[0].innerHTML = "";
}

function shouldBeShown(data, selector){
    return true;
}

// ------------------------- Search -------------------- //
function searchCallback() {
    let input = document.getElementById("searchFilter").value.toUpperCase();
    let tableRows = document.getElementById("logTable").getElementsByTagName("tr");

    for (let i = 0; i < tableRows.length; i++) {
        let cellList = tableRows[i].getElementsByTagName("td");
        for(let j = 0; j < cellList.length; j++){
            if(cellList[j].innerHTML.toUpperCase().indexOf(input) > -1){
                tableRows[i].style.display = "";
                j = cellList.length;
            }
            else {
                tableRows[i].style.display = "none";
            }

        }
    }

}

