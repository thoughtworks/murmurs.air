env = {
  testing: false,
}

jQuery.fn.extend({
  atScrollBottom: function() {
    var el = this[0] ? this[0] : this
    return el.scrollHeight == el.scrollTop + el.offsetHeight
  }
})

function make_base_auth(user, password) {
 var tok = user + ':' + password;
 var hash = Base64.encode(tok);
 return "Basic " + hash;
}

function clone_array(array) {
  return array.slice()
}

window.console = air.Introspector.Console  