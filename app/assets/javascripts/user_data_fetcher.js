function UserDataFetcher(notifier) {
  this.notifier = notifier;
}

UserDataFetcher.prototype = {
  fetch: function() {
           var controller = this.notifier,
             view = this.view;
           $.ajax({
             type: "get",
             url: "/welcome/getuser"
           }).done(function(serverData){
             controller.setUser(new User(serverData));
           })
         },
}
