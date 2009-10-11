TimelineController = function() {
  var timeline
  
  var public = {
    init: function(container) { 
      timeline = new Timeline()
      timeline.onchange(function(event, murmur) {
        if(event == "prepend") {
          container.prepend(new MurmurView(murmur).render())
        }
      })
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
