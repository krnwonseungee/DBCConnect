SearchResults.Controller = function(){}

SearchResults.Controller.prototype = {
  retrieveResults: function(){
    $.ajax({
      type: "get",
      url: "/users/results"
      dataType: "json"
    }).done(function(serverData{
      searchResults.list = serverData.user_obj_array
    }))
  }
}
