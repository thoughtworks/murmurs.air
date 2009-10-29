TimelineController = function() {
  var timeline = new Timeline()
  var interval = 30 * 1000
  var menu = new air.NativeMenu()
  
  var public = {
    init: function(container) {
      initContextMenu();
      
      timeline.onchange(function(event, murmur) {
        if(event == "prepend") {
          container.prepend(new MurmurView(murmur).render())
          $('#murmur_' + murmur.id).live('contextmenu', function(event){
            var murmurDivId = $(event.target).parents('.murmur').get(0).id.replace('murmur_', '')
            TimelineController.lastVisitedMurmur = TimelineController.timeline().find(murmurDivId)
            TimelineController.onContextMenu(event)
          })
        }
      })
      
      $("button.post").click(PostController.open)
      public.refresh()
      setInterval(public.refresh, interval)
    },
    
    lastVisitedMurmur: function(){
      return lastVisitedMurmur
    },
    
    timeline: function(){
      return timeline
    },
    
    refresh: function() {
      MurmursService.fetch_since(timeline.latest_id(), timeline.prependAll)
    },
    
    onContextMenu: function(event){
      event.preventDefault()
      menu.display(window.nativeWindow.stage, event.clientX, event.clientY)
    },
  }
  
  var onReplyCommand = function(event){
    var murmur = TimelineController.lastVisitedMurmur
    PostController.reply(murmur.author().name, murmur.content())
  },
  
  var initContextMenu = function(){
    var replyItem = new air.NativeMenuItem("Reply")
    replyItem.addEventListener(air.Event.SELECT, onReplyCommand);
    menu.addItem(replyItem)
  }
  
  return public
}()
