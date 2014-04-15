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
    $("#availability").children().children().attr("class", controller.loggedUser.activeState)
  },

  showGoogleHangoutButtonRequestor: function(){
    console.log("showing requestor button")
    // gapi.hangout.render('placeholder-div1', {
    //   'render': 'createhangout',
    //   'initial_apps': [{'app_id' : '212567943044', 'start_data' : 'dQw4w9WgXcQ', 'app_type' : 'ROOM_APP' }]
    // });
    $("#top_navbar").prepend("<li>"
      + "<a href='http://plus.google.com/hangouts/_?gid=212567943044'>"
      + "Click Here</a></li>")
  },

  showGoogleHangoutButtonResponder: function(url){
    console.log("showing responder button")
    $("#top_navbar").prepend("<li>"
      + "<a href='" + url + "'>"
      + "Click Here</a></li>")
    // var elem = "<a href='" + url + "'>Click To Pair</a>";
    // $(elem).bPopup();
  },

  renderList: function(){
    $("#activeUsersList").empty();
    var numOfActiveUsers = list.activeUsers.length;
    for (var i = 0; i < numOfActiveUsers; i++){
      if (list.activeUsers[i].id != controller.loggedUser.id){
        $("#activeUsersList").append("<li  id='" 
          + list.activeUsers[i].id + "'>"
          + "<a href='#popupBasic' data-rel='popup' data-transition='pop'>"
          + "<i class='fa fa-circle'></i>  " 
          + list.activeUsers[i].name + "</a></li>")
      }
    }
  },

  initializePairingIcon: function(){
    $("#availability a span[class='inactive']").attr("class",controller.loggedUser.activeState)
  },

  showLoggedUser: function(){//make a link to the profile
    $("#logged_user").text(controller.loggedUser.name)
  }
}



