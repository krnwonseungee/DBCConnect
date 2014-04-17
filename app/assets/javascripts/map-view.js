BootMap.View = function(controller){
  this.controller = controller
}

BootMap.View.prototype = {
  // setView is a Leaflet function
  drawMap: function(){
    var controller = this.controller
    var thisMap = controller.map
    if (!thisMap) return;
    var map = thisMap.setView(controller.initialMapCoords,controller.initialZoom)
    map.addLayer(controller.osm)
  },

  // addLayer is a Leaflet function
  renderMarkers: function(bootList, map){
    var map = map
    var markers = new L.MarkerClusterGroup()
    for (i=0; i<bootList.length; i++){
        var lat=bootList[i].latitude
        var long=bootList[i].longitude
        var marker = L.marker([lat,long])
        var content = this.formatPopup(bootList[i])
        this.bindThisPopup(marker,content)
        markers.addLayer(marker)
    }
    map.addLayer(markers)
  },

  renderStats: function(cityCount){
    // var newDiv = document.createElement('div')
    // newDiv.classList.add('boot-stats')
    // newDiv.innerText = cityCount
    // console.log("city Count " + newDiv.innerText)
    $("#logo-in-map").empty();
    view.showNumOfCities(cityCount);
    // console.log("here is your div: "+ newDiv + "append it somewhere nice on the page!")
  },

  //bindPopup and openPopup are leaflet fns
  bindThisPopup: function(marker, content){
    marker.on('mouseover', function(evt){
      evt.target.bindPopup(content).openPopup()
    })
  },

  formatPopup: function(boot){
    var userName = [
    "<a class='profile-link user-link'",
    "id='",boot.id,
    "'>",
    boot.name,
    "</a>"
    ]

    var socialMedia = [
      "<ul class='social-media'>",
      "<li class='social-link'><a href=",boot.github," target='_blank'><i i class='fa fa-github fa-lg'></i></a></li>",
      "<li class='social-link'><a href=",boot.twitter," target='_blank'><i i class='fa fa-twitter fa-lg'></i></a></li>",
      "<li class='social-link'><a href=",boot.facebook," target='_blank'><i i class='fa fa-facebook fa-lg'></i></a></li>",
      "<li class='social-link'><a href=",boot.linked_in," target='_blank'><i i class='fa fa-linkedin fa-lg'></i></a></li>",
      "<li class='social-link'><a href=",boot.blog," target='_blank'><i i class='fa fa-tumblr fa-lg'></i></a></li>",
      "</ul>"
      ]

    var content = [
                    "<div class='user-popup'>",
                    userName.join(""),
                    socialMedia.join(""),
                    boot.current_location,
                    "</div>"
                  ]
    return content.join("")
  }

}
