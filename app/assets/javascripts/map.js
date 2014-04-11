window.onload = function(){
  var controller = new MapWrapper.Controller
  var view = new MapWrapper.View
  var map = controller.newMap()
  view.drawMap(map)
  var locationArray = controller.getCoords()
  view.renderMarkers(locationArray,map)
}

MapWrapper = {}

MapWrapper.Controller = function(){
}

MapWrapper.Controller.prototype = {
  newMap: function(){
    var newMap = new L.Map('map');
    // var newMap = L.mapbox.map('map', 'katherineimogene.homlgk4g')
    return newMap
  },

  getCoords: function(){
    var locationArray = []
    var x= 27.5
    var y= -118.5
    for (i=0; i<20; i++){
      x+=(i/5); y+=(i/4)
      locationArray.push([x,y])
    }
    return locationArray
  }
}

MapWrapper.View = function(){
}

MapWrapper.View.prototype = {
  drawMap: function(mapObject){
    var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    var osmAttrib='Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributorsvar ';
    var osm = new L.TileLayer(osmUrl, {minZoom: 2, maxZoom: 20, attribution: osmAttrib});
    var map = mapObject.setView(new L.LatLng(30.5, -118.5),4)
     map.addLayer(osm);
    return map
  },

  renderMarkers: function(locationArray, map){
    for (i=0; i<locationArray.length; i++){
      var x=locationArray[i][0]
      var y=locationArray[i][1]
      L.marker([x,y], {icon: this.customIcon()}).addTo(map)
    }
  },

  customIcon: function() {
    return L.icon({
    iconUrl: 'pin.png',
    iconSize: [20,20]
  })
}

}




// CUSTOM MARKER
//https://www.mapbox.com/developers/simplestyle/
// https://www.mapbox.com/mapbox.js/example/v1.0.0/custom-marker/
// https://www.mapbox.com/mapbox.js/example/v1.0.0/listing-markers/


