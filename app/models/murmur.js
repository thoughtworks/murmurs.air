Murmur = function() {
  this.content = null
  this.created_at = null
  this.author = null
  this.id = null
}

Murmur.parse = function(xml) {
  var murmur = new Murmur()
  murmur.id = $("id", xml).text()
  murmur.content = $("body", xml).text()
  murmur.created_at = $("created_at", xml).text()

  murmur.author = {
   name: $("author name", xml).text(),
   icon_path: Preference.host() + $("author icon_path", xml).text()
  }
  return murmur
}

Murmur.parse_collection = function(xml) {
  return $("murmurs murmur", xml).map(function() {
    return Murmur.parse(this)
  })
}