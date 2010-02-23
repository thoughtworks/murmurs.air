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

MurmurView = function(murmur) {
  var assemble = function(container, icon, arrow, body) {
    body.prepend(arrow)
    
    if(murmur.from_current_user()) {
      arrow.addClass('point-to-right')
      container.append(body).append(icon)
    } else {
      arrow.addClass('point-to-left')
      container.append(icon).append(body)
    }
    
    return container.append($('<div class="clear-both"></div>'))
  }
  
  return {
    render: function() {
      var arrow = $('<span class="arrow"><span></span></span>')
      var author = $('<span class="author"></span>').text(murmur.author().name)
      var content = $('<div class="content"></div>').html(murmur.stream().description() + RenderPipes.render(murmur.content()))
      var created_at = $('<span class="created-at"></span>').text(murmur.created_at())
      var body = $('<div class="body"></div>').append(created_at).append(author).append(content)
      
      if (murmur.mentions_current_user()) {
        arrow.addClass("mention")
        body.addClass("mention")
      }
      
      var icon = $('<div class="icon-border-outer"><div class="icon-border-inner"><img class="icon" src="' + murmur.author().icon_path + '"></div></img>')
      return assemble($('<div class="murmur" murmur_id="'+ murmur.id + '"></div>'), icon, arrow, body)
    }
  }
}