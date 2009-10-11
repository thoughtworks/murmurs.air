MurmursService = function() {
  var preference = new Preference()
  
  var public = {
    fetch: function(callback) {
      if(!preference.host()) return

      StatusBar.text("loading...")

      $.ajax({
        dataType: 'xml',
        url: preference.api_url(),

        beforeSend: function(xhr) {
          xhr.setRequestHeader('Authorization', preference.base_auth_token())
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