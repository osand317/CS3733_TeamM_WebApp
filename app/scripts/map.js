var map;
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
      });
    }
  drawMap();
  // Create a <script> tag and set the USGS URL as the source.
  // var script = document.createElement('script');
  // // This example uses a local copy of the GeoJSON stored at
  // // http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojsonp
  // script.src = 'https://developers.google.com/maps/documentation/javascript/examples/json/earthquake_GeoJSONP.js';
  // document.getElementsByTagName('head')[0].appendChild(script);
}

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



function drawMap() {
  var checkInRef = firestore.collection("checkIns");
  checkInRef.get().then(
    window.eqfeed_callback = function (doc) {
      doc.forEach(function (coordinates) {
        var latLng = new google.maps.LatLng(coordinates.data().latitude, coordinates.data().longitude);
        var marker = new google.maps.Marker({
          position: latLng,
          map: map
        });
      });
    }
  );
};
