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
  
  describe("Stream", function() {
    describe("parsing", function() {      
      var parse = function(string) {
        var xml = new DOMParser().parseFromString(string, "text/xml")
        return Stream.parse($("stream", xml))
      }
      
      it("can parse default type stream", function() {
        var stream = parse("<stream type=\"default\" />")
        expect(stream.description(account)).to(equal, "")
      })
      
      it("can parse none stream as default stream", function() {
        var stream = parse("</>")
        expect(stream.description(account)).to(equal, "")
      })
      
      it("can parse unregistered stream as default stream", function() {
        var stream = parse("<stream type=\"unregistered\" />")
        expect(stream.description(account)).to(equal, "")
      })
      
      it("can parse card comment stream", function() {
        var stream = parse('<stream type="comment"> \
             <origin url="http://localhost:3000/api/v2/projects/lotsa_aggregates/cards/4533.xml"> \
               <number type="integer">4533</number> \
              </origin> \
          </stream>')
        var expected_desc = '<span class="stream">'+ Card.link_for(account, 4533, {title: 'from comment of card #4533'}) +'</span>'
        expect(stream.description(account)).to(equal, expected_desc)
      })
    })
  })
})