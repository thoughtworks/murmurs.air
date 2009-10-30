Screw.Unit(function() {
  describe("Timeline", function() {
    var timeline
    
    before(function() {
      timeline = new Timeline()
    })
    
    describe("after freshly created", function() {
      it("should not have latest id", function() {
        expect(timeline.latest_id()).to(be_null)
      })
    })
    
    describe("when prepend a murmur", function() {
      it("should notify listeners", function() {
        var notified
        timeline.onchange(function(event, murmur) {
          notified = {'event': event, 'murmur': murmur}
        })
        
        timeline.prepend_all([new Murmur(1)])
        
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
        
        timeline.prepend_all([new Murmur(3), new Murmur(1), new Murmur(2)])
        expect(ids).to(equal, [1, 2, 3])
      })
      
      it("should not change orignal murmurs array", function() {
        var murmurs = [new Murmur(3), new Murmur(1), new Murmur(2)]
        timeline.prepend_all(murmurs)
        expect($.map(murmurs, function(m) { return m.id })).to(equal, [3, 1, 2])
      })
      
      it("should record largest id as latest murmur id", function() {
        timeline.prepend_all([new Murmur(3), new Murmur(1), new Murmur(2)])
        expect(timeline.latest_id()).to(equal, 3)
      })
    })
    
    describe("find murmurs with murmur id", function() {
      var m1, m2, m3
      before(function() {
        m1 = new Murmur(1)
        m2 = new Murmur(2)
        m3 = new Murmur(3)
        timeline.prepend_all([m1, m2, m3])
      })
      
      it("should return exact murmur when id match", function() {
        expect(timeline.find(1)).to(equal, m1)
        expect(timeline.find(3)).to(equal, m3)
      })
      
      it("should return null when no id match", function(){
        expect(timeline.find(0)).to(be_null)
        expect(timeline.find(255)).to(be_null)
      })
      
      
      it("should allow use string as id to search", function(){
        expect(timeline.find("1")).to(equal, m1)
        expect(timeline.find("255")).to(be_null)
      })
      
    })
    
    describe("when prepend already prepended murmur to timeline", function() {
      it("should not borther listener twice", function() {
        var ids = []
        timeline.onchange(function(event, murmur) {
          ids.push(murmur.id)
        })
        timeline.prepend_all([new Murmur(1), new Murmur(1), new Murmur(2)])
        expect(ids).to(equal, [1, 2])
      })
    })    
  })
})