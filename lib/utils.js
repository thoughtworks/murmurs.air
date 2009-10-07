function make_base_auth(user, password) {
 var tok = user + ':' + password;
 var hash = Base64.encode(tok);
 return "Basic " + hash;
}

function attr(name, value, store) {
  if( value === undefined ) {
    return store.get(name)
  } else {
    return store.set(name, value)
  }
}

window.console = air.Introspector.Console  