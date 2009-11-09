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

ApplicationController = function() {
  var updater = new air.ApplicationUpdaterUI()
  var timeline_window
  
  var open_timeline = function() {
    timeline_window = TimelineController.open()
  }
  
  var timeline_controller = function() {
    if(!timeline_window) return
    return timeline_window.TimelineController
  }
  
  var refresh_timeline = function() {
    if(!timeline_controller()) return
    timeline_controller().refresh()
  }

  var check_updates = function() {
    updater.checkNow()
  }
  
  var setup_auto_updater = function() {
    updater.configurationFile = new air.File("app:/config/update_config.xml")
    updater.isCheckForUpdateVisible = false
    updater.initialize()

    setInterval(check_updates, 2 * 60 * 60 * 1000) // check updates every 2 hours
    setTimeout(check_updates, 3 * 1000) // do a first check
  }
  
  var setup_menu = function() {
    $.air.add_to_app_menu("Operatinos", $.air.menu([
      ["Preference...", PreferenceController.open],
      ["Refresh", refresh_timeline],
      ["Check for Updates...", check_updates]
    ]))
  }
  
  var public =  {
    init: function() {
      setup_menu()
      setup_auto_updater()
      
      if( new Preference().host() ) {
        open_timeline()
      } else {
        PreferenceController.open()
      }
    }, 
    
    
    reload_timeline: function() {
      if(!timeline_window) {
        open_timeline()
      } else {
        timeline_window.location.reload()
      }
    },
  }
  
  return public
}()