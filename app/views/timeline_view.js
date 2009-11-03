TimelineView = function(container) {
  return {
    prepend: function(murmur) {
      container.prepend(new MurmurView(murmur).render())
    },
    
    append: function(murmur) {
      container.append(new MurmurView(murmur).render())
    },
    
    scroll: function(handler) {
      return container.scroll(handler)
    },
    
    at_bottom: function() {
      return container.atScrollBottom()
    },
    
    append_spinner: function() {
      container.append('<div class="spinner"><img src="/images/spinner-big.gif"/></div>')
    },
    
    remove_spinner: function() { 
      // because it at_bottom calc is not in time after appending element
      // we need keep the spinner a little longer to block the concurrent event firing
      $('.spinner', container).hide()
      setTimeout(function() {
        $('.spinner', container).remove()
      }, 10)
    },
    
    has_spinner: function() {
      return $('.spinner', container).size() > 0
    }
  }
}
