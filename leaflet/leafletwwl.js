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

  // Define choropleth map, get from leaflet choropleth example
  var CHORO;
  // get color depending on population density value
  function getColor(d) {
    return d > 1000 ? '#800026' :
      d > 500  ? '#BD0026' :
      d > 200  ? '#E31A1C' :
      d > 100  ? '#FC4E2A' :
      d > 50   ? '#FD8D3C' :
      d > 20   ? '#FEB24C' :
      d > 10   ? '#FED976' :
            '#FFEDA0';
  }

  function style(feature) {
    return {
      weight: 2,
      opacity: 1,
      color: 'white',
      dashArray: '3',
      fillOpacity: 0.7,
      fillColor: getColor(feature.properties.density)
    };
  }

  function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }
  }

  function resetHighlight(e) {
    CHORO.resetStyle(e.target);
  } 

  // Begin layer creation
  $.getJSON("testsample.geojson", function(choro_map) {
    CHORO = L.geoJson(choro_map, {
      style: style,
      onEachFeature: function (feature, layer) {
        layer.on({
          mouseover: highlightFeature,
          mouseout: resetHighlight
        });
      }
    });
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

  // Add upper right layer controls
  // var featureMap = L.layerGroup([AFL, CIO]);
  var featureMaps = {
    "AFL": AFL,
    "CIO": CIO,
    "choropleth": CHORO
  };

  var map = L.map('wwl', {
    // Add layers that will be shown at the first place, asychronous getJson will cause this to fail at the first time
    // layers: featureMap
  }).fitBounds(AFL.getBounds())
  .fitBounds(CIO.getBounds());

  var control = L.control.layers(null, featureMaps);

  basemap.addTo(map);
  control.addTo(map);
 })

};

