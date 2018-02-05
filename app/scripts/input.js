var form = document.querySelector("#form");
var submitBtn = document.querySelector("#submitBtn");

function submitReport(data){
    // db.collection("reports").add({
    //     eggs: data.eggs,
    //     firstName: data.firstName,
    //     lastName: data.lastName
    // });
}

form.addEventListener("submit", function(e) {
    e.preventDefault();
    var data = {};
    for(var i = 0; i < form.elements.length; i++){
        let key = form.elements[i].name;
        let val = form.elements[i].value;
        data[key] = val;
    }
    console.log(data);
    // submitReport(data);
    form.reset();
});