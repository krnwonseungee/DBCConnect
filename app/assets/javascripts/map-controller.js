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

  getCoords: function(){
    var locationArray = []
    var x= 27.5
    var y= -118.5
    for (i=0; i<20; i++){
      x+=(i/5); y+=(i/4)
      locationArray.push([x,y])
    }
    return locationArray
  },

  fetchUsers: function(){
    var controller = this
    $.ajax({
      url: '/',
      type: 'get'
    }).done(function(data){
      controller.parseData(data.users)
      console.log(controller.masterRoster)
    })
  },

  parseData: function(bootData){
    var controller = this
    controller.masterRoster = new BootMap.MasterRoster
    for(var i=0; i<bootData.length; i++){
      var thisBoot = bootData[i]
      boot = new BootMap.Boot(thisBoot.name, thisBoot.latitude, thisBoot.longitude)
      controller.masterRoster.bootList.push(boot)
    }
    controller.view.renderMarkers(controller.masterRoster.bootList,controller.map)
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



