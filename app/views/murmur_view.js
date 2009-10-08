MurmurView = function(murmur) {	   
  this.render = function(container) {
    var arrow = $('<span class="arrow-to-right"><span></span></span>')
    var author = $('<span class="author"></span>').text(murmur.author.name)
    var content = $('<div class="content"></div>').text(murmur.content)
    var created_at = $('<span class="created-at"></span>').text(murmur.created_at)
    var body = $('<div class="body"></div>').append(arrow).append(created_at).append(author).append(content)
    var icon = $('<div class="icon-wrapper"><img class="icon" src="' + murmur.author.icon_path + '"></img>')
    var murmur_element = $('<div class="murmur"></div>').append(icon).append(body)
    container.append(murmur_element)
  }
}