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

PreferenceController = function() {
  var preference = new Preference()  
  
  var change_listener = function() {
    preference[this.id](this.value)
  }
  
  var public =  {
    open: function() {
      window.open("/app/views/preference.html", "Preference").resizeTo(400, 280)
    },
    
    init: function() {
      var inputs = $('input[type=text], input[type=password]')
      
      inputs.each(function() {
        this.value = preference[this.id]()
      })
      
      inputs.change(change_listener)
      
      window.nativeWindow.addEventListener(air.Event.DEACTIVATE, function() {
        inputs.each(change_listener)
      })
      
      window.nativeWindow.addEventListener(air.Event.CLOSE, function() {
        window.opener.ApplicationController.reload_timeline()
      })
    }
  }
  
  return public
}()