View = function(){}
View.prototype = {
  setupMenuToResponsive: function(){
    layout   = document.getElementById('layout'),
    menu     = document.getElementById('menu'),
    menuLink = document.getElementById('menuLink');

    if (menuLink) {
      menuLink.onclick = function (e) {
        var active = 'active';

        e.preventDefault();
        view.toggleClass(layout, active);
        view.toggleClass(menu, active);
        view.toggleClass(menuLink, active);
      };
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

  showHelpPopups: function(){
    //to create a popup that points to the active logo
    // and the list of users with explanation
  },

  toggleActiveIcon: function(node){
    if (node.attributes[0].value === "active"){
      node.setAttribute("class", "inactive")
    }else{
      node.setAttribute("class", "active")
    }
  },

  refreshActiveIcon: function(){
    if (controller.loggedUser.activeState){
      $("#availability").children().children().attr("class", "active")
    }else{
      $("#availability").children().children().attr("class", "inactive")
    }
  },

  showGoogleHangoutButtonRequestor: function(){
    console.log("showing requestor button")

    $(".button-div").empty().prepend(
      "<a id='pairing-link'class='pure-button pure-button-active'"
      +"href='http://plus.google.com/hangouts/_?gid=212567943044' target=_blank>"
      +"Request Pairing"
      + "</a>")
    $('#pairing-link').on('click', function(){
      $('#close-pop-up').click()
    })
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

  showLoggedUser: function(){
    $(".logged_user").text(controller.loggedUser.name)
    $('.logged_user')[0].id = controller.loggedUser.id
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

  showQuote: function(quote){
    $("#footer").empty().html("<h3>\"" + quote.content + "\"</h3><h4> " + quote.author + "</h4>");
  },

  showNumOfCities: function(cityCount){
    $("#logo-in-map").append("<h2>DBC CONNECT</h2>Find your fellow boots in " + cityCount + " cities around the world")
  },

  hidePartial:function(e){
    $(e.target).parent().parent().hide()
  }
}



