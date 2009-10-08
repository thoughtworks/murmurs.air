MurmursService = function() {
  var public = {
    fetch: function(callback) {
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
          callback(Murmur.parse_collection(xml))
        }
       })
    },
  }
  
  return public
}()