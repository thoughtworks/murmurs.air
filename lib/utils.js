function make_base_auth(user, password) {
 var tok = user + ':' + password;
 var hash = Base64.encode(tok);
 return "Basic " + hash;
}

function attr(name, value, host) {
  if( value === undefined ) {
    return host[name + "_attr"] === undefined ? null : host[name + "_attr"]
  } else {
    return host[name + "_attr"] = value
  }
}

if(typeof air.Introspector.Console != "undefined") {
  window.console = air.Introspector.Console
}
  