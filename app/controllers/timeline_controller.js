TimelineController = function() {
  var timeline = new Timeline()
  var view
  var interval = 30 * 1000
  
  var create_context_menu = function(murmur){
    var menu = new air.NativeMenu()
    
    var copy_item = new air.NativeMenuItem("Copy")
    copy_item.addEventListener(air.Event.SELECT, function(event) { do_copy() })
    menu.addItem(copy_item)

    var reply_item = new air.NativeMenuItem("Reply...")
    reply_item.addEventListener(air.Event.SELECT, function() { do_reply(murmur) });
    menu.addItem(reply_item)
    
    var remurmur_item = new air.NativeMenuItem("Remurmur...")
    remurmur_item.addEventListener(air.Event.SELECT, function() { do_remurmur(murmur) });
    menu.addItem(remurmur_item)
    
    return menu
  }
  
  var do_reply = function(murmur){
    PostController.open({init_content : murmur.reply()})
  }
  
  var do_remurmur = function(murmur) {
    PostController.open({ init_content : murmur.remurmur()} )
  }
  
  var do_copy = copy_to_clipboard
    
  var do_scroll = function() {
    if(!view.at_bottom() || view.has_spinner()) { return }
    view.append_spinner()
    MurmursService.fetch_before(
      timeline.oldest_id(), 
      timeline.append_all, 
      { complete: view.remove_spinner }
    )
  }
  
  var public = {
    init: function(container) {
      view = new TimelineView(container)
      
      timeline.onchange(function(event, murmur) {
        view[event](murmur)
      })
      
      $("button.post").click(PostController.open)
      
      $('.murmur').live('contextmenu', function(event){
        event.preventDefault()
        var menu = create_context_menu(timeline.find($(this).attr('murmur_id')))
        menu.display(window.nativeWindow.stage, event.clientX, event.clientY)
      })
      
      view.scroll(do_scroll)
      
      public.refresh()
      setInterval(public.refresh, interval)
    },

    refresh: function() {
      MurmursService.fetch_since(timeline.latest_id(), timeline.prepend_all)
    }
  }
  
  
  return public
}()
