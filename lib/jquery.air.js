function resolvePath(filename) {
  return air.File.documentsDirectory.resolvePath("Mingle Murmur/" + filename)
}

function deletefile(filename) {
  var file = resolvePath(filename)
  if(!file.exists) { return }
  file.deleteFile()
}

function readfile(filename) {
  var file = resolvePath(filename)
  if(!file.exists) { return "" }
  
  var fileStream = new air.FileStream()
  fileStream.open(file, air.FileMode.READ)
  var content = fileStream.readUTFBytes(fileStream.bytesAvailable)
  fileStream.close()
  return content
}

function writefile(filename, content) {
  var file = resolvePath(filename)
  var fileStream= new air.FileStream()
  fileStream.open(file, air.FileMode.WRITE)
  fileStream.writeUTFBytes(content)
  fileStream.close()
}

function copy_to_clipboard() {
  air.Clipboard.generalClipboard.clear();
  air.Clipboard.generalClipboard.setData(air.ClipboardFormats.TEXT_FORMAT, window.getSelection());
}

function air_add_app_menu(menu_name, sub_menu) {
  var app_menu = air.NativeApplication.nativeApplication.menu;
  if(!app_menu) { return }

  var menu = app_menu.addItem(new air.NativeMenuItem(menu_name));
  menu.submenu = sub_menu
}

function air_menu(actions) {
  var menu = new air.NativeMenu()
  
  $.each(actions, function(){
    var item = new air.NativeMenuItem(this[0])
    item.addEventListener(air.Event.SELECT, this[1])
    menu.addItem(item)
  })
  
  return menu
}

function air_show_context_menu(event, menu_creator) {
  event.preventDefault()
  var menu = menu_creator(event)
  menu.display(window.nativeWindow.stage, event.clientX, event.clientY)
}

$('a[href^=http]').live("click", function(event){
   event.preventDefault()
   air.navigateToURL(new air.URLRequest(this.href))
})