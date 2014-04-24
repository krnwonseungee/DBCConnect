BootMap.View = function(opts){
  this.templateSel = opts.templateSel || "#user-popup";
  this.template = Handlebars.compile($(this.templateSel).html());
}

BootMap.View.prototype = {
  renderMarkers: function(bootList, map){
    var map = map
    var markers = new L.MarkerClusterGroup()
    if (!map ) return;
    for (i=0; i<bootList.length; i++){
        var lat=bootList[i].latitude
        var long=bootList[i].longitude
        var marker = L.marker([lat,long])
        var content = this.formatPopup(bootList[i])
        this.bindThisPopup(marker,content)
        // addLayer is a Leaflet function
        markers.addLayer(marker)
    }
    map.addLayer(markers)
  },

  renderStats: function(cityCount){
    $("#logo-in-map").empty();
    this.parentView.showNumOfCities(cityCount);
  },

  //bindPopup and openPopup are leaflet fns
  bindThisPopup: function(marker, content){
    marker.on('mouseover', function(evt){
      evt.target.bindPopup(content).openPopup()
    })
  },

  formatPopup: function(boot){
    return this.template(boot);
  }
}
