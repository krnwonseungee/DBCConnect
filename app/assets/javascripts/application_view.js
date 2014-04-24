Application.View = function(opts){
  this._mapElement = $(opts.mapSelector);
}

Application.View.prototype = {
  mapElement: function() {
                if (this._mapElement.length < 1) {
                  return null;
                } else {
                  return this._mapElement;
                }
              },

  toggleClass: function(element, className) {
    var classes = element.className.split(/\s+/),
    length = classes.length,
    i = 0;

    for(; i < length; i++) {
      if (classes[i] === className) {
        classes.splice(i, 1);
        break;
      }
    }
    // The className is not found
    if (length === classes.length) {
      classes.push(className);
    }

    element.className = classes.join(' ');
  },

  showGoogleHangoutButtonResponder: function(url){
    console.log("showing responder button")
    $("#top_navbar").prepend(
      "<a id='ghost' href='#pop-up' rel='modal:open'>")
    $('#ghost').click()
    $(".button-div").empty().prepend(
      "<a id='pairing-link' class='pure-button pure-button-active'"
      +"href='"+ url
      +"' target=_blank>"
      +"Join Pairing"
      + "</a>")
    $('#pairing-link').on('click', function(){
      $('#close-pop-up').click()
    })
  },

  renderList: function(){
    $("#activeUsersList").empty();
    var numOfActiveUsers = list.activeUsers.length;
    for (var i = 0; i < numOfActiveUsers; i++){
      if (list.activeUsers[i].id != controller.loggedUser.id){
        $("#activeUsersList").append("<li  id='"
          + list.activeUsers[i].id + "'>"
          + "<a href='#pop-up' rel='modal:open'>"
          + "<i class='fa fa-circle'></i>  "
          + list.activeUsers[i].name + "</a></li>")
      }
    }
  },

  initializePairingIcon: function(){
    $("#availability a span[class='inactive']").attr("class",controller.loggedUser.activeState)
  },

  renderPartial: function(partial){
    $("#logo-in-map").empty();
    // this will bring a new quote and show the map again
    $('#container').empty().html(partial)
  },

  renderMap: function(){
    $('#container').empty().html("<div id='map'></div>");
    controller.createMap();
  },


  showNumOfCities: function(cityCount){
    $("#logo-in-map").append("<h2>DBC CONNECT</h2>Find your fellow boots in " + cityCount + " cities around the world")
  },

  hidePartial:function(e){
    $(e.target).parent().parent().hide()
  }
}
