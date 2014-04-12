returnTypeOf = function(object){
  return Object.prototype.toString.apply(object)
}
describe("New Map", function() {
  beforeEach(function(){
    mapStub = {}
  })
    it("defines a new map function", function(){
      expect(newMap()).toBeDefined()
    }),

    it("creates a new map object", function() {
        expect(returnTypeOf(newMap())).toBe(returnTypeOf(mapStub))
    })
})

describe("Coordinate Generator", function(){
  beforeEach(function(){
    locationArray = []
  })

  it("creates an array of coordinates", function(){
    expect(getCoords()).toContain([27.5,-118.5])
  })
})




