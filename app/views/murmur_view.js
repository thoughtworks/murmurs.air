MurmurView = function(murmur) {	   
  return {
    render: function() {
      var arrow = $('<span class="arrow-to-right"><span></span></span>')
      var author = $('<span class="author"></span>').text(murmur.author().name)
      var content = $('<div class="content"></div>').html(MurmurRenderPipes.render(murmur.content()))
      var created_at = $('<span class="created-at"></span>').text(murmur.created_at())
      var body = $('<div class="body"></div>').append(arrow).append(created_at).append(author).append(content)
      if (murmur.mentions_current_user()) {
        body.addClass("mention")
      }
      var icon = $('<div class="icon-border-outer"><div class="icon-border-inner"><img class="icon" src="' + murmur.author().icon_path + '"></div></img>')
      return $('<div class="murmur" murmur_id="'+ murmur.id + '"></div>').append(icon).append(body)
    }
  }
}