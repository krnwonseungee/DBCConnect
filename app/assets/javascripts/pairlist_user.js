Pairlist.User = function(json) {
  var jsonData = JSON.parse(json);
  for (var k in jsonData) {
    if (jsonData.hasOwnProperty(k)) this[k] = jsonData[k];
  }
}

Pairlist.User.prototype = {
  markAsUnavailable: function (notifiedContext, callback) {
                       $.post('/users/mark_unwilling_to_pair', { user_id: this.id }, function () {
                         callback.call(notifiedContext);
                       });
  },
    
  markAsAvailable: function (notifiedContext, callback) {
                       $.post('/users/mark_willing_to_pair', { user_id: this.id }, function () {
                         callback.call(notifiedContext);
                       });
  } 
}
