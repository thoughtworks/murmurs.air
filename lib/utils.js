env = {
  testing: false,
}

jQuery.fn.extend({
  atScrollBottom: function() {
    var el = this[0] ? this[0] : this
    return el.scrollHeight == el.scrollTop + el.offsetHeight
  }
})

function make_base_auth(user, password) {
 var tok = user + ':' + password;
 var hash = Base64.encode(tok);
 return "Basic " + hash;
}

function clone_array(array) {
  return array.slice()
}

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

window.console = air.Introspector.Console  