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
    var osmAttrib ='Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors ';
    var osm = new L.TileLayer(osmUrl, {minZoom: 2, maxZoom: 10, attribution: osmAttrib});
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
    return bootList
    // controller.generateUniqueLocations(bootList)
  },

  validateLocation: function(boot){
    if(boot.latitude && boot.longitude){
      return true
    }
  },

  generateUniqueLocations: function(bootList){
    var cityList = new BootMap.CityList
    cityList.populateUniqueCities(bootList)
    var uniqueCities = cityList.uniqueCities
    for(i=0; i<uniqueCities; i++){
      var currentCity = uniqueCities[i]
      var cityBootPop = currentCity.cityBootPopulation()
      if(cityBootPop > 1){
        currentCity.disperseBoots(variantArray)
      }
    }
    // now, cityList.uniqueCities is an array of unique cities.
    // for each city
      // for each boot, modify the lat, long slightl.
  }
}



BootMap.MasterRoster = function(){
  this.bootList = []
}



