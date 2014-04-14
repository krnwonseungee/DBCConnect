SearchResults.Controller = function(){}

SearchResults.Controller.prototype = {
  bindEvents: $("#searchbar").submit(function(e){
    e.preventDefault();
    // view.showResults();
    console.log("poo")
  },

  retrieveResults: function(){
    $.ajax({
      type: "get",
      url: "/users/results",
      dataType: "json",
    }).done(function(serverData{
      console.log("poo")
      // searchResults.list = serverData.user_obj_array
    }))
  }
}

$(document).ready(function(){
  controller = new SearchResults.Controller
  controller.bindEvents
})
