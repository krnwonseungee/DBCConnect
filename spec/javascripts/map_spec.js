returnTypeOf = function(object){
  return Object.prototype.toString.apply(object)
}

describe("NameSpace", function(){
  it("is defined", function(){
    expect(UserMap).toBeDefined()
  }),

  it("has a controller function", function(){
    expect(UserMap.Controller).toBeDefined()
  })
})

describe("Controller", function(){
  beforeEach(function(){
    controller = new UserMap.Controller
    mapStub = {}
  })

  it("has a coordinate generator", function(){
    expect(controller.getCoords()).toBeDefined()
  }),

  it("produces an array of coordinates", function(){
    locationArray = []
    expect(controller.getCoords()).toContain([27.5,-118.5])
  }),

  it("has a new map function", function(){
    expect(controller.newMap()).toBeDefined()
  }),

  it("creates a new map object", function(){
    expect(returnTypeOf(controller.newMap())).toBe(returnTypeOf(mapStub))
  })
})




