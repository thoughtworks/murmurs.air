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
    // create new murmur on mingle
    post: function(murmur, callback) {
      if(murmur.blank()) return
      
      request({
        type: "POST",
        data: {'murmur[body]': murmur.content() },
        async: false,
        success: function() { callback() }
      })
    },
    
    // return 25 murmurs since a murmur's id, 
    // return latest 25 murmurs if since_id is null
    fetch_since: function(since_id, callback) {
      request({
        data: (since_id ? {'since_id': since_id} : {}),
        success: function(xml) {
          callback(Murmur.parse_collection(xml))
        }
      })
    },
    
    // return 25 mururs happened before a murmur id
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