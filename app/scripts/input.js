var form = document.querySelector("#form");
var submitBtn = document.querySelector("#submitBtn");

function submitReport(data){
    firestore.collection("reports").add(data);
}

form.addEventListener("submit", function(e) {
    e.preventDefault();
    var data = {};
    for(var i = 0; i < 1; i++){
        let key = form.elements[i].name;
        let val = form.elements[i].value;
        if (val != null && key != null) data[key] = val;

    }
    console.log(data);
    submitReport(data);
    form.reset();
});
