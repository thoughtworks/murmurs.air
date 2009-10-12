MemAttributesStore = function() {
  var o = function() {}
  
  var public = {
    get: function(key) {
      key = key.toLowerCase()
      return o[key] === undefined ? null : o[key]
    },
    
    set: function(key, value) {
      key = key.toLowerCase()
      return o[key] = value
    },
    
    to_xml: function() {
      var cr = air.File.lineEnding
      var prefsXML =   '<?xml version="1.0" encoding="utf-8"?>' + cr + '<attributes>' + cr
      for(var key in o) {
        if(key == "prototype"){
          continue
        }
        prefsXML += '  <'+ key +'>' + public.get(key) + "</" + key + ">" + cr 
      }
      prefsXML += '</attributes>'
      return prefsXML
    }
  }
  
  return public
}

MemAttributesStore.from_xml = function(xml) {
  var ret = new MemAttributesStore()
  $(xml).children().each(function() {
    ret.set(this.tagName, this.innerText)
  })
  return ret
}


XMLFileAttributesStore = function(filename) {
  var mem_store = function() {
    return MemAttributesStore.from_xml(readfile(filename))
  }
  
  var public = {
    get: function(key) {
      return mem_store().get(key)
    },
    
    set: function(key, value) {
      var m = mem_store()

      if(m.get(key) == value) { return }

      var ret = m.set(key, value)
      writefile(filename, m.to_xml())
      return ret
    },
    
    reset: function() {
      deletefile(filename)
    }
  }
  
  return public
}

EncryptedAttrStore = function() {
  var public = {
    get: function(key) {
      var data = air.EncryptedLocalStore.getItem(key);
      if(data === null) { 
        return null 
      } else {
        return data.readUTFBytes(data.bytesAvailable)
      }
    },
    
    set: function(key, value) {        
      var data = new air.ByteArray();
      data.writeUTFBytes(value)
      return air.EncryptedLocalStore.setItem(key, data )
    },
    
    reset: function() {
      air.EncryptedLocalStore.reset()
    }
  }
  
  return public
}



function attr(name, value, store) {
  return value === undefined ? store.get(name) : store.set(name, value)
}