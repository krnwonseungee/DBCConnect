window.onload = function(){
  controller = new BootMap.Controller
  view = new BootMap.View(controller)
  controller.view = view
  controller.fetchUsers()
  controller.initializeMap(30.5, -118.5, 4)
  view.drawMap()
}

