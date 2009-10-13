TimelineController = function() {
  var timeline = new Timeline()
  var interval = 30 * 1000
  
  var public = {
    init: function(container) { 
      timeline.onchange(function(event, murmur) {
        if(event == "prepend") {
          container.prepend(new MurmurView(murmur).render())
        }
      })
      
      $("button.post").click(PostController.open)
      
      public.refresh()
      setInterval(public.refresh, interval)
    },
    
    refresh: function() {
      MurmursService.fetch(timeline.prependAll)
    }
  }
  
  return public
}()
