ApplicationController = function() {
  var updater = new air.ApplicationUpdaterUI()
  
  
  var setup_auto_updater = function() {
    updater.configurationFile = new air.File("app:/config/update_config.xml")
    updater.isCheckForUpdateVisible = false
    updater.initialize()

    setInterval(public.check_updates, 2 * 60 * 60 * 1000) // check updates every 2 hours
    setTimeout(public.check_updates, 3 * 1000) // do a first check     
  }
  
  var setup_menu = function() {
    var targetMenu = air.NativeApplication.nativeApplication.menu; 

    var murMenu = targetMenu.addItem(new air.NativeMenuItem("Operations"));
    murMenu.submenu = new air.NativeMenu();

    var preference = murMenu.submenu.addItem(new air.NativeMenuItem("Preference..."))
    preference.addEventListener(air.Event.SELECT, PreferenceController.open)

    var refresh = murMenu.submenu.addItem(new air.NativeMenuItem("Refresh"))
    refresh.addEventListener(air.Event.SELECT, TimelineController.refresh)

    var checkupdate = murMenu.submenu.addItem(new air.NativeMenuItem("Check for Updates..."))
    checkupdate.addEventListener(air.Event.SELECT, public.check_updates)
  }
  
  var public =  {
    init: function() {
      setup_menu()
      setup_auto_updater()
      PreferenceController.open_if_empty()
    }, 
    
    check_updates: function() {
      updater.checkNow()
    }
  }
  
  return public
}()