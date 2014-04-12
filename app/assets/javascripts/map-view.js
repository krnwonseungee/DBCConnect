UserMap.View = function(controller){
  this.controller = controller
}

UserMap.View.prototype = {
  drawMap: function(){
    var controller = this.controller
    var thisMap = controller.map
    var map = thisMap.setView(controller.initialMapCoords,controller.initialZoom)
    map.addLayer(controller.osm)
  },

  renderMarkers: function(locationArray, map){
    var markers = new L.MarkerClusterGroup()
    for (i=0; i<locationArray.length; i++){
      var x=locationArray[i][0]
      var y=locationArray[i][1]
      var marker = L.marker([x,y])
      var content = "<div class='user-popup'>Hello Friend</div>"
      marker.on('mouseover', function(evt) {
        evt.target.bindPopup(content).openPopup();
      });
      markers.addLayer(marker)
    }
    map.addLayer(markers)
  }

}