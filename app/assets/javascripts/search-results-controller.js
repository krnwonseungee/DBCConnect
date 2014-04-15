SearchResults.Controller = function(){}

SearchResults.Controller.prototype = {
  bindSearchbarEvent: function(){
    $("#searchbar").submit(function(e){
      e.preventDefault();
      var searchValue = $("input:first").val();
      // console.log("SEARCHVALUE" + searchValue)
      searchResultsController.retrieveResults(searchValue);
    })

    $('#main').on("click", ".profilelink", function(e){
      e.preventDefault();
      console.log('poo');
      var clickedLinkPathname = $(this).attr('href')
      var userId = clickedLinkPathname.substr(clickedLinkPathname.length - 3)
      console.log(userId);
      searchResultsController.fetchUserInfo(userId);
    })

    $('#main').on("click", ".editproflink", function(e){
      e.preventDefault();
      var editLinkPathname = $(this).attr('href')
      console.log(editLinkPathname);
      // debugger
      // var editUserId = editLinkPathname.substr(editLinkPathname.length - 8)
      // console.log(editUserId);
      searchResultsController.fetchEditUserInfo(editLinkPathname);
    })

    $('#main').on("submit", ".update_user", function(e){
      e.preventDefault();
      rerouteProfLink = this.action
      // var clickedLinkPathname = $(this).attr('href')
      var rerouteUserId = rerouteProfLink.substr(rerouteProfLink.length - 3)
      // console.log(userId);
      searchResultsController.fetchUserInfo(rerouteUserId);
    })

    // $("#searchbar").submit(function(e){
    //   e.preventDefault();
    //   var searchValue = $("input:first").val();
    //   // console.log("SEARCHVALUE" + searchValue)
    //   searchResultsController.retrieveResults(searchValue);
    // })

  },


  retrieveResults: function(searchValue){
      // debugger
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
