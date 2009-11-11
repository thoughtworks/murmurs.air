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
MurmursService = function() {
  
  var conn = new MingleConnection("murmurs")
  
  return  {
    // create new murmur on mingle
    post: function(murmur, callback) {
      if(murmur.blank()) return
      
      conn.request({
        type: "POST",
        data: {'murmur[body]': murmur.content() },
        async: false,
        success: function() { callback() }
      })
    },
    
    // return 25 murmurs since a murmur's id, 
    // return latest 25 murmurs if since_id is null
    fetch_since: function(since_id, callback) {
      conn.request({
        data: (since_id ? {'since_id': since_id} : {}),
        success: function(xml) {
          callback(Murmur.parse_collection(xml))
        }
      })
    },
    
    // return 25 mururs happened before a murmur id
    fetch_before: function(before_id, callback, options) {
      conn.request($.extend({
        data: {'before_id': before_id},
        success: function(xml) {
          callback(Murmur.parse_collection(xml))
        }
      }, options))
    }    
  }
}()