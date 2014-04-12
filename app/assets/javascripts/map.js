window.onload = function(){
  controller = new BootMap.Controller
  controller.initializeMap(30.5, -118.5, 4)
  view = new BootMap.View(controller)
  view.drawMap()
  view.renderMarkers(controller.getCoords(),controller.map)
  controller.fetchUsers()
}

