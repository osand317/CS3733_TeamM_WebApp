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
    tableCallback(querySnapshot, openTable);
    tableCallback(querySnapshot, closedTable);
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
    let result;
    switch(selector){
        case openTable:
            result = data.isComplete === false;
            break;
        case closedTable:
            result = data.isComplete === true;
            break;
    }
    return result;
}

function clearAllTables(){
    openTable.getElementsByTagName("tbody")[0].innerHTML = "";
    openTable.getElementsByTagName("thead")[0].innerHTML = "";
    closedTable.getElementsByTagName("tbody")[0].innerHTML = "";
    closedTable.getElementsByTagName("thead")[0].innerHTML = "";
}

// ------------------------ Statistics ------------------------ //

new Chart(document.getElementById("pie-chart"), {
    type: 'pie',
    data: {
        labels: ["Majority", "Minority"],
        datasets: [{
            label: "Chart",
            backgroundColor: ["#3e95cd", "#8e5ea2"],
            data: [90, 10]
        }]
    },
    options: {
        title: {
            display: true,
            text: ''
        }
    }
});
