PreferenceController = function() {
  var public =  {
    open: function() {
      window.open("/app/views/preference.html", "Preference").resizeTo(400, 250)
    }
  }
  
  return public
}()