QuoteWidget.View = function(targetSel, templateNameSel) {
  this.targetSel = targetSel;
  this.templateNameSel = templateNameSel || "#quote-template";
}

QuoteWidget.View.prototype = {
  showQuote: function(quoteBearer){
    var quote = quoteBearer.quote,
    template = $(this.templateNameSel).html();

    $(this.targetSel)
    .empty()
    .append(Handlebars.compile(template)(quote));
  }
};
