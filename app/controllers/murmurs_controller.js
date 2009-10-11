MurmursController = function() {
  var timeline
  
  var public = {
    init: function(container_element) { 
      timeline = new Timeline(container_element)
    },
    
    refresh: function() {
      MurmursService.fetch(timeline.prependAll)
    },
    
    loop_refresh: function() {
      public.refresh()
      setInterval(public.refresh, 30 * 1000)
    }
  }
  
  return public
}()
