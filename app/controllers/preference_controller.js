PreferenceController = function() {
  var preference = new Preference()  
  
  var change_listener = function() {
    preference[this.id](this.value)
  }
  
  var update_display_name = function(users) {
    var current_user = $.grep(users, function(user, index) {
      return (user.login() == preference.username());
    });
    
    if (current_user.length == 1) {
      preference.display_name(current_user[0].name())
    } else {
      preference.display_name('')
    }
  }
  
  var public =  {
    open: function() {
      window.open("/app/views/preference.html", "Preference").resizeTo(400, 320)
    },
    
    open_if_empty: function() {
      if(!preference.host()) {
        public.open()
      }
    },
    
    init: function() {
      var inputs = $('input[type=text], input[type=password]')
      var readonly_values = $('span.readonly')
      
      inputs.each(function() {
        this.value = preference[this.id]()
      })
      
      readonly_values.each(function() {
        this.innerHTML = preference[this.id]() || "(autopopulated on click of 'Close')"
      })
      
      inputs.change(change_listener)
      
      window.nativeWindow.addEventListener(air.Event.DEACTIVATE, function() {
        inputs.each(change_listener)
      })
      
      window.nativeWindow.addEventListener(air.Event.CLOSE, function() {
        window.opener.TimelineController.refresh()
      })
      
      window.nativeWindow.addEventListener(air.Event.CLOSE, function() {
        UsersService.list(update_display_name)
      })
      
    }
  }
  
  return public
}()