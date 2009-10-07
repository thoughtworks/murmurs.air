MemAttributesStore = function() {
  this.o = function() {}
}

MemAttributesStore.prototype.get = function(key) {
  return this.o[key + "_attr"]
}

MemAttributesStore.prototype.set = function(key, value) {
  return this.o[key + "_attr"] = value
}