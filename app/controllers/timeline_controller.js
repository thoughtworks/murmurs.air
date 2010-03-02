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

TimelineController = function() {
  var timeline = new Timeline()
  var view
  var interval = 30 * 1000
  
  var on_context_menu = function(event, murmur_element) {
    var murmur_id = murmur_element.getAttribute('murmur_id')
    var murmur = timeline.find(murmur_id)
    $.air.show_context_menu(event, function() {
      return $.air.menu([
        ['Copy', $.air.copy_to_clipboard], 
        ['Reply...', function() { do_reply(murmur) } ], 
        ['Remurmur...', function() { do_remurmur(murmur) } ]
      ])
    })
  }
  
  var do_reply = function(murmur){
    PostController.open({init_content : murmur.reply()})
  }
  
  var do_remurmur = function(murmur) {
    PostController.open({ init_content : murmur.remurmur()} )
  }
  
  var do_scroll = function() {
    if(!view.at_bottom() || view.has_spinner()) { return }
    view.append_spinner()
    MurmursService.fetch_before(timeline.oldest_id(), timeline.append_all, { complete: view.remove_spinner })
  }
  
  var public = {
    open: function() {
      var win = window.open("/app/views/timeline.html", "Mingle Murmurs")
      win.moveTo(150, 150)
      win.resizeTo(400, 650)
      win.nativeWindow.addEventListener(air.Event.DEACTIVATE, function(event) {
        event.target.stage.frameRate = 1
      })
      win.nativeWindow.addEventListener(air.Event.ACTIVATE, function(event) {
        event.target.stage.frameRate = 24
      })
      return win
    },
    
    init: function(container) {
      view = new TimelineView(container)
      
      timeline.onchange(function(event, murmur) {
        view[event](murmur)
      })
      
      $("button.post").click(PostController.open)
      
      $('.murmur').live('contextmenu', function(event){
        on_context_menu(event, this)
      })
      
      view.scroll(do_scroll)
      
      public.refresh()
      setInterval(public.refresh, interval)
    },

    refresh: function() {
      MurmursService.fetch_since(timeline.latest_id(), timeline.prepend_all)
    }
  }
  
  
  return public
}()
