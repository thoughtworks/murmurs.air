MurmursService = function() {
  var preference = new Preference()
  
  var general_request_options = {
    dataType: 'xml',
    url: preference.api_url(),
    beforeSend: function(xhr) {
      xhr.setRequestHeader('Authorization', preference.base_auth_token())
    }      
  }

  var request = function(options) {
    $.ajax($.extend({}, general_request_options, options))
  }
  
  var public = {
    post: function(murmur) {
      if(!preference.host()) return
      request({
        type: "POST",
        data: {'murmur[body]': murmur.content() },
        async: false,
        success: function() {
          window.opener.TimelineController.refresh()
          window.close()
        }
      })
    },
    
    fetch: function(callback) {
      if(!preference.host()) return
      StatusBar.text("request sending to server")
      request({
        success: function(xml) {
          StatusBar.text("")
          callback(Murmur.parse_collection(xml))
        }
       })
    },
  }
  
  return public
}()