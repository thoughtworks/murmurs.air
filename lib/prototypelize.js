// Code copyied and adapted from prototype.js
// http://www.prototypejs.org/

jQuery.extend({
  pluck: function(array, property) {
    return $.map(array, function(el) { return el[property] })
  },
  
  invoke: function(array, func) {
    return $.map(array, function(el) { return el[func]() })
  },
  
  any: function(array, callback) {
    var result = false;
    $.each(array, function(index, el) {
      if (callback.call(this, index, el) === true) {
        result = true
        return false
      }
    })
    return result
  }
})

String.interpret = function(value) {
  return value == null ? '' : String(value)
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