MurmursController = function() {
  var container = null
  
  var public = {
    init: function(container_element) { 
      container = new MurmursContainer(container_element)
    },
    
    refresh: function() {
      MurmursService.fetch(container.prependAll)
    },
    
    loop_refresh: function() {
      public.refresh()
      setInterval(public.refresh, 30 * 1000)
    }
  }
  
  return public
}()
