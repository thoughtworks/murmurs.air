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


Account = function() {
  var preference = new Preference()
  var current_user = null
  
  var find_user_by_login = function(login) {
    var found_user = null
    var users_service = new UsersService(self)
    users_service.list(function(users) { //sync call
      found_user = $.detect(users, function(user) {
        return user.login() == login
      })
    })
    return found_user
  }
  
  var self = {
    user_login: function() {
      return preference.username()
    },
    
    password: function() {
      return preference.password()
    },
    
    //TODO: account.configured should be removed after story #23
    configured: function() {
      return preference.configured()
    },
    
    card_url: function(number) {
      return self.base_url() + "/projects/" + preference.project_id() + "/cards/" + number
    },
    
    resource_list_url: function(resource_name) {
      return self.base_url() + "/api/v2/projects/" + preference.project_id() + '/' + resource_name + ".xml"
    },
    
    base_url: function() {
      return preference.host()
    },
    
    current_user: function() {
      if (current_user) return current_user
      current_user = find_user_by_login(self.user_login())
      return current_user
    }
  }
  return self
}
