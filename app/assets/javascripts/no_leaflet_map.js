// window.onload = function(){
//   controller = new UserMap.Controller
// }

UserMap = {}

UserMap.Controller = function(){
}

UserMap.Controller.prototype = {
  newMap: function(){
    var map = {}
    return map
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
  }
}
