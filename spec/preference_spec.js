Screw.Unit(function() {
  describe("p", function() {
    var p
    
    before(function() {
      p = new Preference()
      p.reset();
    })
    
    describe("when set a item", function() {
      it("should be able to get it using getter", function() {
        p.host("http://example.com")
        expect(p.host()).to(equal, "http://example.com")
        
        p.project_id("n1")
        expect(p.project_id()).to(equal, "n1")
        
        p.username("wpc")
        expect(p.username()).to(equal, "wpc")
        
        p.password("123")
        expect(p.password()).to(equal, "123")
      })
    })
    
    describe("basic authentication token", function() {
      it("should be made from user/pass using base64 encoding", function(){
        p.username("wpc")
        p.password("pass")
        expect(p.base_auth_token()).to(equal, make_base_auth("wpc", "pass"))
      })
    })
    
    describe("when set attribute to one instance", function() {
      it("should change attribute to all the other instances", function() {
        var p1 = new Preference();
        p.host("some host")
        expect(p1.host()).to(equal, p.host())
      })
    })
  })
})
  
