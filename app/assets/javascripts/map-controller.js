BootMap.Controller = function(){
  this.view
}

BootMap.Controller.prototype = {
  newMap: function(){
    var newMap = new L.map('map')
    this.map = newMap
  },

  initializeMapData: function(startLat,startLong,startZoom){
    this.initialMapCoords = new L.LatLng(startLat,startLong)
    this.initialZoom = startZoom
  },

  initializeOSM: function(){
    var osmUrl    ='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    var osmAttrib ='Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributorsvar ';
    var osm = new L.TileLayer(osmUrl, {minZoom: 2, maxZoom: 20, attribution: osmAttrib});
    this.osm = osm
  },

  initializeMap: function(startLat,startLong,startZoom){
    this.newMap()
    this.initializeMapData(startLat,startLong,startZoom)
    this.initializeOSM()
  },

  fetchUsers: function(){
    var controller = this
    $.ajax({
      url: '/',
      type: 'get'
    }).done(function(data){
      controller.facilitateMarkers(data.users)
    })
  },

  facilitateMarkers: function(serverData){
    var controller = this
    var bootList = controller.bootListFromJSON(serverData)
    controller.view.renderMarkers(bootList, controller.map)
  },

  bootListFromJSON: function(bootData){
    var controller = this
    controller.masterRoster = new BootMap.MasterRoster
    var bootList = controller.masterRoster.bootList
    for(var i=0; i<bootData.length; i++){
      var thisBoot = bootData[i]
      if(controller.validateLocation(thisBoot)){
        boot = new BootMap.Boot(thisBoot.name, thisBoot.latitude, thisBoot.longitude)
        bootList.push(boot)
      }
    }
    return bootList
  },

  validateLocation: function(boot){
    if(boot.latitude && boot.longitude){
      return true
    }
  }
}

BootMap.Boot = function(name,latitude,longitude){
  this.name = name
  this.latitude = latitude
  this.longitude = longitude
}

BootMap.MasterRoster = function(){
  this.bootList = []
}



