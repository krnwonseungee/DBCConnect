QuoteWidget.Controller = function(view) {
  this.view = view;
}

QuoteWidget.Controller.prototype = {
  handleQuote: function(quote) {
                 this.quote = quote;
                 this.view.showQuote(this);
               }
}
