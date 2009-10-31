User = function(id) {
  var attr_store = new MemAttributesStore()
  return {
    'id': id,
    login: function(v) { return attr('login', v, attr_store) },
    name: function(v) { return attr('name', v, attr_store) }
  }
}

User.parse = function(xml) {
  var id = parseInt($("id", xml)[0].textContent)
  var user = new User(id)
  user.name($("name", xml).text())
  user.login($("login", xml).text())
  return user
}

User.parse_collection = function(xml) {
  return $("users user", xml).map(function() {
    return User.parse(this)
  })
}
