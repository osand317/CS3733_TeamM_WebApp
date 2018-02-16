var lat = 0;
var long = 0;
document.querySelector('#checkInBtn').addEventListener('click', function () {
    var startPos;
    var geoOptions = {
        // maximumAge: 5 * 60 * 1000,
        timeout: 10 * 1000
    };
    var geoSuccess = function(position) {
        startPos = position;
        lat = startPos.coords.latitude;
        long = startPos.coords.longitude;
        // map.setAttribute("src", getMapUrl());
        console.log(lat,long);
        storeLocation(lat, long);
    };
    var geoError = function(error) {
        console.log('Error occurred. Error code: ' + error.code);
        // error.code can be:
        //   0: unknown error
        //   1: permission denied
        //   2: position unavailable (error response from location provider)
        //   3: timed out
    };
    navigator.geolocation.getCurrentPosition(geoSuccess, geoError, geoOptions);
});

function storeLocation(lat, long){
    let obj = {
        uid: userID,
        timestamp: Date.now(),
        latitude: lat,
        longitude: long
    };
    firestore.collection("checkIns").add(obj).catch(function(error){
        console.log(error);
    });
    output(obj);
}

function output(obj){
    let message = '';
    message += 'Success! Checked in at: ';
    message += "\r\n";
    message += obj.latitude;
    message += ', ';
    message += obj.latitude;
    message += '\r\n';
    message += ' on ';
    message += new Date(obj.timestamp * 1000);
    document.querySelector('#output').textContent = message;
}