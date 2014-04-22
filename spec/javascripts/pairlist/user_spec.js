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
})
