Pairlist.User = function(json) {
  var jsonData = JSON.parse(json);
  for (var k in jsonData) {
    if (jsonData.hasOwnProperty(k)) this[k] = jsonData[k];
  }
}
