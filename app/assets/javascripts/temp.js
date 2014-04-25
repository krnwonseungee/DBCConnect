BootMap.PopupPresenter = function(boot, opts) {
  this.boot = boot;
  if (!opts) opts = {};
  this.templateSel = opts.templateSel || "#user-popup";
  if (!BootMap.template) BootMap.template = Handlebars.compile($(this.templateSel).html());
};

BootMap.PopupPresenter.prototype = {
  present: function () {
    return BootMap.template(this.boot);
  }
}

BootMap.UserFetcher = function() {
}

BootMap.UserFetcher.prototype = {
  fetch: function(cb) {
           var layerGenerator = this.layerGenerator,
            fetcher = this,
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

