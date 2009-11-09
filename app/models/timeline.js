/*
 * Copyright 2009 ThoughtWorks, Inc.
 * 
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 * 
 * http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */

Timeline = function() {
  var murmurs = []
  var listeners = []

  var find = function(id){
    for(var i in murmurs) {
      if(id_equal(murmurs[i].id, id)) {
        return murmurs[i]
      }
    }
  }
  
  var prepend = function(murmur) {
    if(find(murmur.id)) return

    murmurs.push(murmur)
    $.each(listeners, function() { this("prepend", murmur) })
  }
  
  var append = function(murmur) {
    if(find(murmur.id)) return
    murmurs.unshift(murmur)
    $.each(listeners, function() { this("append", murmur) })
  }
  
  var id_equal = function(left_id, right_id) {
    return left_id.toString() === right_id.toString()
  }
  
  return {
    prepend_all: function(come_in_murmurs) {
      var ms = clone_array(come_in_murmurs)
      ms.sort(Murmur.id_asc_order)
      $.each(ms, function() { prepend(this) })
    },
    
    append_all: function(come_in_murmurs) {
      var ms = clone_array(come_in_murmurs)
      ms.sort(Murmur.id_desc_order)
      $.each(ms, function() { append(this) })
    },
    
    onchange: function(listener) {
      listeners.push(listener)
    },
    
    latest_id: function() {
      var m = murmurs[murmurs.length - 1]
      return m && m.id
    },
    
    oldest_id: function() {
      var m = murmurs[0]
      return m && m.id
    },
    
    'find': find
  }
}