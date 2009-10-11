PreferenceController = function() {
  var preference = new Preference()  
  
  var public =  {
    open: function() {
      window.open("/app/views/preference.html", "Preference").resizeTo(400, 250)
    },
    
    init: function() {    
      $('input').each(function(){
        this.value = preference[this.id]()
      })
      
      $('input').bind('change', function(){
        preference[this.id](this.value)
      })
    }
  }
  
  return public
}()