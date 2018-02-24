var map;
var markers = [];
var marker;
var coords = [];
var farms = [];
var latitude = [];
var longitude = [];
var names = [];

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
          addMarker(initialLocation);
      });
    }
      getFarms();
      map.addListener('click', function(e) {
        markers[0].setMap(null);
        markers=[];
        clickLocation =  new google.maps.LatLng(e.latLng.lat(), e.latLng.lng());
        addMarker(clickLocation);
        coords[0] = e.latLng.lat();
        coords[1] = e.latLng.lng();
    });
  };



// Adds a marker to the map and push to the array.
function addMarker(location) {
  var marker = new google.maps.Marker({
    position: location,
    map: map
  });
  markers.push(marker);
}



function storeLocation() {
  console.log(markers[0].position);
  console.log(coords);
  localStorage.setItem('latitude', coords[0]);
  localStorage.setItem('longitude', coords[1]);
  console.log(localStorage);
  window.location = "farmerAccountCreation.html";
};


function getFarms() {
  var checkInRef = firestore.collection("users").where('longitude', '>', '0');
  checkInRef.get().then(
    window.eqfeed_callback = function (doc) {
      doc.forEach(function (coordinates) {
        latitude.push(coordinates.data().latitude);
        longitude.push(coordinates.data().longitude);
        names.push(coordinates.data().firstName + ' ' + coordinates.data().lastName);
        farms.push(coordinates.data().profileId);
        });
      drawMarkers();
      });
      console.log(farms);
      console.log(names);

    };



function drawMarkers() {
  var infowindow = new google.maps.InfoWindow();

  for (var i = 0; i < farms.length; i++) {
      var latLng = new google.maps.LatLng(latitude[i], longitude[i]);
      var marker = new google.maps.Marker({
          position: latLng,
          map: map,
          icon: 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png'
      });

      google.maps.event.addListener(marker, 'click', (function (marker, i) {
          return function () {
              infowindow.setContent(names[i] +
              "<br><input class='mdl-button mdl-js-button mdl-button--raised mdl-button--colored' onclick='goToProfile("+ '"'+ farms[i]+ '"' +");' type=button value='Profile'>");
              infowindow.open(map, marker);
          }
      })(marker, i));
    }
};

function goToProfile(userID) {
  localStorage.setItem("userID", userID);
  localStorage.setItem("Page", '2');
  window.location = 'profileView.html';
};
