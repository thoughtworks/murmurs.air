Murmur = function(id) {
  var attr_store = new MemAttributesStore()
  var public = {
    'id': id,
    content: function(v) { return attr('content', v, attr_store) },
    created_at: function(v) { return attr('created_at', v, attr_store) },
    author: function(v) { return attr('author', v, attr_store)},
    
    rendered_content: function() {
      return public.content().replace(/\n/g, "\n<br/>")
    }
  }
  
  return public
}

Murmur.parse = function(xml) {
  var id = parseInt($("id", xml)[0].textContent)
  var murmur = new Murmur(id)
  murmur.content($("body", xml).text())
  murmur.created_at($("created_at", xml).text())

  murmur.author({
   name: $("author name", xml).text(),
   icon_path: new Preference().host() + $("author icon_path", xml).text()
  })
  return murmur
}

Murmur.parse_collection = function(xml) {
  return $("murmurs murmur", xml).map(function() {
    return Murmur.parse(this)
  })
}

Murmur.id_asc_order = function(left, right) {
  if(left.id == right.id) { return 0 }
  return left.id > right.id ? 1 : -1
}