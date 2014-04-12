window.onload = function(){
  controller = new UserMap.Controller
  controller.initializeMap(30.5, -118.5, 4)
  view = new UserMap.View(controller)
  view.drawMap()
  view.renderMarkers(controller.getCoords(),controller.map)
}

