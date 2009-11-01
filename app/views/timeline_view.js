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
      $('.spinner', container).remove()
    },
    
    has_spinner: function() {
      return $('.spinner', container).size() > 0
    }
  }
}
