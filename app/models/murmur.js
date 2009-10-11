Murmur = function() {
  this.content = null
  this.created_at = null
  this.author = null
  this.id = null
}

Murmur.parse = function(xml) {
  var murmur = new Murmur()
  murmur.id = parseInt($("id", xml)[0].textContent)
  murmur.content = $("body", xml).text()
  murmur.created_at = $("created_at", xml).text()

  murmur.author = {
   name: $("author name", xml).text(),
   icon_path: new Preference().host() + $("author icon_path", xml).text()
  }
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