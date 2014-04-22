Pairlist.View = function (opts) {
  this.opts = opts;
  this.displaySel = opts.displaySel || "#activeUsersList";
  this.templateSel = opts.templateSel || "#pairlist-user-template";
};

Pairlist.View.prototype = {
  draw: function (source) {
          var userList = source.getUserList();
          this.renderList(userList);
  },

  renderList: function(userList){
                var $display = $(this.displaySel)
                  template = $(this.templateSel).html(),
                  numOfActiveUsers = userList.length;


                $display.empty();

                for (var i = 0; i < numOfActiveUsers; i++){
                  $display.append(Handlebars.compile(template)(userList[i]));
                }
  }
}
