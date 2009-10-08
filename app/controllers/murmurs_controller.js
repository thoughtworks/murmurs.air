MurmursContainer = function(element) {
  var murmur_ids = []
  
  var add = function(murmur) {
    if(murmur_ids.indexOf(murmur.id) != -1) { return }
    murmur_ids.push(murmur.id)
    element.prepend(new MurmurView(murmur).render())
  }
  
  return {
    addAll: function(murmurs) {
      murmurs.sort(Murmur.id_asc_order).each(function() { add(this) })
    }
  }
}


MurmursController = function() {
  var container = null
  
  var public = {
    init: function(container_element) { 
      container = new MurmursContainer(container_element)
    },
    
    refresh: function() {
      if(!Preference.host()) return

      StatusBar.text("loading...")

      $.ajax({
        dataType: 'xml',
        url: Preference.api_url(),

        beforeSend: function(xhr) {
          xhr.setRequestHeader('Authorization', Preference.base_auth_token())
        },

        success: function(xml) {
          StatusBar.text("")
          container.addAll(Murmur.parse_collection(xml))
        }
       })
    },
    
    loop_refresh: function() {
      setInterval(public.refresh, 30 * 1000)
    }
  }
  
  return public
}()
