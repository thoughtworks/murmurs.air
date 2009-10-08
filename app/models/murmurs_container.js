MurmursContainer = function(element) {
  var murmur_ids = []
  
  var already_added = function(murmur) {
    return murmur_ids.indexOf(murmur.id) != -1
  }
  
  var prepend = function(murmur) {
    if(already_added(murmur)) { 
      return 
    }
    
    murmur_ids.push(murmur.id)
    element.prepend(new MurmurView(murmur).render())
  }
  
  return {
    prependAll: function(murmurs) {
      murmurs.sort(Murmur.id_asc_order).each(function() { 
        prepend(this) 
      })
    }
  }
}