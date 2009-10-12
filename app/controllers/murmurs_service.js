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
    if(!preference.host()) return
    StatusBarController.text("request sending to server")
    $.ajax($.extend({}, general_request_options, options))
  }
  
  var public = {
    post: function(murmur) {
      request({
        type: "POST",
        data: {'murmur[body]': murmur.content() },
        async: false,
        success: function() {
          StatusBarController.text("")
          window.opener.TimelineController.refresh()
          window.close()
        }
      })
    },
    
    fetch: function(callback) {
      request({
        success: function(xml) {
          StatusBarController.text("")
          callback(Murmur.parse_collection(xml))
        }
       })
    },
  }
  
  return public
}()