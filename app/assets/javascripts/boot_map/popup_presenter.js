BootMap.PopupPresenter = function(boot, opts) {
  this.boot = boot;
  if (!opts) opts = {};
  this.templateSel = opts.templateSel || "user_popup";
};

BootMap.PopupPresenter.prototype = {
  present: function () {
    return HandlebarsTemplates[this.templateSel](this.boot);
  }
}

