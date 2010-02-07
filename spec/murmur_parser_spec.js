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
      var murmurs
      before(function() {
        var parser = new DOMParser()
        var doc = parser.parseFromString('<?xml version="1.0" encoding="UTF-8"?> \
        <murmurs type="array"> \
          <murmur> \
            <id type="integer">118</id>\
            <author>\
              <id type="integer">638</id>\
              <name>wpc</name>\
              <login>wpc</login>\
              <email>\
              </email>\
              <light type="boolean">false</light>\
              <icon_path>/user/icon/638/wpc_copy.jpg</icon_path>\
            </author>\
            <body>hello</body>\
            <created_at type="datetime">Sun Sep 27 14:50:34 UTC 2009</created_at>\
            <jabber_user_name nil="true"></jabber_user_name>\
            <is_truncated type="boolean">false</is_truncated>\
          </murmur>\
          <murmur>\
            <id type="integer">119</id>\
            <author nil="true"></author>\
            <body>hello</body>\
            <created_at type="datetime">Wed Sep 30 02:50:04 UTC 2009</created_at>\
            <jabber_user_name>admin</jabber_user_name>\
            <is_truncated type="boolean">false</is_truncated>\
          </murmur>\
          <murmur>\
            <id type="integer">120</id>\
            <author nil="true"></author>\
            <body>where is the dirty star?</body>\
            <created_at type="datetime">Wed Sep 30 02:50:16 UTC 2009</created_at>\
            <jabber_user_name>admin</jabber_user_name>\
            <is_truncated type="boolean">false</is_truncated>\
          </murmur>\
        ', "text/xml")
        murmurs = MurmurParser.parse_collection(doc)
      })
      
      it("should extract id", function() {
        expect($.pluck(murmurs, 'id')).to(equal, [118, 119, 120])
      })
      
      it("should extract content", function() {
        expect($.invoke(murmurs, 'content')).to(equal, ['hello', 'hello', 'where is the dirty star?'])
      })
      
      it("should extract created at", function() {
        expect($.invoke(murmurs, 'created_at')).to(equal, ['Sun Sep 27 14:50:34 UTC 2009', 'Wed Sep 30 02:50:04 UTC 2009', 'Wed Sep 30 02:50:16 UTC 2009'])
      })
      
      it("should extract author when it exists", function() {
        var authors = $.invoke(murmurs, 'author')
        expect(authors[0].name).to(equal, 'wpc')
        expect(authors[0].login).to(equal, 'wpc')
      })
    })  
  })
})