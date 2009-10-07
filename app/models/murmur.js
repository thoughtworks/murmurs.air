Murmur = function() {}

Murmur.parse = function(xml) {
  var murmur = new Murmur()
  murmur.content = $("body", xml).text()
  murmur.created_at = $("created_at", xml).text()

  murmur.author = {
   name: $("author name", xml).text(),
   icon_path: Preference.host() + $("author icon_path", xml).text()
  }
  return murmur
}