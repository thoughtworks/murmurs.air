Timeline = function() {
  var murmur_ids = []
  var listeners = []
  
  var already_added = function(murmur) {
    return murmur_ids.indexOf(murmur.id) != -1
  }
  
  var prepend = function(murmur) {
    if(already_added(murmur)) { 
      return 
    }
    
    murmur_ids.push(murmur.id)
    $.each(listeners, function() { this("prepend", murmur) })
  }
  
  return {
    prependAll: function(come_in_murmurs) {
      var murmurs = clone_array(come_in_murmurs)
      murmurs.sort(Murmur.id_asc_order)
      $.each(murmurs, function() { prepend(this) })
    },
    
    onchange: function(listener) {
      listeners.push(listener)
    }
  }
}