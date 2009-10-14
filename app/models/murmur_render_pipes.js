MurmurRenderPipes = function() {
  var pipes = []
  return {
    add: function(pipe) {
      pipes.push(pipe)
    },
    
    render: function(content) {
      $.each(pipes, function() {
        content = this(content)
      })
      return content
    }
  }
}()

// html escape
MurmurRenderPipes.add(function(content) {
  return content.escapeHTML()
})

// cr
MurmurRenderPipes.add(function(content) {
  return content.replace(/\n/g, "\n<br/>")
})

// card link
MurmurRenderPipes.add(function(content) {
  var card_url = function(number) {
    return new Preference().card_html_url(number)
  }
  
  return content.gsub(/#(\d+)/, function(match) {
    return '<a href="'+ card_url(match[1]) +'">' + match[0] + '</a>'
  })
})

// extract murmurer
MurmurRenderPipes.add(function(content) {
  return content.gsub(/@\w+/, function(match) {
    return '<span class="murmurer">'+ match[0] + '</span>'
  })
})