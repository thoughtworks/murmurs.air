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

Preference = function() {
  
  var preferences_file = env.testing ? "test_preferences.xml" : "preferences.xml"
  var attr_store = new XMLFileAttributesStore(preferences_file)
  var encrypted_attr_store = new EncryptedAttrStore()
  
  var public = {
    host: function(v) { return attr('host', v, attr_store) },
    project_id: function(v) { return attr('project_id', v, attr_store) },
    username: function(v) { return attr('username', v, attr_store) },
    password: function(v) { return attr('password', v, encrypted_attr_store) },
    display_name: function(v) { return attr('display_name', v, attr_store) },
    
    base_auth_token: function() {
      return make_base_auth(public.username(), public.password())
    },
    
    murmurs_url: function(){
      return public.host() + "/api/v2/projects/" + public.project_id() + "/murmurs.xml"
    },
    
    card_html_url: function(number) {
      return public.host() + "/projects/" + public.project_id() + "/cards/" + number
    },
    
    users_list_url: function() {
      return public.host() + "/api/v2/projects/" + public.project_id() + "/users.xml"
    },
    
    reset: function() {
      attr_store.reset();
      encrypted_attr_store.reset();
    }
  }
  
  return public
}