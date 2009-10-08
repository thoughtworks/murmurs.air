env = {
  testing: false,
}

function make_base_auth(user, password) {
 var tok = user + ':' + password;
 var hash = Base64.encode(tok);
 return "Basic " + hash;
}

function attr(name, value, store) {
  if( value === undefined ) {
    return store.get(name)
  } else {
    return store.set(name, value)
  }
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

window.console = air.Introspector.Console  