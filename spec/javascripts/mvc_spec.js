describe ("List Model", function(){
  beforeEach(function(){
    setFixtures('<div id="list"></div>'
                + '<div id="layout"></div>'
                + '<div id="menu"></div>'
                + '<div id="menuLink"></div>')

  })

  it ("adds a user to the list", function(){
    console.log($("#list"));
    user = new User();
    user.name = "test"
    list.addUser(user);
    expect(list.activeUsers).toEqual(user);
  });
})