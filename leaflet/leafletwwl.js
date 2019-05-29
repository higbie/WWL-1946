window.onload = function () {
    var basemap = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
		attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
	});


    // Define the icon-style
    var greenIcon = new L.Icon({
  iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});
   //define variable before calling geojson
    var AFL;
    $.getJSON("wwlafl.geojson", function(afl_map) {
  
    AFL = L.geoJson(afl_map, {
      pointToLayer: function(feature, Latlng) {
          return L.marker(Latlng, {icon: greenIcon});
      }
      , onEachFeature: function (feature, layer) {
        layer.bindPopup('<p><b>Name & Affiliations: </b>' + feature.properties.Name_Affil + '</p>' + '<p><b>Past Record: </b>' + feature.properties.Past_Record + '<b> Public Activities: </b>' + feature.properties.Public_Activities + '</p>' + '<p><b>Family: </b>' + feature.properties.Family + '<b> Education: </b>' + feature.properties.Education + '<b> Writings: </b>' + feature.properties.Writings + '<b> Clubs: </b>' + feature.properties.Clubs + '<b> Interests: </b>' + feature.properties.Interests + '<b> Sports: </b>' + feature.properties.Sports + '<b> Address: </b>' + feature.properties.Address + '</p>');
      }
    });

    });

    var CIO;
    $.getJSON("wwlCIO.geojson", function(cio_map) {

    CIO = L.geoJson(cio_map, {
      onEachFeature: function (feature, layer) {
        layer.bindPopup('<p><b>Name & Affiliations: </b>' + feature.properties.Name_Affil + '</p>' + '<p><b>Past Record: </b>' + feature.properties.Past_Record + '<b> Public Activities: </b>' + feature.properties.Public_Activities + '</p>' + '<p><b>Family: </b>' + feature.properties.Family + '<b> Education: </b>' + feature.properties.Education + '<b> Writings: </b>' + feature.properties.Writings + '<b> Clubs: </b>' + feature.properties.Clubs + '<b> Interests: </b>' + feature.properties.Interests + '<b> Sports: </b>' + feature.properties.Sports + '<b> Address: </b>' + feature.properties.Address + '</p>');
      }
    });

        var map = L.map('wwl')
    .fitBounds(AFL.getBounds())
    .fitBounds(CIO.getBounds());
   
    basemap.addTo(map);
    AFL.addTo(map);
    CIO.addTo(map);
 })

};

