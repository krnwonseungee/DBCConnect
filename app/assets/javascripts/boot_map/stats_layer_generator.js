BootMap.StatsLayerGenerator = function(map) {
  this.map = map;
}

BootMap.StatsLayerGenerator.prototype = {
  renderStats: function (bootList) {
                 $("#logo-in-map")
                   .append("<h2>DBC CONNECT</h2>Find your fellow boots in " + this._cityCount(bootList) + " cities around the world")
  },

  _cityCount: function(bootList) {
                var u = {},
                  total = 0;

                bootList.map(function(boot) {
                  return boot.current_location;
                })
                .filter(function(location) {
                  return location;
                })
                .forEach(function(location) {
                  if (u.hasOwnProperty(location)) return false;
                  u[location] = true;
                  total++;
                });

                return total;
              }
}

