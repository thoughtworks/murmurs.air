TimelineController = function() {
  var timeline = new Timeline()
  var view
  var interval = 30 * 1000
  
  var create_context_menu = function(murmur){
    return air_menu([
      ['Copy', copy_to_clipboard ], 
      ['Reply...', function() { do_reply(murmur) } ], 
      ['Remurmur...', function() { do_remurmur(murmur) } ]
    ])
  }
  
  var do_reply = function(murmur){
    PostController.open({init_content : murmur.reply()})
  }
  
  var do_remurmur = function(murmur) {
    PostController.open({ init_content : murmur.remurmur()} )
  }
  
  var do_scroll = function() {
    if(!view.at_bottom() || view.has_spinner()) { return }
    view.append_spinner()
    MurmursService.fetch_before(timeline.oldest_id(), timeline.append_all, { complete: view.remove_spinner })
  }
  
  var public = {
    init: function(container) {
      view = new TimelineView(container)
      
      timeline.onchange(function(event, murmur) {
        view[event](murmur)
      })
      
      $("button.post").click(PostController.open)
      
      $('.murmur').live('contextmenu', function(event){
        var murmur = timeline.find($(this).attr('murmur_id'))
        air_show_context_menu(event, function() {
          return create_context_menu(murmur)
        })
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
