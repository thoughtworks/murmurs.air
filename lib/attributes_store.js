MemAttributesStore = function() {
  this.o = function() {}
}

MemAttributesStore.prototype.get = function(key) {
  key = key.toLowerCase()
  return this.o[key] === undefined ? null : this.o[key]
}

MemAttributesStore.prototype.set = function(key, value) {
  key = key.toLowerCase()
  return this.o[key] = value
}

MemAttributesStore.prototype.to_xml = function() {
  var cr = air.File.lineEnding
  var prefsXML =   '<?xml version="1.0" encoding="utf-8"?>' + cr + '<attributes>' + cr
  for(var key in this.o) {
    if(key == "prototype"){
      continue
    }
    prefsXML += '  <'+ key +'>' + this.get(key) + "</" + key + ">" + cr 
  }
  prefsXML += '</attributes>'
  return prefsXML
}

MemAttributesStore.from_xml = function(xml) {
  var ret = new MemAttributesStore()
  $(xml).children().each(function() {
    ret.set(this.tagName, this.innerText)
  })
  return ret
}


XMLFileAttributesStore = function(filename) {
  this.filename = filename
}

XMLFileAttributesStore.prototype.mem_store = function() {
  return MemAttributesStore.from_xml(readfile(this.filename))
}

XMLFileAttributesStore.prototype.get = function(key) {
  return this.mem_store().get(key)
}

XMLFileAttributesStore.prototype.set = function(key, value) {
  var m = this.mem_store()
  
  if(m.get(key) == value) { return }
  
  var result = m.set(key, value)
  writefile(this.filename, m.to_xml())
  return result
}

XMLFileAttributesStore.prototype.reset = function() {
  deletefile(this.filename)
}