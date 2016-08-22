var format = require("string-template");
var moment = require("moment");


function init() {
  setTimeout(function(){
    add_markers();
  }, 100);
}


function html_marker(marker) {
  marker.time_ago = moment(marker.time_added).locale('de').fromNow();
  marker.time = moment(marker.time_added).locale('de').format('Do MMMM YYYY, HH:mm');
  return format('<div class="popup"><p>{message}</p><p>{time} (<i>{time_ago}</i>)</p></div>', marker);
}

function add_marker(marker){
  coords = L.latLng(parseFloat(marker.latitude), parseFloat(marker.longitude));
  mrk = new L.marker(coords)
    .bindPopup(html_marker(marker))
    .addTo(map);
}

function add_markers() {
  $.ajax({
    url: API_URL,
    success: function(data) {
      data.forEach(add_marker);
    }
});
}

module.exports = {
  init: init,
  add_marker: add_marker,
};
