BootMap.City = function(name,latitude,longitude){
  this.name = name
  this.latitude = latitude
  this.longitude = longitude
  this.boots = []
}

BootMap.City.prototype = {
  addBoot: function(boot){
    this.boots.push(boot)
  },

  cityBootPopulation: function(){
    return this.boots.length
  }
}
