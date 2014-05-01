QuoteWidget.View = function(targetSel, templateNameSel) {
  this.targetSel = targetSel;
  this.templateNameSel = templateNameSel || "quote";
}

QuoteWidget.View.prototype = {
  showQuote: function(quoteBearer){
    var quote = quoteBearer.quote,
      content = HandlebarsTemplates[this.templateNameSel](quote);

    $(this.targetSel).empty().append(content);
  }
};
