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
    if (node.attributes.class.value === "active"){
      node.setAttribute("class", "inactive")
    }else{
      node.setAttribute("class", "active")
    }
  },


  renderList: function(){
    $("#activeUsersList").empty();
    var numOfActiveUsers = list.activeUsers.length;
    for (var i = 0; i < numOfActiveUsers; i++){
      if (list.activeUsers[i].id != user.id){
        $("#activeUsersList").append("<li class='active_user' id='" 
          + list.activeUsers[i].id + "'>"
          + "<a href=''><i class='fa fa-circle'></i>  " 
          + list.activeUsers[i].name + "</a></li>")
      }
    }
  },

  showPairingPopup: function(id){
    //show the popup
    $("#activeUsersList").append("<li>"
    + "<a href='plus.google.com/hangouts/_?gid=212567943044'"
    + "Click Here</a></li>")//temp
  },

  initializePairingIcon: function(){
    $("#availability a span[class='inactive']").attr("class",user.active)
  }
}



