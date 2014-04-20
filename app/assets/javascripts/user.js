User = function(serverData){
  this.name = serverData.name;
  this.id = serverData.user_id;
  this.activeState = serverData.active;
  this.requestor_id = null;
}
