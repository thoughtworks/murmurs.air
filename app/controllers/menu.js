$(document).ready(function() {
  var targetMenu = air.NativeApplication.nativeApplication.menu; 

  var murMenu = targetMenu.addItem(new air.NativeMenuItem("Mur"));
  murMenu.submenu = new air.NativeMenu();
  
  var preference = murMenu.submenu.addItem(new air.NativeMenuItem("Preference..."))
  preference.addEventListener(air.Event.SELECT, PreferenceController.open)
  
  var refresh = murMenu.submenu.addItem(new air.NativeMenuItem("Refresh"))
  refresh.addEventListener(air.Event.SELECT, refreshMurmur)
})