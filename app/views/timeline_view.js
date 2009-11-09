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

TimelineView = function(container) {
  return {
    prepend: function(murmur) {
      container.prepend(new MurmurView(murmur).render())
    },
    
    append: function(murmur) {
      container.append(new MurmurView(murmur).render())
    },
    
    scroll: function(handler) {
      return container.scroll(handler)
    },
    
    at_bottom: function() {
      return container.atScrollBottom()
    },
    
    append_spinner: function() {
      container.append('<div class="spinner"><img src="/images/spinner-big.gif"/></div>')
    },
    
    remove_spinner: function() { 
      // because it at_bottom calc is not in time after appending element
      // we need keep the spinner a little longer to block the concurrent event firing
      $('.spinner', container).hide()
      setTimeout(function() {
        $('.spinner', container).remove()
      }, 10)
    },
    
    has_spinner: function() {
      return $('.spinner', container).size() > 0
    }
  }
}
