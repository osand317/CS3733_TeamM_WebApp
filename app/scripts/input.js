var form = document.querySelector("form");
var submitBtn = document.querySelector("#submitBtn");

function submitReport(data){
    firestore.collection("reports").add(data);
}

form.addEventListener("submit", function(e) {
    e.preventDefault();
    var data = {};
    for(var i = 0; i < form.elements.length; i++){
        let key = form.elements[i].id;
        let val = getValue(form.elements[i]);
        if (val != null && key != null && key) data[key] = val;
    }
    data['timestamp'] = new Date(Date());
    let reportName = location.href.split("/").slice(-1).toString().split(".", 1).toString();
    data['reportType'] = reportName;
    console.log(data);
    if (navigator.onLine){
        submitReport(data);
    }
    else {
        store(data);
    }
    form.reset();
    document.querySelectorAll('.mdl-js-radio').forEach(el => el.MaterialRadio.checkToggleState());
    document.querySelectorAll('.mdl-js-checkbox').forEach(el => el.MaterialCheckbox.checkToggleState());

});

function getValue(el){
    // console.log(el.type);
    if(el.type === 'checkbox' || el.type === 'radio'){
        return el.checked;
    }
    else {
        return el.value;
    }
}

window.addEventListener("online", function(){
    let data = JSON.parse(localStorage.getItem('toSubmit'));
    submitReport(data);
    localStorage.removeItem('toSubmit');
});

function store(data){
    localStorage.setItem('toSubmit', JSON.stringify(data));
}