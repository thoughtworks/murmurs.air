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

RenderPipes = function() {
  var pipes = []
  return {
    add: function(pipe) {
      pipes.push(pipe)
    },
    
    render: function(content, account) {
      $.each(pipes, function() {
        content = this(content, account)
      })
      return content
    }
  }
}()

// html escape
RenderPipes.add(function(content) {
  return content.escapeHTML()
})

// cr
RenderPipes.add(function(content) {
  return content.replace(/\n/g, "\n<br/>")
})

// general link
RenderPipes.add(function(content){
  return content.gsub(/(http:\/\/|https:\/\/|www)[\w\-.+:%?&#;=/^s]*/, function(match){
    return '<a href="'+ match[0].replace(/&amp;/g, "&") +'">'+ match[0].replace(/&amp;/g, "&") +'</a>'
  }) 
})

// card link
RenderPipes.add(function(content, account) {
  return content.gsub(/#(\d+)/, function(match) {
    return Card.link_for(account, match[1], { text: match[0] })
  })
})

// extract mentions
RenderPipes.add(function(content) {
  return content.gsub(/@\w+/, function(match) {
    return '<span class="mention">'+ match[0] + '</span>'
  })
})