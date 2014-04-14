List = function(){
  this.activeUsers = []
  this.idleUsers = []
  this.inactiveUsers = []
}
list = new List

User = function(){
  this.name = ""
  this.id = null
  this.active = false
}

this.pinger = setInterval(function(){controller.pinging}, 900)