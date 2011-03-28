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
 
TimelineController = function(container, account) {
  var murmurRefreshInterval = 30 * 1000
  var timeStampRefreshInterval = 60 * 1000
  
  var timeline = new Timeline()
  var view = new TimelineView(container, timeline)
  var murmurs_service = new MurmursService(account)

  
  var initialize = function () {
    $("button.post").click(function() {
      PostController.open(account, {after_post: refresh})
    })

    $('.murmur').live('contextmenu', function(event){
      on_context_menu(event, this)
    })

    view.scroll(do_scroll)    
    refresh()
    setInterval(refresh, murmurRefreshInterval)
    jQuery.timeago.settings.refreshMillis = -1 //disable timeago refreshing

    setInterval(refreshTimeStamp, timeStampRefreshInterval)
  }
  
  
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
    PostController.open(account,{content: murmur.reply(), after_post: refresh})
  }
  
  var do_remurmur = function(murmur) {
    PostController.open(account, {content: murmur.remurmur(), after_post: refresh})
  }
  
  var do_scroll = function() {
    if(!view.at_bottom() || view.has_spinner()) { return }
    view.append_spinner()
    murmurs_service.fetch_before(timeline.oldest_id(), timeline.append_all, { complete: view.remove_spinner })
  }
  
  var refreshTimeStamp = function() {
    $('span.created-at').timeago()
  }
  
  var refresh =  function() {
    murmurs_service.fetch_since(timeline.latest_id(), timeline.prepend_all)
  }
  
  initialize()
  return {
    'refresh': refresh
  }
}

TimelineController.open = function() {
  var win = window.open("/app/views/timeline.html", "Mingle Murmurs")
  win.moveTo(150, 150)
  win.resizeTo(400, 650)
  return win  
}
