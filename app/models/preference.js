Preference = function() {
  var public = {
    host: function(v) { return attr('host', v, this) },
    project_id: function(v) { return attr('project_id', v, this) },
    username: function(v) { return attr('username', v, this) },
    password: function(v) { return attr('password', v, this) },
    
    base_auth_token: function() {
      return make_base_auth(public.username(), public.password())
    },
    
    api_url: function(){
      return public.host() + "/api/v2/projects/" + public.project_id() + "/murmurs.xml"
    }
  }
  
  return public
}()