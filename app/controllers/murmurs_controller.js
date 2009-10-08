MurmursController = function() {
  var container = null
  
  var public = {
    init: function(container_element) { 
      container = container_element
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
          container.html("")
          Murmur.parse_collection(xml).each(function() {
            new MurmurView(this).render(container)
          })
        }
       })
    }
  }
  
  return public
}()
