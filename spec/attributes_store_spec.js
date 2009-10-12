Screw.Unit(function() {
  describe("MemAttributesStore", function() {
    var s
    
    before(function(){
      s = new MemAttributesStore()
    })
    
    it("should get what to set", function() {
      s.set('k1', 'v1')
      expect(s.get('k1')).to(equal, 'v1')
    })
    
    it("uses case insensitive keys", function() {
      s.set('k1', 'v1')
      expect(s.get('K1')).to(equal, 'v1')
    })
    
    it("can override a key", function() {
      s.set('k1', 'v1')
      s.set('k1', 'v1b')
      expect(s.get('k1')).to(equal, 'v1b')
    })
    
    it("should return null for key haven't been set", function() {
      expect(s.get('k1') === null).to(be_true)
    })
    
    it("can use build in function name as key", function() {
      s.set('prototype', '1')
      expect(s.get('prototype')).to(equal, '1')
    })
    
    it("can serialize to xml", function() {
      s.set('k1', 'v1')
      s.set('k2', 'v2')
      expect($('k1', s.to_xml()).text()).to(equal, 'v1')
      expect($('k2', s.to_xml()).text()).to(equal, 'v2')
    })
    
    // todo:
    // it("should not include prototype accidentally in to_xml", function() {
    //   expect($('prototype', s.to_xml()).size()).to(equal, 0)
    //   s.set('prototype', '1')
    //   expect($('prototype', s.to_xml()).size()).to(equal, 1)
    // })
    
    it("can deserialize from attributes xml", function() {
      s.set('k1', 'v1')
      s.set('k2', 'v2')
      var s1 = MemAttributesStore.from_xml(s.to_xml())
      expect(s1.get('k1')).to(equal, 'v1')
      expect(s1.get('k2')).to(equal, 'v2')
      expect(s1.get('k3')).to(be_null)
    })
  })
  
  describe("EncryptedAttrStore", function() {
    
    var s
    
    before(function(){
      s = new EncryptedAttrStore('s')
    })
    
    it("should be able to get set value", function() {
      s.set('k1', 'v1')
      expect(s.get('k1')).to(equal, 'v1')
    })
    
    it("should be able to reset all value", function() {
      s.set('k1', 'v1')
      s.reset()
      expect(s.get('k1')).to(be_null)
    })
        // todo
        // it("should only reset other instance when it has a different namespace", function() {
        //   s.set('k1', 'v1')
        //   var s2 = new EncryptedAttrStore('s2')
        //   s2.set('k1', 'v1')
        //   s.reset()
        //   expect(s2.get('k1')).to(equal, 'v1')
        // })
  })
})