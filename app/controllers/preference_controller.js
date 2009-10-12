PreferenceController = function() {
  var preference = new Preference()  
  
  var change_listener = function() {
    preference[this.id](this.value)
  }
  
  var public =  {
    open: function() {
      window.open("/app/views/preference.html", "Preference").resizeTo(400, 250)
    },
    
    init: function() {    
      $('input').each(function() {
        this.value = preference[this.id]()
      })
      
      $('input').change(change_listener)
      window.nativeWindow.addEventListener(air.Event.DEACTIVATE, function() {
        $('input').each(change_listener)
      });
    }
  }
  
  return public
}()