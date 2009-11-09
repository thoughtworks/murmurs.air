/*
 * Copyright 2009 ThoughtWorks, Inc.
 * 
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 * 
 * http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */

Screw.Unit(function() {
  describe("Preference", function() {
    var p
    
    before(function() {
      p = new Preference()
      p.reset();
    })
    
    describe("when nothing set", function() {
      it("attributes should all be null", function() {
        expect(p.host()).to(be_null)
        expect(p.project_id()).to(be_null)
        expect(p.username()).to(be_null)
        expect(p.password()).to(be_null)
      })
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
  
