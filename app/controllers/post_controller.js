PostController = function() {
  var new_murmur = new Murmur()
  
  var public = {
    init: function() {
      $("button.post").click(public.post)
      $("textarea").change(function() {
        new_murmur.content(this.value)
      })
      $("textarea").focus()

      if(window.params && window.params['init_content']){
        $("textarea").text(window.params['init_content'])
      }
    },
    
    open: function(params) {
      var post_win = window.open("/app/views/post.html")
      post_win.resizeTo(400, 150)
      post_win.params = params
    },
    
    post: function() {
      MurmursService.post(new_murmur, function() {
        window.opener.TimelineController.refresh()
        window.close()
      })
    }
  }
  
  return public
}()