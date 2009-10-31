MurmursService = function() {
  var preference = new Preference()
  
  var general_request_options = function(){
    return {
      dataType: 'xml',
      url: preference.murmurs_url(),
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
    post: function(murmur, callback) {
      if(murmur.blank()) return
      
      request({
        type: "POST",
        data: {'murmur[body]': murmur.content() },
        async: false,
        success: function() { callback() }
      })
    },
    
    fetch_since: function(since_id, callback) {
      request({
        data: (since_id ? {'since_id': since_id} : {}),
        success: function(xml) {
          callback(Murmur.parse_collection(xml))
        }
      })
    },
    
    fetch_before: function(before_id, callback) {
      request({
        data: (before_id ? {'before_id': before_id} : {}),
        success: function(xml) {
          callback(Murmur.parse_collection(xml))
        }
      })
    }    
  }
  
  return public
}()