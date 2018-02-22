var lat = 0;
var long = 0;
document.querySelector('#checkInBtn').addEventListener('click', function () {
    if (navigator.onLine) {
        var startPos;
        var geoOptions = {
            // maximumAge: 5 * 60 * 1000,
            timeout: 10 * 1000
        };
        var geoSuccess = function (position) {
            startPos = position;
            lat = startPos.coords.latitude;
            long = startPos.coords.longitude;
            // map.setAttribute("src", getMapUrl());
            let loc = {
                uid: userID,
                timestamp: Date(),
                latitude: lat,
                longitude: long
            };
            submitLocation(loc);
        };
        var geoError = function (error) {
            console.log('Error occurred. Error code: ' + error.code);
            // error.code can be:
            //   0: unknown error
            //   1: permission denied
            //   2: position unavailable (error response from location provider)
            //   3: timed out
        };
        navigator.geolocation.getCurrentPosition(geoSuccess, geoError, geoOptions);
    }
    else {
        document.querySelector('#output').textContent = 'Sorry, you\'re offline. Please take a picture to record your location.';
    }
});

function submitLocation(data){
    firestore.collection("checkIns").add(data).catch(function(error){
        console.log(error);
    });
    output(data);
}

function output(obj){
    let message = '';
    message += 'Success! Checked in at: ';
    message += "\r\n";
    message += obj.latitude;
    message += ', ';
    message += obj.longitude;
    message += '\r\n';
    message += ' on ';
    // message += new Date(obj.timestamp * 1000);
    message += obj.timestamp;
    document.querySelector('#output').textContent = message;
}

// window.addEventListener("online", function(){
//     let data = JSON.parse(localStorage.getItem('toSubmit'));
//     submitLocation(data);
//     localStorage.removeItem('toSubmit');
//     alert('submitted');
// });
//
// function store(data){
//     console.log(data);
//     localStorage.setItem('toSubmit', JSON.stringify(data));
// }