List = function(){
  this.activeUsers = []
  this.idleUsers = []
  this.inactiveUsers = []
}
list = new List

User = function(){
  this.name = ""
  this.id = null
  this.activeState = false
  this.requestor_id = null
}
