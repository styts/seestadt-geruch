var css = require('../styles/main.scss');
var moment = require('moment');

map = L.map('map', {minZoom: 15}).setView([48.226016394414145, 16.50457620620728], 16);

if (__DEV__) {
  API_URL = "http://localhost:8000/api/v1/report/";
} else {
  API_URL = "/api/report";
}

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
maxZoom: 20,
id: 'mapbox.streets',
accessToken: 'pk.eyJ1Ijoic3R5dHMiLCJhIjoiY2lzMGkzbHpmMDA1ajJzbzcxYXNvM2VidiJ9.ozNnfh0l7gHgBxrbovRcAw'
}).addTo(map);

var sidebar = L.control.sidebar('sidebar').addTo(map);
sidebar.open('home');

var lc = L.control.locate({
  //drawCircle: false
  locateOptions: {
       maxZoom: 18
}
}).addTo(map);
lc.start();

$('#btn-report').click(function (event) {
  console.log(arguments);
  var target = $(event.target);
  target.addClass('is-loading');
  $('.notification').hide();
  $.ajax({
    url: API_URL,
    data: {foo: "bar"},
    type: 'POST',
    success: function(data) { $('#notify-success').show(); },
    error: function() { $('#notify-failiure').show(); },
    complete: function () { target.removeClass('is-loading'); }
  });
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
          });
        }

        timeout();
    }, 1000);
}
timeout();

function set_latlng(latlng) {
  $('#coordinates').html("(" + latlng.lat +  ", " + latlng.lng + ")");
}

module.exports = {
  map: map
};
