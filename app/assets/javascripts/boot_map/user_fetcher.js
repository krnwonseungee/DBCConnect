BootMap.UserFetcher = function() {
}

BootMap.UserFetcher.prototype = {
  fetch: function(cb) {
           var fetcher = this,
            cb = cb;

             $.ajax({
               url: '/users',
             })
             .done(function(data){
               cb.apply(fetcher, [fetcher._generateBoots(data.users)]) ;
             });
         },

  _generateBoots: function (bootsJson) {
                    return bootsJson.map(function(bootJson) {
                      return new BootMap.Boot(bootJson);
                    });
  }
}


