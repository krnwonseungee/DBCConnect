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
