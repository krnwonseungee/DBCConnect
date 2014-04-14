SearchResults.Controller = function(){}

SearchResults.Controller.prototype = {
  bindSearchbarEvent: function(){
    $("#searchbar").submit(function(e){
      e.preventDefault();
      var searchValue = $("input:first").val();
      // console.log("SEARCHVALUE" + searchValue)
      searchResultsController.retrieveResults(searchValue);
    })
  },

  retrieveResults: function(searchValue){
      // debugger
    $.ajax({
      type: "post",
      url: "/users/results",
      data: {pgsearch: searchValue}
    }).done(function(data){
      searchResultsController.renderResults(data.user_obj_array);
    })
  },

  renderResults: function(resultsArray){
    var resultsArray = resultsArray
    console.log(resultsArray)
    $('#main').empty()
    for (var i=0; i<resultsArray.length; i++){
      var currentName = resultsArray[i].name;
      $('#main').append(currentName)
    }

    // $('#main').html(resultsHtml)

  }

}
