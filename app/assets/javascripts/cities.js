BootMap.City = function(name,latitude,longitude){
  this.name = name
  this.latitude = latitude
  this.longitude = longitude
  this.boots = []
}

BootMap.City.prototype = {
  addBoot: function(boot){
    this.boots.push(boot)
  }
}

BootMap.CityList = function(){
  this.uniqueCities = []
  this.cityNames = []
}

BootMap.CityList.prototype = {
  populateUniqueCities: function(bootList){
    for(i=0; i<bootList.length; i++){
      var thisBoot = bootList[i]
      if(this.checkForCity(thisBoot.current_location) < 0){
        this.addToNewCity(thisBoot)
      } else {
        this.addToExistingCity(thisBoot)
      }
    }
  },

  checkForCity: function(cityName){
    return this.cityNames.indexOf(cityName)
  },

  addToNewCity: function(thisBoot){
    newCity = new BootMap.City(thisBoot.current_location, thisBoot.latitude, thisBoot.longitude)
    newCity.addBoot(thisBoot)
    this.uniqueCities.push(newCity)
    this.cityNames.push(newCity.name)
  },

  addToExistingCity: function(thisBoot){
   for(c=0; c<this.uniqueCities.length; c++){
    thisCity = this.uniqueCities[c]
    if(thisCity.name === thisBoot.current_location){
      thisCity.addBoot(thisBoot)
    }
  }
}





}