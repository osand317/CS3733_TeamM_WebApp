var lat = 0;
var long = 0;
document.querySelector('#checkInBtn').addEventListener('click', function () {
    var startPos;
    var geoOptions = {
        maximumAge: 5 * 60 * 1000,
        timeout: 10 * 1000
    };
    var geoSuccess = function(position) {
        startPos = position;
        lat = startPos.coords.latitude;
        long = startPos.coords.longitude;
        // map.setAttribute("src", getMapUrl());
        console.log(lat,long);

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
    let obj = {};

}