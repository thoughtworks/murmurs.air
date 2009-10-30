TimelineController = function() {
  var timeline = new Timeline()
  var interval = 30 * 1000
  
  var create_context_menu = function(murmur){
    var menu = new air.NativeMenu()
    var remurmur_item = new air.NativeMenuItem("Remurmur")
    remurmur_item.addEventListener(air.Event.SELECT, function() { do_remurmur(murmur) });
    menu.addItem(remurmur_item)
    return menu
  }
  
  var do_remurmur = function(murmur) {
    PostController.open({ 'init_content' : murmur.remurmur()} )
  }
  
  var public = {
    init: function(container) {
      timeline.onchange(function(event, murmur) {
        if(event == "prepend") {
          container.prepend(new MurmurView(murmur).render())
        }
      })
      
      $("button.post").click(PostController.open)
      
      $('.murmur').live('contextmenu', function(event){
        var menu = create_context_menu(timeline.find($(this).attr('murmur_id')))
        event.preventDefault()
        menu.display(window.nativeWindow.stage, event.clientX, event.clientY)
      })
      
      public.refresh()
      setInterval(public.refresh, interval)
    },

    refresh: function() {
      MurmursService.fetch_since(timeline.latest_id(), timeline.prepend_all)
    }
  }
  
  
  return public
}()
