returnTypeOf = function(object){
  return Object.prototype.toString.apply(object)
}

describe("NameSpace", function(){
  it("is defined", function(){
    expect(BootMap).toBeDefined()
  }),

  it("has a controller constructor function", function(){
    expect(BootMap.Controller).toBeDefined()
  }),

  it("has a view constructor function", function(){
    expect(BootMap.View).toBeDefined()
  })
})

describe("Controller", function(){
  beforeEach(function(){
    controller = new BootMap.Controller
    mapStub = {}
    osmStub = {}
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
  }),

  it("initializes an OpenStreetMap layer", function(){
    expect(returnTypeOf(controller.osmInitializer())).toBe(returnTypeOf(osmStub))
  })

})

describe("View", function(){
  beforeEach(function(){
  })

  it("is has a controller",function(){
    expect(view.controller).toBeTruthy()
  }),

  it("is undefined if called with no arguments",function(){
    expect(view.drawMap()).toBeUndefined()
  })

  it("requires a map and osm as parameters to draws a map", function(){
    expect(view.drawMap(mapObject,osm)).toBeDefined()
  })



})

