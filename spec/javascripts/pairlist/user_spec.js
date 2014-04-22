describe("Pairlist Applet", function () {
  beforeEach(function() {
    jsonString = JSON.stringify({
      id: 5,
      cohort_id: 666,
      name: "TestUser"
    });
  });

  describe("Pairlist.User", function() {
    describe("When deserializing JSON", function () {

      it("Should set name based on JSON string", function () {
        var user = new Pairlist.User(jsonString);
        expect(user.name).toEqual("TestUser");
      });
    });
  });

  describe("Pairlist.UserListPoller", function() {
    it("should allow the done callback to be injectable", function () {
      var cb = jasmine.createSpy('done');

      spyOn($, 'ajax').and.callFake(function (req) {
        var d = $.Deferred();
        d.resolve(Pairlist.MockActiveUsersResponse);
        return d.promise();
      });

      new Pairlist.UserListPoller({}, {doneCallback: cb}).retrieve();
      expect(cb).toHaveBeenCalledWith(jasmine.any(Object));
    });

  });
})
