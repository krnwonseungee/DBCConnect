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

