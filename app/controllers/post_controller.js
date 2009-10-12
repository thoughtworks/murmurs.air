PostController = function() {
  var new_murmur = new Murmur()
  
  var public = {
    init: function() {
      $("button.post").click(public.post)
      $("textarea").change(function() {
        new_murmur.content(this.value)
      })
      $("textarea").focus()
    },
    
    open: function() {
      window.open("/app/views/post.html").resizeTo(400, 150)
    },
    
    post: function() {
      MurmursService.post(new_murmur)
    }
  }
  
  return public
}()