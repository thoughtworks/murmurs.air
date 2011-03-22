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
  var account = { card_url: function(number) { return "http://example.com/" + number} }
  
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
            <created_at type="datetime">2011-03-05T18:57:17Z</created_at> \
            <jabber_user_name nil="true"></jabber_user_name>\
            <is_truncated type="boolean">false</is_truncated>\
          </murmur>\
          <murmur>\
            <id type="integer">2</id>\
            <author nil="true"></author>\
            <body>hello</body>\
            <created_at type="datetime">2011-03-04T22:10:20Z</created_at>\
            <jabber_user_name>admin</jabber_user_name>\
            <is_truncated type="boolean">false</is_truncated>\
          </murmur>\
          <murmur> \
            <id type="integer">3</id>\
            <author>\
              <id type="integer">638</id>\
              <name>wpc</name>\
              <login>wpc</login>\
              <email />\
              <light type="boolean">false</light>\
              <icon_path>/user/icon/638/wpc_copy.jpg</icon_path>\
            </author>\
            <body>with default stream</body>\
            <created_at type="datetime">2011-03-04T19:30:56Z</created_at>\
            <jabber_user_name nil="true"></jabber_user_name>\
            <stream type="default" />\
            <is_truncated type="boolean">false</is_truncated>\
          </murmur>\
          <murmur> \
            <id type="integer">4</id>\
            <author>\
              <id type="integer">638</id>\
              <name>wpc</name>\
              <login>wpc</login>\
              <email />\
              <light type="boolean">false</light>\
              <icon_path>/user/icon/638/wpc_copy.jpg</icon_path>\
            </author>\
            <body>with comment stream</body>\
            <created_at type="datetime">2011-03-05T01:57:13Z</created_at>\
            <jabber_user_name nil="true"></jabber_user_name>\
            <stream type="comment"> \
               <origin url="http://localhost:3000/api/v2/projects/lotsa_aggregates/cards/4533.xml"> \
                 <number type="integer">4533</number> \
                </origin> \
            </stream> \
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
        expect(parsed(0).created_at()).to(equal, '2011-03-05T18:57:17Z')
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
      
      it("should be able to extract out stream information when it exists", function() {
        expect(parsed(0).stream().description(account)).to(equal, "")
        expect(parsed(1).stream().description(account)).to(equal, "")
        expect(parsed(2).stream().description(account)).to(equal, "")
        expect(parsed(3).stream().description(account)).to(match, '4533')
      })
      
      it("should be able to parse out all murmurs", function() {
        var murmurs = MurmurParser.parse_collection(doc)
        expect($.pluck(murmurs, 'id')).to(equal, [1, 2, 3, 4])
      })
      
    })  
  })
})