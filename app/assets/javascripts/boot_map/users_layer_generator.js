BootMap.UsersLayerGenerator = function(map) {
  this.map = map;
}

BootMap.UsersLayerGenerator.prototype = {
  set: function (userCollection) {
    this.rawUsers = userCollection;
  },

  layer: function(bootCollection) {
    this.renderMarkers(bootCollection);
  },

  render: function(bootList){
    var map = this.map;
    var markers = new L.MarkerClusterGroup()
    if (!map) return;
    for (i=0; i<bootList.length; i++){
      var boot = bootList[i];

      if (!boot.longitude || !boot.longitude) continue;

      var marker = L.marker([boot.latitude, boot.longitude]),
      content = new BootMap.PopupPresenter(boot).present();

      this.bindThisPopup(marker, content)

      // addLayer is a Leaflet function
      markers.addLayer(marker)
    }
    map.addLayer(markers)
  },

  //bindPopup and openPopup are leaflet fns
  bindThisPopup: function(marker, content){
    marker.on('mouseover', function(evt){
      evt.target.bindPopup(content).openPopup()
    })
  },
};

