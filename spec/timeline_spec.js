Screw.Unit(function() {
  describe("Timeline", function() {
    var timeline
    
    before(function() {
      timeline = new Timeline()
    })
    
    describe("when prepend a murmur", function() {
      it("should notify listeners", function() {
        var notified
        timeline.onchange(function(event, murmur) {
          notified = {'event': event, 'murmur': murmur}
        })
        
        timeline.prependAll([new Murmur(1)])
        
        expect(notified).to_not(be_null)
        expect(notified.event).to(equal, 'prepend')
        expect(notified.murmur.id).to(equal, 1)
      })
    })
    
    describe("when prepend a group of murmur", function() {
      it("should do prepend notify with lates last manner", function() {
        var ids = []
        timeline.onchange(function(event, murmur) {
          ids.push(murmur.id)
        })
        
        timeline.prependAll([new Murmur(3), new Murmur(1), new Murmur(2)])
        expect(ids).to(equal, [1, 2, 3])
      })
      
      it("should not change orignal murmurs array", function() {
        var murmurs = [new Murmur(3), new Murmur(1), new Murmur(2)]
        timeline.prependAll(murmurs)
        expect($.map(murmurs, function(m) { return m.id })).to(equal, [3, 1, 2])
      })
    })
    
    describe("when prepend already prepended murmur to timeline", function() {
      it("should not borther listener twice", function() {
        var ids = []
        timeline.onchange(function(event, murmur) {
          ids.push(murmur.id)
        })
        timeline.prependAll([new Murmur(1), new Murmur(1), new Murmur(2)])
        expect(ids).to(equal, [1, 2])
      })
    })
  })
})