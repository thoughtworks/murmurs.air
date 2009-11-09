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