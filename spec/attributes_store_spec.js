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