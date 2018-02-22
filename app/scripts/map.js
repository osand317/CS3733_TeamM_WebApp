var map;
var markers = [];
var marker;
var coords = [];
// var counter = 0;

function initMap() {

  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 17,
    center: new google.maps.LatLng(2.8,-187.3),
    mapTypeId: 'satellite'
  });


  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
          initialLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
          map.setCenter(initialLocation);
          new google.maps.Marker({
            position: initialLocation,
            icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
            map: map
          });
          // addMarker(initialLocation);

      });
    }
    if (localStorage.getItem('Page') == "CheckIn") {
      drawCheckins();
    } else {
      map.addListener('click', function(e) {
        markers[0].setMap(null);
        markers=[];
        clickLocation =  new google.maps.LatLng(e.latLng.lat(), e.latLng.lng());
        addMarker(clickLocation);
        coords[0] = e.latLng.lat();
        coords[1] = e.latLng.lng();
    });
  }
  drawFarms();

    // console.log(e.latLng.lng());

  };

  // Create a <script> tag and set the USGS URL as the source.
  // var script = document.createElement('script');
  // // This example uses a local copy of the GeoJSON stored at
  // // http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojsonp
  // script.src = 'https://developers.google.com/maps/documentation/javascript/examples/json/earthquake_GeoJSONP.js';
  // document.getElementsByTagName('head')[0].appendChild(script);


// Adds a marker to the map and push to the array.
function addMarker(location) {
  var marker = new google.maps.Marker({
    position: location,
    map: map
  });
  markers.push(marker);
}


function addPoint(location) {
  var marker = new google.maps.Marker({
    position: location,
    map: map
  });
}

function storeLocation() {
  console.log(markers[0].position);
  console.log(coords);
  localStorage.setItem('latitude', coords[0]);
  localStorage.setItem('longitude', coords[1]);
  console.log(localStorage);
  window.location = "farmerAccountCreation.html";
};

// Loop through the results array and place a marker for each
// set of coordinates.
// window.eqfeed_callback = function(results) {
//   for (var i = 0; i < results.features.length; i++) {
//     var coords = results.features[i].geometry.coordinates;
//     var latLng = new google.maps.LatLng(coords[1],coords[0]);
//     var marker = new google.maps.Marker({
//       position: latLng,
//       map: map
//     });
//   }
// }



function drawCheckins() {
  var checkInRef = firestore.collection("checkIns").where("uid", '==', localStorage.getItem("userID"));
  checkInRef.get().then(
    window.eqfeed_callback = function (doc) {
      doc.forEach(function (coordinates) {
        console.log(coordinates.data().timestamp);
        if (Date.now() - Date.parse(coordinates.data().timestamp) <= 2419200000 && document.getElementById('monthBox').checked) {
          counter++;
          console.log(counter);
          var latLng = new google.maps.LatLng(coordinates.data().latitude, coordinates.data().longitude);
          addPoint(latLng);
        } else if(Date.now() - Date.parse(coordinates.data().timestamp) <= 604800000 && document.getElementById('weekBox').checked){
          counter++;
          console.log(counter);
          var latLng = new google.maps.LatLng(coordinates.data().latitude, coordinates.data().longitude);
          addPoint(latLng);
        }
      });
    }
  );
};

function drawFarms() {
  var checkInRef = firestore.collection("users");
  checkInRef.get().then(
    window.eqfeed_callback = function (doc) {
      doc.forEach(function (coordinates) {
        var latLng = new google.maps.LatLng(coordinates.data().latitude, coordinates.data().longitude);
        var marker = new google.maps.Marker({
          position: latLng,
          map: map,
          icon: 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png'
        });
      });
    }
  );
};
