UsersService = function() {
  var preference = new Preference()
  
  var general_request_options = function(){
    return {
      dataType: 'xml',
      beforeSend: function(xhr) {
        xhr.setRequestHeader('Authorization', preference.base_auth_token())
      }      
    }
  } 

  var request = function(options) {
    if(!preference.host()) return
    $.ajax($.extend(general_request_options(), options))
  }
  
  var public = {
    list: function(callback) {
      request({
        url: preference.users_list_url(),
        data: {},
        async: false,
        success: function(xml) {
          callback(User.parse_collection(xml))
        }
      })
    }
  }
  
  return public
}()