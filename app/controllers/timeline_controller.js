TimelineController = function() {
  var timeline = new Timeline()
  var interval = 30 * 1000
  var menu = new air.NativeMenu()
  
  var public = {
    init: function(container) {
      var replyItem = new air.NativeMenuItem("Reply")
      replyItem.addEventListener(air.Event.SELECT, onReplyCommand);
      menu.addItem(replyItem)
      
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
      MurmursService.fetch_since(timeline.latest_id(), timeline.prependAll)
    },
    
    onContextMenu: function(event){
      event.preventDefault()
      menu.display(window.nativeWindow.stage, event.clientX, event.clientY)
    },
  }
  
  var onReplyCommand = function(){
    PostController.open()
  },
  
  return public
}()
