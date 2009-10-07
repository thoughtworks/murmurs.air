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


function readfile(filename) {
  var file = air.File.documentsDirectory.resolvePath(filename)
  var fileStream= new air.FileStream()
  fileStream.open(file, air.FileMode.READ)
  var content = fileStream.readUTFBytes(fileStream.bytesAvailable)
  fileStream.close()
  return content
}

function writefile(filename, content) {
  var file = air.File.documentsDirectory.resolvePath(filename)
  var fileStream= new air.FileStream()
  fileStream.open(file, air.FileMode.WRITE)
  fileStream.writeUTFBytes(content)
  fileStream.close()
}

window.console = air.Introspector.Console  