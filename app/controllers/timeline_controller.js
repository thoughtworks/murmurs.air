TimelineController = function() {
  var timeline = new Timeline()
  
  var public = {
    init: function(container) { 
      timeline.onchange(function(event, murmur) {
        if(event == "prepend") {
          container.prepend(new MurmurView(murmur).render())
        }
      })
      
      $("button.post").click(PostController.open)
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
