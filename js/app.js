var css = require('../styles/main.scss');
var moment = require('moment');

var map = L.map('map').setView([48.226016394414145, 16.50457620620728], 16);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
maxZoom: 20,
id: 'mapbox.streets',
accessToken: 'pk.eyJ1Ijoic3R5dHMiLCJhIjoiY2lzMGkzbHpmMDA1ajJzbzcxYXNvM2VidiJ9.ozNnfh0l7gHgBxrbovRcAw'
}).addTo(map);

var sidebar = L.control.sidebar('sidebar').addTo(map);
sidebar.open('home');

var lc = L.control.locate({
  //drawCircle: false
}).addTo(map);
lc.start();

$('#btn-report').click(function () {
  console.log(arguments);
});

// update time
function timeout() {
    setTimeout(function () {
        $('#time').html(moment().locale('de').format('MMMM Do YYYY, h:mm:ss a'));
        if (lc._marker) {
            $.each(map._layers, function (ml) {
              var o =map._layers[ml];
              if (o._radius && o._radius == 5) {
                set_latlng(o._latlng);
              }
          })
        }

        timeout();
    }, 1000);
}
timeout();

function set_latlng(latlng) {
  $('#coordinates').html("(" + latlng.lat +  ", " + latlng.lng + ")");
}
