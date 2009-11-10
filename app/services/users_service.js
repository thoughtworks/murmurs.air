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

UsersService = function() {
  var preference = new Preference()
  
  var general_request_options = function(){
    return {
      dataType: 'xml',
      beforeSend: function(xhr) {
        xhr.setRequestHeader('Authorization', preference.base_auth_token())
      }      
    }
  } 

  var request = function(options) {
    if(!preference.host()) return
    $.ajax($.extend(general_request_options(), options))
  }
  
  var public = {
    list: function(callback) {
      request({
        url: preference.users_list_url(),
        data: {},
        async: false,
        success: function(xml) {
          callback(User.parse_collection(xml))
        }
      })
    }
  }
  
  return public
}()