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
    var map = map
    var markers = new L.MarkerClusterGroup()
    for (i=0; i<bootList.length; i++){
        var lat=bootList[i].latitude
        var long=bootList[i].longitude
        var marker = L.marker([lat,long])
        var content = this.formatPopup(bootList[i])
        this.bindThisPopup(marker,content)
        markers.addLayer(marker)
    }
    map.addLayer(markers)
  },

  bindThisPopup: function(marker, content){
    marker.on('mouseover', function(evt){
      evt.target.bindPopup(content).openPopup()
    })
  },

  formatPopup: function(boot){
    var content = [
                    "<div class='user-popup'>",
                    boot.name,
                    "</div>"
                  ]
    return content.join("")
  }

}