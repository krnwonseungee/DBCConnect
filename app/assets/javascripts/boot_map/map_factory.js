BootMap.MapFactory = function(opts) {
  if (!opts) opts = {};
  this.START_LATITUDE =  opts.startLatitude  ||  37.769;
  this.START_LONGITUDE = opts.startLongitude || -70.429;
  this.INITIAL_ZOOM = opts.initialZoom || 3;
}

BootMap.MapFactory.prototype = {
  map: function() {
         var lMap = new L.map('map');
         lMap.setView(L.latLng(this.START_LATITUDE, this.START_LONGITUDE), this.INITIAL_ZOOM);
         return this._initializeOSM(lMap);
       },

  _initializeOSM: function(map){
    var osmUrl    ='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      osmAttrib ='Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors ',
      layer = new L.TileLayer(osmUrl, {minZoom: 2, maxZoom: 10, attribution: osmAttrib});

    return map.addLayer(layer);
  }
};

