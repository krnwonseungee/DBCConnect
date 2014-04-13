BootMap.View = function(controller){
  this.controller = controller
}

BootMap.View.prototype = {
  drawMap: function(){
    var controller = this.controller
    var thisMap = controller.map
    var map = thisMap.setView(controller.initialMapCoords,controller.initialZoom)
    map.addLayer(controller.osm)
  },

  renderMarkers: function(bootList, map){
    var markers = new L.MarkerClusterGroup()
    for (i=0; i<bootList.length; i++){
        var lat=bootList[i].latitude
        var long=bootList[i].longitude
        var marker = L.marker([lat,long])
        console.log(bootList[i])
        var content = "<div class='user-popup'>"+bootList[i].name+"</div>"
        marker.on('mouseover', function(evt) {
          evt.target.bindPopup(content).openPopup();
        });
        markers.addLayer(marker)
    }
    map.addLayer(markers)
  }

}