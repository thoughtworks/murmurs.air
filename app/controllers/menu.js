var targetMenu = air.NativeApplication.nativeApplication.menu; 

var murMenu = targetMenu.addItem(new air.NativeMenuItem("Operations"));
murMenu.submenu = new air.NativeMenu();

var preference = murMenu.submenu.addItem(new air.NativeMenuItem("Preference..."))
preference.addEventListener(air.Event.SELECT, PreferenceController.open)

var refresh = murMenu.submenu.addItem(new air.NativeMenuItem("Refresh"))
refresh.addEventListener(air.Event.SELECT, TimelineController.refresh)

var checkupdate = murMenu.submenu.addItem(new air.NativeMenuItem("Check for Updates..."))
checkupdate.addEventListener(air.Event.SELECT, ApplicationController.check_updates)
