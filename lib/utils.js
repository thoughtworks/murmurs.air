env = {
  testing: false,
}

jQuery.extend({
  pluck: function(array, property) {
    return $.map(array, function(el) { return el[property] })
  },
  
  invoke: function(array, func) {
    return $.map(array, function(el) { return el[func]() })
  }
})

String.interpret = function(value) {
  return value == null ? '' : String(value);
}

jQuery.extend(String.prototype, {
  escapeHTML: function() {
    return this.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  },
  
  unescapeHTML: function() {
    return this.replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>');
  },
  
  include: function(pattern) {
    return this.indexOf(pattern) > -1;
  },
  
  blank: function() {
    return /^\s*$/.test(this);
  },

  gsub: function(pattern, replacement) {
    var result = '', source = this, match;

    while (source.length > 0) {
      if (match = source.match(pattern)) {
        result += source.slice(0, match.index);
        result += String.interpret(replacement(match));
        source  = source.slice(match.index + match[0].length);
      } else {
        result += source, source = '';
      }
    }
    return result;
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

window.console = air.Introspector.Console  