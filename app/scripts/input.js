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
        let val = form.elements[i].value;
        if (val != null && key != null && key) data[key] = val;

    }
    console.log(data);
    submitReport(data);
    form.reset();
});
