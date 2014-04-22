function UserListPoller(notifier) {
  this.UPDATE_LIST_QUERY_TIME = 2003;
  this.notifier = notifier;
  setInterval(UserListPoller.refreshList.call(this), this.UPDATE_LIST_QUERY_TIME);
}

UserListPoller.refreshList = function(){
  $.ajax({
    type: "get",
    url: "/users/active",
    dataType: "json",
    context: this,
  }).done(function(serverData){
    this.notifier.updateActiveUsers(serverData.activeUsers.map($.parseJSON));
  })
};
