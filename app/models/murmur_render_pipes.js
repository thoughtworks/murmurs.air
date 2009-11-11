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

MurmurRenderPipes = function() {
  var pipes = []
  return {
    add: function(pipe) {
      pipes.push(pipe)
    },
    
    render: function(content) {
      $.each(pipes, function() {
        content = this(content)
      })
      return content
    }
  }
}()

// html escape
MurmurRenderPipes.add(function(content) {
  return content.escapeHTML()
})

// cr
MurmurRenderPipes.add(function(content) {
  return content.replace(/\n/g, "\n<br/>")
})

// general link
MurmurRenderPipes.add(function(content){
  return content.gsub(/(http:\/\/|https:\/\/|www)[\w\-.+:%?&#;=/^s]*/, function(match){
    return '<a href="'+ match[0].replace(/&amp;/g, "&") +'">'+ match[0].replace(/&amp;/g, "&") +'</a>'
  }) 
})

// card link
MurmurRenderPipes.add(function(content) {
  var card_url = function(number) {
    var preference = new Preference()
    return preference.host() + "/projects/" + preference.project_id() + "/cards/" + number
  }
  
  return content.gsub(/#(\d+)/, function(match) {
    return '<a class="card-number" href="'+ card_url(match[1]) +'">' + match[0] + '</a>'
  })
})

// extract mentions
MurmurRenderPipes.add(function(content) {
  return content.gsub(/@\w+/, function(match) {
    return '<span class="mention">'+ match[0] + '</span>'
  })
})