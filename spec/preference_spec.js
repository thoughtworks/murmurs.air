Screw.Unit(function() {
  describe("Preference", function() {
    
    describe("when set a item", function() {
      it("should be able to get it using getter", function() {
        Preference.host("http://example.com")
        expect(Preference.host()).to(equal, "http://example.com")
        
        Preference.project_id("n1")
        expect(Preference.project_id()).to(equal, "n1")
        
        Preference.username("wpc")
        expect(Preference.username()).to(equal, "wpc")
        
        Preference.password("123")
        expect(Preference.password()).to(equal, "123")
      })
    })
    
    describe("basic authentication token", function() {
      it("should be made from user/pass base64 encoding", function(){
        Preference.username("wpc")
        Preference.password("pass")
        expect(Preference.base_auth_token()).to(equal, make_base_auth("wpc", "pass"))
      })
    })
  })
})
  
