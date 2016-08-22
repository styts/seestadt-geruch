var format = require("string-template");


function init() {
  setTimeout(function(){
    add_markers();
  }, 100);
}


function html_marker(marker) {
  console.log(marker); 
  return format('<div class="popup">{message}</div>', marker);
}


function add_markers() {
  $.ajax({
    url: API_URL,
    success: function(data) {
      var markers = data;
      for (var i in markers) {
        var marker = markers[i];
        coords = L.latLng(parseFloat(marker.latitude), parseFloat(marker.longitude));
        mrk = new L.marker(coords)
          .bindPopup(html_marker(marker))
          .addTo(map);
      }
    }
});
}

module.exports = {
  init: init
};
