window.onload = function(){
  var map = newMap()
  var osm = osmInitializer()
  renderMap(map,osm)
  renderMarkers(getCoords(),map)
}

newMap = function(){
  var newMap = new L.map('map')
  return newMap
}

osmInitializer = function(){
  var osmUrl    ='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  var osmAttrib ='Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributorsvar ';
  var osm = new L.TileLayer(osmUrl, {minZoom: 2, maxZoom: 20, attribution: osmAttrib});
  return osm
}

renderMap = function(mapObject,osm){
  var map = mapObject.setView(new L.LatLng(30.5, -118.5),4)
  map.addLayer(osm);
}

renderMarkers = function(locationArray, map){
  var markers = new L.MarkerClusterGroup()
  for (i=0; i<locationArray.length; i++){
    var x=locationArray[i][0]
    var y=locationArray[i][1]
    var marker = L.marker([x,y])
    markers.addLayer(marker)
  }
  map.addLayer(markers)
}

getCoords = function(){
  var locationArray = []
  var x= 27.5
  var y= -118.5
  for (i=0; i<20; i++){
    x+=(i/5); y+=(i/4)
    locationArray.push([x,y])
  }
  return locationArray
}

