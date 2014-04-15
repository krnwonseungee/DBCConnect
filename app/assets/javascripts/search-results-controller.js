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
  }
}
