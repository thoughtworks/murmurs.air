Timeline = function() {
  var murmurs = []
  var listeners = []
  var latest = null
  
  var already_added = function(murmur) {
    var murmur_ids = []
     $.each(murmurs, function(){
      murmur_ids.push(this.id)
    })
    return murmur_ids.indexOf(murmur.id) != -1
  }
  
  var prepend = function(murmur) {
    if(already_added(murmur)) { 
      return 
    }
    
    murmurs.push(murmur)
    latest = murmur
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
    },
    
    latest_id: function() {
      return latest == null ? null : latest.id
    },
    
    find: function(id){
      var result = null;
      $.each(murmurs, function(){
        if(this.id.toString() == id.toString()){
          result = this
        }
      })
      return result
    },
  }
}