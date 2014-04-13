
//controller
$(document).ready(function(){
  view.setupMenuToResponsive();
  setInterval(refreshList, 1000);
})

refreshList = function(){
  list.update()
  view.renderList()
}
