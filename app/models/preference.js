Preference = function() {  
  return {
    host: function(v) { return attr('host', v, this) },
    project_id: function(v) { return attr('project_id', v, this) },
    username: function(v) { return attr('username', v, this) },
    password: function(v) { return attr('password', v, this) },
    
    base_auth_token: function() {
      return make_base_auth(this.username_attr, this.password_attr)
    },
    
    api_url: function(){
      return this.host_attr + "/api/v2/projects/" + this.project_id_attr + "/murmurs.xml"
    }
  }
}()