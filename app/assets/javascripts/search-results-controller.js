SearchResults.Controller = function(){}

SearchResults.Controller.prototype = {
  bindSearchbarEvent: function(){
    $("#searchbar").submit(function(e){
      e.preventDefault();
      var searchValue = $("input:first").val();
      searchResultsController.retrieveResults(searchValue);
    })

    $('#main').on("click", ".profilelink", function(e){
      e.preventDefault();
      var clickedLinkPathname = $(this).attr('href')
      var userId = clickedLinkPathname.substr(clickedLinkPathname.length - 3)
      searchResultsController.fetchUserInfo(userId);
    })

    $('#main').on("click", ".editproflink", function(e){
      e.preventDefault();
      var editLinkPathname = $(this).attr('href')
      searchResultsController.fetchEditUserInfo(editLinkPathname);
    })

    $('#main').on("submit", ".update_user", function(e){
      e.preventDefault();
      rerouteProfLink = this.action
      var rerouteUserId = rerouteProfLink.substr(rerouteProfLink.length - 3)
      searchResultsController.fetchUserInfo(rerouteUserId);
    })
  },


  retrieveResults: function(searchValue){
    $.ajax({
      type: "post",
      url: "/users/results",
      data: {pgsearch: searchValue}
    }).done(function(searchResults){
      searchResultsController.renderResults(searchResults);
    })
  },

  renderResults: function(results){
    $('#main').empty().append(results)
  },

  fetchUserInfo: function(userId){
    // debugger
    event.preventDefault();
    $.ajax({
      type: "get",
      url: "/users/" + userId
    }).done(function(data){
      searchResultsController.showUserProfile(data)
    })
  },

  showUserProfile: function(partial){
    $('#main').html(partial)
  },

  fetchEditUserInfo: function(editLinkPathname){
    // debugger
    event.preventDefault();
    $.ajax({
      type: "get",
      url: editLinkPathname
    }).done(function(data){
      searchResultsController.showUserProfile(data)
    })
  },

  showEditProfile: function(partial){
    $('#main').html(partial)
  }
}
