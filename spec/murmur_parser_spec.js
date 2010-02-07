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
  describe("MurmurParser", function() {
    describe("parsing murmur from xml", function() {
      var doc
      // var murmurs
      before(function() {
        doc = new DOMParser().parseFromString('<?xml version="1.0" encoding="UTF-8"?> \
        <murmurs type="array"> \
          <murmur> \
            <id type="integer">1</id>\
            <author>\
              <id type="integer">638</id>\
              <name>wpc</name>\
              <login>wpc</login>\
              <email>\
              </email>\
              <light type="boolean">false</light>\
              <icon_path>/user/icon/638/wpc_copy.jpg</icon_path>\
            </author>\
            <body>murmur from murmur tab</body>\
            <created_at type="datetime">Sun Sep 27 14:50:34 UTC 2009</created_at>\
            <jabber_user_name nil="true"></jabber_user_name>\
            <is_truncated type="boolean">false</is_truncated>\
          </murmur>\
          <murmur>\
            <id type="integer">2</id>\
            <author nil="true"></author>\
            <body>hello</body>\
            <created_at type="datetime">Wed Sep 30 02:50:04 UTC 2009</created_at>\
            <jabber_user_name>admin</jabber_user_name>\
            <is_truncated type="boolean">false</is_truncated>\
          </murmur>\
        ', "text/xml")
      })
      
      var parsed = function(section_index) {
        return MurmurParser.parse($('murmurs murmur', doc)[section_index])
      }
      
      it("should be able to extract id", function() {
        expect(parsed(0).id).to(equal, 1)
      })
      
      it("should be able to extract content", function() {
        expect(parsed(0).content()).to(equal, "murmur from murmur tab")
      })
      
      it("should be able to extract created at", function() {
        expect(parsed(0).created_at()).to(equal, 'Sun Sep 27 14:50:34 UTC 2009')
      })
      
      it("should be able to extract author when it exists", function() {
        expect(parsed(0).author().name).to(equal, 'wpc')
        expect(parsed(0).author().login).to(equal, 'wpc')
        expect(parsed(1).author()).to(be_null)
      })
      
      it("should be able to extract jabber_user_name when it exists", function() {
        expect(parsed(0).jabber_user_name()).to(be_null)
        expect(parsed(1).jabber_user_name()).to(equal, 'admin')
      })
      
      it("should be able to parse out all murmurs", function() {
        var murmurs = MurmurParser.parse_collection(doc)
        expect($.pluck(murmurs, 'id')).to(equal, [1, 2])
      })
      
    })  
  })
})