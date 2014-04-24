User = function(arg){
  var k, data;

  if (typeof(arg) === "object") {
    data = arg;
    data.id = data.user_id;
  } else {
    data = JSON.parse(arg);
    data.user_id = data.id;
  }

  for (k in data) {
    if (data.hasOwnProperty(k)) this[k] = data[k];
  }
};

User.prototype = {
  markAsUnavailable: function (notifiedContext, callback) {
                     var notifiedContext = notifiedContext,
                      callback = callback;
                       $.post('/users/mark_unwilling_to_pair', { user_id: this.user_id }, function () {
                         if (callback && notifiedContext) callback.call(notifiedContext, [this]);
                       });
  },

  markAsAvailable: function (notifiedContext, callback) {
                     var notifiedContext = notifiedContext,
                      callback = callback;
                       $.post('/users/mark_willing_to_pair', { user_id: this.user_id }, function () {
                         if (callback && notifiedContext) callback.call(notifiedContext, [this]);
                       });
  }
}
