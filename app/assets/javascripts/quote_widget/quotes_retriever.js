function QuotesRetriever(notifier) {
  this.notifier = notifier;
};

QuotesRetriever.prototype = {
  retrieve: function() {
               var notifier = this.notifier;
               $.ajax({
                 type: "get",
                 url: "/quotes",
                 dataType:"json"
               }).done(function(quote){
                 notifier.handleQuote(quote)
               });
             }
};
