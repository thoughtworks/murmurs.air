ApplicationController = function() {
  var updater = new air.ApplicationUpdaterUI()
  
  var public =  {
    init: function() {
      updater.configurationFile = new air.File("app:/config/update_config.xml")
      updater.isCheckForUpdateVisible = false
      updater.initialize()

      setInterval(public.check_updates, 2 * 60 * 60 * 1000) // check updates every 2 hours
      setTimeout(public.check_updates, 3 * 1000) // do a first check 
    }, 
    
    check_updates: function() {
      updater.checkNow()
    }
  }
  
  return public
}()