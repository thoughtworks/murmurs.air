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
    air_add_app_menu("Operatinos", air_menu([
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