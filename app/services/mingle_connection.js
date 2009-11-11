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


MingleConnection = function(resource) {
  
  var preference = new Preference()
  
  var list_url = function() {
    return preference.host() + "/api/v2/projects/" + preference.project_id() + "/" + resource + ".xml"
  }
  
  var general_request_options = function(){
    return {
      dataType: 'xml',
      url: list_url(),
      beforeSend: function(xhr) {
        xhr.setRequestHeader('Authorization', base_auth_token())
      }
    }
  }
  
  var base_auth_token = function() {
    return make_base_auth(preference.username(), preference.password())
  }
  
  return {
    request: function(options) {    
      if(!preference.host()) return
      $.ajax($.extend(general_request_options(), options))
    }
  }
}