Timeline = function() {
  var murmurs = []
  var listeners = []

  var find = function(id){
    for(var i in murmurs) {
      if(id_equal(murmurs[i].id, id)) {
        return murmurs[i]
      }
    }
  }
  
  var prepend = function(murmur) {
    if(find(murmur.id)) return

    murmurs.push(murmur)
    $.each(listeners, function() { this("prepend", murmur) })
  }
  
  var append = function(murmur) {
    if(find(murmur.id)) return
    murmurs.unshift(murmur)
    $.each(listeners, function() { this("append", murmur) })
  }
  
  var id_equal = function(left_id, right_id) {
    return left_id.toString() === right_id.toString()
  }
  
  return {
    prepend_all: function(come_in_murmurs) {
      var ms = clone_array(come_in_murmurs)
      ms.sort(Murmur.id_asc_order)
      $.each(ms, function() { prepend(this) })
    },
    
    append_all: function(come_in_murmurs) {
      var ms = clone_array(come_in_murmurs)
      ms.sort(Murmur.id_desc_order)
      $.each(ms, function() { append(this) })
    },
    
    onchange: function(listener) {
      listeners.push(listener)
    },
    
    latest_id: function() {
      var m = murmurs[murmurs.length - 1]
      return m && m.id
    },
    
    oldest_id: function() {
      var m = murmurs[0]
      return m && m.id
    },
    
    'find': find
  }
}