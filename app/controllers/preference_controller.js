PreferenceController = function() {
  var preference = new Preference()  
  
  var change_listener = function() {
    preference[this.id](this.value)
  }
  
  var public =  {
    open: function() {
      window.open("/app/views/preference.html", "Preference").resizeTo(400, 280)
    },
    
    open_if_empty: function() {
      if(!preference.host()) {
        public.open()
      }
    },
    
    init: function() {
      var inputs = $('input[type=text], input[type=password]')
      
      inputs.each(function() {
        this.value = preference[this.id]()
      })
      
      inputs.change(change_listener)
      
      window.nativeWindow.addEventListener(air.Event.DEACTIVATE, function() {
        inputs.each(change_listener)
      })
      
      window.nativeWindow.addEventListener(air.Event.CLOSE, function() {
        window.opener.TimelineController.refresh()
      })
      
    }
  }
  
  return public
}()