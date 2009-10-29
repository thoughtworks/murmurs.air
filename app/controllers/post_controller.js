PostController = function() {
  var new_murmur = new Murmur()
  
  var public = {
    init: function(params) {
      $("button.post").click(public.post)
      $("textarea").change(function() {
        new_murmur.content(this.value)
      })
      $("textarea").focus()
      if(params){
        $("textarea").text("RM @" + params['to'] + ' ' + params['content'] + ' //')
      }
    },
    
    open: function() {
      window.open("/app/views/post.html").resizeTo(400, 150)
    },
    
    reply: function(to, content){
      window.open("/app/views/post.html?to=" + to + "&content=" + content).resizeTo(400, 150)
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