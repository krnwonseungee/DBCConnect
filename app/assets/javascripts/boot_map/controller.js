BootMap.Controller = function(){
}

BootMap.Controller.prototype = {

  fetchUsers: function(){
    var controller = this
    $.ajax({
      url: '/users',
      type: 'get'
    }).done(function(data){
      controller.facilitateMarkers(data.users)
    })
  },

  facilitateMarkers: function(serverData){
    var controller = this
    var bootList = controller.bootListFromJSON(serverData)
    controller.view.renderMarkers(bootList, controller.map)
    controller.view.renderStats(controller.masterRoster.uniqueLocationsCount)
  },

  bootListFromJSON: function(bootData){
    var controller = this
    controller.masterRoster = new BootMap.MasterRoster
    var bootList = controller.masterRoster.bootList
    for(var i=0; i<bootData.length; i++){
      var thisBoot = bootData[i]
      if(controller.validateLocation(thisBoot)){
        boot = new BootMap.Boot(thisBoot)
        bootList.push(boot)
      }
    }
    controller.generateUniqueLocations(bootList)
    return bootList
  }
}
