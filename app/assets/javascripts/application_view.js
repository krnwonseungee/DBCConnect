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
