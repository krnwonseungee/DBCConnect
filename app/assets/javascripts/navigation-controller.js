NavigationController = function(){}
NavigationController.prototype = {
  searchBarSubmit: function(){
      var searchValue = $("#search-input").val();
      navigationController.retrieveResults(searchValue);
  },

  retrieveResults: function(searchValue){
    $.ajax({
      type: "post",
      url: "/users/results",
      data: {pgsearch: searchValue}
    }).done(function(searchResultsPartial){
      navigationController.renderResults(searchResultsPartial);
    })
  },

  renderResults: function(searchResultsPartial){
    view.renderPartial(searchResultsPartial)
  },

  requestShowUserProfile: function(userId){
    $.ajax({
      type: 'get',
      url: '/users/'+ userId
    }).done(function(userPartial){
      view.renderPartial(userPartial);
    })
  },

  requestEditUserProfile: function(userId){
    $.ajax({
      type: 'get',
      url: '/users/'+ userId + '/edit'
    }).done(function(userEditPartial){
      view.renderPartial(userEditPartial);
    })
  },

  submitEditUserProfile: function(){
    var formData = $(".update_user").serialize()
    $.ajax({
      type: "put",
      url: "/users/" + controller.loggedUser.id,
      data: formData
    }).done(function(userPartial){
      view.renderPartial(userPartial);
    })
  }
}

