Preference = function() {
  
  var preferences_file = env.testing ? "test_preferences.xml" : "preferences.xml"
  var attr_store = new XMLFileAttributesStore(preferences_file)
  var encrypted_attr_store = new EncryptedAttrStore()
  
  var public = {
    host: function(v) { return attr('host', v, attr_store) },
    project_id: function(v) { return attr('project_id', v, attr_store) },
    username: function(v) { return attr('username', v, attr_store) },
    password: function(v) { return attr('password', v, encrypted_attr_store) },
    display_name: function(v) { return attr('display_name', v, attr_store) },
    
    base_auth_token: function() {
      return make_base_auth(public.username(), public.password())
    },
    
    murmurs_url: function(){
      return public.host() + "/api/v2/projects/" + public.project_id() + "/murmurs.xml"
    },
    
    card_html_url: function(number) {
      return public.host() + "/projects/" + public.project_id() + "/cards/" + number
    },
    
    users_list_url: function() {
      return public.host() + "/api/v2/users.xml"
    },
    
    reset: function() {
      attr_store.reset();
      encrypted_attr_store.reset();
    }
  }
  
  return public
}